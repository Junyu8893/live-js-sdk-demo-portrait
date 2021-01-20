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
  // vid: 'd20ca4cc3cb48d872fa4324fa7431480_d',
  // appId: 'fsp9g50o5j',
  // appSecret: 'fcbdb6e6f53a4997bdade93a2c27fc4a',
  // channelId: '2099464',
  // vid: '48261af725106893a8cf61328849d969_4',
  // vodType: 'vod',
  user: {
    userId: '123456',
    userName: 'polyv-test',
  }
});

// new VConsole();
