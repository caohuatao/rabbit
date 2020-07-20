<!--
 * User: CHT
 * Date: 2020/7/17
 * Time: 14:38
-->
<template>
  <el-container class="page-container rabbit__terminal-page">
    <el-header height="40px">
      <h3>Rabbit Terminal</h3>
      <el-button-group>
        <el-button
          @click="minus"
          type="text"
          icon="el-icon-minus">
        </el-button>
        <el-button
          @click="close"
          type="text"
          icon="el-icon-close">
        </el-button>
      </el-button-group>
    </el-header>
    <el-main class="terminal__container">
      <div ref="terminal-container"></div>
    </el-main>
    <el-footer height="32px"></el-footer>
  </el-container>
</template>

<script>
  import {Terminal} from 'xterm'
  import {FitAddon} from 'xterm-addon-fit'

  const {
    Client
  } = window.require('ssh2')

  const {
    ipcRenderer,
    remote
  } = window.require('electron')

  const win = remote.getCurrentWindow()

  export default {
    data() {
      return {
        terminal: new Terminal({
          cursorBlink: true,
          lineHeight: 1.2,
          allowTransparency: true,
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
      minus() {
        win.minimize()
      },
      close() {
        this.stream.write('exit \n')
        win.close()
      },

      linkSSH() {
        this.coon.connect({
          host: '141.164.57.205',
          port: '22',
          username: 'root',
          password: '+uV1cvx?*ya%(Qdg'
        })
      },
      sshReady() {
        this.coon.shell({
          term: 'xterm-color',
          cols: 300,
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
      },
      winResize() {
        this.fitAdd.fit()
      },
      terminalWrite(data) {
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
    opacity : 0.9;

    > .el-header {

    }

    > .el-main.terminal__container {
      padding          : 0 0 0 16px;
      overflow         : hidden;
      background-color : rgba(25, 35, 48, 0.8);

      > div {

        height          : 100%;
        overflow        : hidden;
        display         : flex;
        flex-direction  : column;
        justify-content : center;

        .xterm-helper-textarea {
          margin-top : -35px;
        }

        .xterm .xterm-viewport {

          &::-webkit-scrollbar,
          &::-webkit-scrollbar-track {
            width            : 16px;
            background-color : #1d2636
          }

          &::-webkit-scrollbar-thumb {
            background-color : #304057;
            border-radius    : 5px;
            border           : 2px solid #1d2636
          }

          &::-webkit-scrollbar-corner {
            background-color : #1d2636
          }
        }
      }


    }

    > .el-footer {
      height : 32px;
    }
  }
</style>
