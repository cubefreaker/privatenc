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
              :disabled="disableStat"
              @click="reset"
              ><i class="el-icon-close"></i> Reset</el-button
            >
            <el-button
              round
              type="success"
              :disabled="disableStat"
              @click="translate"
            >
              <i v-show="!isLoading" class="el-icon-sort"></i>
              <i v-show="isLoading" class="el-icon-loading"></i>
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
      <div class="copyright">@copyright mas-mas ganteng 2021</div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      originalText: '',
      encodedText: '',
      disableStat: false,
      isLoading: false,
    }
  },
  methods: {
    reset() {
      console.log('reset')
    },
    translate() {
      console.log(process.env)
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
