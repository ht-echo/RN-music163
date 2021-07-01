import {PermissionsAndroid, Platform} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {Toast} from '@ant-design/react-native';

const RNFS = require('react-native-fs'); //文件处理
const storeLocation = `${RNFS.DocumentDirectoryPath}`;
// 安卓上传图片
async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export async function saveImg(url: string) {
  // if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
  //   return;
  // }
  let pathName =
    new Date().getTime() + Math.floor(Math.random() * 1000) + 'xg.png';
  let downloadDest = `${storeLocation}/${pathName}`;
  const ret = RNFS.downloadFile({fromUrl: url, toFile: downloadDest});
  ret.promise.then((res: object | any) => {
    if (res && res.statusCode === 200) {
      var promise = CameraRoll.saveToCameraRoll('file://' + downloadDest);
      promise
        .then(function (result) {
          // 保存成功
          console.log('图片保存成功');
          Toast.success('保存成功', 2, undefined, false);
        })
        .catch(function (error) {
          // 保存失败
          console.log('图片保存失败');
          Toast.fail('保存失败', 2, undefined, false);
        });
    }
  });
}
export const getPlayCount = (playNum: number) => {
  if (!playNum) return;
  const result = Math.floor(playNum / 10000);
  if (result >= 1 && result < 10000) {
    return result + '万';
  } else if (result >= 10000) {
    return (result / 10000).toFixed(1) + '亿';
  } else {
    return String(playNum);
  }
};
export const getTime = (time: number) => {
  const h = Math.floor(time / 1000 / 60 / 60);
  const m = Math.floor((time / 1000 / 60) % 3600);
  const s = Math.floor((time / 1000) % 60);

  return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
};
interface SongNextParams {
  num: number;
  currentSong: object | any;
  playSongList: any[];
  playWay: number;
}
export const getSongNext = ({
  num,
  currentSong,
  playSongList,
  playWay,
}: SongNextParams) => {
  const songIndex: number = playSongList.findIndex(
    (v: any) => currentSong.id == (v.id || v.resourceId),
  );
  if (songIndex === -1) return;
  let playIndex = songIndex;
  if (playSongList.length > 0 && playSongList[songIndex + num]) {
    if (playWay === 1) {
      playIndex = songIndex + num;
    } else if (playWay === 2) {
      const max = playSongList.length - 1;
      const randomNum = Math.floor(Math.random() * max + 1);
      playIndex = randomNum;
    }
  } else if (playSongList.length > 0 && !playSongList[songIndex + num]) {
    playIndex = songIndex;
  }
  return playIndex;
};
export const formatDateString = (timestamp: string | number) => {
  const date = new Date(parseInt(String(timestamp)));
  const year = date.getFullYear();
  const month = checkNum(parseInt(String(date.getMonth())) + 1);
  const day = checkNum(date.getDate());
  const hours = checkNum(date.getHours());
  const minutes = checkNum(date.getMinutes());
  const seconds = checkNum(date.getSeconds());
  if (year == new Date().getFullYear()) {
    return `${month}月${day}日`;
  } else {
    return `${year}年${month}月${day}日`;
  }
};

const checkNum = (i: number) => {
  let str = String(i);
  if (i < 10) {
    str = '0' + i;
  }
  return str;
};
