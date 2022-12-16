<template>
  <div class="detail-container">
    <div class="detail-container-left">
      <div class="detail-container-left-box">
        <el-descriptions class="margin-top" :column="3" border direction="vertical">
          <el-descriptions-item span="2">
            <template slot="label">
              <i class="el-icon-star-on"></i>
              Title
            </template>
            {{ detail.title || '无' }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              Aid
            </template>
            {{ detail.aid || '无' }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              Timestamp
            </template>
            {{ detail.timestamp || '无' }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              Category
            </template>
            {{ detail.category || '无' }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              Authors
            </template>
            {{ detail.authors || '无' }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              Tags
            </template>
            {{ detail.tags || '无'  }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              Language
            </template>
            {{ detail.language || '无' }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              ReadNum
            </template>
            {{ detail.readNum || '无' }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              AgreeNum
            </template>
            {{ detail.agreeNum || '无' }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              ShareNum
            </template>
            {{ detail.shareNum || '无' }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              CommentNum
            </template>
            {{ detail.commentNum || '无' }}
          </el-descriptions-item>
          <el-descriptions-item span="3">
            <template slot="label">
              Abstract
            </template>
            {{ detail.articleAbstract || '无' }}
          </el-descriptions-item>
          <el-descriptions-item span="3">
            <template slot="label">
              Text
            </template>
            {{ detail.text || '无' }}
          </el-descriptions-item>
          <el-descriptions-item span="3">
            <template slot="label">
              Image&Video
            </template>
            <div v-show="detail.video">
              <video id="videoElement" controls autoplay muted width="40%"/>
            </div>
            <!-- {{ detail.imageList }} {{ detail.video }} -->
            <div v-for="(img,index) in detail.imageList" :key="index">
              <img :src="parseImageUrl(img)" style="width: 30%; margin-right: 3px; float: left "/>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
  data () {
    return {
      aid: '',
      detail: {}
    }
  },
  mounted () {
    // if (flvjs.isSupported()) {
    //   var videoElement = document.getElementById('videoElement')
    //   this.flvPlayer = flvjs.createPlayer({
    //     type: 'flv',
    //     isLive: true,
    //     hasAudio: false,
    //     url: 'http://localhost:8080/blog/video/1'
    //     // 自己的flv视频流
    //   })
    //   this.flvPlayer.attachMediaElement(videoElement)
    //   this.flvPlayer.load()
    //   this.flvPlayer.play()
    // }
  },
  watch: {
    '$route' (to, from) {
      this.state = this.$route.params.state
      for (let key in this.showInput) {
        this.showInput[key] = false
      }
    }
  },
  methods: {
    getArticleDetail (aid, uid) {
      this.$store.dispatch('getArticleDetail', {
        uid: uid,
        aid: aid
      }).then(res => {
        this.detail = res.data
        console.log('display video')
        if (res.data.video && flvjs.isSupported()) {
          var videoElement = document.getElementById('videoElement')
          this.flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            hasAudio: false,
            url: 'http://localhost:8080/blog/video/' + res.data.video
            // 自己的flv视频流
          })
          this.flvPlayer.attachMediaElement(videoElement)
          this.flvPlayer.load()
          this.flvPlayer.play()
        }
      })
    },
    parseImageUrl (name) {
      return 'http://localhost:8080/blog/picture/' + name
    },
    play () {
      this.flvPlayer.play()
    }
  }
}
</script>

<style lang="less">
.detail-container {
  position: relative;
  background-color: #E9EEF3;
  height: 100%;
  flex: 1 0 900px;
  box-sizing: border-box;
  .detail-container-left {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 20px;
  }
  .detail-container-left-box {
    width: 96%;
    margin: 20px;
    box-sizing: border-box;
  }
  .detail-container-right {
    position: absolute;
    top: 40px;
    right: 40px;
    height: 90%;
    width: 30%;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    &-title {
      padding: 10px;
      font-size: 24px;
      font-weight: 700;
      text-align: left;
    }
    .doc-body-box {
      padding: 10px;
      flex: 1 0 500px;
      text-align: left;
      overflow-y: auto;
      overflow-x: hidden;
      .highlight {
        background-color: #f0ff1e;
      }
      .text-indent {
        margin-left: 2em;
      }
      &-result-item {
        &:nth-child(1) {
          color: red;
        }
        &:nth-child(2) {
          color: rgb(255, 72, 0);
        }
        &:nth-child(3) {
          color: orange;
        }
      }
    }
    &-btn-box {
      padding: 10px;
    }
  }
}
.detail-text {
  text-indent: 24px;
}
.el-icon-edit {
  cursor: pointer;
}
.detail-comment-box {
  margin: 50px 0;
  background-color: #fff;
  padding: 10px;
  text-align: left;
  &-title {
    font-size: 24px;
    font-weight: 700;
  }
  &-empty {
    padding-top: 5px;
    color: #aaa;
  }
  &-card {
    border-bottom: 1px solid #ccc;
    text-align: left;
    padding-left: 5px;
    &-header {
      padding: 5px 0;
    }
    &-time {
      font-size: 14px;
      color: #aaa;
    }
    &-ref {
      background-color: #eee;
      color: #888;
      padding: 5px;
    }
    &-body {
      padding: 5px 0;
    }
    &-footer {
      cursor: pointer;
      font-size: 12px;
      color: #888;
      padding: 5px 0;
    }
  }
  &-create {
    text-align: left;
    &-title {
      padding: 5px 0;
      font-weight: 700;
    }
    &-ref {
      background-color: #eee;
      padding: 5px;
      margin-bottom: 10px;
      color: #888;
    }
    &-btn {
      text-align: right;
      padding-top: 10px;
    }
  }
}
</style>
