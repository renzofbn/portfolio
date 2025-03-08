export class CopyCodeButton extends HTMLElement {
  constructor() {
    super();
    this._isCopied = false;
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => this.copyCode());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('button').removeEventListener('click', () => this.copyCode());
  }

  copyCode() {
    this._isCopied = true;
    const pre = this.parentElement;
    let code = pre.querySelector('code');
    const range = document.createRange();
    range.selectNode(code);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    if (!navigator.clipboard) {
      document.execCommand('copy');
    } else {
      try {
        navigator.clipboard.writeText(range.toString());
      } catch (error) {
        console.error(error);
      }
    }
    window.getSelection().removeAllRanges();

    this.updateButton();
    setTimeout(() => {
      this._isCopied = false;
      this.updateButton();
    }, 1000);
  }

  updateButton() {
    this.shadowRoot.querySelector('button').innerHTML = this._isCopied ? this.checkIcon() : this.copyIcon();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
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
      </style>
      <button>${this.copyIcon()}</button>
    `;
  }

  copyIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
  }

  checkIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;
  }
}

customElements.define('copy-code-button', CopyCodeButton);
