import { createSlice, configureStore } from "@reduxjs/toolkit";
const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1,
    }
});
const userSlice = createSlice({
    name:"user",
    initialState:{
        name:"",
        age:0,
    },
    reducers:{
        setName:(state, action)=>{
            state.name = action.payload;
        },
        setAge:(state, action)=>{
            state.age = action.payload;
        }
    },
})
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