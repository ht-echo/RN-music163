import React, {useState, useRef, useEffect, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Toast} from '@ant-design/react-native';
import {Badge} from 'react-native-elements';
import {getScreenWidth} from '../../components/songList';
import Slider from '@react-native-community/slider';
import {getTime, getSongNext} from '../../utils';
import {
  seekAudioTimeAction,
  changeAudioPlayAction,
  setSongAction,
  changeplayWayAction,
} from '../../store/actions';
import {lyric, commentMusic} from '../../api';
import PlaySongModal from '../../components/playSongModal';

export default memo(function SongModel({navigation}: any) {
  const dispatch = useDispatch();
  const [barRoutate, setBarRoutate] = useState(-20);
  const [VideoPercent, setVideoPercent]: any = useState(0);
  const [showLyric, setShowLyric] = useState(false);
  const [lyricData, setLyricData]: any = useState([]);
  const [currentLyric, setCurrentLyric] = useState({index: 0, lyc: ''});
  const [playListShow, setPlayListShow] = useState(false);
  const [commentTotal, setCommentTotal] = useState(0);

  const playSongList = useSelector((state: any) => state.get('playSongList'));

  const currentSong = useSelector((state: any) => state.get('currentSong'));
  const audioMsg = useSelector((state: any) => state.get('audioMsg'));
  const isPlay = useSelector((state: any) => state.get('audioIsPlay'));
  const playWay = useSelector((state: any) => state.get('playWay'));

  const scrollRef: any = useRef();
  const barAnim = useRef(new Animated.Value(-20)).current;
  const imgAnim = useRef(new Animated.Value(0)).current;
  const barAnimPolated = barAnim.interpolate({
    inputRange: [-20, 360],
    outputRange: ['-20deg', '360deg'],
  });
  const imgAnimPolated = imgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  useEffect(() => {
    getLyric();
    getComment(currentSong.id);
  }, []);
  useEffect(() => {
    Animated.timing(barAnim, {
      useNativeDriver: true,
      toValue: barRoutate,
      duration: 500,
    }).start();
    return () => {
      Animated.timing(barAnim, {
        useNativeDriver: true,
        toValue: barRoutate,
        duration: 500,
      }).reset();
    };
  }, [barRoutate, barAnim]);
  useEffect(() => {
    if (audioMsg.duration > 0) {
      const percent = (audioMsg.currentTime / audioMsg.duration) * 100;
      if (percent && percent > 0) {
        setVideoPercent(percent);
      }
    }
    getCurrentLyric();
  }, [audioMsg]);
  useEffect(() => {
    isPlay ? setBarRoutate(6) : setBarRoutate(-20);
    isPlay ? imgRoutateLoop(true) : imgRoutateLoop(false);
  }, [isPlay]);
  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({
        x: 0,
        y: currentLyric.index * 46,
        animated: true,
      });
    }
  }, [scrollRef, currentLyric]);
  useEffect(() => {
    Toast.info(
      playWay === 1 ? '顺序播放' : playWay === 2 ? '随机播放' : '单曲循环',
    );
  }, [playWay]);
  useEffect(() => {
    getLyric();
    getComment(currentSong.id);
  }, [currentSong]);
  const getComment = async (id: string | number) => {
    let {total = 0}: any = await commentMusic({id, limit: 1});
    setCommentTotal(total);
  };
  const getSong = (num: number) => {
    const playIndex = getSongNext({
      num,
      currentSong,
      playSongList,
      playWay,
    });
    if (playIndex) {
      dispatch(
        setSongAction(
          playSongList[playIndex].id || playSongList[playIndex].resourceId,
        ),
      );
    }
  };
  const imgRoutateLoop = (isRun: boolean) => {
    const imgAnimation = Animated.timing(imgAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 24000,
      easing: Easing.linear,
    });
    if (isRun) {
      Animated.loop(imgAnimation).start();
    } else {
      Animated.loop(imgAnimation).stop();
    }
  };
  const getCurrentLyric = () => {
    if (
      lyricData.length > 0 &&
      audioMsg.currentTime > lyricData[lyricData.length - 1].time
    ) {
      setCurrentLyric({
        index: lyricData.length - 1,
        lyc: lyricData[lyricData.length - 1].lyc,
      });
    }
    if (audioMsg.currentTime === 0) {
      setCurrentLyric({index: 0, lyc: lyricData[0] ? lyricData[0].lyc : ''});
    } else {
      lyricData.map((item: object | any, i: number, arr: any[]) => {
        if (
          arr[i + 1] &&
          audioMsg.currentTime <= arr[i + 1].time &&
          audioMsg.currentTime >= arr[i].time
        ) {
          setCurrentLyric({index: i, lyc: item.lyc});
        }
      });
    }
  };
  const getLyric = async () => {
    const {lrc = {}}: object | any = await lyric({id: currentSong.id});
    const lyricSplit = (lrc.lyric && lrc.lyric.split(/[\n]/)) || [];
    let lyricMap: any[] = [];
    lyricSplit
      .filter((item: any) => item !== '')
      .map((item: any) => {
        const temp = item.split(']');
        const text = temp.pop();
        temp.map((info: any) => {
          const time_arr = info.substring(1).split(':');
          const time = Number(time_arr[0] * 60) + Number(time_arr[1]);
          lyricMap.push({
            time: time,
            lyc: text,
          });
        });
      });
    const lyricList = lyricMap.sort((a, b) => a.time - b.time);
    setLyricData(lyricList);
  };
  return (
    <View style={{width: '100%', height: '100%'}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <LinearGradient
        style={{
          height: '100%',
          width: '100%',
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 28,
        }}
        colors={['#524437', '#6f634c', '#594d43', '#201b1f', '#0d0c0f']}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
            paddingBottom: 20,
          }}>
          <View style={{flex: 1, display: 'flex'}}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Ionicons
                name="md-chevron-down"
                size={30}
                color="#f5f5f5"
                onPress={() => {
                  navigation.goBack();
                }}
              />
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  paddingHorizontal: 10,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  {currentSong.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#a1a1a1',
                    fontSize: 14,
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  {currentSong.artists.map((v: any) => v.name).join('/')}
                </Text>
              </View>
              <Ionicons name="share-social-outline" size={30} color="#f5f5f5" />
            </View>
            <TouchableOpacity
              style={{flex: 1}}
              activeOpacity={1}
              onPress={() => {
                setShowLyric(!showLyric);
              }}>
              {showLyric ? (
                <View style={{paddingTop: 20, paddingBottom: 20}}>
                  <ScrollView
                    contentContainerStyle={{paddingTop: 300}}
                    contentOffset={{x: 0, y: 300}}
                    ref={scrollEl => {
                      if (scrollEl) {
                        scrollRef.current = scrollEl;
                      }
                    }}
                    showsVerticalScrollIndicator={false}>
                    <View>
                      {lyricData.length > 0 ? (
                        lyricData.map((item: object | any, i: number) => (
                          <Text
                            key={i}
                            style={{
                              height: 46,
                              lineHeight: 46,
                              fontSize: 16,
                              textAlign: 'center',
                              color:
                                currentLyric.index === i ? '#fff' : '#a1a1a1',
                            }}>
                            {item.lyc}
                          </Text>
                        ))
                      ) : (
                        <Text style={{textAlign: 'center', fontSize: 20}}>
                          暂无歌词
                        </Text>
                      )}
                    </View>
                  </ScrollView>
                </View>
              ) : (
                <View
                  style={{
                    position: 'relative',
                    flex: 1,
                  }}>
                  <Animated.View
                    style={[
                      {
                        position: 'absolute',
                        top: -200,
                        left: -140,
                        zIndex: 10,
                        height: 400,
                        width: 272,
                        marginTop: 25,
                        marginLeft: getScreenWidth() / 2 - 8,
                      },
                      {
                        transform: [{rotate: barAnimPolated}],
                      },
                    ]}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                      }}>
                      <View
                        style={{
                          position: 'absolute',
                          top: 184,
                          left: 111,
                          zIndex: 20,
                        }}>
                        <Image
                          resizeMode="contain"
                          style={[
                            {
                              width: 136,
                              height: 200,
                            },
                          ]}
                          source={require('../../assets/image/needle-ip6.png')}
                        />
                      </View>
                    </View>
                  </Animated.View>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      position: 'absolute',
                      top: 150,
                      width: '100%',
                    }}>
                    <View
                      style={{
                        padding: 5,
                        borderRadius: 160,
                      }}>
                      <View
                        style={{
                          padding: 40,
                          backgroundColor: '#121214',
                          borderRadius: 150,
                        }}>
                        <Animated.Image
                          source={{uri: currentSong.imgUrl}}
                          style={[
                            {width: 200, height: 200, borderRadius: 100},
                            {
                              transform: [{rotate: imgAnimPolated}],
                            },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={{paddingTop: 20}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingBottom: 20,
              }}>
              <Ionicons size={26} color="#b2b0b3" name="heart-outline" />

              <Ionicons size={26} color="#b2b0b3" name="download-outline" />
              <TouchableOpacity
                onPress={() => {
                  const songNow = currentSong;
                  navigation.navigate('Comment', {
                    type: 'song',
                    id: currentSong.id,
                    song: songNow,
                  });
                }}
                style={{
                  position: 'relative',
                  paddingHorizontal: 5,
                  paddingTop: 2,
                }}>
                <Ionicons
                  size={26}
                  color="#b2b0b3"
                  name="chatbubble-ellipses-outline"></Ionicons>
                <Badge
                  containerStyle={{position: 'absolute', top: -4, right: -4}}
                  badgeStyle={{backgroundColor: '#1d191d', borderWidth: 0}}
                  value={commentTotal > 10000 ? `1w+` : commentTotal}
                />
              </TouchableOpacity>
              <Ionicons size={26} color="#b2b0b3" name="ellipsis-vertical" />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text style={{color: '#bebebe'}}>
                {getTime(audioMsg.currentTime * 1000) || '00:00'}
              </Text>
              <Slider
                step={0.5}
                maximumValue={100}
                minimumValue={0}
                thumbTintColor="#fff"
                value={VideoPercent}
                onSlidingComplete={value => {
                  dispatch(
                    seekAudioTimeAction((audioMsg.duration * value) / 100),
                  );
                }}
                minimumTrackTintColor="#aaa4a7"
                maximumTrackTintColor="#aa9da3"
                style={{
                  flex: 1,
                  marginLeft: 10,
                  marginRight: 10,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              />
              <Text style={{color: '#aa9da3'}}>
                {getTime(audioMsg.duration * 1000) || '00:00'}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <Ionicons
                onPress={() => {
                  dispatch(
                    changeplayWayAction(playWay === 3 ? 1 : playWay + 1),
                  );
                }}
                size={26}
                color="#b2b0b3"
                name={
                  playWay === 1
                    ? 'repeat-outline'
                    : playWay === 2
                    ? 'shuffle-outline'
                    : 'infinite-outline'
                }
              />
              <Ionicons
                onPress={() => {
                  getSong(-1);
                }}
                size={26}
                color="#b2b0b3"
                name="play-skip-back-outline"
              />
              <TouchableHighlight
                onPress={() => {
                  dispatch(changeAudioPlayAction(!isPlay));
                }}
                style={{borderRadius: 50, overflow: 'hidden'}}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: '#fff',
                    borderRadius: 50,
                    backgroundColor: '#1a1519',
                    padding: 6,
                  }}>
                  <Ionicons
                    size={25}
                    name={isPlay ? 'pause' : 'play'}
                    color="#fff"
                  />
                </View>
              </TouchableHighlight>
              <Ionicons
                onPress={() => {
                  getSong(1);
                }}
                size={26}
                color="#b2b0b3"
                name="play-skip-forward-outline"
              />
              <Ionicons
                onPress={() => setPlayListShow(true)}
                size={26}
                color="#b2b0b3"
                name="menu-outline"
              />
            </View>
          </View>
        </View>
      </LinearGradient>
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
