<template>
  <div class="newsLists">
    <!-- 分页功能 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-table :data="newsLists" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" class="id"></el-table-column>
      <!-- 图片插槽 -->
      <el-table-column prop="user.head_img" label="缩略图" width="180">
        <template slot-scope="abc">
          <!-- 过滤器解析图片地址 -->
          <img
            v-if="abc.row.cover[0]"
            :src="abc.row.cover[0].url | formartStr"
            class="thumbnail"
            alt
          />
          <img v-else src="./../assets/images/webp.jpg" alt />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="user.nickname" label="作者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="abc">
          <el-button type="primary" @click="$router.push('/publishPage?id='+ abc.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页功能 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  //监听路由跳转形成面包屑；
  watch: {},
  filters: {
    formartStr(value) {
      const reg = /^http/;
      if (reg.test(value)) {
        return value;
      } else {
        return "http://127.0.0.1:3000" + value;
      }
    },
  },
  data() {
    return {
      newsLists: [],
      //第几页
      pageIndex: 1,
      //每页条数
      pageSize: 5,
      //共多少页
      total: 0,
    };
  },
  mounted() {
    this.renderNewsLists();
  },
  methods: {
    //渲染文章列表
    renderNewsLists() {
      this.$axios({
        url: "post",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      })
        .then((res) => {
          console.log(res);
          this.newsLists = res.data.data;
          this.total = res.data.total;
        })
        .catch((err) => console.log(err));
    },
    //分页器显示每页多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.renderNewsLists();
    },
    //分页器显示当前多少页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.renderNewsLists();
    },
  },
};
</script>

<style scoped lang='scss'>
.wrapper {
  v::deep .el-main {
    line-height: 0;
  }
}
.thumbnail {
  width: 13vw;
  height: 9vw;
  object-fit: cover;
}
.id {
  width: 14vw;
}
.pagination {
  height: 4vw;
}
</style>