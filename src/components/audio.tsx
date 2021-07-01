import React, {useState, useRef, useEffect, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import consoleRn from 'reactotron-react-native';
import {getScreenWidth} from '../components/songList';
import {Image, ListItem} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useNavigation} from '@react-navigation/native';
import {changeAudioMsgAction, changeAudioPlayAction} from '../store/actions';
import PlaySongModal from './playSongModal';
export default memo(function Audio() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentSong = useSelector((state: any) => state.get('currentSong'));
  const audioMsg = useSelector((state: any) => state.get('audioMsg'));
  const isPlay = useSelector((state: any) => state.get('audioIsPlay'));
  const currentScreen = useSelector((state: any) => state.get('currentScreen'));
  const playSongList = useSelector((state: any) => state.get('playSongList'));
  const [isNetwork, setIsNetwork]: boolean | any = useState(null);
  const [VideoPercent, setVideoPercent]: any = useState(0);
  const [playListShow, setPlayListShow] = useState(false);
  useEffect(() => {
    const percent = (audioMsg.currentTime / audioMsg.duration) * 100;
    const parseNum = (percent * 1) | 0 || 0;
    setVideoPercent(parseNum < 1 ? 1 : parseNum);
  }, [audioMsg]);
  return (
    <View
      style={[
        styles.audioContainer,
        {
          top:
            currentScreen === 'Discover' ||
            currentScreen === 'Podcast' ||
            currentScreen === 'Mine' ||
            currentScreen === 'Notifies' ||
            currentScreen === 'Friends'
              ? Dimensions.get('screen').height - 129
              : Dimensions.get('screen').height - 80,
        },
      ]}>
      <TouchableHighlight
        underlayColor="#e5e5e5"
        onPress={() => navigation.navigate('SongModel')}
        activeOpacity={0.7}>
        <View style={styles.touchContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              containerStyle={{
                width: 40,
                height: 40,
                backgroundColor: '#ccc',
                borderRadius: 5,
                marginRight: 10,
              }}
              source={currentSong.imgUrl && {uri: currentSong.imgUrl}}
              style={{width: 40, height: 40}}></Image>
            <Text numberOfLines={1} style={{width: getScreenWidth() - 240}}>
              {`${currentSong.name} - `}
              <Text
                style={{fontSize: 12, color: '#a1a1a1'}}>{`${currentSong.artists
                .map((v: any) => v.name)
                .join('/')}`}</Text>
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
            }}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                style={{borderRadius: 10}}
                onPress={() => {
                  dispatch(changeAudioPlayAction(!isPlay));
                  // if (isNetwork === true) {
                  // } else if (isNetwork === false) {
                  //   Toast.info('网络超时', 2);
                  // } else {
                  //   Toast.info('歌曲初始化失败', 1);
                  // }
                }}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AnimatedCircularProgress
                    size={28}
                    width={2}
                    fill={VideoPercent}
                    rotation={0}
                    tintColor="#6a6a6a"
                    backgroundColor="#ebebeb">
                    {fill => (
                      <Ionicons
                        size={15}
                        name={isPlay ? 'pause' : 'play'}
                        color="#333333"
                      />
                    )}
                  </AnimatedCircularProgress>
                </View>
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              onPress={() => {
                setPlayListShow(true);
              }}
              activeOpacity={0.7}
              underlayColor="#a1a1a1"
              style={{
                flex: 1,
                borderRadius: 10,
              }}>
              <View
                style={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}>
                <AntDesignIcons size={24} name="menufold" />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
      <PlaySongModal
        playListShow={playListShow}
        close={() => {
          setPlayListShow(false);
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  audioContainer: {
    position: 'absolute',
    left: 0,
    zIndex: 9999,
    width: getScreenWidth(),
    height: 60,
    borderTopColor: '#f5f5f5',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    elevation: 0,
  },
  touchContainer: {
    height: '100%',
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  modelContainer: {
    height: '100%',
  },
  playLine: {
    backgroundColor: '#565857',
    height: 2,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  lineInfo: {
    backgroundColor: '#a1a1a1',
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
