import 'react-native-gesture-handler';
import {Provider as AntRnProvider} from '@ant-design/react-native';

import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import consoleRn from 'reactotron-react-native';
import {
  StyleSheet,
  useColorScheme,
  StatusBar,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Modal} from '@ant-design/react-native';
import {
  setUseId,
  setSongAction,
  getCurrentScreenAction,
  changeSongAction,
} from './store/actions';
import {setData, getData} from './storage';
import {loginRefresh, loginStatus} from './api';
//组件
import Login from './pages/login';
import LoginBg from './pages/login/loginBg/inex';
import Discover from './pages/discover';
import Podcast from './pages/podcast';
import Mine from './pages/mine';
import Notifies from './pages/notifies';
import Friends from './pages/friends';

import SearchInfo from './pages/discover/searchInfo';
import Audio from './components/audio';
import SongModel from './pages/songModel';
import SongListInfo from './pages/songListInfo';
import SongSquare from './pages/songSquare';
import SongTop from './pages/topList';
import VideoInfo from './pages/videoInfo';
import Comment from './pages/comment';
import AudioPlayback from './components/audioPlayback';
//screen
const Tab = createBottomTabNavigator();
const AppStact = createStackNavigator();
const LoginStact = createStackNavigator();
const PageChildStact = createStackNavigator();
const PageInfo = createStackNavigator();
const App = () => {
  const navigationRef: any = useRef();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getDataFn();
  }, []);
  const getDataFn = async () => {
    const currentSong = await getData('currentSong');
    if (currentSong) {
      dispatch(changeSongAction(currentSong));
    } else {
      dispatch(setSongAction(167850));
    }
    const cookie = await getData('cookie');
    if (cookie) {
      setIsLogin(true);
      getLoginStatus();
    } else {
      setIsLogin(false);
    }
  };
  const getLoginStatus = async () => {
    const loginRefreshResult = await loginRefresh();
    const {data}: any = await loginStatus();
    if (!data.account) {
      setModalVisible(true);
      dispatch(setUseId(null));
    } else {
      dispatch(setUseId(data.account.id));
    }
  };
  const footerButtons = [
    {text: '取消', onPress: () => setModalVisible(false)},
    {
      text: '确认',
      onPress: () => {
        setModalVisible(false);
        setIsLogin(false);
      },
    },
  ];

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const TabBar = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Discover') {
              iconName = focused ? 'disc' : 'disc-outline';
            } else if (route.name === 'Podcast') {
              iconName = focused ? 'radio' : 'radio-outline';
            } else if (route.name === 'Mine') {
              iconName = focused ? 'musical-notes' : 'musical-notes-outline';
            } else if (route.name === 'Notifies') {
              iconName = focused ? 'bell' : 'bell-outline';
            } else if (route.name === 'Friends') {
              iconName = focused ? 'people' : 'people-outline';
            }
            if (route.name === 'Notifies') {
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            } else {
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#ff595d',
          inactiveTintColor: '#b4b1b4',
          style: {
            elevation: 0,
          },
        }}>
        <Tab.Screen
          name="Discover"
          component={Discover}
          options={{tabBarLabel: '发现'}}
        />
        <Tab.Screen
          name="Podcast"
          component={Podcast}
          options={{tabBarLabel: '播客'}}
        />
        <Tab.Screen
          name="Mine"
          component={Mine}
          options={{tabBarLabel: '我的'}}
        />
        <Tab.Screen
          name="Notifies"
          component={Notifies}
          options={{tabBarLabel: '消息'}}
        />
        <Tab.Screen
          name="Friends"
          component={Friends}
          options={{tabBarLabel: '云村'}}
        />
      </Tab.Navigator>
    );
  };
  const LoginAll = () => {
    return (
      <LoginStact.Navigator>
        <LoginStact.Screen
          name="LoginBg"
          component={LoginBg}
          options={{headerShown: false}}
        />
        <LoginStact.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      </LoginStact.Navigator>
    );
  };
  const PageChild = () => {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <Audio />
        <PageChildStact.Navigator>
          <PageChildStact.Screen
            name="TabBar"
            component={TabBar}
            options={{headerShown: false, headerStyle: {height: 0}}}
          />
          <PageChildStact.Screen
            name="SearchInfo"
            component={SearchInfo}
            options={{headerShown: false, headerStyle: {height: 0}}}
          />
          <PageChildStact.Screen
            name="SongListInfo"
            component={SongListInfo}
            options={{
              title: '歌单',
              headerTintColor: '#fff',
              headerStyle: {backgroundColor: '#7d7d7d', elevation: 0},
            }}
          />
          <PageChildStact.Screen
            name="SongSquare"
            component={SongSquare}
            options={{
              title: '歌单广场',
              headerTintColor: '#000',
              headerStyle: {
                elevation: 0,
              },
            }}
          />
          <PageChildStact.Screen
            name="SongTop"
            component={SongTop}
            options={{
              title: '排行榜',
              headerTintColor: '#000',
              headerStyle: {
                elevation: 0,
                backgroundColor: '#f5f5f5',
              },
            }}
          />
        </PageChildStact.Navigator>
      </View>
    );
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <AntRnProvider>
        <StatusBar
          backgroundColor={isDarkMode ? Colors.darker : '#f5f5f5'}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <View
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
          }}>
          <AudioPlayback />
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              const currentRouteNameReady =
                navigationRef.current.getCurrentRoute().name;
              dispatch(getCurrentScreenAction(currentRouteNameReady));
            }}
            onStateChange={() => {
              const currentRouteName =
                navigationRef.current.getCurrentRoute().name;
              dispatch(getCurrentScreenAction(currentRouteName));
            }}>
            <AppStact.Navigator
              initialRouteName={isLogin ? 'PageChild' : 'LoginAll'}>
              <AppStact.Screen
                name="LoginAll"
                component={LoginAll}
                options={{headerShown: false}}
              />
              <AppStact.Screen
                name="PageChild"
                component={PageChild}
                options={{headerShown: false}}
              />
              <AppStact.Screen
                name="SongModel"
                component={SongModel}
                options={{headerShown: false}}
              />
              <AppStact.Screen
                name="VideoInfo"
                component={VideoInfo}
                options={{
                  title: '',
                  headerTransparent: true,
                  headerTintColor: '#fff',
                }}
              />
              <AppStact.Screen
                name="Comment"
                component={Comment}
                options={{
                  title: '评论',
                  headerStyle: {
                    elevation: 0,
                  },
                }}
              />
            </AppStact.Navigator>
          </NavigationContainer>
        </View>
        <Modal
          title="登录失效"
          transparent
          onClose={() => {
            setModalVisible(false);
          }}
          maskClosable
          visible={modalVisible}
          footer={footerButtons}>
          <View style={{paddingVertical: 20}}>
            <Text style={{textAlign: 'center'}}>是否重新登录？</Text>
          </View>
        </Modal>
      </AntRnProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
