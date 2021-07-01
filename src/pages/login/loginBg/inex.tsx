import React, {memo} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Button, Avatar} from 'react-native-elements';

export default memo(function LoginBg({navigation}: any) {
  return (
    <View style={styles.loginBg}>
      <StatusBar backgroundColor="#d92c20" />
      <Avatar
        containerStyle={{backgroundColor: '#f22a27'}}
        size={80}
        rounded
        icon={{
          type: 'material',
          name: 'my-library-music',
          size: 50,
          color: '#fff',
        }}
      />
      <View style={styles.btns}>
        <Button
          title="二维码登录"
          buttonStyle={{backgroundColor: '#fff', borderRadius: 20}}
          titleStyle={{color: '#dc2c1f'}}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
        <View style={{height: 30}}></View>
        <Button
          title="立即体验"
          type="outline"
          buttonStyle={{
            backgroundColor: '#d92c20',
            borderRadius: 20,
            width: '100%',
            borderColor: '#f55348',
          }}
          titleStyle={{color: '#fff'}}
          onPress={() => {
            navigation.push('PageChild', {
              screen: 'Discover',
            });
          }}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  loginBg: {
    backgroundColor: '#d92c20',
    paddingTop: 100,
    paddingBottom: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  btns: {
    width: '80%',
  },
});
