import React, {useState, useEffect, useCallback, memo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  useColorScheme,
  StatusBar,
  ImageBackground,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';
import {Carousel, Grid, Toast} from '@ant-design/react-native';
import Reactotron from 'reactotron-react-native';
import {WhiteSpace} from '@ant-design/react-native';
import LinearGradient from 'react-native-linear-gradient';
import {searchDefault, homepageBlockPage} from '../../api';
import {
  RecommendSongList,
  VercitalList,
  GridIcon,
} from '../../components/songList';

export default memo(function Discover({navigation}: any) {
  const [searchValue, setSearchValue] = useState();
  const [searchPla, setSearchPla] = useState();
  const [realkeyword, setRealkeyword] = useState();

  const [pageData, setPageData]: any = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [cursorData, setCursorData]: any = useState({});
  const [hasmore, setHasmore] = useState(true);

  const Banner = ({bannerList}: any) => {
    const gridData = [
      {
        icon: <GridIcon name="md-calendar" size={25} color="#f36868" />,
        text: `每日推荐`,
        screen: 'SongListInfo',
        params: {
          type: 'daily',
        },
      },
      {
        icon: <GridIcon name="md-radio" size={25} color="#f36868" />,
        text: `私人FM`,
        screen: 'SongModel',
      },
      {
        icon: <GridIcon name="md-reader" size={25} color="#f36868" />,
        text: `歌单`,
        screen: 'SongSquare',
      },
      {
        icon: <GridIcon name="md-podium" size={25} color="#f36868" />,
        text: `排行榜`,
        screen: 'SongTop',
      },
    ];

    return (
      <LinearGradient colors={['#f5f5f5', '#fff']}>
        <View style={{padding: 10, borderRadius: 10, overflow: 'hidden'}}>
          {bannerList && bannerList.length > 0 ? (
            <Carousel
              style={styles.wrapper}
              autoplay
              infinite
              autoplayInterval={5000}
              dotStyle={styles.dotStyle}
              dotActiveStyle={styles.dotActiveStyle}>
              {bannerList.map((item: any) => (
                <View style={styles.containerHorizontal} key={item.bannerId}>
                  <ImageBackground
                    source={item.pic && {uri: item.pic}}
                    style={styles.backImg}>
                    <View style={styles.bannerImgBg}>
                      <Text
                        style={[
                          styles.bannerText,
                          {backgroundColor: item.titleColor},
                        ]}>
                        {item && item.typeTitle}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              ))}
            </Carousel>
          ) : (
            <Button
              loading
              type="clear"
              style={{height: 150, backgroundColor: '#fff'}}
            />
          )}
          <Grid
            data={gridData}
            columnNum={4}
            hasLine={false}
            itemStyle={{
              height: 110,
            }}
            onPress={(el: any, index) => {
              if (index === 1) {
                Toast.info('暂不支持', 2);
              } else {
                if (el.params) {
                  navigation.navigate('PageChild', {
                    screen: el.screen,
                    params: el.params,
                  });
                } else {
                  navigation.navigate('PageChild', {
                    screen: el.screen,
                  });
                }
              }
            }}
          />
        </View>
      </LinearGradient>
    );
  };

  const ListFooterComponent = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: hasmore ? 30 : 100,
          }}>
          {hasmore && (
            <ActivityIndicator
              size="small"
              animating={hasmore}
              color="red"
              style={{marginRight: 10}}
            />
          )}
          <Text style={{color: '#000'}}>
            {hasmore ? `加载更多...` : `没有更多了`}
          </Text>
        </View>
      </View>
    );
  };
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    searchDefaultFn();
    getData(false);
  }, []);
  const getData = async (refresh?: boolean, cursor?: any) => {
    const {data = []}: any = await homepageBlockPage({
      refresh,
      cursor,
    });
    const blockData = (data && data.blocks) || [];
    if (data.cursor) {
      setCursorData(data.cursor);
    }
    if (blockData.length > 0) {
      if (data.hasMore) {
        setPageData([...pageData, ...blockData]);
        setRefreshing(false);
      } else {
        setRefreshing(false);
        setHasmore(false);
      }
    }
  };
  const searchDefaultFn = async () => {
    const {data = {}}: any = await searchDefault();
    setSearchPla(data.showKeyword);
    setRealkeyword(data.realkeyword);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData(true);
  }, []);
  const onEndReached = () => {
    if (cursorData.length > 0) {
      getData(false, cursorData);
    }
  };

  const toSearchInfo = () => {
    navigation.navigate('PageChild', {
      screen: 'SearchInfo',
      params: {value: searchPla, realValue: realkeyword},
    });
  };

  const RenderItemPage = ({item}: any) => {
    switch (item.showType) {
      case 'BANNER':
        return <Banner bannerList={item.extInfo.banners} />;
      case 'HOMEPAGE_SLIDE_PLAYLIST':
      case 'SLIDE_VOICELIST':
        return (
          <View style={styles.sectionBlock}>
            <RecommendSongList
              isPodcast={item.showType === 'SLIDE_VOICELIST'}
              title={item.uiElement.subTitle.title}
              data={[...item.creatives]}
            />
          </View>
        );
      case 'HOMEPAGE_SLIDE_SONGLIST_ALIGN':
      case 'HOMEPAGE_NEW_SONG_NEW_ALBUM':
        return (
          <View style={styles.sectionBlock}>
            <VercitalList
              data={
                item.showType === 'HOMEPAGE_NEW_SONG_NEW_ALBUM'
                  ? item.creatives.filter(
                      (v: any) => v.creativeType === 'NEW_SONG_HOMEPAGE',
                    )
                  : item.creatives.slice(0, 2)
              }
              title={
                item.uiElement.subTitle ? item.uiElement.subTitle.title : '新歌'
              }
            />
          </View>
        );
      case 'SHUFFLE_MLOG':
      case 'HOMEPAGE_SLIDE_PLAYABLE_MLOG':
        return (
          <View style={styles.sectionBlock}>
            <RecommendSongList
              isVideo
              title={item.uiElement.subTitle.title}
              data={[...item.extInfo]}
              config={{widthRate: 2.5, heightRate: 2, itemRate: 2.3}}
            />
          </View>
        );
      default:
        return <View></View>;
    }
  };

  return (
    <View style={styles.discover}>
      <StatusBar
        translucent={false}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{position: 'relative'}}>
        <SearchBar
          platform="android"
          placeholder={searchPla}
          value={searchValue}
          clearIcon={false}
          containerStyle={{
            backgroundColor: '#f5f5f5',
            paddingLeft: 10,
            paddingRight: 10,
            height: 80,
            display: 'flex',
            justifyContent: 'center',
          }}
          inputContainerStyle={styles.inputContainer}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}>
          <Text
            style={{
              width: '100%',
              height: '100%',
            }}
            onPress={() => toSearchInfo()}></Text>
        </View>
      </View>
      <FlatList
        data={[...pageData]}
        initialNumToRender={3}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={() => (
          <WhiteSpace
            style={{
              backgroundColor: '#f5f5f5',
            }}
          />
        )}
        ListFooterComponent={<ListFooterComponent />}
        keyExtractor={(item: any, index) => String(index)}
        renderItem={({item}: any) => <RenderItemPage item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={() => onEndReached()}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  discover: {
    height: '100%',
    paddingBottom: 58,
  },
  inputContainer: {backgroundColor: '#fff', borderRadius: 20},
  backImg: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  bannerImgBg: {},
  bannerText: {
    color: '#fff',
    padding: 5,
    borderTopLeftRadius: 6,
  },
  dotStyle: {
    height: 2,
    width: 10,
    backgroundColor: '#afafb9',
  },
  dotActiveStyle: {
    backgroundColor: '#f5c4c4',
  },
  sectionBlock: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  wrapper: {
    height: 150,
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    height: 150,
    borderRadius: 8,
  },
});
