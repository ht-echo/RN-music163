import React, {useState, useRef, useEffect, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import {useSelector, useDispatch} from 'react-redux';
import {
  changeAudioMsgAction,
  setSongAction,
  changeAudioPlayAction,
} from '../store/actions';
import {getSongNext} from '../utils';

export default memo(function AudioPlayback() {
  const videoRef: any = useRef();
  const dispatch = useDispatch();
  const [isNetwork, setIsNetwork]: boolean | any = useState(null);
  const [audioUrl, setAudioUrl]: string | any = useState(null);
  const [isRepeat, setIsRepeat]: string | any = useState(false);

  const isPlay = useSelector((state: any) => state.get('audioIsPlay'));
  const currentSong = useSelector((state: any) => state.get('currentSong'));
  const audioSeekTime = useSelector((state: any) => state.get('audioSeekTime'));
  const playSongList = useSelector((state: any) => state.get('playSongList'));
  const playWay = useSelector((state: any) => state.get('playWay'));

  useEffect(() => {
    dispatch(changeAudioMsgAction({currentTime: 0, duration: 0}));
    if (currentSong && currentSong.musicUrl && currentSong.musicUrl !== '') {
      setAudioUrl(currentSong.musicUrl);
    }
  }, [currentSong]);
  useEffect(() => {
    const current = videoRef.current;
    if (current) {
      if (!current.source) {
        setAudioUrl(currentSong.musicUrl);
      } else {
      }
    }
  }, [videoRef, isPlay]);
  useEffect(() => {
    if (audioSeekTime > 0 && videoRef.current) {
      videoRef.current.seek(audioSeekTime);
    }
  }, [audioSeekTime, videoRef]);
  useEffect(() => {
    if (videoRef.current) {
      if (playWay === 3) {
        setIsRepeat(true);
      } else {
        setIsRepeat(false);
      }
    }
  }, [playWay, videoRef]);
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

  return (
    <View>
      {audioUrl && (
        <Video
          playInBackground
          allowsExternalPlayback
          paused={!isPlay}
          repeat={isRepeat}
          ref={videoRef}
          audioOnly
          progressUpdateInterval={500}
          source={{
            uri: audioUrl,
          }}
          onLoadStart={(res: any) => {
            console.log(`isNetwork`, res);
            setIsNetwork(res.src.isNetwork);
          }}
          onError={(err: any) => {
            console.log(`err`, err);
          }}
          onProgress={({currentTime, playableDuration}: any) => {
            dispatch(
              changeAudioMsgAction({currentTime, duration: playableDuration}),
            );
          }}
          onEnd={() => {
            getSong(1);
          }}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({});
