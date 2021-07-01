import React, {memo, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Modal} from '@ant-design/react-native';
import {Image, ListItem} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setSongAction, changeplayWayAction} from '../store/actions';

export default memo(function PlaySongList({
  playListShow,
  close,
}: {
  playListShow: boolean;
  close: Function;
}) {
  const dispatch = useDispatch();
  const playSongList = useSelector((state: any) => state.get('playSongList'));
  const currentSong = useSelector((state: any) => state.get('currentSong'));
  const playWay = useSelector((state: any) => state.get('playWay'));

  return (
    <Modal
      style={{
        backgroundColor: 'transparent',
        paddingHorizontal: 15,
        paddingBottom: 15,
      }}
      maskClosable
      popup
      visible={playListShow}
      animationType="slide-up"
      onClose={() => {
        close();
      }}>
      <View
        style={{
          height: 500,
          borderRadius: 14,
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}>
        <ListItem>
          <View>
            <Text>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>播放列表</Text>
              {`(${playSongList.length})`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(changeplayWayAction(playWay === 3 ? 1 : playWay + 1));
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Ionicons
                  style={{paddingRight: 6}}
                  onPress={() => {
                    dispatch(
                      changeplayWayAction(playWay === 3 ? 1 : playWay + 1),
                    );
                  }}
                  size={24}
                  color="#c1c1c1"
                  name={
                    playWay === 1
                      ? 'repeat-outline'
                      : playWay === 2
                      ? 'shuffle-outline'
                      : 'infinite-outline'
                  }
                />
                <Text>
                  {playWay === 1
                    ? '顺序播放'
                    : playWay === 2
                    ? '随机播放'
                    : '单曲循环'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ListItem>
        <ScrollView>
          {playSongList.length > 0 ? (
            playSongList.map((item: any, i: number) => (
              <ListItem
                key={item.id || i}
                onPress={() => {
                  dispatch(setSongAction(item.id || item.resourceId));
                }}>
                <ListItem.Title
                  numberOfLines={1}
                  style={{
                    color:
                      currentSong.id == (item.id || item.resourceId)
                        ? '#ec4141'
                        : '#242424',
                  }}>
                  {`${item.name || item.resourceExtInfo.songData.name}`}
                  <Text
                    style={{
                      fontSize: 12,
                      color:
                        currentSong.id == (item.id || item.resourceId)
                          ? '#ec4141'
                          : '#8e8e8e',
                    }}>{` - ${
                    item.ar
                      ? item.ar.map((v: any) => v.name)
                      : item.resourceExtInfo.artists.map((v: any) => v.name)
                  }`}</Text>
                </ListItem.Title>
              </ListItem>
            ))
          ) : (
            <Text
              style={{
                width: '100%',
                fontSize: 20,
                fontWeight: '600',
                textAlign: 'center',
                paddingTop: 100,
              }}>
              播放列表为空
            </Text>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({});
