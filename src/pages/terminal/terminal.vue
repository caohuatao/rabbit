<!--
 * User: CHT
 * Date: 2020/7/17
 * Time: 14:38
-->
<template>
  <el-container class="page-container rabbit__terminal-page">
    <el-header height="40px"></el-header>
    <el-main>
      <div ref="terminal-container"></div>
    </el-main>
  </el-container>
</template>

<script>
  import {Terminal} from 'xterm'
  import {FitAddon} from 'xterm-addon-fit'

  const {Client} = window.require('ssh2')

  export default {
    data() {
      return {
        terminal: new Terminal({
          cursorBlink: true,
          theme: {
            foreground: 'rgba(199,237,204,255)', //字体
            background: 'rgba(0,0,0,0)', //背景色
            cursor: 'help'//设置光标
          }
        }),
        fitAdd: new FitAddon(),
        coon: new Client(),
        stream: null
      }
    },
    created() {

      window.addEventListener('resize', this.winResize)
      this.$once('hook:beforeDestroy', () => {
        this.stream.write('exit \n')
        window.removeEventListener('resize', this.winResize)
      })
    },
    mounted() {
      this.terminal.loadAddon(this.fitAdd)
      this.terminal.open(this.$refs['terminal-container'])
      this.terminal.focus()
      this.fitAdd.fit()
      this.terminal.onData(this.terminalOnData)

      this.linkSSH()
      this.coon.on('ready', this.sshReady)
    },
    methods: {
      linkSSH() {
        this.coon.connect({
          host: '192.168.2.30',
          port: '22',
          username: 'root',
          password: '123456'
        })
      },
      sshReady() {
        this.coon.shell({
          term: 'xterm-color',
          cols: 210,
          rows: 55
        }, this.sshShell)
      },
      sshShell(err, stream) {
        if (err) {
          console.log(err)
        } else {
          this.stream = stream
          stream.on('data', this.terminalWrite)
        }
        this.coon.exec('ll', {}, (err, stream) => {
          console.log(stream)
        })
      },

      winResize() {
        this.fitAdd.fit()
      },
      terminalWrite(data) {
        console.log(data.toString())
        this.terminal.write(data.toString())
      },
      terminalOnData(data) {
        if (this.stream) {
          this.stream.write(data)
        }
      }
    }
  }
</script>

<style lang="less">
  .rabbit__terminal-page {
    height : 100%;
    width  : 100%;

    > .el-header {
      -webkit-user-select : none;
      -webkit-app-region  : drag;
    }

    > .el-main {
      padding : 0;
      height  : calc(100% - 40px);

      > div {
        height : 100%;
      }
    }
  }
</style>
