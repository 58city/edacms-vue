import {request} from './request'
export function signIn(data){
  return request({
    url:'/api/account/sign-in',
    method:'put',
    data:data
  })
}
export function signOut(){
  return request({
    url:'/api/account/sign-out',
    method:'put'
  })
}
export function getCurrentUserInfo(){
  return request({
    url:'/api/account',
    method:'get'
  })
}
