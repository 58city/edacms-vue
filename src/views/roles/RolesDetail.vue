<template>
  <div id="roles-detail">
    <panel tab :tab-titles="['基本信息','权限设置']" @tabClicked="tTab">
      <button slot="button"><i class="fa fa-save"></i>保存设置</button>
      <el-form slot="body" :model="roleInfo" :rules="rules" ref="roleInfoForm" label-width="100px">
        <div v-if="currentTab==0">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="角色说明" prop="description">
            <el-input v-model="roleInfo.description"></el-input>
          </el-form-item>
        </div>
        <div v-if="currentTab==1">
          <el-form-item :label="item.description"  v-for="(item,index) in authList" :key="index">
            <el-radio-group>
              <el-radio :label="3">无权限</el-radio>
              <el-radio :label="6">仅查看</el-radio>
              <el-radio :label="9">查看和编辑</el-radio>
            </el-radio-group>
          </el-form-item>
          
        </div>
      </el-form>
    </panel>
  </div>
</template>

<script>
import Panel from 'components/common/panel/Panel'
import {get_auth_list} from 'network/roles'
export default {
  name:'RolesDetail',
  data() {
    return {
      authList:[],
      roleInfo:{
        name:'',
        description:'',
        authorities:[]
      },
      rules:{
        name:[
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      currentTab:0
    }
  },
  created() {
    get_auth_list().then(res=>{
      this.authList=res.data
    }).catch(err=>{
      this.$message.error(err.message)
    })
  },
  methods: {
    tTab(index){
      this.currentTab=index
    }
  },
  components:{
    Panel
  }
}
</script>

<style>
  #roles-detail .el-form-item {
    margin-bottom:10px;
    border-top: 1px solid #EBEEF5;
  }
  #roles-detail .el-form-item .el-form-item__content,
  #roles-detail .el-form-item .el-form-item__label{
    height: 30px;;
    line-height: 30px;
  }
</style>