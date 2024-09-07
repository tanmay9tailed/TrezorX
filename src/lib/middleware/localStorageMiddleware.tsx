import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { addFromLocalStorage } from "../features/slice/slice";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  // console.log("action", action);
  const result = next(action); 
  const state: RootState = store.getState();

  const localStorageLoaded = !!sessionStorage.getItem("localStorageLoaded");

  if (!localStorageLoaded) {
    const local = localStorage.getItem("accounts");

    if (local) {
      const localObj = JSON.parse(local);
      
      if (state.accounts.default_account === -1 && localObj?.default_account !== -1) {
        console.log("setting session storage ");
        sessionStorage.setItem("localStorageLoaded", "true"); // Mark as loaded
        console.log("session storage :", sessionStorage.getItem("localStorageLoaded"));
        store.dispatch(addFromLocalStorage(localObj));
      }
    }
  }

  localStorage.setItem("accounts", JSON.stringify(state.accounts));
  
  return result;
};

export default localStorageMiddleware;
