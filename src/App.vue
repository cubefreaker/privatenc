<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@font-face {
  font-family: "Cookiemonster";
  src: local("Cookiemonster"),
   url('./assets/fonts/Cookiemonster-gv11.ttf') format("truetype");
}

#app {
  font-family: 'Cookiemonster', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
