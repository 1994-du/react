import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter";
import userSlice from "./user";
const store = configureStore({
    reducer:{
        counter: counterSlice.reducer,
        user: userSlice.reducer
    },
});
export{
    counterSlice,
    userSlice
}
export default store;