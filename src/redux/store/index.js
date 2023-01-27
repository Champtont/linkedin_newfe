import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducer/userReducer";
import experienceReducer from "../reducer/experienceReducer";
import postsReducer from "../reducer/postsReducer";
import localStorage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

const mainReducer = combineReducers({
  user: userReducer,
  experience: experienceReducer,
  posts: postsReducer,
});

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const peristedReducer = persistReducer(persistConfig, mainReducer);

export const store = configureStore({ reducer: peristedReducer });

export const persistor = persistStore(store);
