<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Progress</router-link> |
      <router-link to="/about">TimePick</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
html{
  font-size: 10px;
}
ul, li{
  padding: 0;
  margin: 0;
}
@media only screen and (min-device-width: 320px){
  body, html {
    font-size: 8.88888889px;
  }
}

@media only screen and (min-device-width: 360px){
  body, html {
    font-size: 10px;
  }
}

@media only screen and (min-device-width: 375px){
  body, html {
    font-size: 10.41666667px;
  }
}

@media only screen and (min-device-width: 400px){
  body, html {
    font-size: 11.11111111px;
  }
}

@media only screen and (min-device-width: 414px){
  body, html {
    font-size: 11.5px;
  }
}

@media only screen and (min-device-width: 480px){
  body, html {
    font-size: 13.33333333px;
  }
}

@media only screen and (min-device-width: 540px){
  body, html {
    font-size: 15px;
  }
}

@media only screen and (min-device-width: 600px){
  body, html {
    font-size: 16.66666667px;
  }
}

@media only screen and (min-device-width: 640px){
  body, html {
    font-size: 17.77777778px;
  }
}

@media only screen and (min-device-width: 720px){
  body, html {
    font-size: 20px;
  }
}

@media only screen and (min-device-width: 800px){
  body, html {
    font-size: 22.22222222px;
  }
}

@media only screen and (min-device-width: 960px){
  body, html {
    font-size: 26.66666667px;
  }
}

@media only screen and (min-device-width: 1080px){
  body, html {
    font-size: 30px;
  }
}

</style>
