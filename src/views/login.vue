<template>
  <div class="login">
    <el-row type="flex" justify="center" align="middle" class="wrapper">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">ログイン</el-button>
          <el-button @click="reset">リセット</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 登录成功的提示 -->
    <!-- <el-button :plain="success" @click="loginSuccess">成功</el-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //登录逻辑
    onSubmit() {
      this.$axios({
        url: "/login",
        method: "post",
        data: {
          username: this.form.username,
          password: this.form.password,
        },
      })
        .then((res) => {
          console.log(res);
          //登录成功
          if (res.data.message == "登录成功") {
            //提示登录成功;
            this.$message({
              message: "ログイン成功～",
              type: "success",
            });
          } else {
            this.$message.error("ユーザー名あるいはパスワード不正解~");
          }
        })
        .catch((err) => console.log(err));
    },
    //充值用户名和密码
    reset() {
      this.form.username = "";
      this.form.password = "";
    },
  },
};
</script>

<style scoped lang='scss'>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/images/webp.jpg") no-repeat;
  .wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>