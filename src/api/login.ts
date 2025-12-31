import request from "./request";
export const toLogin = (data: { username: string; password: string }) => {
    return request({
        url: "/api/auth/login",
        method: "post",
        data
    })
}