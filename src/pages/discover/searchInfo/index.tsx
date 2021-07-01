import React, {useState, useEffect, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import {Header, Input, Image, ListItem, Avatar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {searchHotDetail, searchSuggest, search} from '../../../api';
import {getScreenWidth} from '../../../components/songList';
import TabPage from '../../../components/tabPage';
import consoleRn from 'reactotron-react-native';
import {getPlayCount} from '../../../utils';
import {setSongAction, changeAudioPlayAction} from '../../../store/actions';
import {useDispatch} from 'react-redux';
export default memo(function SearchInfo({navigation, route}: any) {
  const [searchValue, setSearchValue] = useState('');
  const [hotSearchData, setHotSearchData] = useState([]);
  const [suggestData, setSuggestData] = useState([]);
  const [currentType, setCurrentType] = useState(1);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [hotSearchShow, setHotSearchShow] = useState(true);
  const [currentPageData, setCurrentPageData]: object | any = useState({});
  const [pageData, setPageData]: any[] = useState([]);

  const tabData = [
    {title: '单曲', type: 1},
    {title: '歌单', type: 1000},
    {title: '歌手', type: 100},
    {title: '视频', type: 1014},
  ];
  useEffect(() => {
    getSearchHotDetail();
  }, []);
  useEffect(() => {
    let pageDataMap: any = [];
    if (pageData.length > 0) {
      pageDataMap = pageData;
    }

    if (currentPageData.data) {
      if (!pageDataMap[currentTabIndex]) {
        let data = pageDataInit(currentPageData.data, currentTabIndex);
        pageDataMap[currentTabIndex] = {data, hasmore: currentPageData.hasmore};
        setPageData([...pageDataMap]);
      }
    }
  }, [currentPageData]);
  useEffect(() => {
    getSearchData(searchValue, currentType);
  }, [currentType]);
  const pageDataInit = (data: any, index: number) => {
    const dataNew = data.map((item: any) => {
      if (index === 3) {
        return {
          id: item.vid,
          title: item.title,
          coverUrl: item.coverUrl,
          playTime: getPlayCount(item.playTime),
        };
      } else {
        return {
          id: item.id,
          imgUrl: item.coverImgUrl || item.picUrl,
          title: item.name,
          subTitle: item.artists
            ? item.artists.map((v: any) => v.name).join('/') + '-' + item.name
            : `${item.trackCount}首，by ${
                item.creator && item.creator.nickname
              }，播放${getPlayCount(item.creator && item.playCount)}次`,
        };
      }
    });
    return dataNew;
  };
  const getSearchHotDetail = async () => {
    const {data = []}: any = await searchHotDetail();
    setHotSearchData(data);
  };
  const getSearchSuggest = async (keywords: string) => {
    const {result}: any = await searchSuggest({keywords, type: 'mobile'});
    if (result && result.allMatch) {
      setSuggestData(result.allMatch);
    }
  };
  const getSearchData = async (keywords: any, type?: number) => {
    const {result = {}}: any = await search({
      keywords,
      type,
    });
    setCurrentPageData({
      data: result.songs || result.artists || result.playlists || result.videos,
      hasmore: result.hasmore,
    });
  };
  const onSubmitEditing = () => {
    setPageData([]);
    const value = searchValue === '' ? route.params?.realValue : searchValue;
    setCurrentTabIndex(0);
    getSearchData(value, 1);
    setHotSearchShow(false);
  };
  const onChange = (tab: any, index: number) => {
    if (tab && tab.type) {
      const value = searchValue === '' ? route.params?.realValue : searchValue;
      setCurrentTabIndex(index);
      setCurrentType(tab.type);
    }
  };
  const HotSearchWords = ({item, index}: any) => {
    return (
      <TouchableHighlight
        activeOpacity={0.9}
        onPress={() => {
          setHotSearchShow(false);
          setSearchValue(item.searchWord);
          getSearchData(item.searchWord, 1);
        }}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
          }}>
          <Text
            style={{color: '#ccc', lineHeight: 40, fontSize: 16, width: 25}}>
            {index + 1}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              fontSize: 16,
              width: getScreenWidth() * 0.5 - 40,
              display: 'flex',
              alignItems: 'center',
              lineHeight: 40,
              height: 40,
            }}>
            {`${item.searchWord} `}
            <Image
              containerStyle={{backgroundColor: 'transparent'}}
              resizeMode="contain"
              source={{uri: item.iconUrl}}
              style={{width: 40, height: 18}}
            />
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  const RenderItem = ({item, i}: any) => {
    const dispatch = useDispatch();
    const data =
      currentTabIndex !== 3 ? (
        <ListItem
          containerStyle={{height: 70}}
          activeOpacity={0.8}
          onPress={() => {
            if (currentTabIndex === 0) {
              dispatch(setSongAction(item.id));
              dispatch(changeAudioPlayAction(true));

              navigation.navigate('SongModel', {id: item.id});
            } else if (currentTabIndex === 1) {
              navigation.navigate('SongListInfo', {id: item.id});
            } else {
              // navigation.navigate('PageChild', {
              //   screen: 'SongListInfo',
              //   params: {id: item.id},
              // });
            }
          }}>
          {currentTabIndex !== 0 && (
            <Avatar source={item.imgUrl && {uri: item.imgUrl}} />
          )}
          <ListItem.Content>
            <ListItem.Title numberOfLines={1}>{item.title}</ListItem.Title>
            {currentTabIndex !== 2 && (
              <ListItem.Subtitle numberOfLines={1}>
                {item.subTitle}
              </ListItem.Subtitle>
            )}
          </ListItem.Content>
        </ListItem>
      ) : (
        <View style={{paddingBottom: 20}}>
          <Text style={{fontSize: 18, lineHeight: 50}} numberOfLines={1}>
            {item.title}
          </Text>
          <Image
            containerStyle={{width: '100%'}}
            source={item.coverUrl && {uri: item.coverUrl}}
            style={{height: 240, borderRadius: 10}}
          />
        </View>
      );
    return data;
  };

  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        height: '100%',
        width: '100%',
      }}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Ionicons
          style={{paddingTop: 10, width: 30}}
          onPress={() => {
            navigation.goBack();
          }}
          name="arrow-back"
          size={30}
          color="rgb(80, 74, 74)"
        />
        <Input
          autoFocus
          value={searchValue}
          placeholder={route.params?.value}
          containerStyle={{flex: 1, height: 60}}
          onChangeText={value => {
            setSearchValue(value);
            if (value && value !== '') {
              getSearchSuggest(value);
            }
          }}
          onSubmitEditing={() => {
            onSubmitEditing();
          }}
          onFocus={() => setHotSearchShow(true)}
        />
      </View>
      <View>
        {hotSearchShow && searchValue !== '' && (
          <FlatList
            key="suggestData"
            data={suggestData}
            numColumns={1}
            keyExtractor={(item: any, i) => item.id || i}
            renderItem={({item, index}: any) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="search-outline"
                  size={20}
                  color="#aaa"
                  style={{width: 30}}
                />
                <View style={{flex: 1}}>
                  <ListItem
                    onPress={() => {
                      setPageData([]);
                      setHotSearchShow(false);
                      setSearchValue(item.keyword);
                      setCurrentTabIndex(0);
                      getSearchData(item.keyword, 1);
                    }}
                    bottomDivider
                    containerStyle={{backgroundColor: '#f5f5f5'}}>
                    <ListItem.Content>
                      <ListItem.Title numberOfLines={1}>
                        {item.keyword}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </View>
              </View>
            )}
          />
        )}
        {hotSearchShow && searchValue === '' && (
          <FlatList
            key="hotSearchData"
            numColumns={2}
            data={hotSearchData}
            keyExtractor={(item: any, i) => item.id || i}
            renderItem={({item, index}: any) => (
              <HotSearchWords item={item} index={index} />
            )}
          />
        )}
      </View>
      {!hotSearchShow && (
        <TabPage
          listHeight={currentTabIndex !== 3 ? 50 : 240}
          offset={20}
          tabData={tabData}
          pageData={[...pageData]}
          onChange={onChange}
          renderItem={({item, i}: any) => {
            return <RenderItem item={item} />;
          }}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({});
