<template>
  <div id="admins-list">
    <data-table :data="adminList" @addClicked="add" @checkboxChange="checkAll" @delClicked="delMany" @searchChange="search">
      <el-table-column label="邮箱" prop="email" width="200"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="角色" prop="role.name"></el-table-column>
      <el-table-column label="权限" prop="role.description"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope" >
          <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </data-table>
  </div>
</template>

<script>
import DataTable from 'components/common/dataTable/DataTable'
import {get_admins} from 'network/admins'
export default {
  name:'AdminsList',
  data() {
    return {
      adminList:[]
    }
  },
  created() {
    this.get()
  },
  methods: {
    add(){
      this.$router.push({name:'admin-create'})
    },
    del(index,row){
      
    },
    edit(index,row){
      this.$router.push({name:'admin-update',params:{id:row._id}})
    },
    get(){
      get_admins().then(res=>{
        this.adminList=res.data
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    checkAll(){

    },
    delMany(){

    },
    search(){

    }
  },
  components:{DataTable}
}
</script>

<style>

</style>