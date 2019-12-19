import {request} from './request'
export function get_admins(options={}){
  let url='/api/admin-users';
  if(options.id){
    url='/api/admin-users/'+options.id
  }
  return request({
    url:url,
    method:'get',
    params:{search:options.search}
  })
}