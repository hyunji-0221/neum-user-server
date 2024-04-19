import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import countReducer from "@/app/components/counter/service/counter.slice";
import articleReducer from "@/app/components/articles/service/article-slice";
import userReducer from "@/app/components/users/service/user-slice";
import boardReducer from "@/app/components/boards/service/board-slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const countPersistConfig = { //의 이름 count
  key: "count",
  storage,
  whitelist: ["countState"],
};
const articlePersistConfig = { //의 이름 article
  key: "article",
  storage,
  whitelist: ["articleState"],
};
const userPersistConfig = {
  key : "user",
  storage,
  whitelist: ["userState"],
};
const boardPersistConfig = {
  key : "board",
  storage,
  whitelist: ["boardState"],
};


const persistedCountReducer = persistReducer(countPersistConfig, countReducer);
const persistedArticleReducer = persistReducer(articlePersistConfig, articleReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedBoardReducer = persistReducer(boardPersistConfig, boardReducer);

export const rootReducer = combineReducers({
  // Slice를 합치고 있음.(combineReducers)
  count: persistedCountReducer,
  article: persistedArticleReducer, //-> 이름으로
  user: persistedUserReducer,
  board: persistedBoardReducer
}); //json 구조가 합쳐져 외부에서 key로 value를 찾음.
