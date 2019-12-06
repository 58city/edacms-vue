<template>
  <div id="roles-detail">
    <panel tab :tab-titles="['基本信息','权限设置']" @tabClicked="tTab">
      <button slot="button"><i class="fa fa-save"></i>保存设置</button>
      <el-form slot="body" :model="roleInfo" :rules="rules" ref="roleInfoForm" label-width="100px" v-if="currentTab==0">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="角色说明" prop="description">
          <el-input v-model="roleInfo.description"></el-input>
        </el-form-item>
      </el-form>
      <el-table slot="body" :data="authList" border style="width: 100%" v-if="currentTab==1">
        <el-table-column prop="description" label="菜单" width="180"></el-table-column>
        <el-table-column label="权限">
          <template slot-scope="scope">
            <el-radio-group size="mini">
              <el-radio-button label="无权限"></el-radio-button>
              <el-radio-button label="仅查看"></el-radio-button>
              <el-radio-button label="查看和编辑"></el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
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

<style scoped>
  /* #roles-detail{ */
    /* width: 500px; */
  /* } */
</style>