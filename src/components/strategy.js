import { LitElement, css, html } from "lit";
import "./timeLine";

export class PromiseStrategy extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      description: { type: String },
    };
  }

  constructor() {
    super();
    this.timeLine1 = {};
    this.timeLine2 = {};
    this.timeLine3 = {};
    this.promiseResult = "";
  }

  stopAll() {
    this.timeLine1.stop = true;
    this.timeLine2.stop = true;
    this.timeLine3.stop = true;
    this.requestUpdate();
  }

  promise1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Reject after 1s");
        this.timeLine1 = {
          result: "fail",
          stop: true,
        };
        this.requestUpdate();
      }, 1000);
    });
  }

  promise2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Resolve after 2s");
        this.timeLine2 = {
          result: "success",
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
      <article class="">
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
        <u>Result:</u>
        <p class="result">${this.promiseResult}</p>
      </article>
      <article>
        <h3>Promise ${this.type}</h3>
        <p>${this.description.trim()}</p>
      </article>
    `;
  }

  static get styles() {
    return css`
      :host {
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        gap: 3rem;
        flex-wrap: wrap;
      }
      h3 {
        margin-top: 0;
      }
      p {
        max-width: 450px;
      }
      article.fail {
        border: 1px solid red;
      }
      article.success {
        border: 1px solid green;
      }
      p.result {
        max-width: 300px
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
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
        this.stopAll();
      })
      .catch((reason) => {
        this.promiseResult = reason;
        this.stopAll();
      });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

window.customElements.define("promise-strategy", PromiseStrategy);
