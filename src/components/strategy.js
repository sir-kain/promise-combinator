import { LitElement, css, html } from "lit";
import "./timeLine";

export class PromiseStrategy extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      description: { type: String },
      img: { type: String },
    };
  }

  constructor() {
    super();
    this.timeLine1 = {};
    this.timeLine2 = {};
    this.timeLine3 = {};
    this.promiseResult = "";
    this.result = "";
  }

  stopAll(result) {
    this.timeLine1.stop = true;
    this.timeLine2.stop = true;
    this.timeLine3.stop = true;
    this.result = result;
    this.requestUpdate();
  }

  promise1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Resolved after 1s");
        this.timeLine1 = {
          result: "success",
          stop: true,
        };
        this.requestUpdate();
      }, 1000);
    });
  }

  promise2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Rejected after 2s");
        this.timeLine2 = {
          result: "fail",
          stop: true,
        };
        this.requestUpdate();
      }, 2000);
    });
  }

  promise3() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Resolve after 3s");
        this.timeLine3 = {
          result: "success",
          stop: true,
        };
        this.requestUpdate();
      }, 3000);
    });
  }

  render() {
    return html`
      <article class="${this.result}">
        <header>
          <h4>Promise.${this.type}([])</h4>
        </header>
        <time-line
          result="${this.timeLine1.result}"
          ?stop=${this.timeLine1.stop}
        ></time-line>
        <time-line
          result="${this.timeLine2.result}"
          ?stop=${this.timeLine2.stop}
        ></time-line>
        <time-line
          result="${this.timeLine3.result}"
          ?stop=${this.timeLine3.stop}
        ></time-line>
        <footer>
          <u>Result:</u>
          <p>${this.promiseResult}</p>
        </footer>
      </article>
    `;
  }

  static get styles() {
    return css`
      :host {
        /* height: 500px; */
        width: 320px;
      }
      article.fail {
        border: 1px solid #E42855;
      }
      article.success {
        border: 1px solid #00A261;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href =
      "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css";
    this.shadowRoot.appendChild(linkElement);

    const promises = [this.promise1(), this.promise2(), this.promise3()];
    const promiseMethods = {
      all: Promise.all(promises),
      race: Promise.race(promises),
      any: Promise.any(promises),
      allSettled: Promise.allSettled(promises),
    };
    const promise = promiseMethods[this.type];
    promise
      .then((result) => {
        if (typeof result === "object") {
          this.promiseResult = JSON.stringify(result);
        } else {
          this.promiseResult = result;
        }
        this.stopAll("success");
      })
      .catch((reason) => {
        this.promiseResult = reason;
        this.stopAll("fail");
      });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

window.customElements.define("promise-strategy", PromiseStrategy);
