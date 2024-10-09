export function pluralize(name, count) {
  // Ensure count is a number
  count = Number(count);

  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 1);
    let db, tx, store;

    // This event is only implemented in recent browsers
    request.onupgradeneeded = function (e) {
      db = request.result; // Use the outer 'db' variable
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onerror = function (e) {
      console.log('There was an error opening the database', e);
      reject(e);
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log('Database error', e);
        reject(e);
      };

      tx.onerror = function (e) {
        console.log('Transaction error', e);
        reject(e);
      };

      switch (method) {
        case 'put': {
          const putRequest = store.put(object);
          putRequest.onsuccess = function () {
            resolve(object);
          };
          putRequest.onerror = function (e) {
            console.log('Put error', e);
            reject(e);
          };
          break;
        }
        case 'get': {
          const getRequest = store.getAll();
          getRequest.onsuccess = function () {
            resolve(getRequest.result);
          };
          getRequest.onerror = function (e) {
            console.log('Get error', e);
            reject(e);
          };
          break;
        }
        case 'delete': {
          const deleteRequest = store.delete(object._id);
          deleteRequest.onsuccess = function () {
            resolve();
          };
          deleteRequest.onerror = function (e) {
            console.log('Delete error', e);
            reject(e);
          };
          break;
        }
        default:
          console.log('No valid method');
          reject(new Error('No valid method'));
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
