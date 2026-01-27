import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        name:"",
        age:0,
        userInfo: null,
        menuList: []
    },
    reducers:{
        setName:(state, action)=>{
            state.name = action.payload;
        },
        setAge:(state, action)=>{
            state.age = action.payload;
        },
        setUserInfo:(state, action)=>{
            state.userInfo = action.payload.userInfo;
            state.menuList = action.payload.menuList;
        },
        clearUserInfo:(state)=>{
            state.userInfo = null;
            state.menuList = [];
        }
    },
})
export const { setName, setAge, setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice;