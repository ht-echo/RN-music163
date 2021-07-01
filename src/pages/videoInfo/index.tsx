import React, {useRef, useState, useEffect, memo} from 'react';
import {StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';
import Video from 'react-native-video-controls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar, ListItem} from 'react-native-elements';
import {videoDetail, videoUrl, mlogUrl} from '../../api';
import {getPlayCount} from '../../utils';
import {useDispatch} from 'react-redux';
import {changeAudioPlayAction} from '../../store/actions';
export default memo(function VideoInfo({route}: any) {
  const dispatch = useDispatch();
  console.log('route :>> ', route);
  const {width, height, scale} = Dimensions.get('window');
  const videoRef = useRef();
  const [videoData, setVideoData]: any = useState({});
  const [videoUrlFriend, setVideoUrlFriend]: any = useState(null);
  useEffect(() => {
    dispatch(changeAudioPlayAction(false));
  }, []);
  useEffect(() => {
    setVideoData({});
    if (route.params) {
      if (route.params.type === 'timeline') {
        setVideoData(route.params.VideoData);
      } else if (route.params.type === 'friends') {
        setVideoData(route.params.VideoData);
        getVdeoUrl(route.params.VideoData.vid);
      } else {
        getMlogUrl(route.params.vid);
      }
    }
    //   getVideoDetail(route.params?.id);
  }, [route.params]);
  const getMlogUrl = async (id: string | number) => {
    let {data}: any = await mlogUrl({id});
    setVideoData(data.resource);
  };
  const getVdeoUrl = async (id: string | number) => {
    let {urls = []}: any = await videoUrl({id});
    setVideoUrlFriend(urls[0].url);
  };
  const getVideoDetail = async (id: number | string) => {
    let data = await videoDetail({vid: id});
  };
  const onBuffer = () => {};
  return (
    <View
      style={{height: '100%', position: 'relative', backgroundColor: '#000'}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Video
        repeat
        resizeMode="contain"
        tapAnywhereToPause
        controlTimeout={2000}
        toggleResizeModeOnFullscreen={false}
        disableVolume
        disableBack
        disableFullscreen
        poster={
          videoData.coverUrl ||
          (videoData.content && videoData.content.video.coverUrl)
        }
        source={{
          uri:
            (videoData.urlInfo && videoData.urlInfo.url) ||
            (videoData.content && videoData.content.video.urlInfo.url) ||
            videoUrlFriend,
        }}
        ref={videoRef}
        onBuffer={onBuffer}
        onError={() => {}}
        style={styles.backgroundVideo}
      />
      <View style={styles.bottomBox}>
        <View style={{flex: 1}}>
          <ListItem
            containerStyle={{backgroundColor: 'transparent', paddingLeft: 0}}>
            <Avatar
              rounded
              source={{
                uri:
                  (videoData.profile && videoData.profile.avatarUrl) ||
                  (videoData.creator && videoData.creator.avatarUrl),
              }}
            />
            <ListItem.Title style={styles.titleStyle}>
              {(videoData.profile && videoData.profile.nickname) ||
                (videoData.creator && videoData.creator.nickname)}
            </ListItem.Title>
          </ListItem>
          <Text numberOfLines={2} style={styles.titleStyle}>
            {(videoData.content && videoData.content.title) || videoData.title}
          </Text>
        </View>
        <View
          style={[
            styles.flexCenter,
            {
              height: 280,
              justifyContent: 'space-between',
            },
          ]}>
          <View style={styles.flexCenter}>
            <Ionicons
              size={26}
              style={styles.btnStyle}
              name="md-thumbs-up-sharp"
            />
            <Text style={styles.btnStyle}>
              {getPlayCount(
                videoData.likedCount || videoData.praisedCount || '点赞',
              )}
            </Text>
          </View>
          <View style={styles.flexCenter}>
            <Ionicons
              size={26}
              style={styles.btnStyle}
              name="md-chatbubble-ellipses"
            />
            <Text style={styles.btnStyle}>
              {getPlayCount(videoData.commentCount || '评论')}
            </Text>
          </View>
          <View style={styles.flexCenter}>
            <Ionicons
              size={26}
              style={styles.btnStyle}
              name="md-share-social"
            />
            <Text style={styles.btnStyle}>
              {videoData.shareCount || '分享'}
            </Text>
          </View>
          <View style={styles.flexCenter}>
            <Ionicons size={26} style={styles.btnStyle} name="md-medkit" />
            <Text style={styles.btnStyle}>收藏</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottomBox: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
  },
  titleStyle: {
    color: '#ccc',
  },
  btnStyle: {
    color: '#eee',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
});
