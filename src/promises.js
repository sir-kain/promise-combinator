// const promise1 = () => {
//   return new Promise((resolve, reject) => {
//     reject("reject P1");
//   });
// };
// const promise2 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("resolve P2 after 1s");
//     }, 1000);
//   });
// };
// const promise3 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("resolve P3 after 2s");
//     }, 2000);
//   });
// };

import { Observable } from "rxjs";

// module.exports = {
//   promise1,
//   promise2,
//   promise3,
// };

export function promise1() {
  return new Promise((resolve, reject) => {
    const observable = new Observable((observer) => {
      setTimeout(() => {
        reject("reject P1 after 1s");
        observer.next("reject P1 after 1s");
      }, 1000);
    });
    observable.subscribe((event) => {
      console.log("event ==>", event);
    });
  });
}
export function promise2() {
  return new Promise((resolve, reject) => {
    const observable = new Observable((observer) => {
      setTimeout(() => {
        resolve("resolve P2 after 2s");
        observer.next("resolve P2 after 2s");
      }, 2000);
    });
    observable.subscribe((event) => {
      console.log("event ==>", event);
    });
  });
}
export function promise3() {
  return new Promise((resolve, reject) => {
    const observable = new Observable((observer) => {
      setTimeout(() => {
        resolve("resolve P3 after 3s");
        observer.next("resolve P3 after 3s");
      }, 3000);
    });
    observable.subscribe((event) => {
      console.log("event ==>", event);
    });
  });
}
