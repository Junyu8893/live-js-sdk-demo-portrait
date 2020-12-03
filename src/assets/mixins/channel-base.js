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
    }
  },

  methods: {
    getPlayerCtrl() {
      return this.portrait?.playerCtrl;
    }
  }
};
