import React, {memo, useState, useEffect} from 'react';

import {StyleSheet, Text, View, FlatList, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {ListItem, Avatar} from 'react-native-elements';
import {commentMusic} from '../../api';
import {formatDateString as format} from '../../utils';
import Feather from 'react-native-vector-icons/Feather';
export default memo(function Comment({route, navigation}: any) {
  const [songNow, setSongNow]: any = useState(null);
  const [comment, setComment]: any = useState([]);

  useEffect(() => {
    if (route.params) {
      const songInfo = route.params.song;
      setSongNow(songInfo);
      getComment(songInfo.id);
    }
  }, [route.params]);
  const getComment = async (id: string | number) => {
    let {
      total = 0,
      hotComments = [],
      comments = [],
    }: any = await commentMusic({id});
    setComment([...hotComments, ...comments]);
  };

  const Header = () => (
    <View style={{paddingBottom: 10, backgroundColor: '#f5f5f5'}}>
      <ListItem
        onPress={() => {
          navigation.navigate('SongModel', {id: songNow.id});
        }}>
        <Avatar
          containerStyle={{width: 60, height: 60}}
          source={{uri: songNow && songNow.imgUrl}}
        />
        <ListItem.Content>
          <ListItem.Title>{songNow && songNow.name}</ListItem.Title>
          <ListItem.Subtitle>
            {songNow && songNow.artists.map((v: any) => v.name).join('/')}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
  const Comment = ({item, i}: any) => {
    return (
      <View>
        <ListItem
          bottomDivider
          containerStyle={{
            borderBottomColor: '#f3f3f3',
            alignItems: 'flex-start',
          }}>
          <Avatar size={40} rounded source={{uri: item.user.avatarUrl}} />
          <ListItem.Content>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{item.user.nickname}</Text>
              <Text style={{fontSize: 12}}>
                {item.likedCount > 0 ? item.likedCount + ' ' : ''}
                <Feather name="thumbs-up" />
              </Text>
            </View>
            <ListItem.Subtitle>{format(item.time)}</ListItem.Subtitle>
            <ListItem.Title
              style={{lineHeight: 22, fontSize: 14, paddingTop: 10}}>
              {item.content}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <FlatList
        keyExtractor={(item: any, i) => item.commentId || i}
        data={comment}
        renderItem={Comment}
        ListHeaderComponent={Header}
      />
    </View>
  );
});

const styles = StyleSheet.create({});
