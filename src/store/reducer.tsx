import {Map} from 'immutable';
import {TYPE} from './actions';
const defaultState = Map({
  cookie: null,
  id: null,
  currentSong: {
    id: 167850,
    name: '庐州月',
    imgUrl:
      'https://p2.music.126.net/3hqcQrXZ39kDCCzV7QbZjA==/34084860473122.jpg',
    songUrl: 'https://music.163.com/song/media/outer/url?id=167850.mp3',
    artists: [
      {
        id: 5771,
        name: '许嵩',
      },
    ],
    album: {
      id: 16951,
      name: '寻雾启示',
    },
  },
  audioMsg: {
    currentTime: 0,
    duration: 0,
  },
  audioIsPlay: false,
  currentScreen: null,
  audioSeekTime: 0,
  playSongList: [],
  songModalShow: false,
  playWay: 1,
});
export default (state = defaultState, action: any) => {
  switch (action.type) {
    case TYPE.SET_COOKIE:
      return state.set('cookie', action.cookie);
    case TYPE.SET_USERID:
      return state.set('id', action.id);
    case TYPE.SET_CURRENTSONG:
      return state.set('currentSong', action.currentSong);
    case TYPE.SET_AUDIOMSG:
      return state.set('audioMsg', action.audioMsg);
    case TYPE.SET_AUDIOISPLAY:
      return state.set('audioIsPlay', action.audioIsPlay);
    case TYPE.SET_CURRENTSCREEN:
      return state.set('currentScreen', action.currentScreen);
    case TYPE.SEEK_AUDIOTIME:
      return state.set('audioSeekTime', action.audioSeekTime);
    case TYPE.SET_PLAYSONGLIST:
      return state.set('playSongList', action.playSongList);
    case TYPE.SET_SONGMODALSHOW:
      return state.set('songModalShow', action.songModalShow);
    case TYPE.SET_PLAYWAY:
      return state.set('playWay', action.playWay);

    default:
      return state;
  }
};
