import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import counterSlice from "./counter";
import userSlice from "./user";

// 配置持久化
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"] // 只持久化 user reducer
};

// 合并所有 reducer
const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  user: userSlice.reducer
});

// 创建持久化 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略 redux-persist 的 action
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      }
    })
});

// 创建持久化 store
export const persistor = persistStore(store);

// Export RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export{
    counterSlice,
    userSlice
}
export default store;