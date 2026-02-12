import request from '@/utils/request.js'

export function queryPageApi(name,gender,begin,end,page,pageSize){
    return request.get(`/emps?name=${name}&gender=${gender}&begin=${begin}&end=${end}&page=${page}&pageSize=${pageSize}`)
}