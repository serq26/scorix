import { BetsCartListType } from "../types/betsCartType";

function openDB(dbName: string, storeName: string, keyPath: string | null = null) {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        if (keyPath) {
          db.createObjectStore(storeName, { keyPath });
        } else {
          db.createObjectStore(storeName, { autoIncrement: true });
        }
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function addBetToDB(bet: BetsCartListType) {
  const db = await openDB("BetsCartDB", "bets", "match.id");
  const tx = db.transaction("bets", "readwrite");
  const store = tx.objectStore("bets");
  store.put(bet);
  return tx.oncomplete;
}

export async function removeBetFromDB(matchId: number) {
  const db = await openDB("BetsCartDB", "bets", "match.id");
  const tx = db.transaction("bets", "readwrite");
  const store = tx.objectStore("bets");
  store.delete(matchId);
  return tx.oncomplete;
}

export async function clearBetsFromDB() {
  const db = await openDB("BetsCartDB", "bets", "match.id");
  const tx = db.transaction("bets", "readwrite");
  const store = tx.objectStore("bets");
  store.clear();
  return tx.oncomplete;
}

export async function getAllBetsFromDB(): Promise<BetsCartListType[]> {
  const db = await openDB("BetsCartDB", "bets", "match.id");
  const tx = db.transaction("bets", "readonly");
  const store = tx.objectStore("bets");
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function saveCouponToDB(coupon: BetsCartListType[]) {
  const db = await openDB("SavedCoupons", "coupons", "id");
  const tx = db.transaction("coupons", "readwrite");
  const store = tx.objectStore("coupons");
  const response = store.put({ id: Date.now(), coupon });
  if(response) {
    return true;
  } else {
    return false;
  }
  // return tx.oncomplete;
}

export async function playCoupon(coupon: BetsCartListType[], maxEarning: number) {
  const db = await openDB("PlayedCoupons", "coupons", "id");
  const tx = db.transaction("coupons", "readwrite");
  const store = tx.objectStore("coupons");
  const response = store.put({ id: Date.now(), coupon, maxEarning });
  if(response) {
    return true;
  } else {
    return false;
  }
}