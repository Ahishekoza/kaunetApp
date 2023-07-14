import { HTTP } from "./baseInstance";

export const commonApi=(resource,method,body)=>{
    console.log(resource,method,body)
    return HTTP.post('apigw',{resource:resource,method:method,body:body})
}

export const checkApi=(body)=>{
    console.log(body)
    return HTTP.post('apigw/test',{body:body})
}


export const updateApi=(body)=>{
    console.log(body)
    return HTTP.post('apigw/update',{body:body})
}

export const deleteApi=(body)=>{
    console.log(body)
    return HTTP.post('apigw/update',{body:body})

}

export const authApi = async(body)=>{
    console.log(body)
    return HTTP.post('apigw/auth',{body:body})
}