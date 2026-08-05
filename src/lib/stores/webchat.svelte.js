// Shared reactive state controlling the in-browser IRC client (WebChat.svelte).
// Rendered once in the root layout; the navbar Chat menu and the homepage
// modal both flip `webchat.open` to launch it.
export const webchat = $state({ open: false });

export function openWebChat() {
	webchat.open = true;
}

export function closeWebChat() {
	webchat.open = false;
}
