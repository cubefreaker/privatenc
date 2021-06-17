<template>
  <el-container>
    <el-main id="chat">
      <div class="history" v-if="log.length > 0">
        <div v-for="(e, i) in log" :key="i">
          <el-row
            v-if="e.pos == 'left'"
            type="flex"
            class="chatbox-left"
            justify="start"
          >
            <el-col :lg="1" :xs="3" :sm="2">
              <el-button
                type="primary"
                @click="translate(i, e.message)"
                icon="el-icon-user-solid"
                circle
              ></el-button>
            </el-col>
            <el-col :lg="22" :xs="19" :sm="20">
              <el-card>{{
                e.translated && translation[i] ? translation[i] : e.message
              }}</el-card>
            </el-col>
          </el-row>
          <el-row
            v-if="e.pos == 'right'"
            type="flex"
            class="chatbox-right"
            justify="end"
          >
            <el-col :lg="22" :xs="19" :sm="20">
              <el-card>{{
                e.translated && translation[i] ? translation[i] : e.message
              }}</el-card>
            </el-col>
            <el-col :lg="1" :xs="3" :sm="2">
              <el-button
                type="success"
                @click="translate(i, e.message)"
                icon="el-icon-user-solid"
                circle
              ></el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>
    <el-footer>
      <el-row type="flex" justify="space-between">
        <el-col :lg="20" :sm="19" :xs="17">
          <el-input type="textarea" :rows="2" v-model="msg"></el-input>
        </el-col>
        <el-col :lg="4" :sm="5" :xs="6">
          <el-button
            type="primary"
            icon="el-icon-s-promotion"
            :disabled="isDisable"
            :loading="isLoading"
            @click="sendMsg"
          >
            Send
          </el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import Pusher from 'pusher-js'

export default {
  data() {
    return {
      log: [],
      msg: '',
      historyId: '',
      pusherChannel: '',
      pusherEvent: '',
      translation: {},
      isDisable: false,
      isLoading: false,
    }
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  },
  created() {
    if (this.$session.exists()) {
      this.initChat()
    }
  },
  methods: {
    async initChat() {
      let url = process.env.VUE_APP_wc_tWOsG_gTCht_VUE_APP_SnNGZIb_DofsdiS
      await axios
        .post(
          url,
          { user: this.$session.get('user') },
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
          if (res.data.status == 'success') {
            this.historyId = res.data.historyId
            this.pusherChannel = res.data.channel
            this.pusherEvent = res.data.event
            this.subscribe()
            if (res.data.content.length > 0) this.mapLog(res.data.content)
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          alert(err)
        })
    },
    mapLog(arr) {
      this.log = _.map(_.cloneDeep(arr), e => {
        let data = {
          pos: e.user == this.$session.get('user') ? 'right' : 'left',
          translated: false,
          message: e.message,
        }
        return data
      })
    },
    subscribe() {
      let pusher = new Pusher(
        process.env.VUE_APP_ryPqgUbkSuHyfER_VUE_APP_jpKnbEolSzbYkhst_LZqwFg,
        {
          cluster:
            process.env.VUE_APP_ryPqgUbkSuHyfER_VUE_APP_jpCnbLolUzbYkhSt_TrqEgR,
        }
      )
      let channel = pusher.subscribe(this.pusherChannel)
      channel.bind(this.pusherEvent, data => {
        this.log.push({
          pos: data.user == this.$session.get('user') ? 'right' : 'left',
          translated: false,
          message: data.message,
        })
      })
    },
    async sendMsg() {
      this.isDisable = true
      this.isLoading = true

      let url = process.env.VUE_APP_wc_tWOsG_ChT_VUE_APP_SnNGZIb_DofsdiS
      let dataPost = {
        channel: this.pusherChannel,
        event: this.pusherEvent,
        user: this.$session.get('user'),
        message: this.msg,
        historyId: this.historyId,
      }

      if (this.msg != '' && this.msg != null)
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
            if (res.data.status == 'failed') {
              alert('failed')
              this.isDisable = false
              this.isLoading = false
            } else {
              this.msg = ''
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
    async translate(index, msg) {
      let url = process.env.VUE_APP_wc_tWOsG_ChTrNsLT_VUE_APP_SnNGZIb_DofsdiS
      if (!this.translation[index]) {
        await axios
          .post(
            url,
            { msg: msg },
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
            if (res.data.status == 'failed') {
              alert(res.data.message)
            } else {
              this.translation[index] = res.data.decodedMsg
              this.log[index].translated = true
            }
          })
          .catch(error => {
            alert(error)
          })
      } else {
        this.log[index].translated = !this.log[index].translated
      }
    },
  },
  updated: function() {
    this.$nextTick(function() {
      window.scrollTo(0, document.body.scrollHeight)
    })
  },
}
</script>

<style scoped>
.el-container {
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
  bottom: 3rem;
  width: 100%;
}

.history {
  overflow: auto;
}

.chatbox-left {
  margin: 0 0 1rem 0rem;
  text-align: start;
}

.chatbox-right {
  margin: 0 0 1rem 0rem;
  text-align: end;
}

.el-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
