export function wrap(fn) {
  return async (floorWorkerParameters, callback) => {
    try {
      await fn(floorWorkerParameters);
      callback();
    } catch (error) {
      callback(error);
    }
  };
}
