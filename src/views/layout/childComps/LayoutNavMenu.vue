<template>
  <div id="nav-menu">
    <div class="login-info">
      <span>
        <a href="javascript:void(0);">
          <img src="~assets/images/sunny.png" alt="me" class="online"> 
          <span>{{nickname}} {{rolename}} </span>
        </a>	
      </span>
    </div>

    <el-menu default-active="0" background-color="transparent" text-color="#fff" active-text-color="#ffd04b" :router="true">
      <el-menu-item index="/backend">
        <i class="el-icon-menu"></i>
        <span slot="title">控制面板</span>
      </el-menu-item>
      <el-menu-item index="/backend/features" v-if="auths.features.read">
        <i class="el-icon-s-flag"></i>
        <span slot="title">推荐管理</span>
      </el-menu-item>
      <el-menu-item index="3" v-if="auths.contents.read&&columns.length==0">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-submenu index="3" v-if="auths.contents.read&&columns.length>0">
        <template slot="title"><i class="el-icon-s-cooperation"></i><span>内容管理</span></template>
        <!-- 第一次遍历：顶级的channel和column -->
        <div v-for="(item,index) in categories_tree" :key="index" style="margin-left:34px;border-left:1px solid #aaa;">
          <el-menu-item v-if="item.type==='column'" :index="'/backend/contents/'+item._id">{{item.name}}</el-menu-item>
          <el-submenu v-if="item.type==='channel'&&item.nodes" :index="item._id">
            <template slot="title">{{item.name}}</template>
            <!-- 第二次遍历：频道下的栏目 -->
            <div v-for="(item,index) in item.nodes" :key="index">
              <el-menu-item v-if="item.type==='column'" :index="'/backend/contents/'+item._id">-- {{item.name}}</el-menu-item>
            </div>
          </el-submenu>
        </div>
      </el-submenu>
      <el-menu-item index="4" v-if="auths.pages.read&&pages.length==0">
        <i class="el-icon-s-order"></i>
        <span slot="title">单页管理</span>
      </el-menu-item>
      <el-submenu index="4" v-if="auths.pages.read&&columns.length>0">
        <template slot="title"><i class="el-icon-s-order"></i><span>单页管理</span></template>
        <el-menu-item v-for="(item,index) in pages" :key="index" 
          :index="'/backend/pages/'+item._id" 
          style="margin-left:34px;border-left:1px solid #aaa;">
          {{item.name}}
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/backend/media" v-if="auths.media.read">
        <i class="el-icon-picture"></i>
        <span slot="title">媒体中心</span>
      </el-menu-item>
      <el-submenu index="5" v-if="auths.roles.read||auths.adminUsers.read||auths.account.read">
        <template slot="title"><i class="el-icon-user-solid"></i><span>账号中心</span></template>
        <el-menu-item index="/backend/roles" v-if="auths.roles.read"
          style="margin-left:34px;border-left:1px solid #aaa;"
        >
          权限角色
        </el-menu-item>
        <el-menu-item index="/backend/admins" v-if="auths.adminUsers.read"
          style="margin-left:34px;border-left:1px solid #aaa;"
        >
          后台用户
        </el-menu-item>
        <el-menu-item index="/backend/account" v-if="auths.account.read"
          style="margin-left:34px;border-left:1px solid #aaa;"
        >
          我的账号
        </el-menu-item>
      </el-submenu>
      <el-submenu index="6" v-if="auths.siteInfo.read||auths.categories.read||auths.contentModels.read||auths.featureModels.read">
        <template slot="title"><i class="el-icon-s-tools"></i><span>网站配置</span></template>
        <el-menu-item index="/backend/site-info" v-if="auths.siteInfo.read"
          style="margin-left:34px;border-left:1px solid #aaa;"
        >
          站点信息
        </el-menu-item>
        <el-menu-item index="/backend/categories" v-if="auths.categories.read"
          style="margin-left:34px;border-left:1px solid #aaa;"
        >
          分类管理
        </el-menu-item>
        <el-menu-item index="/backend/content-models" v-if="auths.contentModels.read"
          style="margin-left:34px;border-left:1px solid #aaa;"
        >
          内容模型
        </el-menu-item>
        <el-menu-item index="/backend/feature-models" v-if="auths.featureModels.read"
          style="margin-left:34px;border-left:1px solid #aaa;"
        >
          推荐模型
        </el-menu-item>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
  import _ from "lodash"
  export default {
    name:'LayoutNavMenu',
    computed: {
      nickname(){
        return this.$store.state.nickname
      },
      rolename(){
        return this.$store.state.rolename
      },
      auths(){
        return this.$store.getters.getAuths
      },
      categories_tree(){
        if(this.$store.state.categories.length==0) {
          return []
        }
        let source = _.partition(this.$store.state.categories, function(category) {
          if (category.path) {
            return category.path.split('/').length === 2
          } else {
            return category.mixed.prePath.split('/').length === 2
          }
        })
        let topCategories = _.sortBy(source[0], 'sort')
        let otherCategories = source[1]

        function loop (parent,children) {
          return _.map(parent, function (p_cat) {
            let source = _.partition(children, function(c_cat) {
              if (c_cat.path) {
                return new RegExp('^' + p_cat.path + '/[A-z0-9\-\_]+$').test(c_cat.path)
              } else {
                return new RegExp('^' + p_cat.path + '/$').test(c_cat.mixed.prePath)
              }
            });
            if (!_.isEmpty(source[0])) {
              let upperCategories=_.sortBy(source[0], 'sort')
              let otherCategories = source[1]
              p_cat.nodes = loop(upperCategories,otherCategories)
            }
            return p_cat
          })
        }
        return loop(topCategories,otherCategories)
      },
      columns(){
        return _.filter(this.$store.state.categories, { type: 'column' })
      },
      pages(){
        return _.filter(this.$store.state.categories, { type: 'page' })
      }
    },
    components:{
      
    }
  }
</script>

<style>
  .login-info, .login-info * {
    box-sizing: content-box;
  }
  .login-info {
    display: block;
    width: 100%;
    height: 39px;
    margin: 0!important;
    color: #fff;
    border: solid transparent;
    border-width: 1px 0;
    border-bottom: 1px solid #525151;
    box-shadow: inset 1px 1px 0 rgba(0,0,0,.1), inset 0 -1px 0 rgba(0,0,0,.07);
  }
  .login-info>span {
    display: block;
    height: 38px;
    padding: 0 10px;
    border-bottom: 1px solid #1A1817;
  }
  .login-info>span a {
    display: inline-block;
    margin-top: 6px;
    text-decoration: none!important;
    color: #c0bbb7;
  }
  .login-info>span a img {
    display: inline-block;
    width: 25px;
    height: auto;
    margin-top: 1px;
    margin-right: 5px;
    margin-left: 0;
    vertical-align: middle;
    border-left: 3px solid #fff;
  }
  img.online {
    border-left-color: #40ac2b!important;
  }  

  .el-menu{
    border: none;
  }
  .el-menu-item{
    background-color: transparent!important;
  }
  .el-menu-item, 
  .el-submenu__title{
    height: 42px!important;
    line-height: 42px!important;
  }
  .el-menu-item, .el-submenu__title{
    padding:0 10px!important;
  }
  .el-menu-item [class^=el-icon-],
  .el-submenu [class^=el-icon-]{
    text-align: left;
    margin-right: 0;
  }
  .el-menu-item:hover,
  .el-submenu__title:focus, 
  .el-submenu__title:hover{
    background-color: rgba(0, 0, 0, .2)!important;
  }
  .el-submenu .el-menu-item{
    min-width: auto;
  }
</style>