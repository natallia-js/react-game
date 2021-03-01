const LOCAL_STORAGE_NAME = 'My_RSP_Game';


export function saveInLocalStorage(obj) {
  if (!obj) {
    return;
  }
  const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({
    ...localStorageData,
    ...obj,
  }));
}


export function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
}
