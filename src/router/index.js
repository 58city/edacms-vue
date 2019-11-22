import Vue from 'vue'
import VueRouter from 'vue-router'
import {hasInstall} from 'network/install'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const Login = ()=>import('views/login/Login')
const Install = ()=>import('views/install/Install')
const Layout = ()=>import('views/layout/Layout')
const Contents = ()=>import('views/contents/Contents')
const Dashboard = ()=>import('views/dashboard/Dashboard')
const Features = ()=>import('views/features/Features')
const Pages = ()=>import('views/pages/Pages')
const Media = ()=>import('views/media/Media')
const Roles = ()=>import('views/roles/Roles')
const RolesList = ()=>import('views/roles/RolesList')
const RolesDetail = ()=>import('views/roles/RolesDetail')
const AdminUsers = ()=>import('views/adminUsers/AdminUsers')
const MyAccount = ()=>import('views/myAccount/MyAccount')
const SiteInfo = ()=>import('views/siteInfo/SiteInfo')
const Categories = ()=>import('views/categories/Categories')
const ContentModels = ()=>import('views/contentModels/ContentModels')
const FeatureModels = ()=>import('views/featureModels/FeatureModels')

const routes = [
  {
    path:'/install',name:'install',component:Install,
    beforeEnter: (to, from, next) => {
      hasInstall().then( res=> { 
        if(!res.data.hasInstall){
          next()
        }else{
          next({path: '/login'})
        }
      })
    }
  },
  {
    path:'/login',name:'login',component:Login,
    beforeEnter: (to, from, next) => {
      hasInstall().then( res=> { 
        if(res.data.hasInstall){
          next()
        }else{
          next({path: '/install'})
        }
      })
    }
  },
  {
    path:'/admin',component:Layout,meta:{title:'首页'},
    children: [
      {
        path: '',name:'dashboard',component: Dashboard,meta:{title:'控制面板'}
      },
      {
        path: 'features',name:'features',component: Features,meta:{title:'推荐管理'}
      },
      {
        path: 'contents/:id',name:'contents',component: Contents,meta:{title:'内容管理'}
      },
      {
        path: 'pages/:id',name:'pages',component: Pages,meta:{title:'单页管理'}
      },
      {
        path: 'media',name:'media',component: Media,meta:{title:'媒体中心'}
      },
      {
        // 当某个路由有子级路由的时候，如果父级路由需要一个默认的路由，此时父级路由不能定义name属性。
        path: 'roles',component: Roles,meta:{title:'权限角色'},
        children:[
          {
            path: '',name:'roles-list',component: RolesList,meta:{title:'角色列表'}
          },
          {
            path: 'create',name:'create',component: RolesDetail,meta:{title:'新增角色'}
          },
          {
            path: 'update/:id',name:'update',component: RolesDetail,meta:{title:'修改角色'}
          }
        ]
      },
      {
        path: 'admin-users',name:'admin-users',component: AdminUsers,meta:{title:'后台用户'}
      },
      {
        path: 'account',name:'account',component: MyAccount,meta:{title:'我的账号'}
      },
      {
        path: 'site-info',name:'site-info',component: SiteInfo
      },
      {
        path: 'categories',name:'categories',component: Categories
      },
      {
        path: 'content-models',name:'content-models',component: ContentModels
      },
      {
        path: 'feature-models',name:'feature-models',component: FeatureModels
      }
    ]
  },
  {
    path:'*',name:'notFound',redirect:'/admin'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let cookies=router.app.$cookies.get('edacmsSid')
  if(!cookies&&to.name!='login'&&to.name!='install'){
    next({
      path: '/login'
    })
  }else{
    next()
  }
})

export default router
