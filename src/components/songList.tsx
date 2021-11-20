import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {WhiteSpace} from '@ant-design/react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {getPlayCount} from '../utils';
import {
  setSongAction,
  changeAudioPlayAction,
  changeplaySongListAction,
  changeSongAction,
} from '../store/actions';
export const getScreenWidth = () => {
  let width = Dimensions.get('window').width;
  return width;
};
export const FlatListHeader = ({
  title,
  isSong = false,
  isPodcast = false,
  isVideo = false,
  data = [],
}: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View>
      <WhiteSpace />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{lineHeight: 50, fontSize: 20, fontWeight: 'bold'}}>
          {title}
        </Text>
        <TouchableHighlight
          style={{borderRadius: 10}}
          activeOpacity={0.7}
          underlayColor="#e6e6e6"
          onPress={() => {
            if (isSong) {
              dispatch(
                changeplaySongListAction(
                  data.map((v: any) => v.resources).flat(),
                ),
              );
              dispatch(
                setSongAction(data.map((v: any) => v.resources).flat()[0].id),
              );
              dispatch(changeAudioPlayAction(true));
            } else if (isPodcast) {
              navigation.navigate('Podcast');
            } else if (isVideo) {
              navigation.navigate('Friends');
            } else {
              navigation.navigate('SongSquare');
            }
          }}>
          <View
            style={[
              styles.listHeaderStyle,
              {backgroundColor: 'rgba(241, 233, 233, 0.4)'},
            ]}>
            {isSong ? (
              <Text>
                <Ionicons name="play" />
                <Text>播放</Text>
              </Text>
            ) : (
              <Text>
                <Text>更多</Text>
                <Feather size={14} name="chevron-right" />
              </Text>
            )}
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export const RecommendSongList = ({
  data,
  title,
  config,
  horizontal = true,
  bg,
  isVideo = false,
  isPodcast = false,
  type,
}: {
  data: any;
  title: string;
  config?: object | any;
  horizontal?: boolean;
  bg?: string;
  isVideo?: boolean;
  isPodcast?: boolean;
  type?: string;
}) => {
  let configMap: any;
  if (!config) {
    configMap = {widthRate: 4, heightRate: 4, itemRate: 3.5};
    if (horizontal === false) {
      configMap = {widthRate: 3.8, heightRate: 3.8, itemRate: 3.2};
    }
  } else {
    configMap = config;
  }
  const paramsBase = {
    horizontal,
    showsHorizontalScrollIndicator: false,
  };
  const itemParams = {
    config: configMap,
    type: type,
    bg: bg,
    isVideo: isVideo,
  };
  return (
    <View>
      <FlatListHeader title={title} isPodcast={isPodcast} isVideo={isVideo} />
      {horizontal ? (
        <View>
          <FlatList
            {...paramsBase}
            keyExtractor={(item: any, index: number) => item.id || index}
            data={[...data]}
            renderItem={({item}: any) => (
              <RenderItem {...itemParams} item={item} />
            )}
          />
        </View>
      ) : (
        <FlatList
          {...paramsBase}
          keyExtractor={(item: any, index: number) => item.id || index}
          data={[...data]}
          numColumns={3}
          getItemLayout={(data, index) => ({
            length: getScreenWidth() / configMap.heightRate,
            offset: 55 * index,
            index,
          })}
          renderItem={({item}: any) => (
            <RenderItem {...itemParams} item={item} />
          )}
        />
      )}
    </View>
  );
};
export const ItemSingle = ({item, bgc}: {item: object | any; bgc?: string}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}>
      <TouchableHighlight
        activeOpacity={0.95}
        underlayColor="#a1a1a1"
        onPress={() => {
          navigation.navigate('SongListInfo', {
            id: item.creativeId || item.id,
          });
        }}>
        <View style={{backgroundColor: bgc ? bgc : '#fff'}}>
          <ImageBackground
            resizeMode="cover"
            style={[
              {
                width: getScreenWidth() / 3.8,
                height: getScreenWidth() / 3.8,
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#ccc',
              },
              styles.recommendListBg,
            ]}
            source={{
              uri: item.picUrl || item.coverImgUrl,
            }}>
            {item.updateFrequency ? (
              <Text style={styles.recommendListText}>
                {item.updateFrequency}
              </Text>
            ) : (
              <Text style={styles.recommendListText}>
                <Ionicons name="play-outline" size={12} />
                {` `}
                {getPlayCount(item.playCount)}
              </Text>
            )}
          </ImageBackground>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              lineHeight: 22,
              color: '#524747',
              paddingBottom: 10,
              height: 55,
              width: getScreenWidth() / 3.8,
            }}>
            {item.title || item.name}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export const RenderItem = ({item, config, type, bg, isVideo}: any) => {
  const navigation = useNavigation();

  let itemMap: any = {};
  if (item.resources || item.uiElement) {
    itemMap = {
      creativeId: item.creativeId,
      picUrl: item.uiElement
        ? item.uiElement.image.imageUrl
        : item.resource.mlogBaseData.coverUrl,
      title: item.uiElement
        ? item.uiElement.mainTitle.title
        : item.resource.mlogBaseData.text,
      playCount: item.resources
        ? item.resources[0].resourceExtInfo.playCount
        : item.creativeExtInfoVO
        ? item.creativeExtInfoVO.playCount
        : item.resource.mlogExtVO.playCount,
    };
  } else {
    itemMap = item;
  }
  return (
    <View
      style={{
        width: getScreenWidth() / config.itemRate,
        marginBottom: 10,
      }}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
        <TouchableHighlight
          activeOpacity={0.95}
          underlayColor="#a1a1a1"
          onPress={() => {
            if (isVideo) {
              navigation.navigate('VideoInfo', {vid: item.id});
            } else {
              navigation.navigate('SongListInfo', {
                id: itemMap.creativeId || item.id,
                type: type,
              });
            }
          }}
          style={{
            width: getScreenWidth() / config.widthRate,
            borderColor: '#ccc',
          }}>
          <View style={{backgroundColor: bg || '#fff'}}>
            <ImageBackground
              resizeMode="cover"
              style={[
                {
                  width: '100%',
                  height: getScreenWidth() / config.heightRate,
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#ccc',
                },
                styles.recommendListBg,
              ]}
              source={{
                uri: itemMap.picUrl || itemMap.coverImgUrl,
              }}>
              <Text style={styles.recommendListText}>
                <Ionicons name="play-outline" size={12} />
                {` `}
                {getPlayCount(itemMap.playCount)}
              </Text>
            </ImageBackground>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                lineHeight: 22,
                color: '#524747',
                paddingBottom: 10,
                height: 55,
              }}>
              {itemMap.title || itemMap.name}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export const VercitalListItem = ({items, data}: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return items.resources.map((item: any, i: number) => (
    <ListItem
      onPress={() => {
        if (item.resourceId) {
          dispatch(setSongAction(item.resourceId));
          dispatch(changeAudioPlayAction(true));
          dispatch(
            changeplaySongListAction(data.map((v: any) => v.resources).flat()),
          );
        }
        navigation.navigate('SongModel');
      }}
      key={i}
      bottomDivider
      containerStyle={{borderColor: '#fafafa'}}>
      <Avatar
        source={
          item.uiElement.image.imageUrl && {
            uri: item.uiElement.image.imageUrl,
          }
        }
      />
      <ListItem.Content>
        <ListItem.Title numberOfLines={1} ellipsizeMode="tail">
          {item.resourceExtInfo.songData.name +
            '-' +
            item.resourceExtInfo.artists
              .map((info: any) => info.name)
              .join('/')}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {item.uiElement.subTitle && item.uiElement.subTitle.title}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  ));
};

export const VercitalList = ({data, title}: {data: any[]; title: string}) => (
  <View>
    <FlatListHeader title={title} isSong data={data} />
    <FlatList
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => item.id || index}
      data={[...data]}
      renderItem={({item}: any) => (
        <VercitalListItem items={item} data={data} />
      )}
    />
  </View>
);
export const GridIcon = ({name, size, color}: any) => {
  return (
    <View style={styles.gridBox}>
      <View style={styles.gridContainer}>
        <Ionicons name={name} size={size} color={color} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridBox: {backgroundColor: 'rgb(236, 229, 229)', borderRadius: 50},
  gridContainer: {
    padding: 8,
  },
  listHeaderStyle: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 6,
    paddingTop: 2,
    paddingBottom: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendListBg: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  recommendListText: {
    paddingHorizontal: 2,
    margin: 2,
    color: '#fff',
    backgroundColor: 'rgba(222,222,222,0.4)',
    borderRadius: 5,
    fontSize: 12,
  },
});
