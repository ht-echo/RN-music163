import React, {useState, useEffect, memo} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {RecommendSongList, GridIcon} from '../../components/songList';
import {Grid} from '@ant-design/react-native';

import {
  personalizedDjprogram,
  djHot,
  djCategoryRecommend,
  djRecommend,
} from '../../api';

const gridData = [
  {
    icon: <GridIcon name="md-calendar" size={25} color="#f36868" />,
    text: `每日推荐`,
  },
  {
    icon: <GridIcon name="md-radio" size={25} color="#f36868" />,
    text: `私人FM`,
  },
  {
    icon: <GridIcon name="md-radio" size={25} color="#f36868" />,
    text: `歌单`,
  },
  {
    icon: <GridIcon name="md-radio" size={25} color="#f36868" />,
    text: `排行榜`,
  },
  {
    icon: <GridIcon name="md-stats-chart" size={25} color="#f36868" />,
    text: `热歌榜`,
  },
];
export default memo(function Podcast() {
  const [guessListData, setGuessListData] = useState([]);
  const [djHotList, setDjHotList] = useState([]);
  const [djHotCategoryList, setDjHotCategoryList] = useState([]);
  const [djRecommendList, setDjRecommendList] = useState([]);
  useEffect(() => {
    getDjPersonalizeRecommend();
    getDjHot();
    getDjCategoryRecommend();
    getDjRecommend();
  }, []);

  const getDjCategoryRecommend = async () => {
    const {data = []}: any = await djCategoryRecommend();
    const dataMap = data
      .filter((item: any) => item.categoryId === 2 || item.categoryId === 3)
      .map((item: any) => item.radios);
    if (dataMap.length > 0) {
      setDjHotCategoryList(dataMap);
    }
  };
  const getDjRecommend = async () => {
    const data: any = await djRecommend();
    if (data.djRadios.length > 0) {
      setDjRecommendList(data.djRadios.slice(0, 6));
    }
  };
  const getDjHot = async () => {
    const {djRadios = []}: any = await djHot({limit: 6});
    setDjHotList(djRadios);
  };
  const getDjPersonalizeRecommend = async () => {
    const {result = []}: any = await personalizedDjprogram();
    const dataMap = result.map((item: any) => {
      return {
        ...item,
        ...{
          playCount: item.program.adjustedPlayCount,
        },
      };
    });
    setGuessListData(dataMap);
  };
  return (
    <View style={{padding: 10, height: '100%', paddingBottom: 60}}>
      {/* <Grid
        data={gridData}
        columnNum={5}
        hasLine={false}
        itemStyle={{
          height: 110,
        }}
      /> */}
      <FlatList
        keyExtractor={item => item.title}
        data={[
          // {title: '猜你在追', data: guessListData},
          {title: '精选播单', data: djHotList},
          {
            title: '音乐故事',
            data: djHotCategoryList[0],
          },
          {
            title: '情感调频',
            data: djHotCategoryList[1],
          },
          {
            title: '为你推荐',
            data: djRecommendList,
          },
        ]}
        renderItem={({item}) => {
          let horizontal = false;
          if (item.title === '猜你在追') {
            horizontal = true;
          } else {
            horizontal = false;
          }
          return (
            <RecommendSongList
              type="podcastPage"
              horizontal={horizontal}
              title={item.title}
              data={item.data || []}
              bg="#f5f5f5"
            />
          );
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({});
