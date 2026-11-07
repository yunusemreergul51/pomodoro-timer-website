/**
 * Web Worker for drift-free background timer ticking
 */
export const workerScript = `
let timerId = null;

self.onmessage = function (e) {
  const { action, interval = 1000 } = e.data;

  if (action === 'start') {
    if (timerId !== null) clearInterval(timerId);
    timerId = setInterval(() => {
      self.postMessage({ type: 'tick' });
    }, interval);
  } else if (action === 'stop') {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }
};
`;

export function createTimerWorker(): Worker {
  const blob = new Blob([workerScript], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
}
