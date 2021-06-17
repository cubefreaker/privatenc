<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="space-around">
        <el-col :lg="8" :sm="6" :xs="1"></el-col>
        <el-col :lg="8" :sm="12" :xs="22">
          <el-card>
            <el-form label-width="75px">
              <el-form-item label="Username">
                <el-input v-model="username"></el-input>
              </el-form-item>
              <el-form-item label="Password">
                <el-input type="password" v-model="password"></el-input>
              </el-form-item>
            </el-form>
            <el-button
              type="primary"
              :disabled="isDisable"
              :loading="isLoading"
              @click="login"
            >
              Login
            </el-button>
          </el-card>
        </el-col>
        <el-col :lg="8" :sm="6" :xs="1"></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      isDisable: false,
      isLoading: false,
    }
  },
  beforeCreate: function() {
    if (this.$session.exists()) {
      this.$router.push('/chat')
    }
  },
  methods: {
    async login() {
      this.isDisable = true
      this.isLoading = true
      let url = process.env.VUE_APP_wc_tWOsG_LgN_VUE_APP_SnNGZIb_DofsdiS
      let dataPost = {
        user: this.username,
        pass: this.password,
      }

      if (
        this.username != '' &&
        this.username != null &&
        this.password != '' &&
        this.password != null
      )
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
            if (res.data.status == 'success') {
              this.isDisable = false
              this.isLoading = false

              this.$session.start()
              this.$session.set('jwt', res.data.accessToken)
              this.$session.set('user', res.data.user)
              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + res.data.accessToken
              this.$router.push('/chat')
            } else {
              alert(res.data.message)
              this.isDisable = false
              this.isLoading = false
            }
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
.el-container {
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
  width: 100%;
}
</style>
