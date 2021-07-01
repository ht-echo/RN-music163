import React, {memo} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import {Tabs} from '@ant-design/react-native';

import {getScreenWidth} from './songList';
interface tabPageProps {
  listHeight?: number;
  offset?: number;
  tabData: any[];
  pageData: any[];
  dataName?: string;
  renderItem: any;
  onChange: Function;
  numColumns?: number;
  tabBgColor?: string;
}
export default memo(function TabPage({
  listHeight = getScreenWidth() / 3.8,
  offset = 55,
  tabData,
  pageData,
  renderItem,
  onChange,
  numColumns,
  dataName,
  tabBgColor = '#f5f5f5',
}: tabPageProps) {
  return (
    <Tabs
      tabs={tabData || []}
      initialPage={0}
      tabBarPosition="top"
      tabBarBackgroundColor={tabBgColor}
      tabBarUnderlineStyle={{width: 0, height: 0}}
      tabBarInactiveTextColor="rgb(31, 28, 28)"
      tabBarActiveTextColor="red"
      onChange={(tab: any, index: number) => onChange(tab, index)}>
      {tabData.map((list: any, index: number) => {
        let paramsInit = {};
        if (pageData[index]) {
          paramsInit = {
            style: {
              width: '100%',
              padding: 10,
            },
            contentContainerStyle: {width: '100%'},
          };
        }
        const pageDataView = pageData[index] ? (
          <View key={'flatInfoView' + index}>
            {numColumns && numColumns !== 1 ? (
              <FlatList
                {...paramsInit}
                numColumns={numColumns}
                columnWrapperStyle={{width: '33.33%'}}
                data={pageData[index][dataName || 'data'] || []}
                keyExtractor={(item, i) => item.id || i}
                getItemLayout={(data, index) => ({
                  length: listHeight,
                  offset: (listHeight + offset) * index,
                  index,
                })}
                renderItem={renderItem}
              />
            ) : (
              <FlatList
                {...paramsInit}
                data={pageData[index][dataName || 'data'] || []}
                getItemLayout={(data, index) => ({
                  length: listHeight,
                  offset: (listHeight + offset) * index,
                  index,
                })}
                keyExtractor={(item, i) => item.id || i}
                renderItem={renderItem}
              />
            )}
          </View>
        ) : (
          <Button
            loading
            key={'btnloading' + list.id || index}
            title="loading..."
            type="clear"
            loadingStyle={{paddingTop: 80}}
          />
        );

        return pageDataView;
      })}
    </Tabs>
  );
});

const styles = StyleSheet.create({});
