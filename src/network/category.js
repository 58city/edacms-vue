import {request} from './request'
export function categories_query(){
  return request({
    url:'/api/categories',
    method:'get'
  })
}