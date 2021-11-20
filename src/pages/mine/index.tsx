import React, {memo, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {WhiteSpace, Grid, Modal} from '@ant-design/react-native';

import {loginStatus, likelist, userPlaylist, userSubcount} from '../../api';
export default memo(function Mine({navigation}: any) {
  const [userData, setUserData]: any = useState(null);
  const [likeData, setLikeData] = useState([]);
  const [creatSongData, setCreatSongData] = useState([]);
  const [collectSongData, setCollectSongData] = useState([]);
  const userId = useSelector((state: any) => state.get('id'));
  useEffect(() => {
    getLoginStatus();
  }, []);

  const gridData = [
    {
      icon: <Ionicons name="md-calendar" size={30} color="#f36868" />,
      text: `本地/下载`,
    },
    {
      icon: <Ionicons name="md-radio" size={30} color="#f36868" />,
      text: `云盘`,
    },
    {
      icon: <Ionicons name="md-radio" size={30} color="#f36868" />,
      text: `已购`,
    },
    {
      icon: <Ionicons name="md-radio" size={30} color="#f36868" />,
      text: `最近播放`,
    },
    {
      icon: <Ionicons name="md-stats-chart" size={30} color="#f36868" />,
      text: `我的好友`,
    },
    {
      icon: <Ionicons name="md-radio" size={30} color="#f36868" />,
      text: `收藏和赞`,
    },
    {
      icon: <Ionicons name="md-radio" size={30} color="#f36868" />,
      text: `我的播放`,
    },
  ];
  const getUserPlaylist = async (userDataParams?: any) => {
    let {playlist = []}: any = await userPlaylist({uid: userId});
    const loveSong = playlist.filter(
      (item: any) => item.name === userDataParams.nickname + '喜欢的音乐',
    );
    const creatSong = playlist.filter(
      (item: any) => item.userId === userId && item.id !== loveSong[0].id,
    );
    const collectSong = playlist.filter((item: any) => item.userId !== userId);
    console.log(
      'loveSong,creatSong,collectSong :>> ',
      loveSong,
      creatSong,
      collectSong,
    );
    setLikeData(loveSong);
    setCreatSongData(creatSong);
    setCollectSongData(collectSong);
  };
  const getLoginStatus = async () => {
    const {data}: any = await loginStatus();
    if (data.profile) {
      setUserData(data.profile);
      getUserPlaylist(data.profile);
    } else {
      setUserData(null);
    }
  };
  const loginFn = () => {
    Modal.alert('退出登录', '确认退出登录吗？', [
      {
        text: '取消',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: '确认',
        onPress: () => {
          navigation.navigate('LoginAll', {screen: 'Login'});
        },
      },
    ]);
  };
  const SongList = ({list}: any) => {
    return list.map((item: any, i: any) => (
      <ListItem
        key={i}
        onPress={() => {
          navigation.navigate('SongListInfo', {
            id: item.id,
          });
        }}>
        <Avatar
          size={45}
          source={{uri: item.coverImgUrl}}
          containerStyle={{
            backgroundColor: '#ccc',
            borderRadius: 5,
            overflow: 'hidden',
          }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.trackCount + '首'}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ));
  };

  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 70,
        height: '100%',
      }}>

      <ScrollView>
        <View style={styles.loginBar}>
          {userData ? (
            <Avatar
              activeOpacity={0.7}
              rounded
              size={60}
              containerStyle={{backgroundColor: '#fff'}}
              source={{uri: userData.avatarUrl}}
            />
          ) : (
            <Avatar
              activeOpacity={0.7}
              rounded
              size={60}
              containerStyle={{backgroundColor: '#fff'}}
              icon={{
                type: 'fontisto',
                name: 'user-secret',
                color: '#ccc',
                size: 40,
              }}
            />
          )}

          <Text
            style={styles.loginText}
            onPress={() => {
              loginFn();
            }}>
            {userData ? userData.nickname : '立即登录'}
          </Text>
          <EntypoIcons
            name="chevron-thin-right"
            size={18}
            onPress={() => {
              loginFn();
            }}></EntypoIcons>
        </View>
        <WhiteSpace />
        <View style={styles.sectionBlock}>
          <Grid
            columnNum={4}
            data={gridData}
            hasLine={false}
            itemStyle={{height: 90}}
          />
        </View>
        <WhiteSpace />
        {likeData.length > 0 && (
          <View style={styles.sectionBlock}>
            <SongList list={likeData} />
          </View>
        )}
        <WhiteSpace />
        {creatSongData.length > 0 && (
          <View style={styles.sectionBlock}>
            <Text>创建的歌单</Text>
            <SongList list={creatSongData} />
          </View>
        )}
        <WhiteSpace />
        {collectSongData.length > 0 && (
          <View style={styles.sectionBlock}>
            <Text>收藏的歌单</Text>
            <SongList list={collectSongData} />
          </View>
        )}
        <WhiteSpace />
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  loginBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  loginText: {
    paddingLeft: 20,
    paddingRight: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionBlock: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});
