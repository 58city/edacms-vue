<template>
  <div id="roles-detail">
    <el-form :model="roleInfo" :rules="rules" ref="roleInfoForm" label-width="100px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="角色说明" prop="description">
        <el-input v-model="roleInfo.description"></el-input>
      </el-form-item>
      <el-form-item v-for="(item,index) in authList" :key="index" :label="item.description">
        <el-radio-group size="mini">
          <el-radio-button label="无权限"></el-radio-button>
          <el-radio-button label="仅查看"></el-radio-button>
          <el-radio-button label="查看和编辑"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    {{authList}}
  </div>
</template>

<script>
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
      }
    }
  },
  created() {
    get_auth_list().then(res=>{
      this.authList=res.data
    }).catch(err=>{
      this.$message.error(err.message)
    })
  }
}
</script>

<style>

</style>