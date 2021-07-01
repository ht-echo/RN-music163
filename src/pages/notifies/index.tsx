import React, {memo, useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import {Tabs, Card} from '@ant-design/react-native';
import {Avatar, Image, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';

import {videoTimelineRecommend} from '../../api';
import Empty from '../../components/empty';

export default memo(function Notifies({navigation}: any) {
  const tabs = [{title: '为你推荐'}, {title: '好友作品'}];
  const [recommendList, setRecommendList] = useState([]);
  useEffect(() => {
    getVideoTimelineRecommend();
  }, []);
  const getVideoTimelineRecommend = async () => {
    const {datas = []}: any = await videoTimelineRecommend();
    setRecommendList(datas);
  };
  const EventComp = ({item}: any) => {
    const data = item.data;
    return (
      <Card style={styles.cardStyle}>
        <Card.Header
          title={data.creator.nickname}
          thumb={
            <Avatar
              rounded
              size={40}
              source={{uri: data.creator.avatarUrl}}
              containerStyle={{backgroundColor: '#ccc', marginRight: 10}}
            />
          }
        />
        <Card.Body style={{borderTopWidth: 0}}>
          <View style={styles.cardBodyStyle}>
            <Text
              onPress={() => {
                navigation.navigate('VideoInfo', {
                  VideoData: data,
                  type: 'timeline',
                });
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{paddingBottom: 10}}>
              {data.title}
            </Text>
            <Image
              onPress={() => {
                navigation.navigate('VideoInfo', {
                  VideoData: data,
                  type: 'timeline',
                });
              }}
              source={{uri: data.coverUrl}}
              containerStyle={styles.cardImgStyle}
            />
            <View style={{display: 'flex', alignItems: 'flex-start'}}>
              {data.videoGroup && (
                <View style={styles.cardSong}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{color: '#c392f5'}}>
                    {data.videoGroup.map(item => item.name).join(' - ')}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button
                titleStyle={{color: '#909090', paddingLeft: 5}}
                title={data.shareCount}
                type="clear"
                icon={
                  <Ionicons
                    name="share-social-outline"
                    size={15}
                    color="#909090"
                  />
                }
              />
              <Button
                titleStyle={{color: '#909090', paddingLeft: 5}}
                title={data.commentCount}
                type="clear"
                icon={
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={15}
                    color="#909090"
                  />
                }
              />
              <Button
                titleStyle={{color: '#909090', paddingLeft: 5}}
                title={data.praisedCount}
                type="clear"
                icon={
                  <FeatherIcons name="thumbs-up" size={15} color="#909090" />
                }
              />
              <Button
                titleStyle={{color: '#909090', paddingLeft: 5}}
                title=""
                type="clear"
              />
            </View>
          </View>
        </Card.Body>
      </Card>
    );
  };
  return (
    <View style={{height: '100%', backgroundColor: '#fff', paddingBottom: 70}}>
      <Tabs
        tabs={tabs}
        tabBarBackgroundColor="#f5f5f5"
        tabBarUnderlineStyle={{backgroundColor: '#f5f5f5'}}
        tabBarTextStyle={{fontWeight: 'bold'}}
        tabBarInactiveTextColor="#6a646b"
        tabBarActiveTextColor="#383238">
        <LinearGradient colors={['#f5f5f5', '#fff']}>
          <FlatList
            keyExtractor={(item: any, i) => item.id || i}
            data={recommendList}
            renderItem={({item}: any) => <EventComp item={item} />}
          />
        </LinearGradient>
        <View>
          <LinearGradient colors={['#eee8f6', '#fff']}>
            <Empty />
          </LinearGradient>
        </View>
      </Tabs>
    </View>
  );
});
const styles = StyleSheet.create({
  cardImg: {
    width: 200,
    height: 300,
    backgroundColor: '#ccc',
  },
  cardStyle: {
    backgroundColor: 'transparent',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 0,
    borderBottomColor: '#efeff1',
  },
  cardBodyStyle: {
    paddingBottom: 10,
    paddingLeft: 70,
    paddingRight: 70,
  },
  cardImgStyle: {
    width: 240,
    height: 300,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  cardSong: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
  },
});
