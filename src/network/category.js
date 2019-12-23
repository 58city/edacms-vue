import {request} from './request'
export function get_categories(){
  return request({
    url:'/api/categories',
    method:'get'
  })
}