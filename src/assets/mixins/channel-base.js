export default {
  inject: {
    portrait: {
      default: ''
    }
  },

  props: {
    channel: Object
  },

  computed: {
    channelData() {
      return this.channel || this.channelDetail;
    },

    playerData() {
      return this.playerState || this.portrait?.playerState || {};
    },

    portraitData() {
      return this.portraitState || this.portrait.portraitState || {};
    },

    liveStatus() { return this.playerData?.liveStatus; },
    playerMode() { return this.playerData?.playerMode; },
    lines() { return this.playerData?.lines; },
    currentLine() { return this.playerData?.currentLine; },
    warmupType() { return this.playerData?.warmupType; },
    multirateEnabled() { return this.playerData?.multirateEnabled; },
    definitions() { return this.playerData?.definitions; },
    currentDefinition() { return this.playerData?.currentDefinition; },
    playerStatus() { return this.playerData?.playerStatus; },
    streamType() { return this.playerData?.streamType; },
    isPlayed() { return this.playerData?.isPlayed; },
    closedRoom() { return this.portraitData.closedRoom; },

    // 是否处于回放中
    isPlaybacking() {
      return !!this.portrait?.vid;
    },

    /**
     * 是否有音视频状态(或)
     * 1. 有直播
     * 2. 没直播但有暖场视频
     * 3. 正在回放
     */
    hasVideo() {
      const rule1 = this.liveStatus === 'live';
      const rule2 = this.liveStatus !== 'live' && this.warmupType === 'video';
      const rule3 = this.isPlaybacking;
      return rule1 || rule2 || rule3;
    },

    /**
     * 播放按钮是否显示
     * 1. 播放状态为暂停
     * 2. 暂无直播没显示
     * 3. 有视频显示中
     */
    playerButtonVisible() {
      const rule1 = this.playerStatus === 'stoped';
      const rule2 = !this.notLiveVisible;
      const rule3 = this.hasVideo;
      return rule1 && rule2 && rule3;
    },

    /**
     * 是否显示暂无直播
     * 1. 当前没直播
     * 2. 没设置暖场内容
     * 3. 当前不是回放中
     */
    notLiveVisible() {
      const rule1 = this.liveStatus !== 'live';
      const rule2 = this.warmupType === '';
      const rule3 = !this.isPlaybacking;
      return rule1 && rule2 && rule3;
    },

    /**
     * 是否正在音频直播中
     * 1. 推流方式为音频模式
     * 2. 推流状态为正在推流
     */
    isAudioLiving() {
      return this.liveStatus === 'live' && this.streamType === 'audio';
    },

    /**
     * 是否显示音频播放(或)
     * 1. 正在音频直播
     * 2. 播放模式为音频模式
     */
    audioVisible() {
      const rule1 = this.isAudioLiving;
      const rule2 = this.playerMode === 'audio';
      return rule1 || rule2;
    },

    /**
     * 是否显示音视频切换按钮
     * 1. 正在直播
     * 2. 当前正在音频直播中，不能切换到视频播放
     */
    setPlayModeVisible() {
      const rule1 = this.liveStatus === 'live' || this.isPlaybacking;
      const rule2 = !this.isAudioLiving;
      return rule1 && rule2;
    },

    /**
     * 是否显示清晰度切换
     * 1. 多码率开关开启
     * 2. 多码率列表不为空
     * 3. 正在直播
     */
    setMultirateVisible() {
      const rule1 = this.ynToBool(this.multirateEnabled);
      const rule2 = this.definitions.length;
      const rule3 = this.liveStatus === 'live';
      return rule1 && rule2 && rule3;
    },

    /**
     * 播放器菜单栏是否显示(或)
     * 1. 可以设置音视频切换
     * 2. 可以设置多码率
     */
    playerMenuBarVisible() {
      return this.setPlayModeVisible || this.setMultirateVisible;
    },

    // 道具打赏开关
    donateGoodEnabled() {
      const channel = this.channelData;
      return this.ynToBool(channel?.donateSetting?.donateGoodEnabled || 'Y');
    },

    // 商品库开关
    productEnabled() {
      const channel = this.channelData;
      const menus = channel.channelMenus || [];
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].menuType === 'buy') {
          return true;
        }
      }
      return false;
    },

    // 点赞是否显示
    likeVisible() {
      return !this.isPlaybacking;
    },

    /**
     * 进度条是否显示
     * 1. 回放中
     * 2. 正片已开始播放
     */
    progressBarVisible() {
      const rule1 = this.isPlaybacking;
      const rule2 = this.isPlayed;
      return rule1 && rule2;
    },

    /**
     * 进度条是否占据一整行
     * 判断规则：底部左侧有按钮则占据一整行
     * 1. 回放发送消息按钮显示了
     * 2. 回放列表或章节按钮显示了
     */
    progressBarIsBlock() {
      return this.leftBottomHasSomething;
    },

    /**
     * 回放下的发送消息按钮是否显示
     * 1. 回放中
     * 2. 聊天未被关闭
     */
    sendMsgBtnVisible() {
      const rule1 = this.isPlaybacking;
      const rule2 = !this.closedRoom;
      return rule1 && rule2;
    },

    /**
     * 聊天室列表的样式
     * 1. 非回放下：46px
     * 2. 回放+进度条显示+进度条block显示：85px
     * 3. 回放+进度条显示+进度条inline显示：46px
     */
    chatListStyle() {
      const style = {
        bottom: '62px',
      };
      if (this.isPlaybacking) {
        if (this.progressBarVisible && this.progressBarIsBlock) {
          // 进度条显示且占据一整行
          style.bottom = '100px';
        } else if (this.progressBarVisible && !this.progressBarIsBlock) {
          // 进度条显示且不占据一整行
          style.bottom = '62px';
        } else if (!this.progressBarVisible && !this.leftBottomHasSomething) {
          // 进度条不显示且左下角没有按钮
          style.bottom = '16px';
        }
      }
      return style;
    },

    /**
     * 左下角是否有按钮显示
     */
    leftBottomHasSomething() {
      return this.sendMsgBtnVisible;
    }
  },

  methods: {
    getPlayerCtrl() {
      return this.portrait?.playerCtrl;
    }
  }
};
