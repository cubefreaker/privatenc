<template>
  <el-container>
    <el-header height="100px"
      ><img alt="Header logo" src="../assets/img/header.png" height="100px"
    /></el-header>
    <el-main>
      <div class="original-text">
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
              type="primary"
              @click="goToChat"
              icon="el-icon-chat-line-round"
            >
              Chat
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
      originalText: '',
      encodedText: '',
      isDisable: false,
      isLoading: false,
    }
  },
  methods: {
    reset() {
      this.originalText = ''
      this.encodedText = ''
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
        dataPost = this.originalText
      } else if (this.encodedText != '') {
        type = 'decrypt'
        url = process.env.VUE_APP_wc_tWOsG_dEc_VUE_APP_SnNGZIb_DofsdiS
        dataPost = this.encodedText
      }

      await axios
        .post(
          url,
          { message: dataPost },
          {
            headers: {
            'Access-Control-Allow-Origin': '*',
              'r2-7zGymRUg_KP':
                process.env
                  .VUE_APP_ryqJbkBUyS_VUE_APP_jpNbolSzbkBUS_LZqwFg_VUE_APP_mSzjRKNGkkdvlSKJnKj,
            },
          }
        )
        .then(res => {
          if (type == 'encrypt') {
            this.encodedText = res.data.message
          } else {
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
</style>
