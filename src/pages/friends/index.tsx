import React, {useEffect, useState, memo} from 'react';
import {StyleSheet, View, Dimensions, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import consoleRn from 'reactotron-react-native';
import {videoCategoryList, videoGroup} from '../../api';
import {Tile, Button} from 'react-native-elements';
import {getPlayCount} from '../../utils';
import TabPage from '../../components/tabPage';

export default memo(function Friends({navigation}: any) {
  const screenWidth = Dimensions.get('window').width;

  const [tabData, setTabData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState({});
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    getVideoCategoryList();
  }, []);
  useEffect(() => {
    if (tabData.length > 0) {
      let pageDataMap: any = tabData.map(() => null);
      if (pageData.length > 0) {
        pageDataMap = pageData;
      }
      const currentPageIndex = currentPageData.index;
      if (!pageData[currentPageIndex]) {
        pageDataMap[currentPageIndex] = currentPageData;
        setPageData([...pageDataMap]);
        consoleRn.log('pageData', pageData);
      }
    }
  }, [currentPageData]);
  const getVideoCategoryList = async () => {
    // const data = await event();
    const {data = []}: any = await videoCategoryList();
    const dataMap = data.map((item: any) => {
      return {...item, title: item.name};
    });
    setTabData(dataMap);
    if (data.length > 0) {
      getVideoGroup(data[0].id, 0);
    }
  };
  const getVideoGroup = async (id: number | string, index: number) => {
    const data: any = await videoGroup({id});
    if (data.datas) {
      setCurrentPageData({data: data.datas, hasmore: data.hasmore, index});
    }
  };
  const onChange = (tab: any, index: number) => {
    getVideoGroup(tab.id, index);
  };
  const RenderItem = ({item}: any) => {
    return (
      <View
        key={item.vid}
        style={{width: screenWidth / 2, paddingHorizontal: 5}}>
        <Tile
          key={item.vid}
          activeOpacity={0.8}
          imageSrc={{uri: item.coverUrl}}
          imageContainerStyle={{
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
          title={item.title || item.name}
          titleNumberOfLines={2}
          titleStyle={{fontSize: 14, fontWeight: 'normal', height: 40}}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20,
            borderRadius: 10,
            width: '100%',
          }}
          height={screenWidth * 0.75}
          contentContainerStyle={{height: 100}}
          onPress={() => {
            navigation.navigate('VideoInfo', {
              VideoData: item,
              type: 'friends',
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Button
              titleStyle={{color: '#909090', paddingLeft: 5, fontSize: 12}}
              title={getPlayCount(item.playTime || item.playCount)}
              type="clear"
              icon={<Ionicons name="play-outline" size={12} color="#909090" />}
            />
            <Button
              titleStyle={{color: '#909090', paddingLeft: 5, fontSize: 12}}
              title={getPlayCount(item.praisedCount || item.likeCount)}
              type="clear"
              icon={<FeatherIcons name="thumbs-up" size={12} color="#909090" />}
            />
          </View>
        </Tile>
      </View>
    );
  };

  return (
    <View style={{height: '100%', width: '100%', paddingBottom: 70}}>
      <StatusBar backgroundColor="#f5f5f5" />
      <TabPage
        numColumns={2}
        listHeight={screenWidth * 0.75}
        offset={20}
        tabData={tabData}
        pageData={pageData}
        onChange={onChange}
        renderItem={({item, i}: any) => <RenderItem item={item.data} />}
      />
    </View>
  );
});
const styles = StyleSheet.create({});
