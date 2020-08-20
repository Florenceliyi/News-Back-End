<template>
  <div class="publishPage">
    <el-form ref="form" :model="form" label-width="80px">
      <!-- 标题输入框 -->
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <!-- 富文本框 -->
      <el-form-item label="内容">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="form.content"></vue-editor>
      </el-form-item>

      <!-- 栏目 -->
      <el-form-item label="栏目">
        <el-checkbox-group v-model="checkList">
          <!-- 多选框组中遍历栏目渲染多选框 -->
          <!-- 传给后台的值使用 label 属性, 显示的内容 直接放在开闭标签之间 -->
          <el-checkbox v-for="item in tabLists" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- :show-file-list="form.cover" -->
      <!-- 封面图上传 -->
      <el-form-item label="封面" class="imgUpLoad">
        <el-upload
          class="avatar-uploader"
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="{
              Authorization: 'Bearer ' + token
            }"
          :file-list="form.cover"
          :on-success="imgUpLoadSuccess"
          :on-remove="coverRemove"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- 类型选择 -->
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 提交文章按钮 -->
      <el-form-item label="操作">
        <el-button type="primary" @click="submit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      token: localStorage.getItem("token"),

      checkList: [],
      tabLists: [],
      form: {
        title: "",
        //富文本框内容
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
    };
  },
  watch: {
    //监听checkList的变化,每次变化都修改数据结构，使数组的值变成[{id:值}]；
    checkList() {
      console.log(this.checkList);
      //存放到分类列表当中;
      this.form.categories = this.checkList.map((id) => {
        return { id: id };
      });
      console.log(this.form.categories);
    },
  },
  created() {
    //渲染栏目列表;
    this.renderTabLists();
    console.log(this.form.type);
    if (this.$route.query.id) {
      //若是路由中有带上id值，证明是需要编辑文章详情，需要加载文章；
      this.loadEditData();
    }
  },
  methods: {
    //富文本框上传图片逻辑
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //富文本框选择完图片会触发的函数;
      // 带有四个参数 file, Editor, cursorLocation, resetUploader
      // file 选中的图片
      // Editor 是当前编辑器实例对象
      // cursorLocation 当前光标所在位置
      // resetUploader 这是上传完图片用来重新初始化上传功能的函数
      // formData.append('file', file)
      //1.上传图片
      console.log("执行handleImageAdded");
      let formData = new FormData();
      formData.append("file", file);

      this.$axios({
        url: "/upload",
        method: "post",
        data: formData,
      })
        .then((res) => {
          let url = res.data.data.url;
          console.log(url); // Get url from response
          // Editor.insertEmbed() 这是编辑器自带函数, 可以往编辑框内放入内容
          // 三个参数 位置 / 类型 / 内容
          Editor.insertEmbed(
            cursorLocation,
            "image",
            this.$axios.defaults.baseURL + url
          );
          // 将图片插入到富文本框之后还要重置上传功能
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //上传封面图片数据；
    imgUpLoadSuccess(res, file) {
      // res 请求结果
      // file 文件本身
      // fileList 文件列表
      // 1. 需要将 file 文件放入 this.form.cover 数组里面
      // 2. 我们的封面需要文章id
      console.log(res);

      file.id = res.data.id;
      this.form.cover.push(file);
      console.log("上传封面成功");
    },
    //删除图片的逻辑；
    coverRemove(file, fileList) {
      // 删除图片时可以接受两个参数
      // file 文件本身
      // FileList 文件列表
      // 这里没有请求, 也没有 id 的需求
      // 只需要将最新列表放到 form 即可
      this.form.cover = fileList;
      console.log("删除图片成功");
    },
    //渲染栏目列表的逻辑;
    renderTabLists() {
      this.$axios({
        url: "/category",
      })
        .then((res) => {
          console.log(res.data.data);
          //由于关注和头条是自动生成的，过滤掉这两个栏目;
          this.tabLists = res.data.data.filter((ele) => {
            return ele.id != 0 && ele.id != 999;
          });
          console.log(this.tabLists);
        })
        .catch((err) => console.log(err));
    },
    //加载编辑好的数据逻辑;
    loadEditData() {
      this.$axios({
        url: "/post/" + this.$route.query.id,
      }).then((res) => {
        console.log(res.data.data);
        // 获取数据的时候处理中的id
        this.checkList = res.data.data.categories.map((el) => {
          return el.id;
        });
        console.log(this.checkList);

        const newCover = res.data.data.cover.map((img) => {
          //解构所有遍历到的
          const newImg = { ...img };

          console.log(newImg.url);
          if (newImg.url.indexOf("http") == -1) {
            newImg.url = this.$axios.defaults.baseURL + newImg.url;
          }
          //手动添加uid属性给后台数据;
          newImg.uid = newImg.id;
          return newImg;
        });
        console.log(newCover);
        //富文本框不支持div标签，需要替换成p标签;
        res.data.data.content = res.data.data.content.replace(/div/g, "p");

        //将处理好的数据赋给form
        this.form = res.data.data;
        console.log(this.form);
      });
    },
    //提交数据
    submit() {
      //判断提交编辑好的数据是新增的文章还是编辑好的文章;
      if (this.$route.query.id) {
        this.$axios({
          url: "/post_update/" + this.$route.query.id,
          method: "post",
          data: this.form,
        })
          .then((res) => {
            console.log(res);
            this.$message({
              message: "発表成功～",
              type: "success",
            });
            //跳转回文章列表；
            this.$router.push("/backEnd/newsLists");
          })
          .catch((err) => console.log(err));
      } else {
        this.$axios({
          url: "/post",
          method: "post",
          data: this.form,
        })
          .then((res) => {
            console.log(res);
            this.$message({
              message: "発表成功～",
              type: "success",
            });
            //跳转回文章列表；
            this.$router.push("/backEnd/newsLists");
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style scoped lang='scss'>
/*图片上传样式*/
</style>