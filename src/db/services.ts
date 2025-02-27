import { openDatabase } from ".";
import { Link } from "./model";
import { handleTransaction } from "./utils";

/**
 * Add a link to the database
 * @param link The link to be added
 * @returns The ID of the added link or a string if the URL already exists
 */
async function addLink(link: Link): Promise<number | string> {
  const urlExists = await checkItemExistsFromIndex("url", link.url);

  if (urlExists) return "URL already exists";

  const db = await openDatabase();
  const transaction = db.transaction("links", "readwrite");
  const store = transaction.objectStore("links");

  return new Promise((resolve, reject) => {
    const request = store.add(link);
    handleTransaction<number>(request, resolve, reject);
  });
}

/**
 * Get all links from the database
 * @returns A list of links
 */
async function getLinks(): Promise<Link[]> {
  const db = await openDatabase();
  const transaction = db.transaction("links", "readonly");
  const store = transaction.objectStore("links");

  return new Promise((resolve, reject) => {
    const index = store.index("updatedAt");
    const cursorRequest = index.openCursor(null, "prev");

    const results: Link[] = [];

    cursorRequest.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };

    cursorRequest.onerror = () =>
      reject(
        new Error(cursorRequest.error?.message || "Cursor request failed")
      );
  });
}

/**
 * Update a link in the database
 * @param link The link to be updated
 * @returns The ID of the updated link
 */
async function updateLink(link: Link): Promise<number> {
  const db = await openDatabase();
  const transaction = db.transaction("links", "readwrite");
  const store = transaction.objectStore("links");

  return new Promise((resolve, reject) => {
    const request = store.put(link);
    handleTransaction<number>(request, resolve, reject);
  });
}

/**
 * Delete a link from the database
 * @param id The ID of the link to be deleted
 * @returns Undefined upon successful deletion.
 */
async function deleteLink(id: string): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction("links", "readwrite");
  const store = transaction.objectStore("links");

  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    handleTransaction<void>(request, resolve, reject);
  });
}

/**
 * Check if an item exists in the database from an index
 * @param itemIndex The index to check
 * @param item The item to check
 * @returns A boolean indicating if the item exists
 */
async function checkItemExistsFromIndex(
  itemIndex: string,
  item: string
): Promise<boolean> {
  const db = await openDatabase();
  const transaction = db.transaction("links", "readonly");
  const store = transaction.objectStore("links");

  return new Promise((resolve, reject) => {
    const itemCountRequest = store.count();
    itemCountRequest.onsuccess = () => {
      if (itemCountRequest.result === 0) {
        resolve(false);
      } else {
        const index = store.index(itemIndex);

        const request = index.get(item);
        request.onsuccess = () => resolve(request.result !== undefined);
        request.onerror = () =>
          reject(new Error(request.error?.message || "Index lookup failed"));
      }
    };
    itemCountRequest.onerror = () =>
      reject(
        new Error(itemCountRequest.error?.message || "Count request failed")
      );
  });
}

export { addLink, getLinks, updateLink, deleteLink };
