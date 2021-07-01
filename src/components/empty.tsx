import React, {memo} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default memo(function Empty() {
  return (
    <View style={{display: 'flex', paddingTop: 30, alignItems: 'center'}}>
      <Image
        source={require('../assets/image/empty.png')}
        style={{width: 200, height: 200}}
      />
      <Text style={{fontSize: 18}}>暂无数据</Text>
    </View>
  );
});

const styles = StyleSheet.create({});
