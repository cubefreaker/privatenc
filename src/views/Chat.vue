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
              <el-card id="cardLeft">
                <div v-if="!e.status">
                  <el-row>
                    <el-col>
                      <p
                        style="font-style: italic;color:rgb(169, 169, 169);margin: -0.5rem 0 -0.5rem 0;"
                      >
                        &Oslash;Message was deleted
                      </p>
                    </el-col>
                  </el-row>
                </div>
                <div v-if="e.status">
                  <el-row>
                    <el-col id="textLeft">
                      {{
                        e.translated && translation[i]
                          ? translation[i]
                          : e.message
                      }}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <p id="timeLeft">
                        {{ e.date | moment('ddd, DD MMM YY, HH:mm') }}
                      </p>
                      <a
                        id="delBtnLeft"
                        @click="confirmDelete(i)"
                        v-show="$session.get('user') == e.user"
                        ><i class="el-icon-delete"></i
                      ></a>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row
            v-if="e.pos == 'right'"
            type="flex"
            class="chatbox-right"
            justify="end"
          >
            <el-col :lg="22" :xs="19" :sm="20">
              <el-card id="cardRight">
                <div v-if="!e.status">
                  <el-row>
                    <el-col>
                      <p
                        style="font-style: italic;color:rgb(245, 245, 245);margin: -0.5rem 0 -0.5rem 0;"
                      >
                        &Oslash;You deleted this message
                      </p>
                    </el-col>
                  </el-row>
                </div>
                <div v-if="e.status">
                  <el-row>
                    <el-col id="textRight">
                      {{
                        e.translated && translation[i]
                          ? translation[i]
                          : e.message
                      }}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <a
                        id="delBtnRight"
                        @click="confirmDelete(i)"
                        v-show="$session.get('user') == e.user"
                        ><i class="el-icon-delete"></i
                      ></a>
                      <p id="timeRight">
                        {{ e.date | moment('ddd, DD MMM YY, HH:mm') }}
                      </p>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
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
          <el-input
            type="textarea"
            :rows="2"
            @focus="onFocusTextBox"
            v-model="msg"
          ></el-input>
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
          user: e.user,
          translated: false,
          message: e.message,
          status: e.status,
          date: e.created_date,
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
        if (data.type == 'delete') {
          _.forEach(this.log, (e, i) => {
            if (data.message == e.message && data.date == e.date)
              this.log.splice(i, 1)
          })
        } else {
          this.log.push({
            pos: data.user == this.$session.get('user') ? 'right' : 'left',
            user: data.user,
            translated: false,
            message: data.message,
            date: data.date,
          })
        }
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
    confirmDelete(index) {
      this.$confirm('Delete this chat?', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true,
      })
        .then(async () => {
          let url = process.env.VUE_APP_wc_tWOsG_ChTdLt_VUE_APP_SnNGZIb_DofsdiS
          let dataPost = {
            channel: this.pusherChannel,
            event: this.pusherEvent,
            user: this.$session.get('user'),
            message: this.log[index].message,
            date: this.log[index].date,
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
              if (res.data.status == 'failed') {
                this.$message({
                  type: 'error',
                  message: 'Error : ' + res.data.message,
                })
              } else {
                this.$message({
                  type: 'success',
                  message: 'Chat deleted',
                })
              }
            })
            .catch(error => {
              this.$message({
                type: 'error',
                message: 'Error : ' + error,
              })
            })
        })
        .catch(() => {
          return
        })
    },
    async translate(index, msg) {
      _.forEach(this.log, (val, key) => {
        if (key != index) this.log[key].translated = false
      })

      if (!this.translation[index]) {
        let url = process.env.VUE_APP_wc_tWOsG_ChTrNsLT_VUE_APP_SnNGZIb_DofsdiS
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
    onFocusTextBox() {
      _.forEach(this.log, (val, key) => {
        this.log[key].translated = false
      })
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

#cardRight {
  background-color: rgba(255, 115, 190, 0.842);
}

#textLeft {
  margin-bottom: 1rem;
}

#textRight {
  color: rgb(255, 255, 255);
  margin-bottom: 1rem;
}

#delBtnLeft {
  font-size: small;
  color: rgb(255, 0, 0);
  margin: 0 0 -0.5rem 0;
  float: right;
}

#delBtnRight {
  font-size: small;
  color: rgb(245, 245, 245);
  margin: 0 0 -0.5rem 0;
  float: left;
}

#timeLeft {
  font-size: x-small;
  color: rgb(169, 169, 169);
  margin: 0rem 0 -0.5rem 0;
  float: left;
}

#timeRight {
  font-size: x-small;
  color: rgb(245, 245, 245);
  margin: 0 0 -0.5rem 0;
  float: right;
}
</style>
