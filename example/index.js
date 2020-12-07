import PolyvPortraitWatch from '../src/index.js';
import VConsole from 'vconsole';

new PolyvPortraitWatch({
  el: document.getElementById('portrait-view'),
  appId: 'fj1yxfco1y',
  appSecret: '3368101b2257406b9543968d6e958767',
  // verifyUrl: '/getSign',
  // channelId: '1955567',
  // vid: 'd20ca4cc3c6b4062b99630d4751719e8_d',
  channelId: '1778938',
  vid: 'd20ca4cc3cb48d872fa4324fa7431480_d',
  user: {
    userId: '123456',
    userName: 'polyv-test',
  }
});

// new VConsole();
