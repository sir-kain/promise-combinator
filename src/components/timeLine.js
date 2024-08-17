import { LitElement, css, html } from "lit";

export class TimeLine extends LitElement {
  static get properties() {
    return {
      width: { type: String },
      stop: { type: Boolean },
      result: { type: String },
    };
  }

  constructor() {
    super();
    this.width = "0";
  }

  move() {
    let progress = 1;
    this.id = setInterval(() => {
      if (progress >= 100 || this.stop) {
        clearInterval(this.id);
      } else {
        progress++;
        this.width = `${progress}`;
        this.requestUpdate();
      }
    }, 30);
  }

  render() {
    return html`
      <progress
        value="${this.width}"
        max="100"
        class="${this.result}"
      ></progress>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href =
      "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css";
    this.shadowRoot.appendChild(linkElement);

    this.move();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.id);
  }

  static get styles() {
    return css`
      progress {
        display: block;
        color: #C59A00;
        width: 200px;
        margin-bottom: 1rem;
      }
      progress::-webkit-progress-value {
        background-color: #C59A00 !important;
      }
      progress::-moz-progress-bar {
        background-color: #C59A00 !important;
      }

      progress.fail {
        color: #E42855;
      }
      progress.fail::-webkit-progress-value {
        background-color: #E42855 !important;
      }
      progress.fail::-moz-progress-bar {
        background-color: #E42855 !important;
      }

      progress.success {
        color: #00A261;
      }
      progress.success::-webkit-progress-value {
        background-color: #00A261 !important;
      }
      progress.success::-moz-progress-bar {
        background-color: #00A261 !important;
      }
    `;
  }
}

window.customElements.define("time-line", TimeLine);
