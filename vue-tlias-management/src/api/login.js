import request from '@/utils/request.js'


export function loginApi(data){
    return request.post("/login",data);
}