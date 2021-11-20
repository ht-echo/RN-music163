import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, StatusBar, Image} from 'react-native';
import consoleRn from 'reactotron-react-native';
import {ListItem, Avatar, Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {playlistDetail, recommendSongs, djProgram, djDetail} from '../../api';
import {getPlayCount, getTime} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {
  setSongAction,
  changeAudioPlayAction,
  changeplaySongListAction,
} from '../../store/actions';
export default memo(function SongListInfo({route}: any) {
  const dispatch = useDispatch();

  const [songData, setSongData]: any = useState({});
  useEffect(() => {
    setSongData({});
    getData();
  }, [route.params?.id]);
  const getData = async () => {
    const params = route.params;
    if (params) {
      if (params.type === 'daily') {
        const {data = {}}: any = await recommendSongs();
        setSongData(data);
      } else if (params.type === 'podcastPage') {
        const {data = {}}: any = await djDetail({rid: params.id});
        const {programs = []}: any = await djProgram({rid: params.id});
        setSongData({...data, ...{tracks: programs}});
      } else {
        const {playlist = {}}: any = await playlistDetail({
          id: params.id,
        });
        setSongData(playlist);
      }
    }
  };

  const RenderItem = ({item, index}: any) => (
    <ListItem
      onPress={() => {
        if (route.params && route.params.type == 'podcastPage') {
          const songDataPod = songData.tracks.map((itemPod: any) => {
            return {
              id: itemPod.mainSong.id,
              name: itemPod.mainSong.name,
              ar: [{name: itemPod.dj.nickname}],
            };
          });
          dispatch(changeplaySongListAction(songDataPod));
          dispatch(setSongAction(item));
          dispatch(changeAudioPlayAction(true));
        } else {
          dispatch(
            changeplaySongListAction(songData.tracks || songData.dailySongs),
          );
          dispatch(setSongAction(item.id));
          dispatch(changeAudioPlayAction(true));
        }
      }}>
      <Text>{index + 1}</Text>
      <ListItem.Content>
        <ListItem.Title numberOfLines={1}>{item.name}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>
          {(item.ar &&
            `${item.ar.map((v: any) => v.name).join('/')} - ${item.al.name}`) ||
            `${getPlayCount(item.listenerCount)}次播放 - ${getTime(
              item.duration,
            )}`}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
  const Header = () => (
    <View style={{height: 250, position: 'relative', backgroundColor: '#fff'}}>
      <LinearGradient colors={['#7b7b7b', '#727272']}>
        <View
          style={[
            styles.container,
            {height: 150, marginTop: 15, marginBottom: 50},
          ]}>
          {!route.params ||
            (route.params.type !== 'daily' && (
              <Image
                source={{uri: songData.coverImgUrl || songData.picUrl}}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 10,
                  marginRight: 20,
                }}
              />
            ))}
          <View
            style={{
              flex: 1,
              height: 140,
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <View>
              {route.params && route.params.type === 'daily' && (
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff', fontSize: 26}}>每日推荐</Text>
                  {songData.dailySongs && (
                    <Text style={{color: '#fff', fontSize: 24, paddingTop: 10}}>
                      {songData.dailySongs.length}首
                    </Text>
                  )}
                </View>
              )}
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#fff',
                  paddingBottom: 20,
                }}
                numberOfLines={2}>
                {songData.name}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri:
                      (songData.creator && songData.creator.avatarUrl) ||
                      (songData.dj && songData.dj.avatarUrl),
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                />
                <Text style={{color: '#fff'}}>
                  {(songData.creator && songData.creator.nickname) ||
                    (songData.dj && songData.dj.nickname)}
                </Text>
              </View>
            </View>
            <Text style={{color: '#fff'}} numberOfLines={1}>
              {songData.description || songData.desc}
            </Text>
          </View>
        </View>
      </LinearGradient>
      {route.params && route.params.type !== 'daily' && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '80%',
            backgroundColor: '#fff',
            height: 50,
            borderRadius: 25,
            elevation: 2,
            position: 'absolute',
            bottom: 10,
            left: '10%',
          }}>
          <Button
            titleStyle={{color: '#a1a1a1'}}
            icon={
              <Ionicons
                size={20}
                style={{marginRight: 10}}
                name="duplicate-outline"
              />
            }
            type="clear"
            title={getPlayCount(
              songData.subscribedCount || songData.subCount || '收藏',
            )}
          />
          <Text>|</Text>
          <Button
            titleStyle={{color: '#a1a1a1'}}
            icon={
              <Ionicons
                size={20}
                style={{marginRight: 10}}
                name="chatbubble-ellipses-outline"
              />
            }
            type="clear"
            title={getPlayCount(songData.commentCount || '评论')}
          />
          <Text>|</Text>
          <Button
            titleStyle={{color: '#a1a1a1'}}
            icon={
              <Ionicons
                size={20}
                style={{marginRight: 10}}
                name="share-social-outline"
              />
            }
            type="clear"
            title={getPlayCount(songData.shareCount || '分享')}
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={{height: '100%'}}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id || index}
        data={songData.tracks || songData.dailySongs}
        renderItem={RenderItem}
        ListHeaderComponent={Header}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  backImg: {
    width: '100%',
    height: 400,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
