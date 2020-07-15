<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="runCommand">run command</button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  const {ipcRenderer} = window.require('electron')
  const shell = window.require('shelljs')

  export default {
    name: 'Home',
    components: {
      HelloWorld
    },
    methods: {
      runCommand() {
        shell.exec('node -v', function (code, message) {
          if(code === 0) {
            console.log(message)
          }
        })
      }
    }
  }
</script>
