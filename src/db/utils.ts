/**
 * Handles the success and error events of an IDBRequest.
 * @param request The request to handle
 * @param resolve The resolve function of the promise
 * @param reject The reject function of the promise
 * @template T The type of the result of the request
 * @returns void
 */
export function handleTransaction<T>(
  request: IDBRequest,
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: Error) => void
) {
  request.onsuccess = () => resolve(request.result as T);
  request.onerror = () =>
    reject(new Error(request.error?.message || "Transaction failed"));
}
