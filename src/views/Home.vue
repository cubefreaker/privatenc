<template>
  <el-container>
    <el-header height="100px"
      ><img alt="Header logo" src="../assets/img/header.png" height="100px"
    /></el-header>
    <el-main>
      <!-- <el-select v-model="type">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-upload
        v-if="type == 'image'"
        ref="imageUpload"
        class="avatar-uploader"
        action="string"
        :multiple="false"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleImageChange"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->

      <div class="original-text" v-if="type == 'text'">
        <h3>Text</h3>
        <el-input type="textarea" :rows="10" v-model="originalText"></el-input>
      </div>

      <div class="translate">
        <el-form :inline="true">
          <el-form-item>
            <el-button
              round
              type="danger"
              :disabled="isDisable"
              @click="reset"
              icon="el-icon-close"
              >Clear
            </el-button>
            <el-button
              round
              type="success"
              :disabled="isDisable"
              @click="translate"
              :loading="isLoading"
              icon="el-icon-sort"
            >
              Translate
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              round
              type="primary"
              @click="goToChat"
              icon="el-icon-chat-line-round"
            >
              Chat
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="encoded-text">
        <h3>Encryption</h3>
        <el-input type="textarea" :rows="10" v-model="encodedText"></el-input>
      </div>
    </el-main>
    <el-footer>
      <div class="copyright">@copyright by mas-mas ganteng 2021</div>
    </el-footer>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      type: 'text',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Image', value: 'image' },
      ],
      originalText: '',
      encodedText: '',
      isDisable: false,
      isLoading: false,
      image: null,
      imageUrl: '',
    }
  },
  methods: {
    reset() {
      this.originalText = ''
      this.encodedText = ''
      this.image = null
      this.imageUrl = ''
    },
    goToChat() {
      this.$router.push('/chat')
    },
    async translate() {
      let url = ''
      let dataPost = ''
      let type = 'encrypt'

      this.isDisable = true
      this.isLoading = true
      if (this.type == 'text') {
        if (this.originalText == '' && this.encodedText == '') {
          await this.$swal({
            title: 'Oops!',
            text: 'Isi salah satu dulu dong zeyeng 😘',
            width: '20rem',
            confirmButtonText: 'Ocay',
            confirmButtonColor: '#67C23A',
          })
          this.isDisable = false
          this.isLoading = false
          return
        } else if (this.originalText != '' && this.encodedText != '') {
          await this.$swal({
            title: 'Oops!',
            text: 'Klik "Clear" dulu ya zeyeng 😘',
            width: '20rem',
            confirmButtonText: 'Ocay',
            confirmButtonColor: '#67C23A',
          })
          this.isDisable = false
          this.isLoading = false
          return
        } else if (this.originalText != '') {
          url = process.env.VUE_APP_wc_tWOsG_eNc_VUE_APP_SnNGZIb_DofsdiS
          dataPost = { message: this.originalText }
        } else if (this.encodedText != '') {
          type = 'decrypt'
          url = process.env.VUE_APP_wc_tWOsG_dEc_VUE_APP_SnNGZIb_DofsdiS
          dataPost = { message: this.encodedText }
        }
      } else {
        if (this.image == null && this.encodedText == '') {
          await this.$swal({
            title: 'Oops!',
            text: 'Isi salah satu dulu dong zeyeng 😘',
            width: '20rem',
            confirmButtonText: 'Ocay',
            confirmButtonColor: '#67C23A',
          })
          this.isDisable = false
          this.isLoading = false
          return
        } else if (this.image != null && this.encodedText != '') {
          await this.$swal({
            title: 'Oops!',
            text: 'Klik "Clear" dulu ya zeyeng 😘',
            width: '20rem',
            confirmButtonText: 'Ocay',
            confirmButtonColor: '#67C23A',
          })
          this.isDisable = false
          this.isLoading = false
          return
        } else if (this.image != null) {
          url = process.env.VUE_APP_wc_tWOsG_uPl_VUE_APP_SnNGZIb_DofsdiS
          dataPost = { file: this.image }
        } else if (this.encodedText != '') {
          type = 'image'
          url = process.env.VUE_APP_wc_tWOsG_dEc_VUE_APP_SnNGZIb_DofsdiS
          dataPost = { message: this.encodedText }
        }
      }

      await axios
        .post(url, dataPost, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'r2-7zGymRUg_KP':
              process.env
                .VUE_APP_ryqJbkBUyS_VUE_APP_jpNbolSzbkBUS_LZqwFg_VUE_APP_mSzjRKNGkkdvlSKJnKj,
          },
        })
        .then(res => {
          if (type == 'encrypt') {
            this.encodedText = res.data.message
          } else if (type == 'decrypt') {
            this.originalText = res.data.message
          }
          this.isDisable = false
          this.isLoading = false
        })
        .catch(error => {
          alert(error)
          this.isDisable = false
          this.isLoading = false
        })
    },
    handleImageChange(file) {
      this.image = file
      this.imageUrl = URL.createObjectURL(this.image.raw)

      // this.uploadFile = file
      // let reader = new FileReader()
      // reader.readAsText(this.uploadFile.raw)
      // reader.onload = async (e) => {
      //   try {
      //     this.fileContent = JSON.parse(e.target.result)
      //   } catch (err) {
      //     console.log(`Load JSON file error: ${err.message}`)
      //   }
      // }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isLt2M
    },
  },
}
</script>

<style scoped>
.copyright {
  margin: 3rem 0 2rem 0;
  font-size: 10px;
}

.original-text {
  margin: 2rem 0 3rem 0;
}

input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 2rem;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin: 2rem;
}
</style>
