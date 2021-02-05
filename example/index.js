import PolyvPortraitWatch from '../src/index.js';
import VConsole from 'vconsole';

new PolyvPortraitWatch({
  el: document.getElementById('portrait-view'),
  appId: 'APP_ID',
  appSecret: 'APP_SECRET',
  channelId: 'CHANNEL_ID',
  appId: 'fj1yxfco1y',
  appSecret: '3368101b2257406b9543968d6e958767',
  // verifyUrl: '/getSign',
  //  channelId: '1955567',
  // vid: 'd20ca4cc3c6b4062b99630d4751719e8_d',
  channelId: '1778938',
  // channelId: '1999094',
  // vid: 'd20ca4cc3cb48d872fa4324fa7431480_d',
  // vid: 'd20ca4cc3c27d19187ef9424ad8b5de0_d',
  // 长投账号
  // appId: 'fsp9g50o5j',
  // appSecret: 'fcbdb6e6f53a4997bdade93a2c27fc4a',
  appId: 'fsgevssc2y',
  appSecret: '92ec9723ea3549b78436915517bbb039',
  // channelId: '2060253',
  // channelId: '2126859',
  // channelId: '2128262',
  channelId: '2126859',
  // vid: '48261af725153c7846708afe74ca1213_4',
  // vodType: 'vod',
  user: {
    userId: '123456',
    userName: 'polyv-test',
  }
});

new VConsole();
