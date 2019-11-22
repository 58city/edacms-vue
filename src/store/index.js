import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'common/storage'

Vue.use(Vuex)

const store=new Vuex.Store({
  state: {
    nickname:storage.get('nickname',''),
    rolename:storage.get('rolename',''),
    authorities:storage.getObject('authorities',[]), 
    auths:{
      features: { read: false, edit: false },
      contents: { read: false, edit: false },
      pages: { read: false, edit: false },
      media: { read: false, edit: false },
      roles: { read: false, edit: false },
      adminUsers: { read: false, edit: false },
      account: { read: false, edit: false },
      siteInfo: { read: false, edit: false },
      categories: { read: false, edit: false },
      contentModels: { read: false, edit: false },
      featureModels: { read: false, edit: false }
    },
    categories:storage.getObject('categories',[])
  },
  mutations: {
    handleCurrentUserInfo(state, user){
      state.nickname=user.nickname
      state.rolename=user.role.name
      state.authorities=user.role.authorities
      // 把登录的用户保存到localStorage中
      // 防止页面刷新，导致vuex重新启动，用户就成为初始值（初始值为空）的情况
      storage.set('nickname', user.nickname)
      storage.set('rolename', user.role.name)
      storage.setObject('authorities', user.role.authorities)
    },
    handleCategories(state,categories){
      state.categories=categories
      storage.setObject('categories', categories)
    }
  },
  getters:{
    getAuths(state){
      state.authorities.forEach(auth_code => {
        if(auth_code === 100000){
          Object.keys(state.auths).forEach(function (key) {
            state.auths[key] = { read: true, edit: true };
          })
          return false;
        }
        switch (auth_code) {
          case 100100: state.auths.features.read  = true; break;
          case 100101: state.auths.features.edit  = true; break;
          case 100200: state.auths.contents.read  = true; break;
          case 100201: state.auths.contents.edit  = true; break;
          case 100300: state.auths.pages.read  = true; break;
          case 100301: state.auths.pages.edit  = true; break;
          case 100400: state.auths.media.read  = true; break;
          case 100401: state.auths.media.edit  = true; break;
          case 109000: state.auths.account.read  = true; break;
          case 109001: state.auths.account.edit  = true; break;
          case 110100: state.auths.siteInfo.read  = true; break;
          case 110101: state.auths.siteInfo.edit  = true; break;
          case 110200: state.auths.categories.read  = true; break;
          case 110201: state.auths.categories.edit  = true; break;
          case 110300: state.auths.contentModels.read  = true; break;
          case 110301: state.auths.contentModels.edit  = true; break;
          case 110400: state.auths.featureModels.read  = true; break;
          case 110401: state.auths.featureModels.edit  = true; break;
          case 110500: state.auths.roles.read  = true; break;
          case 110501: state.auths.roles.edit  = true; break;
          case 110600: state.auths.adminUsers.read  = true; break;
          case 110601: state.auths.adminUsers.edit  = true;
        }
      })
      return state.auths
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
