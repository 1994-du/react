import request from "./request";
export const toLogin = (data: { username: string; password: string }) => {
    return request({
        url: "/api/auth/login",
        method: "post",
        data
    })
}
export const toRegistry = (data: { username: string; password: string }) => {
    return request({
        url: "/api/auth/register",
        method: "post",
        data
    })
}