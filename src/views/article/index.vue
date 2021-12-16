<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <el-form ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item label="状态：">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="form.channel_id" placeholder="请选择">
            <el-option label='全部' :value='null'></el-option>
            <el-option
              v-for="item in channels"
              :key='item.id'
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
          type="primary"
          :disabled='loading'
          @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="second" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到{{total}}条数据</span>
      </div>
      <el-table
        :data="articles"
        style="width: 100%">
        <el-table-column
          prop=""
          label="封面">
          <template v-slot='scope'>
            <!-- {{scope.row}} -->

            <!-- <img v-if='scope.row.cover.images[0]' :src='scope.row.cover.images[0]' class="cover"> -->
            <!-- <el-image :src="scope.row.cover.images[0]"> -->
              <el-image :src='scope.row.cover.images[0]' style="width: 50px; height: 50px" fit="fit"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          label="状态">
          <template v-slot='scope'>
            <el-tag :type="articlesStatus[scope.row.status].type">{{articlesStatus[scope.row.status].text}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template v-slot="scope">
            <!-- {{scope.row.id}} -->
            <el-button type="primary" plain circle icon='el-icon-edit' @click='onEditArticle(scope.row.id)'></el-button>
            <el-button type='danger' plain circle icon='el-icon-delete' @click='onDeleteArticle(scope.row.id)'></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      background
      @current-change="onCurrentChange"
      :current-page.sync='page'
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="per_page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticlesChannels, deleteArticle } from '../../api/article.js'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      form: {
        date: [],
        channel_id: null,
        status: null

      },
      articles: [],
      articlesStatus: [
        { status: 0, text: '草稿', type: 'warning' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'info' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      page: 1,
      per_page: 10,
      total: 0,
      channels: [],
      loading: true
    }
  },
  methods: {
    onSubmit () {
      this.loadArticles()
    },
    loadArticles () {
      this.loading = true
      getArticles({
        page: this.page,
        per_page: this.per_page,
        status: this.form.status,
        channel_id: this.form.channel_id,
        begin_pubdate: this.form.date ? this.form.date[0] : null,
        end_pubdate: this.form.date ? this.form.date[1] : null
      })
        .then(res => {
          console.log(res)
          this.articles = res.data.data.results
          this.total = res.data.data.total_count

          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    loadChannels () {
      getArticlesChannels()
        .then((res) => {
          console.log(res)
          this.channels = res.data.data.channels
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onCurrentChange (val) {
      // console.log(val)
      this.page = val
      this.loadArticles()
    },
    handleSizeChange (val) {
      // console.log(val)
      this.per_page = val
      this.loadArticles()
    },
    onEditArticle (id) {
      console.log(id)
      this.$router.push('/publish?id=' + id)
    },
    onDeleteArticle (articleId) {
      console.log(articleId)
      // console.log(articleId.toString())
      this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteArticle(articleId.toString())
            .then((res) => {
              console.log(res)
              setTimeout(() => {
                this.loadArticles(this.page)
              }, 500)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created () {
    this.loadArticles()
    this.loadChannels()
  }
}
</script>

<style scope>
.second{
  margin-top: 25px;
}
.el-pagination{
  margin-top: 20px;
}
.cover{
  width: 60px;
  height: 60px;
}
</style>
