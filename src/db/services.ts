import { openDatabase } from ".";
import { Link } from "./model";

async function addLink(link: Link): Promise<number> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("links", "readwrite");
    const store = transaction.objectStore("links");
    const request = store.add(link);
    transaction.oncomplete = () => resolve(request.result as number);
    transaction.onerror = () => reject(request.error);
  });
}

async function getLinks(): Promise<Link[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("links", "readonly");
    const store = transaction.objectStore("links");
    const request = store.getAll();
    transaction.oncomplete = () => resolve(request.result as Link[]);
    transaction.onerror = () => reject(request.error);
  });
}

export { addLink, getLinks };
