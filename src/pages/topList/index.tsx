import React, {memo, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Tab, Text, Image} from 'react-native-elements';
import {toplistDetail, topMv, playlistDetail} from '../../api';
import {ItemSingle} from '../../components/songList';
import {getScreenWidth} from '../../components/songList';
import consoleRn from 'reactotron-react-native';
export default memo(function SongTop() {
  const navigation = useNavigation();

  const [topData, setTopData]: any = useState([]);
  const [topSongData, setTopSongData]: any = useState([]);
  const [topImgData, setTopImgData]: any = useState([]);
  const [otherSongData, setOtherSongData]: any = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const tabData = ['官方', '精选', '曲风', '全球'];
  const colorList = [
    {titleColor: '#e5357b', bg: '#f4e1e7'},
    {titleColor: '#2d9489', bg: '#f3e1e1'},
    {titleColor: '#3a6fbd', bg: '#e3e7f0'},
    {titleColor: '#df2020', bg: '#f3e1e1'},
    {titleColor: '#a450f7', bg: '#ece0f6'},
  ];
  useEffect(() => {
    getToplist();
  }, []);
  const getToplist = async () => {
    const {
      list = [],
      artistToplist = {},
      rewardToplist = {},
    }: any = await toplistDetail();
    const {data = []}: any = await topMv({limit: 3});
    const mvData: any = [
      {
        name: '视频榜',
        updateFrequency: '刚刚更新',
        tracks: data,
      },
    ];
    const songData = list.filter((item: any) => item.ToplistType != null);
    const otherData = list.filter((item: any) => item.ToplistType == null);

    let songDataMap: any[] = [];
    await Promise.all(
      [...songData].map(async (item: any) => {
        const {playlist = {}}: any = await playlistDetail({id: item.id});
        songDataMap.push({...item, ...{imgUrl: playlist.tracks[0].al.picUrl}});
      }),
    );
    setTopImgData(songDataMap);
    setTopSongData([...songDataMap, ...mvData]);
    setOtherSongData(otherData);
  };
  const OfficalList = () => {
    return (
      <View>
        <FlatList
          numColumns={1}
          data={topSongData}
          style={{width: '100%'}}
          getItemLayout={(data, index) => ({
            length: 150,
            offset: 20 * index,
            index,
          })}
          keyExtractor={(item, i): any => item.id || i}
          ListHeaderComponent={<Text style={styles.topHeader}>官方榜</Text>}
          renderItem={({item, index}: any) => (
            <TouchableHighlight
              activeOpacity={0.95}
              underlayColor="#f5f5f5"
              key={item.id || index}
              onPress={() =>
                navigation.navigate('SongListInfo', {
                  id: item.creativeId || item.id,
                })
              }>
              <View
                key={item.id || index}
                style={{
                  margin: 20,
                  marginTop: 0,
                  padding: 20,
                  backgroundColor: colorList[index || 0].bg,
                  borderRadius: 8,
                  position: 'relative',
                }}>
                <View style={{position: 'absolute', right: 5, top: 5}}>
                  <Text style={{fontSize: 10, color: '#aab3b2'}}>
                    {item.updateFrequency}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: 100}}>
                    <Text
                      style={{
                        fontSize: 18,
                        paddingBottom: 6,
                        color: colorList[index || 0].titleColor,
                      }}>
                      {item.name}
                    </Text>
                    <Image
                      source={{
                        uri: item.imgUrl || item.tracks[0].cover,
                      }}
                      style={{width: 50, height: 50, borderRadius: 8}}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    {item.tracks.map((info: any, index: number) => (
                      <View
                        key={info.id || index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{lineHeight: 30, width: '80%'}}>
                          {info.first ? (
                            <Text>
                              {`${index + 1}.${info.first}`}
                              <Text
                                style={{
                                  color: '#aab3b2',
                                }}>{`-${info.second}`}</Text>
                            </Text>
                          ) : (
                            info.name
                          )}
                        </Text>
                        <Text style={{color: '#84aa81'}}>新</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
        <Text style={styles.topHeader}>其他榜</Text>
      </View>
    );
  };
  return (
    <View style={{height: '100%'}}>
      <StatusBar backgroundColor="#f5f5f5" />
      <Tab
        indicatorStyle={{
          width: 0,
          height: 0,
        }}
        variant="primary"
        value={currentIndex}
        onChange={index => setCurrentIndex(index)}>
        {tabData.map((item: any, index: number) => (
          <Tab.Item
            containerStyle={{
              backgroundColor: '#f5f5f5',
            }}
            titleStyle={
              currentIndex === index
                ? {color: '#3b3b3b', fontWeight: 'bold'}
                : {color: '#9f9f9f'}
            }
            key={index}
            title={item}
          />
        ))}
      </Tab>
      <FlatList
        numColumns={3}
        data={otherSongData}
        style={{width: '100%'}}
        contentContainerStyle={{paddingLeft: 10, paddingRight: 10}}
        columnWrapperStyle={{
          display: 'flex',
          alignItems: 'center',
          width: '33.33%',
        }}
        getItemLayout={(data, index) => ({
          length: getScreenWidth() / 3.8,
          offset: 55 * index,
          index,
        })}
        keyExtractor={(item, i): any => item.id || i}
        ListHeaderComponent={<OfficalList />}
        renderItem={({item}: any) => <ItemSingle item={item} bgc="#f5f5f5" />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  topHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
    lineHeight: 44,
  },
});
