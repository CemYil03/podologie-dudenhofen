import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// `@testing-library/react` mounts every render into `document.body`. Without
// an explicit unmount the DOM accumulates across tests in the same file and
// queries return stale matches. `cleanup()` unmounts everything React
// rendered during the test and restores `document.body` to a blank slate.
afterEach(() => {
    cleanup();
});

// jsdom does not implement ResizeObserver; cmdk (the search-dialog primitive)
// constructs one on mount. The shim is intentionally inert — the search tests
// don't rely on resize callbacks firing.
if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    } as unknown as typeof ResizeObserver;
}

// Radix Dialog calls these during open. jsdom doesn't implement them.
if (typeof Element.prototype.hasPointerCapture === 'undefined') {
    Element.prototype.hasPointerCapture = () => false;
}
if (typeof Element.prototype.scrollIntoView === 'undefined') {
    Element.prototype.scrollIntoView = () => {};
}
