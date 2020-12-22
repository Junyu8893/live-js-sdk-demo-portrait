import Vue from 'vue';
import { config } from '../../assets/utils/config';
import { liveSdk } from '../../assets/live-sdk/live-sdk';

export default {
  data() {
    return {
      interactiveVisible: false
    };
  },

  methods: {
    initInteractive() {
      const { user } = config;
      // 注册互动功能SDK
      if (window?.PolyvInteractiveSDK?.lottery) {
        Vue.use(window.PolyvInteractiveSDK.lottery, {
          userInfo: () => {
            return {
              userId: user.userId,
              nick: user.userName,
              pic: user.avatar,
            };
          },
          channelInfo: () => {
            return {
              channelId: liveSdk.channelId,
              roomId: liveSdk.roomId,
            };
          },
          locale: () => {
            return 'zh_CN';
          },
        });
        this.interactiveVisible = true;
      }
    },
    updateInteractive() {
      this.$ira.updateConfig({
        socket: liveSdk.socket,
      });
    }
  }
};
