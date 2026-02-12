import request from '@/utils/request.js'

export function queryAllApi(){
  return request.get("/depts");
}
export function addApi(dept){
  return request.post("/depts",dept);
}

export function queryById(id){
  return request.get(`/depts/${id}`)
}

export function updateApi(dept){
  return request.put("/depts",dept);
}

export function deleteApi(id){
  return request.delete(`/depts?id=${id}`);
}