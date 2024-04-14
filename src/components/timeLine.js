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
    this.width = "0%";
  }

  move() {
    let progress = 1;
    this.id = setInterval(() => {
      if (progress >= 100 || this.stop) {
        clearInterval(this.id);
      } else {
        progress++;
        this.width = progress + "%";
        this.requestUpdate();
      }
    }, 30);
  }

  render() {
    return html`
      <style>
        .progress-indicator {
          width: ${this.width};
        }
      </style>
      <div class="progress-bar">
        <div class="progress-indicator ${this.result}"></div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.move();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.id);
  }

  static get styles() {
    return css`
      .progress-bar {
        width: 300px;
        background-color: black;
        margin-bottom: 1rem;
      }

      .progress-indicator {
        height: 10px;
        background-color: yellow;
      }
      .progress-indicator.fail {
        background-color: red;
      }
      .progress-indicator.success {
        background-color: green;
      }
    `;
  }
}

window.customElements.define("time-line", TimeLine);
