<script>
	// In-browser IRC client for irc.burbsec.com, talking to Ergo's WebSocket
	// listener via wss://irc.burbsec.com/webirc (nginx-proxied). Self-contained:
	// native WebSocket + a small IRC message parser, no external client library.
	//
	// Flow: the user picks a nick + password (and, first time, registers it).
	// We connect, register or identify via NickServ, then auto-discover every
	// channel with LIST and JOIN them all. Passwords are NOT persisted — a
	// returning user re-enters theirs each session (deliberate: this is a
	// security community's own site; we don't stash IRC creds in localStorage).
	import Icon from '$lib/components/Icon.svelte';
	import { webchat, closeWebChat } from '$lib/stores/webchat.svelte.js';

	const WS_URL = 'wss://irc.burbsec.com/webirc';

	// UI state
	let phase = $state('form'); // 'form' | 'connecting' | 'chat' | 'error'
	let mode = $state('login'); // 'login' | 'register'
	let nick = $state('');
	let password = $state('');
	let email = $state('');
	let statusText = $state('');
	let errorText = $state('');

	// chat state
	let channels = $state([]); // [{ name, messages: [{from, text, kind}], unread }]
	let activeChannel = $state('');
	let draft = $state('');
	let ws = null;
	let discovered = []; // channels collected from LIST before we JOIN them
	let identified = false;

	const activeMessages = $derived(
		channels.find((c) => c.name === activeChannel)?.messages ?? []
	);

	let scrollPane; // bound to the message pane for autoscroll

	function reset() {
		try { ws?.close(); } catch { /* ignore */ }
		ws = null;
		phase = 'form';
		channels = [];
		activeChannel = '';
		discovered = [];
		identified = false;
		statusText = '';
		errorText = '';
		password = '';
	}

	function close() {
		reset();
		closeWebChat();
	}

	// ---- IRC helpers ---------------------------------------------------------

	function send(line) {
		if (ws && ws.readyState === WebSocket.OPEN) ws.send(line + '\r\n');
	}

	// Parse a single IRC line into { tags, prefix, command, params }
	function parse(line) {
		let rest = line;
		let tags = {};
		let prefix = '';
		if (rest.startsWith('@')) {
			const sp = rest.indexOf(' ');
			rest = rest.slice(sp + 1);
		}
		if (rest.startsWith(':')) {
			const sp = rest.indexOf(' ');
			prefix = rest.slice(1, sp);
			rest = rest.slice(sp + 1);
		}
		const params = [];
		while (rest.length) {
			if (rest.startsWith(':')) { params.push(rest.slice(1)); break; }
			const sp = rest.indexOf(' ');
			if (sp === -1) { params.push(rest); break; }
			params.push(rest.slice(0, sp));
			rest = rest.slice(sp + 1);
		}
		const command = params.shift() || '';
		return { tags, prefix, command, params };
	}

	function nickFromPrefix(prefix) {
		const bang = prefix.indexOf('!');
		return bang === -1 ? prefix : prefix.slice(0, bang);
	}

	// Strip mIRC/IRCv3 formatting control codes (color \x03, bold \x02, etc.)
	// so MOTD and messages render as clean text in the terminal.
	function stripFormatting(s) {
		return s
			.replace(/\x03\d{0,2}(,\d{1,2})?/g, '') // color
			.replace(/[\x00-\x08\x0a-\x1f]/g, ''); // other control chars (keep \x09 tab)
	}

	function ensureChannel(name) {
		if (!channels.find((c) => c.name === name)) {
			channels = [...channels, { name, messages: [], unread: 0 }];
		}
	}

	function pushMessage(chanName, from, text, kind = 'msg') {
		channels = channels.map((c) => {
			if (c.name !== chanName) return c;
			const unread = chanName === activeChannel ? 0 : c.unread + 1;
			return { ...c, messages: [...c.messages, { from, text, kind }], unread };
		});
		if (chanName === activeChannel) queueScroll();
	}

	function systemNote(text) {
		// Route system notes into the active channel, or a pseudo "*server*" one.
		const target = activeChannel || '*server*';
		ensureChannel(target);
		if (!activeChannel) activeChannel = target;
		pushMessage(target, '*', text, 'system');
	}

	function queueScroll() {
		requestAnimationFrame(() => {
			if (scrollPane) scrollPane.scrollTop = scrollPane.scrollHeight;
		});
	}

	// ---- Connection lifecycle ------------------------------------------------

	// UTF-8-safe base64, for the SASL PLAIN payload.
	function b64(str) {
		const bytes = new TextEncoder().encode(str);
		let bin = '';
		for (const b of bytes) bin += String.fromCharCode(b);
		return btoa(bin);
	}

	function start() {
		errorText = '';
		const n = nick.trim();
		if (!n || !password) {
			errorText = 'Nick and password are required.';
			return;
		}
		if (!/^[A-Za-z][A-Za-z0-9_\-\[\]{}\\`|]*$/.test(n)) {
			errorText = 'That nick has characters IRC won’t accept. Letters/numbers, starting with a letter, are safest.';
			return;
		}
		// IRC parameters are space-delimited, so a password (or the login) with a
		// space can't be transmitted — reject it up front rather than sending a
		// malformed command the server rejects as "invalid parameters".
		if (/\s/.test(password)) {
			errorText = 'Passwords can’t contain spaces.';
			return;
		}
		if (password.toLowerCase() === n.toLowerCase()) {
			errorText = 'Your password can’t be the same as your nick.';
			return;
		}
		phase = 'connecting';
		statusText = 'Connecting to irc.burbsec.com…';

		try {
			ws = new WebSocket(WS_URL, 'text.ircv3.net');
		} catch (e) {
			fail('Could not open a connection. Your browser or network may block WebSockets.');
			return;
		}

		ws.onopen = () => {
			statusText = 'Negotiating…';
			send('CAP LS 302');
			if (mode === 'login') {
				// Returning user: authenticate with SASL during the handshake, so the
				// nick is already owned by the time it's set (the server enforces
				// registered nicks strictly, so identifying afterward is too late).
				send('CAP REQ :sasl');
			}
			send('NICK ' + nick.trim());
			send('USER ' + nick.trim() + ' 0 * :BurbSec Web Client');
			if (mode === 'register') {
				// New user: the nick isn't reserved yet, so connect plainly and
				// register it via NickServ once we're on (which also logs us in).
				send('CAP END');
			}
		};

		ws.onmessage = (ev) => {
			const chunk = typeof ev.data === 'string' ? ev.data : '';
			for (const raw of chunk.split('\r\n')) {
				if (raw.length) handleLine(raw);
			}
		};

		ws.onclose = () => {
			if (phase === 'chat') systemNote('— disconnected —');
			else if (phase === 'connecting') fail('The connection closed before we finished logging in.');
		};

		ws.onerror = () => {
			if (phase === 'connecting') fail('Connection error reaching the chat server.');
		};
	}

	function fail(msg) {
		errorText = msg;
		phase = 'error';
		try { ws?.close(); } catch { /* ignore */ }
	}

	function handleLine(raw) {
		const msg = parse(raw);
		const cmd = msg.command.toUpperCase();

		if (cmd === 'PING') { send('PONG :' + (msg.params[0] ?? '')); return; }

		switch (cmd) {
			case 'CAP': { // capability negotiation; params: [target, subcmd, caps]
				const sub = (msg.params[1] || '').toUpperCase();
				const caps = msg.params[2] || '';
				if (sub === 'ACK' && caps.includes('sasl')) {
					send('AUTHENTICATE PLAIN'); // begin SASL PLAIN exchange
				} else if (sub === 'NAK' && mode === 'login') {
					fail('The server declined SASL, so this client can’t log you in.');
				}
				break;
			}

			case 'AUTHENTICATE': // server ready for the SASL PLAIN payload
				if (msg.params[0] === '+') {
					const n = nick.trim();
					send('AUTHENTICATE ' + b64(n + '\0' + n + '\0' + password));
				}
				break;

			case '903': // RPL_SASLSUCCESS — authenticated; finish CAP negotiation
				send('CAP END');
				break;

			case '902': // account locked
			case '904': // SASL auth failed (bad password)
			case '905': // SASL message too long
				fail('Login failed — wrong password, or that nick isn’t registered yet. If it’s new, use the Register tab.');
				break;

			case '001': // RPL_WELCOME — we're registered with the server
				if (mode === 'register') {
					statusText = 'Registering your nick…';
					// Password/nick are pre-validated to be space-free; email is a
					// single token if present.
					const emailArg = email.trim() ? ' ' + email.trim() : '';
					send('PRIVMSG NickServ :REGISTER ' + password + emailArg);
				} else {
					// SASL already logged us in before 001; we're identified.
					onIdentified();
				}
				break;

			case 'NOTICE': {
				const from = nickFromPrefix(msg.prefix).toLowerCase();
				const body = (msg.params[1] ?? '');
				if (from === 'nickserv') handleNickServ(body);
				break;
			}

			case '375': // RPL_MOTDSTART
			case '372': // RPL_MOTD — one line
			case '376': // RPL_ENDOFMOTD
			case '422': { // ERR_NOMOTD
				// Render the server MOTD into the *server* pane (it arrives right
				// after 001, before we've finished the auth handshake).
				ensureChannel('*server*');
				const text = stripFormatting(msg.params[msg.params.length - 1] ?? '');
				pushMessage('*server*', '*', text, 'motd');
				break;
			}

			case '322': { // RPL_LIST — one channel
				const chan = msg.params[1];
				if (chan) discovered.push(chan);
				break;
			}

			case '323': // RPL_LISTEND — LIST finished, now join everything
				joinDiscovered();
				break;

			case 'JOIN': {
				const who = nickFromPrefix(msg.prefix);
				const chan = msg.params[0];
				if (who === nick.trim()) {
					ensureChannel(chan);
					if (!activeChannel || activeChannel === '*server*') activeChannel = chan;
				}
				break;
			}

			case 'PRIVMSG': {
				const target = msg.params[0];
				const text = msg.params[1] ?? '';
				const from = nickFromPrefix(msg.prefix);
				if (target.startsWith('#')) {
					ensureChannel(target);
					pushMessage(target, from, text, 'msg');
				}
				break;
			}

			case 'TOPIC':
			case '332': { // RPL_TOPIC
				const chan = msg.params[msg.params.length - 2] ?? msg.params[0];
				const topic = msg.params[msg.params.length - 1] ?? '';
				ensureChannel(chan);
				pushMessage(chan, '*', 'Topic: ' + topic, 'system');
				break;
			}

			case '431': case '432': case '433': // no/erroneous/in-use nick
				if (mode === 'register') {
					fail('That nick is taken or already registered. Switch to "Log in" if it’s yours, or pick another.');
				} else {
					fail('That nick is unavailable or invalid. Try another.');
				}
				break;

			case '464': // password mismatch at the server layer
				fail('The server rejected the connection credentials.');
				break;

			case 'ERROR':
				if (phase === 'connecting') fail('Server error: ' + (msg.params[0] ?? 'connection refused'));
				break;
		}
	}

	function handleNickServ(body) {
		const b = body.toLowerCase();
		if (mode === 'register') {
			if (b.includes('registered') || b.includes('now logged in') || b.includes('now identified')) {
				onIdentified();
			} else if (b.includes('already') || b.includes('taken') || b.includes('in use')) {
				fail('That nick is already registered. Switch to "Log in" and use its password.');
			} else if (b.includes('invalid') || b.includes('must') || b.includes('error')) {
				fail('Registration failed: ' + body);
			}
		} else {
			if (b.includes('now logged in') || b.includes('now identified') || b.includes('already identified')) {
				onIdentified();
			} else if (b.includes('invalid') || b.includes('incorrect') || b.includes('failed') || b.includes('not registered')) {
				fail('Login failed: ' + body + (b.includes('not registered') ? ' — try "Register" instead.' : ''));
			}
		}
	}

	function onIdentified() {
		if (identified) return;
		identified = true;
		phase = 'chat';
		statusText = '';
		ensureChannel('*server*');
		activeChannel = '*server*';
		systemNote('Connected as ' + nick.trim() + '. Finding channels…');
		// Discover every channel, then join them all.
		discovered = [];
		send('LIST');
	}

	function joinDiscovered() {
		if (!discovered.length) { systemNote('No channels found to join.'); return; }
		systemNote('Joining ' + discovered.length + ' channels…');
		// JOIN in comma-separated batches to stay under the 512-byte line limit.
		let batch = [];
		let len = 0;
		const flush = () => {
			if (batch.length) { send('JOIN ' + batch.join(',')); batch = []; len = 0; }
		};
		for (const ch of discovered) {
			if (len + ch.length + 1 > 400) flush();
			batch.push(ch);
			len += ch.length + 1;
		}
		flush();
	}

	function selectChannel(name) {
		activeChannel = name;
		channels = channels.map((c) => (c.name === name ? { ...c, unread: 0 } : c));
		queueScroll();
	}

	function submitDraft(e) {
		e?.preventDefault();
		const text = draft.trim();
		if (!text || !activeChannel || activeChannel === '*server*') { draft = ''; return; }
		send('PRIVMSG ' + activeChannel + ' :' + text);
		pushMessage(activeChannel, nick.trim(), text, 'self');
		draft = '';
	}

	// Close the socket if the whole modal is torn down.
	$effect(() => {
		if (!webchat.open) { try { ws?.close(); } catch { /* ignore */ } }
	});
</script>

{#if webchat.open}
	<div class="webchat-overlay" role="dialog" aria-modal="true" aria-label="BurbSec Web Chat">
		<div class="webchat-window">
			<header class="webchat-header">
				<span class="webchat-title"><Icon name="comments" /> BurbSec Web Chat</span>
				<button class="webchat-x" onclick={close} aria-label="Close chat">&times;</button>
			</header>

			{#if phase === 'form'}
				<div class="webchat-body webchat-form">
					<div class="webchat-tabs">
						<button class:active={mode === 'login'} onclick={() => (mode = 'login')}>Log in</button>
						<button class:active={mode === 'register'} onclick={() => (mode = 'register')}>Register</button>
					</div>
					<p class="webchat-hint">
						{#if mode === 'register'}
							First time here? Pick a nick and password to register it on the network.
						{:else}
							Already registered your nick? Log in with its password.
						{/if}
					</p>
					<label>Nick
						<input type="text" bind:value={nick} autocomplete="username" placeholder="your_nick" maxlength="30" />
					</label>
					<label>Password
						<input type="password" bind:value={password} autocomplete={mode === 'register' ? 'new-password' : 'current-password'} placeholder="password" />
					</label>
					{#if mode === 'register'}
						<label>Email <span class="webchat-optional">(optional)</span>
							<input type="email" bind:value={email} autocomplete="email" placeholder="you@example.com" />
						</label>
					{/if}
					{#if errorText}<p class="webchat-error">{errorText}</p>{/if}
					<button class="webchat-go" onclick={start}>
						{mode === 'register' ? 'Register & Join' : 'Connect'}
					</button>
					<p class="webchat-fineprint">
						Your password is used only to {mode === 'register' ? 'register' : 'identify'} on IRC this session and is never stored in your browser.
					</p>
				</div>

			{:else if phase === 'connecting'}
				<div class="webchat-body webchat-center">
					<div class="webchat-spinner" aria-hidden="true"></div>
					<p>{statusText}</p>
				</div>

			{:else if phase === 'error'}
				<div class="webchat-body webchat-center">
					<p class="webchat-error">{errorText}</p>
					<button class="webchat-go" onclick={reset}>Back</button>
				</div>

			{:else if phase === 'chat'}
				<div class="webchat-chat">
					<aside class="webchat-channels">
						{#each channels as c (c.name)}
							<button
								class="webchat-chan"
								class:active={c.name === activeChannel}
								onclick={() => selectChannel(c.name)}
							>
								<span class="webchat-chan-name">{c.name === '*server*' ? 'server' : c.name}</span>
								{#if c.unread > 0}<span class="webchat-badge">{c.unread}</span>{/if}
							</button>
						{/each}
					</aside>
					<section class="webchat-main">
						<div class="webchat-messages" bind:this={scrollPane}>
							{#each activeMessages as m}
								<div class="webchat-line webchat-{m.kind}">
									{#if m.kind === 'motd'}
										<pre class="webchat-motd-line">{m.text}</pre>
									{:else if m.kind === 'system'}
										<em>{m.text}</em>
									{:else}
										<span class="webchat-from">{m.from}:</span> <span class="webchat-text">{m.text}</span>
									{/if}
								</div>
							{/each}
						</div>
						<form class="webchat-input" onsubmit={submitDraft}>
							<input
								type="text"
								bind:value={draft}
								placeholder={activeChannel === '*server*' ? 'Select a channel to chat' : 'Message ' + activeChannel}
								disabled={activeChannel === '*server*'}
							/>
							<button type="submit" disabled={activeChannel === '*server*'} aria-label="Send">Send</button>
						</form>
					</section>
				</div>
			{/if}
		</div>
	</div>
{/if}
