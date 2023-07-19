import { HTTP } from "./baseInstance";

// ---- lambda 0000
export const commonApi=(resource,method,body)=>{
    console.log(resource,method,body)
    return HTTP.post('apigw',{resource:resource,method:method,body:body})
}

// ---- lambda 0138
export const checkApi=(body)=>{
    console.log(body)
    return HTTP.post('apigw/test',{body:body})
}
 
// --- lambda 0142
export const updateApi=(body)=>{
    console.log(body)
    return HTTP.post('apigw/update',{body:body})
}

// --- lambda 0142
export const deleteApi=(body)=>{
    console.log(body)
    return HTTP.post('apigw/update',{body:body})

}

// --- lambda 0146
export const authApi = async(body)=>{
    console.log(body)
    return HTTP.post('apigw/auth',{body:body})
}