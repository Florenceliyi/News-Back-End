<template>
  <div class="backEnd">
    <el-container class="wrapper">
      <el-header class="header">
        <div class="title">黑马头条</div>
        <div class="img">
          <img src="../assets/images/bobo.jpg" alt />
          <span>波波</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#e9746b"
            text-color="#000"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1" @click="goToPage('/backEnd/newsLists')">
              <i class="el-icon-menu"></i>
              <span slot="title">文章列表</span>
            </el-menu-item>

            <el-menu-item index="2" @click="goToPage('/backEnd/publishPage')">
              <i class="el-icon-setting"></i>
              <span slot="title">发布文章</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="meta">{{meta}}</div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meta: "后台=>",
    };
  },

  watch: {
    $route() {
      console.log(this.$route.matched);
      let str = "";
      this.$route.matched.forEach((name) => {
        str += name.meta.breadcrumb + "=>";
      });

      this.meta = str;
    },
  },
  methods: {
    goToPage(path) {
      //当前跳转路径是否等于即将要跳转的路径，是则不跳转；
      if (this.$route.path != path) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.backEnd {
  height: 100vh;
  .wrapper {
    width: 100%;
    height: 100%;
  }
  .header {
    padding-left: 5vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;

    .title {
      font-size: 22px;
      color: #000;
    }
    .img {
      margin-right: 5vw;
      img {
        width: 3vw;
        height: 3vw;
        border-radius: 50%;
        margin-right: 2vw;
        vertical-align: middle;
      }
    }
  }
  .el-header,
  .el-footer {
    background: #f7f8f2;
    color: #333;
    // text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background: #f7f8f2;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    .meta {
      width: 12vw;
      height: 2vw;
    }
  }

  body > .el-container {
    margin-bottom: 40px;
    height: 100vh !important;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  //   v::deep .el-container {
  //     width: 100% !important;
  //     height: 100% !important;
  //   }
}
</style>