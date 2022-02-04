import { updateDuration, sortDuration, firstUpdateBuffer } from "./consts";

const _worker: Worker = self as any;

setTimeout(function () {
  _worker.postMessage({ type: "eventForFirstUpdate" });
}, firstUpdateBuffer);

const intervalForSort = setInterval(() => {
  _worker.postMessage({ type: "intervalForSort" });
}, sortDuration);

const intervalForUpdate = setInterval(() => {
  _worker.postMessage({ type: "intervalForUpdate" });
}, updateDuration);

_worker.onmessage = async (event: MessageEvent) => {
  if (event.data === "done") {
    clearInterval(intervalForUpdate);
    clearInterval(intervalForSort);
  }
};
