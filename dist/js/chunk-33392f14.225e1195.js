(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33392f14"],{c5a8:function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"a",(function(){return a}));var n=r("1bab");function o(){return Object(n["a"])({url:"/api/roles",method:"get"})}function a(){return Object(n["a"])({url:"/api/authorities",method:"get"})}},f05a:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"roles-detail"}},[r("el-form",{ref:"roleInfoForm",attrs:{model:e.roleInfo,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[r("el-input",{model:{value:e.roleInfo.name,callback:function(t){e.$set(e.roleInfo,"name",t)},expression:"roleInfo.name"}})],1),r("el-form-item",{attrs:{label:"角色说明",prop:"description"}},[r("el-input",{model:{value:e.roleInfo.description,callback:function(t){e.$set(e.roleInfo,"description",t)},expression:"roleInfo.description"}})],1),e._l(e.authList,(function(e,t){return r("el-form-item",{key:t,attrs:{label:e.description}},[r("el-radio-group",{attrs:{size:"mini"}},[r("el-radio-button",{attrs:{label:"无权限"}}),r("el-radio-button",{attrs:{label:"仅查看"}}),r("el-radio-button",{attrs:{label:"查看和编辑"}})],1)],1)}))],2),e._v(" "+e._s(e.authList)+" ")],1)},o=[],a=r("c5a8"),i={name:"RolesDetail",data:function(){return{authList:[],roleInfo:{name:"",description:"",authorities:[]},rules:{name:[{required:!0,message:"请输入角色名称",trigger:"blur"}]}}},created:function(){var e=this;Object(a["a"])().then((function(t){e.authList=t.data})).catch((function(t){e.$message.error(t.message)}))}},l=i,s=r("2877"),u=Object(s["a"])(l,n,o,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-33392f14.225e1195.js.map