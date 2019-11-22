import {request} from './request'
export function get_roles_list(){
  return request({
    url:'/api/roles',
    method:'get'
  })
}
export function get_auth_list(){
  return request({
    url:'/api/authorities',
    method:'get'
  })
}