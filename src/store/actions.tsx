import {setData, getData} from '../storage';
import consoleRn from 'reactotron-react-native';

import {songDetail, lyric, songUrl, djDetail} from '../api';
function getSongUrl(id: string | number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
export const TYPE = {
  SET_COOKIE: 'SET_COOKIE',
  SET_USERID: 'SET_USERID',
  SET_CURRENTSONG: 'SET_CURRENTSONG',
  SET_AUDIOMSG: 'SET_AUDIOMSG',
  SET_AUDIOISPLAY: 'SET_AUDIOISPLAY',
  SET_CURRENTSCREEN: 'SET_CURRENTSCREEN',
  SEEK_AUDIOTIME: 'SEEK_AUDIOTIME',
  SET_PLAYSONGLIST: 'SET_PLAYSONGLIST',
  SET_SONGMODALSHOW: 'SET_SONGMODALSHOW',
  SET_PLAYWAY: 'SET_PLAYWAY',
};
/**
 * 设置用户信息
 */
export const setCookieAction = (cookie: string | number) => ({
  type: TYPE.SET_COOKIE,
  cookie,
});
export const setUserIdAction = (id: string | number) => ({
  type: TYPE.SET_USERID,
  id,
});
export const changeSongAction = (currentSong: object | any) => ({
  type: TYPE.SET_CURRENTSONG,
  currentSong,
});
export const changeAudioMsgAction = (audioMsg: object | any) => ({
  type: TYPE.SET_AUDIOMSG,
  audioMsg,
});
export const seekAudioTimeAction = (audioSeekTime: string | number) => ({
  type: TYPE.SEEK_AUDIOTIME,
  audioSeekTime,
});

export const changeAudioPlayAction = (audioIsPlay: boolean) => ({
  type: TYPE.SET_AUDIOISPLAY,
  audioIsPlay,
});
export const getCurrentScreenAction = (currentScreen: string | any) => ({
  type: TYPE.SET_CURRENTSCREEN,
  currentScreen,
});
export const changeplaySongListAction = (playSongList: any[]) => ({
  type: TYPE.SET_PLAYSONGLIST,
  playSongList,
});
export const changeplaySongModalAction = (songModalShow: boolean) => ({
  type: TYPE.SET_SONGMODALSHOW,
  songModalShow,
});
export const changeplayWayAction = (playWay: number) => ({
  type: TYPE.SET_PLAYWAY,
  playWay,
});

export const setCookie = (cookie: string | number) => {
  return (dispatch: any) => {
    // console.log('setCookie :>> ', cookie);
    setData('cookie', cookie);
    dispatch(setCookieAction(cookie));
  };
};
export const setUseId = (id: string | number | any) => {
  return async (dispatch: any) => {
    await setData('userId', id);
    dispatch(setUserIdAction(id));
  };
};
export const setSongAction = (item: string | number | any) => {
  let djType = item instanceof Object;
  return async (dispatch: any) => {
    const {data}: any = await songUrl({id: djType ? item.mainSong.id : item});
    let currentSong = {};
    const songGetData: object | any = await songDetail({ids: item});
    const songRes = songGetData && songGetData.songs && songGetData.songs[0];
    if (!djType) {
      currentSong = {
        id: songRes.id,
        name: songRes.name,
        imgUrl: songRes.al && songRes.al.picUrl,
        artists: songRes.ar || songRes.artists,
      };
      console.log('songRes :>> ', songRes, songRes.id);
    } else {
      const resDj: object | any = await djDetail({rid: item.radio.id});
      currentSong = {
        id: resDj.data.id,
        name: resDj.data.name,
        imgUrl: resDj.data.picUrl,
        artists: [{name: resDj.data.name}],
      };
    }
    if (data && data[0] && data[0].url && data[0].url !== '') {
      currentSong = {...currentSong, ...{musicUrl: data[0].url}};
    } else {
      currentSong = {...currentSong, ...{musicUrl: getSongUrl(songRes.id)}};
    }
    console.log('currentSong :>> ', currentSong);
    setData('currentSong', currentSong);
    dispatch(changeSongAction(currentSong));
  };
};
