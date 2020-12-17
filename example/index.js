import PolyvPortraitWatch from '../src/index.js';
import VConsole from 'vconsole';

new PolyvPortraitWatch({
  el: document.getElementById('portrait-view'),
  appId: 'APP_ID',
  appSecret: 'APP_SECRET',
  appId: 'fsp9g50o5j',
  appSecret: 'fcbdb6e6f53a4997bdade93a2c27fc4a',
  channelId: '2055818',
  // channelId: '1955567',
  // vid: 'd20ca4cc3c6b4062b99630d4751719e8_d',
  // channelId: '1778938',
  // vid: 'd20ca4cc3c440fdc0c0a358c5c10875e_d',
  // vodType: 'vod',
  user: {
    userId: '123456',
    userName: 'polyv-test',
  }
});

// new VConsole();
