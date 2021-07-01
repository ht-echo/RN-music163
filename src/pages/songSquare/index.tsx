import React, {useState, useEffect, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import consoleRn from 'reactotron-react-native';
import TabPage from '../../components/tabPage';
import {ItemSingle} from '../../components/songList';

import {playlistHot, topPlaylistHighquality, topPlaylist} from '../../api';
export default memo(function SongSquare() {
  const [hotTags, setHotTags]: any = useState([]);
  const [pageData, setPageData]: any = useState([]);
  const [currentTab, setCurrentTab]: any = useState({id: -1, index: 0});
  const [currentPageData, setCurrentPageData]: any = useState({});

  useEffect(() => {
    setPageData([]);
    getPlaylistHot();
  }, []);
  useEffect(() => {
    if (currentPageData.data) {
      let pageDataMap: any = pageData;
      if (!pageData[currentTab.index]) {
        pageDataMap[currentTab.index] = currentPageData;
        setPageData([...pageDataMap]);
      }
    }
  }, [currentPageData]);
  useEffect(() => {
    if (!pageData[currentTab.index]) {
      getSongData(currentTab.title);
    }
  }, [currentTab]);
  const getSongData = async (name: string) => {
    switch (name) {
      case '官方':
        const {playlists = []}: any = await topPlaylistHighquality();
        setCurrentPageData({data: playlists});
        break;
      default:
        const data: any = await topPlaylist({cat: name});
        setCurrentPageData({data: data.playlists});
        break;
    }
  };
  const getPlaylistHot = async () => {
    const {tags = []}: any = await playlistHot();
    const customTags = [{title: '官方', id: -1}];
    const getTags = tags.map((item: any) => {
      return {title: item.name, id: item.id};
    });
    if (tags.length > 0) {
      const tagsMap: any = [...customTags, ...getTags];
      setHotTags(tagsMap);
      setCurrentTab({title: '官方', index: 0});
      getSongData('官方');
    }
  };
  const onChange = (tab: any, index: number) => {
    setCurrentTab({title: tab.title, index});
  };
  return (
    <View style={{height: '100%', backgroundColor: '#fff', paddingTop: 0}}>
      <TabPage
        numColumns={3}
        tabBgColor="#fff"
        tabData={[...hotTags]}
        pageData={[...pageData]}
        renderItem={({item}: any) => <ItemSingle item={item} />}
        onChange={onChange}
      />
    </View>
  );
});

const styles = StyleSheet.create({});
