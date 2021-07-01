import React, {memo, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {Button, Image} from 'react-native-elements';
import {Toast, WhiteSpace, Modal} from '@ant-design/react-native';
import {saveImg} from '../../utils';
import {
  loginQrKey,
  loginQrCreate,
  loginQrCheck,
  loginStatus,
  loginRefresh,
} from '../../api';
import {setCookie, setUseId} from '../../store/actions';
export default memo(function Login({navigation}: any) {
  const dispatch = useDispatch();
  const [qrImgData, setqrImgData]: string | any = useState(null);
  const [loginKey, setLoginKey] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const footerButtons = [
    {text: '取消', onPress: () => setModalVisible(false)},
    {
      text: '确认',
      onPress: () => {
        setModalVisible(false);
        affirmLogin();
      },
    },
  ];

  useEffect(() => {
    getLoginqrImgFn();
  }, []);
  const affirmLogin = async () => {
    const data: any = await loginQrCheck({key: loginKey});
    if (data.code == 800) {
      Toast.info('二维码过期', 2, undefined, false);
    } else if (data.code == 801) {
      Toast.info('等待扫码中~~~', 2, undefined, false);
    } else if (data.code == 802) {
      Toast.info('请在网易云app确认授权', 2, undefined, false);
    } else if (data.code == 803) {
      dispatch(setCookie(data.cookie));
      await loginRefresh();
      const loginData: any = await loginStatus();
      dispatch(setUseId(loginData.data.account.userId));

      navigation.navigate('PageChild', {
        screen: 'Discover',
      });
      Toast.success('登录成功', 2, undefined, false);
    }
  };
  const getLoginqrImgFn = async () => {
    const keyData: any = await loginQrKey();
    const {data = {}}: any = await loginQrCreate({
      key: keyData.data.unikey,
      qrimg: true,
    });
    if (data) {
      setqrImgData(data.qrimg);
      setLoginKey(keyData.data.unikey);
    }
  };
  return (
    <View style={styles.loginBox}>
      <StatusBar backgroundColor="#f5f5f5" />
      <Text>长按图片保存</Text>
      <Text>打开网易云音乐扫一扫,点击确认登录</Text>
      <WhiteSpace />
      <Text style={{fontSize: 18}}>二维码生成较慢，请耐心等待</Text>
      <Text style={{fontSize: 18}}>图片保存不成功，请截屏保存</Text>
      <WhiteSpace />
      <WhiteSpace />
      {qrImgData != null ? (
        <Image
          source={{uri: qrImgData || ''}}
          PlaceholderContent={
            <Button title="Loading button" loading type="clear" />
          }
          style={{width: 200, height: 200}}
          onLongPress={async () => {
            const success: any = await saveImg(qrImgData);
            // if (success) {
            //   Toast.success('保存成功', 2, undefined, false);
            // } else {
            //   Toast.fail('保存失败', 2, undefined, false);
            // }
          }}
        />
      ) : (
        <Button title="Loading button" loading type="clear" />
      )}
      <View style={{height: 30}}></View>
      <Button
        title="确认登录"
        disabled={qrImgData == null}
        onPress={() => {
          setModalVisible(true);
        }}></Button>
      <Modal
        title="确认登录"
        transparent
        onClose={() => {
          setModalVisible(false);
        }}
        maskClosable
        visible={modalVisible}
        footer={footerButtons}>
        <View style={{paddingVertical: 20}}>
          <Text style={{textAlign: 'center'}}>是否已经扫码成功？</Text>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  loginBox: {
    padding: 20,
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
  },
});
