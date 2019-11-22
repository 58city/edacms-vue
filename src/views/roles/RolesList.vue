<template>
  <div id="roles-list">
      <data-table :data="roleList" @addClicked="add">
        <el-table-column label="角色名称" prop="name"></el-table-column>
        <el-table-column label="角色说明" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" >
            <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </data-table>
  </div>
</template>

<script>
import {get_roles_list} from 'network/roles'
import DataTable from 'components/common/dataTable/DataTable'
export default {
  name:'RolesList',
  data() {
    return {
      roleList:[]
    }
  },
  created() {
    get_roles_list().then(res=>{
      this.roleList=res.data
    }).catch(err=>{
      this.$message.error(err.message)
    })
  },
  methods: {
    add(){
      this.$router.push('/admin/roles/create')
    },
    edit(index,row){
      console.log(index,row)
    },
    delete(){

    }
  },
  components:{
    DataTable
  }
}
</script>

<style>

</style>