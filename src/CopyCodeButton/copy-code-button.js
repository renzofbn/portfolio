import { LitElement, html, css } from 'lit';

export const copyIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

export const checkIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`

export class CopyCodeButton extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-flex;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        margin: 0;
        padding: 0.5rem;
        background: #121313;
        border: none;
        border-radius: 0.25rem;
        color: #fff;
        cursor: pointer;
        font-weight: 600;
      }
      button:hover {
        background: #1a1b1c;
      }
    `
  ];

  constructor() {
    super();
    this._isCopied = false;
  }

  static get properties(){
    return {
      _isCopied: { type: Boolean }
    }
  }

  copyCode() {
    this._isCopied = true;
    const pre = this.parentElement;
    let code = pre.querySelector('code');
    const range = document.createRange();
    range.selectNode(code);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    // check if the browser supports clipboard API
    if (!navigator.clipboard) {
      // if not use the old commandExec() way
      document.execCommand('copy');
    } else {
      try {
        navigator.clipboard.writeText(range.toString());
      } catch (error) {
        console.error(error);
      }
    }
    window.getSelection().removeAllRanges();
    setTimeout(() => {
      this._isCopied = false;
    }, 1000);
  }
  render() {
    return html`
    <button @click=${this.copyCode}>${this._isCopied ? checkIcon : copyIcon}</button>
    `;
  }
}
customElements.define('copy-code-button', CopyCodeButton);

