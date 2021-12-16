<template>
    <el-container class="layout_container">
      <Aside :is-collapse='isCollapse'></Aside>
    <el-container>
    <el-header class="header">
      <div>
        <transition>
          <i :class="collapse" @click='changeCollapse'></i>
        </transition>
        <span class="title">头条内容发布系统</span>
      </div>
      <el-dropdown placement='bottom'>
        <span class="el-dropdown-link">
          <el-avatar :size="40" :src="avatar" class="avatar"></el-avatar>
        {{ name }}
        <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="settings">设置</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import Aside from './components/aside.vue'
export default {
  components: { Aside },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    },
    logOut () {
      this.$confirm('此操作将退出系统, 是否继续?', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/login')
        window.localStorage.removeItem('user')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    settings () {

    }
  },
  computed: {
    name () {
      return (JSON.parse(window.localStorage.getItem('user'))).name
    },
    avatar () {
      return (JSON.parse(window.localStorage.getItem('user'))).photo
    },
    collapse () {
      return this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  }
}
</script>

<style lang='less' scoped>
.layout_container{
  width: 100vw;
  height: 100vh;
}
.header{
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  font-size: 22px;
  border-bottom:1px solid #ccc;
}
.title{
  margin-left: 10px;
}
.el-dropdown-link{
  display: flex;
  align-items: center;

}
.avatar{
  // width: 40px;
  // height: 40px;
  margin-right: 10px;
  // border-radius: 20px;
}
</style>
