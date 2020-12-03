<template>
  <div
    data-player-click
    class="c-chat g-iphone-x-pb">
    <div
      data-player-click
      class="c-chat__content">
      <!-- 欢迎语 -->
      <welcome />
      <!-- 打赏动效 -->
      <donate-tips />
      <!-- 聊天室 -->
      <chat-list :channel="channel" />

      <div
        :class="[
          'c-chat__control',
        ]">
        <!-- 输入提示 -->
        <input-tips />
        <!-- 右侧按钮 -->
        <div class="c-chat__control__right">
          <!-- 购物车入口 -->
          <div
            v-if="productEnabled"
            class="c-chat__control__btn">
            <div
              data-shopping-btn
              class="c-chat__control__btn__inner g-icon i-shop-car"
              @click="showProductList"></div>
          </div>
          <!-- 打赏入口 -->
          <div
            v-if="donateGoodEnabled"
            class="c-chat__control__btn">
            <div
              data-shopping-btn
              class="c-chat__control__btn__inner g-icon i-donate"
              @click="showDonate"></div>
          </div>
          <!-- 更多&点赞 -->
          <div
            class="c-chat__control__btn">
            <!-- 点赞 -->
            <like
              class="c-chat__control__btn__inner--like"
              :seatType="!playerMenuBarVisible ? 'deviation' : ''"
              :channel="channel" />
            <!-- 更多 -->
            <div
              v-if="playerMenuBarVisible"
              class="c-chat__control__btn__inner c-chat__control__btn__inner--more g-icon i-more"
              @click="showPlayerSetting"></div>
          </div>
        </div>
      </div>

      <!-- 输入留言 -->
      <msg-input />
    </div>
  </div>
</template>

<script>
import {
  bus,
  DONATE_VISIABLE,
  SHOPPING_VISIBLE,
  PLAYER_SETTING_VISIBLE,
} from '../../assets/utils/event-bus';
import channelBaseMixin from '../../assets/mixins/channel-base';
import InputTips from '../Form/InputTips';
import DonateTips from '../Donate/DonateTips';
import Welcome from '../Welcome/Welcome';
import ChatList from '../ChatList/ChatList';
import MsgInput from '../Form/MsgInput';
import Like from '../Like/Like';

export default {
  mixins: [channelBaseMixin],

  components: {
    InputTips,
    DonateTips,
    Welcome,
    ChatList,
    MsgInput,
    Like,
  },

  methods: {
    showDonate() {
      bus.$emit(DONATE_VISIABLE, true);
    },
    showProductList() {
      bus.$emit(SHOPPING_VISIBLE, true);
    },
    showPlayerSetting() {
      bus.$emit(PLAYER_SETTING_VISIBLE, true);
    },
  }
};
</script>

<style>
.c-chat {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 10;
}
.c-chat__content {
  height: 100%;
  position: relative;
}
.c-chat__control {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: flex-end;
}
.c-chat__control__right {
  margin-left: auto;
  display: flex;
  align-items: flex-end;
  z-index: 11;
}
.c-chat__control .c-input-tips {
  margin-right: auto;
}
.c-chat__control__btn {
  margin-left: 16px;
}
.c-chat__control__btn__inner {
  width: 32px;
  height: 32px;
}
.c-chat__control__btn__inner--like + .c-chat__control__btn__inner--more {
  margin-top: 16px;
}
</style>
