import React, {memo, useState} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {
  InputItem,
  WhiteSpace,
  List,
  Button,
  Toast,
} from '@ant-design/react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export default memo(function loginWithPhone({navigation}: any) {
  const [phoneValue, setPhoneValue] = useState('');
  const [verificValue, setVerificValue] = useState('');
  const [enterPhone, setEnterPhone] = useState(false);

  const nextStep = () => {
    const reg_tel = /^1[0-9]{10}$/;
    if (enterPhone) {
      if (verificValue === '') {
        Toast.info('请输入验证码', 1, undefined, false);
      } else {
        navigation.push('Tabbar', {screen: 'Discover'});
      }
    } else {
      if (phoneValue === '') {
        Toast.info('请输入手机号', 2, undefined, false);
        return;
      } else if (reg_tel.test(phoneValue.replace(/\s*/g, '')) === false) {
        Toast.info('请输入正确的手机号', 2, undefined, false);
      } else {
        setEnterPhone(true);
      }
    }
  };
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingLeft: 10,
          height: 40,
        }}>
        <AntDesignIcons
          name="close"
          color="#343134"
          size={34}
          onPress={() => {
            navigation.push('Tabbar', {screen: 'Discover'});
          }}
        />
        <Text style={{fontSize: 20, paddingLeft: 20}}>手机号登录</Text>
      </View>
      <View
        style={{
          padding: 10,
          paddingTop: 30,
          backgroundColor: '#fff',
          height: '100%',
        }}>
        <Text style={{fontSize: 20}}>
          {enterPhone ? '请输入验证码' : '登录体验更多精彩'}
        </Text>
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <List>
          {enterPhone ? (
            <InputItem
              clear
              autoFocus
              type="number"
              value={verificValue}
              maxLength={6}
              onChange={value => {
                setVerificValue(value);
              }}
              placeholder="输入验证码"></InputItem>
          ) : (
            <InputItem
              clear
              autoFocus
              type="phone"
              value={phoneValue}
              maxLength={13}
              labelNumber={2}
              onVirtualKeyboardConfirm={() => nextStep()}
              onChange={value => {
                setPhoneValue(value);
              }}
              placeholder="输入手机号">
              +86
            </InputItem>
          )}
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <Button
            style={{backgroundColor: 'red', borderRadius: 30}}
            onPress={() => {
              nextStep();
            }}>
            <Text style={{color: '#fff'}}>下一步</Text>
          </Button>
        </List>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({});
