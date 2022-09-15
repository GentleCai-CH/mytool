<template>
  <div>
    <SideNav></SideNav>
    <div class="edit-container">
      <div class="edit-page">
        <div><span class="edit-title">编辑</span></div>
        <div class="edit">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            name="file"
            :headers="header"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload">
          </el-upload>
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
          ></quill-editor>
        </div>
        <el-button type="primary" @click="saveHtml"  class="edit-button" size="mini">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/SideNav"

export default {
  name: "edit",
  components:{
    'SideNav' : SideNav,},
  data() {
    return {
      quillUpdateImg: false, 
      content: null,

      editorOption: { //编辑器配置
        placeholder: "请在这里输入",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: this.$toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      serverUrl:
        this.$http.defaults.baseURL + "/activity/savePicture", // 这里写你要上传的图片服务器地址,需要和后台商量传输格式
      header: {
      //服务器要求请求头写在这里
      }
    };
  },
  mounted() {
    //初始化编辑器文字提示
    this.initTitle();
  },
  
  methods: {
    
    /**
     * 
     * onEditorChange({ editor, html, text }) {
      //内容改变事件
      console.log("---内容改变事件---");
      this.content = html;
      console.log(html);
    },

     */

    initTitle () {
      document.getElementsByClassName("ql-editor")[0].dataset.placeholder = "";
      for (let item of this.$titleConfig) {
        let tip = document.querySelector(".quill-editor " + item.Choice);
        if (!tip) continue;
        tip.setAttribute("title", item.title);
      }
    },
     
    // 富文本图片上传前
    beforeUploadImg(file) {//富文本图片上传前
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG，PNG, GIF 格式!')
      } else {
        // 显示loading动画
        this.quillUpdateImg = true
      }
      return isJPG
    },

    uploadSuccess(res) { //uploadSuccess(res, file)
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      console.log(res);
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      //这里需要注意自己文件上传接口返回内容，我这里code=0表示上传成功，返回的文件地址：res.result.path
      if (res.resultCode == "0000") {
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.result.path);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    saveHtml: function(event) {//富文本的获得焦点事件
      // 在这里可以设置富文本编辑器是否可编辑
      //event.enable(false);//不可输入和编辑
      event.enable(true);//可以输入和编辑
      //alert(this.content);
    }
  }
};
</script>

<style>

.edit-container {
  position: absolute;
  top:0px;
  left:10%;
  width:80%;
  height: 100%;
  display: flex;
  align-self:center;
}

.edit-page {
  width:100%;
  height: 100%;
  margin: auto;
}

.edit-title {
  font-size: 30px;
  color: #90e6cc;;
  width:100%;
  margin: auto;
  
}

.edit {
  width:100%;
  height: 100%;
  display: flex;
  align-self:center;
  margin: auto;
  background-color: #f0f8f9;
}
.edit-button {
  font-size: 14px;
  float: right;
  margin: 6px 10px;
}


/************************************** 富文本编辑器 **************************************/
/** 设置富文本的高度 **/
.editor {
  line-height: normal !important;
  height: 730px;
  margin-bottom: 30px;
}
.ql-container {
  height: 700px !important;
}
/** 设置富文本的高度 **/

/** 设置工具栏中上传图片和上传视频对应的文件上传组件样式 **/
.avatar-uploader-img {
  height: 0;
}
.avatar-uploader-video {
  height: 0;
}
/** 设置工具栏中上传图片和上传视频对应的文件上传组件样式 **/


::v-deep .ql-snow .ql-tooltip[data-mode=link]::before {
  content: '请输入链接地址：';
}
::v-deep .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}
::v-deep .ql-snow .ql-tooltip[data-mode=video]::before {
  content: '请输入视频地址：';
}
::v-deep .ql-snow .ql-picker.ql-size .ql-picker-label::before,
::v-deep .ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
::v-deep .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
::v-deep .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
::v-deep .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
::v-deep .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
::v-deep .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
::v-deep .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}
::v-deep .ql-snow .ql-picker.ql-font .ql-picker-label::before,
::v-deep .ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
::v-deep .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
::v-deep .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}
::v-deep .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
::v-deep .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}
/************************************** 富文本编辑器 **************************************/
</style>
