import request from './request'
import type { queryUserListParams } from '@/types/systemManagement'
export const queryUserList = (params:queryUserListParams)=>{
    return request.get("/api/users/all",{params})
}
export const deleteUser = (id:number)=>{
    return request.post(`/api/users/deleteUser`,{id})
}