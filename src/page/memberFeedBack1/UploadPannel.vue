<template>
  <div class="wx-imageUpload">
    <el-upload action="http://file.act.w-lans.cn/"
               list-type="picture"
               :multiple="false"
               :on-success="handleUploadSuccess"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove"
               :on-error="handleError"
               :on-exceed="handleExceed">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible"
               size="tiny">
      <img width="100%"
           :src="dialogImageUrl"
           alt="">
    </el-dialog>
  </div>

</template>

<script>
import { Upload, Dialog } from 'element-ui';

export default {
  components: {
    'el-upload': Upload,
    'el-dialog': Dialog,
  },

  props: {
    imgArr: {
      type: Array,
    },
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      imgList: this.imgArr,
    };
  },

  watch: {
    imgList(newVal) {
      this.$emit('update:imgArr', newVal);
    },
  },

  methods: {
    handleRemove(file, fileList) {
      console.log('removeList', file);

      for (let i = 0; i < this.imgList.length; i++) {
        if (file.name === this.imgList[i].name) {
          console.log('imgList', this.imgList[i].name);
          this.imgList.splice(i, 1);
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleUploadSuccess(response, file, fileList) {
      this.imgList.push(file);
    },
    handleError(err) {
      this.$Toast(err);
    },
    handleExceed() {
      this.$Toast('上传数量超过限制');
    }
  },
};
</script>

<style lang="scss">
@include b(imageUpload) {
  &>div {
    display: flex;
    flex-flow: row wrap;
  }

  .el-upload--picture {
    position: relative;
    width: rem(116);
    height: rem(116);
    border-radius: 0;
    border: 1px solid #cccccc;
    margin-right: rem(20);
    margin-bottom: rem(20);
  }
  .el-icon-plus {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-upload-list {
    display: flex;
    flex-flow: row wrap;
  }
  .el-upload-list--picture .el-upload-list__item {
    margin: 0;
    padding: 0;
    border-radius: 0;
    margin-right: rem(20);
    margin-bottom: rem(20);
  }
  .el-upload-list__item-name {
    display: none;
    margin: 0;
    padding: 0;
  }
  .el-upload-list--picture .el-upload-list__item-thumbnail {
    margin: 0;
  }
  .el-upload-list--picture .el-upload-list__item {
    width: rem(116);
    height: rem(116);
  }
  .el-upload-list__item-actions {
    width: rem(116);
    // height: rem(116);
  }
  padding: 0 rem(20);
}
// @include b(imageUpload) {
//   .el-upload--picture-card {
//     position: relative;
//     width: rem(116);
//     height: rem(116);
//     border-radius: 0;
//     border: 1px solid #cccccc;
//   }
//   .el-icon-plus {
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     margin: auto;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
//   .el-upload-list--picture-card .el-upload-list__item {
//     width: rem(116);
//     height: rem(116);
//   }
//   .el-upload-list__item-actions {
//     width: rem(116);
//     // height: rem(116);
//   }
//   padding: 0 rem(20);
// }
</style>
