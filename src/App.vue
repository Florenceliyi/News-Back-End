<template>
  <div id="app">
    <router-view name="login"></router-view>
    <router-view name="backEnd"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
}

a:hover {
  text-decoration: none;
}

ul,
li,
ol {
  list-style: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  height: 100vh;
  background: #faf6f5;
}
</style>