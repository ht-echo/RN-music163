import axios from 'axios';
import {Toast} from '@ant-design/react-native';
// if (__DEV__) {
//   axios.defaults.baseURL = 'http://192.168.1.88:3000';
// } else {
  axios.defaults.baseURL = 'https://vercel-cloudmusic.vercel.app';
// }
axios.defaults.withCredentials = true;
axios.defaults.timeout = 20000;
function getData(url: string, params?: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then(res => {
        resolve(res.data); // 成功
      })
      .catch(err => {
        Toast.offline('请求超时了', 2, undefined, false);
        reject(err); //失败
      });
  }).catch(() => {});
}
/**
 * @url /login/cellphone
 * @description 手机登录
 */
export const loginCellphone = (params?: object) =>
  getData(`/login/cellphone`, params);
/**
 * @url /login
 * @description 邮箱登录
 */
export const login = (params?: object) => getData(`/login`, params);
/**
 * @url /login/qr/key
 * @description 二维码key生成接口
 */
export const loginQrKey = (params?: object) => getData(`/login/qr/key`, params);
/**
 * @url /login/qr/create
 * @description 二维码生成接口
 */
export const loginQrCreate = (params?: object) =>
  getData(`/login/qr/create`, params);
/**
 * @url /login/qr/check
 * @description 二维码检测扫码状态接口
 */
export const loginQrCheck = (params?: object) =>
  getData(`/login/qr/check`, params);
/**
 * @url /login/refresh
 * @description 刷新登录
 */
export const loginRefresh = (params?: object) =>
  getData(`/login/refresh`, params);
/**
 * @url /captcha/sent
 * @description 发送验证码
 */
export const captchaSent = (params?: object) =>
  getData(`/captcha/sent`, params);
/**
 * @url /captcha/verify
 * @description 验证验证码
 */
export const captchaVerify = (params?: object) =>
  getData(`/captcha/verify`, params);
/**
 * @url /register/cellphone
 * @description 注册(修改密码)
 */
export const registerCellphone = (params?: object) =>
  getData(`/register/cellphone`, params);
/**
 * @url /cellphone/existence/check
 * @description 检测手机号码是否已注册
 */
export const cellphoneExistenceCheck = (params?: object) =>
  getData(`/cellphone/existence/check`, params);
/**
 * @url /activate/init/profile
 * @description 初始化昵称
 */
export const activateInitProfile = (params?: object) =>
  getData(`/activate/init/profile`, params);
/**
 * @url /rebind
 * @description 更换绑定手机
 */
export const rebind = (params?: object) => getData(`/rebind`, params);
/**
 * @url /logout
 * @description 退出登录
 */
export const logout = (params?: object) => getData(`/logout`, params);
/**
 * @url /login/status
 * @description 登录状态
 */
export const loginStatus = (params?: object) =>
  getData(`/login/status`, params);
/**
 * @url /user/detail
 * @description 获取用户详情
 */
export const userDetail = (params?: object) => getData(`/user/detail`, params);
/**
 * @url /user/account
 * @description 获取账号信息
 */
export const userAccount = (params?: object) =>
  getData(`/user/account`, params);
/**
 * @url /user/subcount
 * @description 获取用户信息 , 歌单，收藏，mv, dj 数量
 */
export const userSubcount = (params?: object) =>
  getData(`/user/subcount`, params);
/**
 * @url /user/level
 * @description 获取用户等级信息
 */
export const userLevel = (params?: object) => getData(`/user/level`, params);
/**
 * @url /user/binding
 * @description 获取用户绑定信息
 */
export const userBinding = (params?: object) =>
  getData(`/user/binding`, params);
/**
 * @url /user/replacephone
 * @description 用户绑定手机
 */
export const userReplacephone = (params?: object) =>
  getData(`/user/replacephone`, params);
/**
 * @url /user/update
 * @description 更新用户信息
 */
export const userUpdate = (params?: object) => getData(`/user/update`, params);
/**
 * @url /avatar/upload
 * @description 更新头像
 */
export const avatarUpload = (params?: object) =>
  getData(`/avatar/upload`, params);
/**
 * @url /countries/code/list
 * @description 国家编码列表
 */
export const countriesCodeList = (params?: object) =>
  getData(`/countries/code/list`, params);
/**
 * @url /user/playlist
 * @description 获取用户歌单
 */
export const userPlaylist = (params?: object) =>
  getData(`/user/playlist`, params);
/**
 * @url /playlist/update
 * @description 更新歌单
 */
export const playlistUpdate = (params?: object) =>
  getData(`/playlist/update`, params);
/**
 * @url /playlist/desc/update
 * @description 更新歌单描述
 */
export const playlistDescUpdate = (params?: object) =>
  getData(`/playlist/desc/update`, params);
/**
 * @url /playlist/name/update
 * @description 更新歌单名
 */
export const playlistNameUpdate = (params?: object) =>
  getData(`/playlist/name/update`, params);
/**
 * @url /playlist/tags/update
 * @description 更新歌单标签
 */
export const playlistTagsUpdate = (params?: object) =>
  getData(`/playlist/tags/update`, params);
/**
 * @url /playlist/cover/update
 * @description 歌单封面上传
 */
export const playlistCoverUpdate = (params?: object) =>
  getData(`/playlist/cover/update`, params);
/**
 * @url /playlist/order/update
 * @description 调整歌单顺序
 */
export const playlistOrderUpdate = (params?: object) =>
  getData(`/playlist/order/update`, params);
/**
 * @url /song/order/update
 * @description 调整歌曲顺序
 */
export const songOrderUpdate = (params?: object) =>
  getData(`/song/order/update`, params);
/**
 * @url /user/comment/history
 * @description 获取用户历史评论
 */
export const userCommentHistory = (params?: object) =>
  getData(`/user/comment/history`, params);
/**
 * @url /user/dj
 * @description 获取用户电台
 */
export const userDj = (params?: object) => getData(`/user/dj`, params);
/**
 * @url /user/follows
 * @description 获取用户关注列表
 */
export const userFollows = (params?: object) =>
  getData(`/user/follows`, params);
/**
 * @url /user/followeds
 * @description 获取用户粉丝列表
 */
export const userFolloweds = (params?: object) =>
  getData(`/user/followeds`, params);
/**
 * @url /user/event
 * @description 获取用户动态
 */
export const userEvent = (params?: object) => getData(`/user/event`, params);
/**
 * @url /event/forward
 * @description 转发用户动态
 */
export const eventForward = (params?: object) =>
  getData(`/event/forward`, params);
/**
 * @url /event/del
 * @description 删除用户动态
 */
export const eventDel = (params?: object) => getData(`/event/del`, params);
/**
 * @url /share/resource
 * @description 分享歌曲、歌单、mv、电台、电台节目到动态
 */
export const shareResource = (params?: object) =>
  getData(`/share/resource`, params);
/**
 * @url /comment/event
 * @description 获取动态评论
 */
export const commentEvent = (params?: object) =>
  getData(`/comment/event`, params);
/**
 * @url /follow
 * @description 关注/取消关注用户
 */
export const follow = (params?: object) => getData(`/follow`, params);
/**
 * @url /user/record
 * @description 获取用户播放记录
 */
export const userRecord = (params?: object) => getData(`/user/record`, params);
/**
 * @url /hot/topic
 * @description 获取热门话题
 */
export const hotTopic = (params?: object) => getData(`/hot/topic`, params);
/**
 * @url /topic/detail
 * @description 获取话题详情
 */
export const topicDetail = (params?: object) =>
  getData(`/topic/detail`, params);
/**
 * @url /topic/detail/event/hot
 * @description 获取话题详情热门动态
 */
export const topicDetailEventHot = (params?: object) =>
  getData(`/topic/detail/event/hot`, params);
/**
 * @url /comment/hotwall/list
 * @description 云村热评(官方下架,暂不能用)
 */
export const commentHotwallList = (params?: object) =>
  getData(`/comment/hotwall/list`, params);
/**
 * @url /playmode/intelligence/list
 * @description 心动模式/智能播放
 */
export const playmodeIntelligenceList = (params?: object) =>
  getData(`/playmode/intelligence/list`, params);
/**
 * @url /event
 * @description 获取动态消息
 */
export const event = (params?: object) => getData(`/event`, params);
/**
 * @url /artist/list
 * @description 歌手分类列表
 */
export const artistList = (params?: object) => getData(`/artist/list`, params);
/**
 * @url /artist/sub
 * @description 收藏/取消收藏歌手
 */
export const artistSub = (params?: object) => getData(`/artist/sub`, params);
/**
 * @url /artist/top/song
 * @description 歌手热门50首歌曲
 */
export const artistTopSong = (params?: object) =>
  getData(`/artist/top/song`, params);
/**
 * @url /artist/songs
 * @description 歌手全部歌曲
 */
export const artistSongs = (params?: object) =>
  getData(`/artist/songs`, params);
/**
 * @url /artist/sublist
 * @description 收藏的歌手列表
 */
export const artistSublist = (params?: object) =>
  getData(`/artist/sublist`, params);
/**
 * @url /topic/sublist
 * @description 收藏的专栏
 */
export const topicSublist = (params?: object) =>
  getData(`/topic/sublist`, params);
/**
 * @url /video/sub
 * @description 收藏视频
 */
export const videoSub = (params?: object) => getData(`/video/sub`, params);
/**
 * @url /mv/sub
 * @description 收藏/取消收藏 MV
 */
export const mvSub = (params?: object) => getData(`/mv/sub`, params);
/**
 * @url /mv/sublist
 * @description 收藏的 MV 列表
 */
export const mvSublist = (params?: object) => getData(`/mv/sublist`, params);
/**
 * @url /playlist/catlist
 * @description 歌单分类
 */
export const playlistCatlist = (params?: object) =>
  getData(`/playlist/catlist`, params);
/**
 * @url /playlist/hot
 * @description 热门歌单分类
 */
export const playlistHot = (params?: object) =>
  getData(`/playlist/hot`, params);
/**
 * @url /top/playlist
 * @description 歌单 ( 网友精选碟 )
 */
export const topPlaylist = (params?: object) =>
  getData(`/top/playlist`, params);
/**
 * @url /playlist/highquality/tags
 * @description 精品歌单标签列表
 */
export const playlistHighqualityTags = (params?: object) =>
  getData(`/playlist/highquality/tags`, params);
/**
 * @url /top/playlist/highquality
 * @description 获取精品歌单
 */
export const topPlaylistHighquality = (params?: object) =>
  getData(`/top/playlist/highquality`, params);
/**
 * @url /related/playlist
 * @description 相关歌单推荐
 */
export const relatedPlaylist = (params?: object) =>
  getData(`/related/playlist`, params);
/**
 * @url /playlist/detail
 * @description 获取歌单详情
 */
export const playlistDetail = (params?: object) =>
  getData(`/playlist/detail`, params);
/**
 * @url /playlist/detail/dynamic
 * @description 歌单详情动态
 */
export const playlistDetailDynamic = (params?: object) =>
  getData(`/playlist/detail/dynamic`, params);
/**
 * @url /song/url
 * @description 获取音乐 url
 */
export const songUrl = (params?: object) => getData(`/song/url`, params);
/**
 * @url /check/music
 * @description 音乐是否可用
 */
export const checkMusic = (params?: object) => getData(`/check/music`, params);
/**
 * @url /search
 * @description 搜索
 */
export const search = (params?: object) => getData(`/search`, params);
/**
 * @url /cloudsearch
 * @description 搜索(更多)
 */
export const cloudsearch = (params?: object) => getData(`/cloudsearch`, params);
/**
 * @url /search/default
 * @description 默认搜索关键词
 */
export const searchDefault = (params?: object) =>
  getData(`/search/default`, params);
/**
 * @url /search/hot
 * @description 热搜列表(简略)
 */
export const searchHot = (params?: object) => getData(`/search/hot`, params);
/**
 * @url /search/hot/detail
 * @description 热搜列表(详细)
 */
export const searchHotDetail = (params?: object) =>
  getData(`/search/hot/detail`, params);
/**
 * @url /search/suggest
 * @description 搜索建议
 */
export const searchSuggest = (params?: object) =>
  getData(`/search/suggest`, params);
/**
 * @url /search/multimatch
 * @description 搜索多重匹配
 */
export const searchMultimatch = (params?: object) =>
  getData(`/search/multimatch`, params);
/**
 * @url /playlist/create
 * @description 新建歌单
 */
export const playlistCreate = (params?: object) =>
  getData(`/playlist/create`, params);
/**
 * @url /playlist/delete
 * @description 删除歌单
 */
export const playlistDelete = (params?: object) =>
  getData(`/playlist/delete`, params);
/**
 * @url /playlist/subscribe
 * @description 收藏/取消收藏歌单
 */
export const playlistSubscribe = (params?: object) =>
  getData(`/playlist/subscribe`, params);
/**
 * @url /playlist/subscribers
 * @description 歌单收藏者
 */
export const playlistSubscribers = (params?: object) =>
  getData(`/playlist/subscribers`, params);
/**
 * @url /playlist/tracks
 * @description 对歌单添加或删除歌曲
 */
export const playlistTracks = (params?: object) =>
  getData(`/playlist/tracks`, params);
/**
 * @url /playlist/track/add
 * @description 收藏视频到视频歌单
 */
export const playlistTrackAdd = (params?: object) =>
  getData(`/playlist/track/add`, params);
/**
 * @url /playlist/track/delete
 * @description 删除视频歌单里的视频
 */
export const playlistTrackDelete = (params?: object) =>
  getData(`/playlist/track/delete`, params);
/**
 * @url /playlist/video/recent
 * @description 最近播放的视频
 */
export const playlistVideoRecent = (params?: object) =>
  getData(`/playlist/video/recent`, params);
/**
 * @url /lyric
 * @description 获取歌词
 */
export const lyric = (params?: object) => getData(`/lyric`, params);
/**
 * @url /top/song
 * @description 新歌速递
 */
export const topSong = (params?: object) => getData(`/top/song`, params);
/**
 * @url /homepage/block/page
 * @description 首页-发现
 */
export const homepageBlockPage = (params?: object) =>
  getData(`/homepage/block/page`, params);
/**
 * @url /homepage/dragon/ball
 * @description 首页-发现-圆形图标入口列表
 */
export const homepageDragonBall = (params?: object) =>
  getData(`/homepage/dragon/ball`, params);
/**
 * @url /comment/music
 * @description 歌曲评论
 */
export const commentMusic = (params?: object) =>
  getData(`/comment/music`, params);
/**
 * @url /comment/floor
 * @description 楼层评论
 */
export const commentFloor = (params?: object) =>
  getData(`/comment/floor`, params);
/**
 * @url /comment/album
 * @description 专辑评论
 */
export const commentAlbum = (params?: object) =>
  getData(`/comment/album`, params);
/**
 * @url /comment/playlist
 * @description 歌单评论
 */
export const commentPlaylist = (params?: object) =>
  getData(`/comment/playlist`, params);
/**
 * @url /comment/mv
 * @description mv 评论
 */
export const commentMv = (params?: object) => getData(`/comment/mv`, params);
/**
 * @url /comment/dj
 * @description 电台节目评论
 */
export const commentDj = (params?: object) => getData(`/comment/dj`, params);
/**
 * @url /comment/video
 * @description 视频评论
 */
export const commentVideo = (params?: object) =>
  getData(`/comment/video`, params);
/**
 * @url /comment/hot
 * @description 热门评论
 */
export const commentHot = (params?: object) => getData(`/comment/hot`, params);
/**
 * @url /comment/new
 * @description 新版评论接口
 */
export const commentNew = (params?: object) => getData(`/comment/new`, params);
/**
 * @url /comment/like
 * @description 给评论点赞
 */
export const commentLike = (params?: object) =>
  getData(`/comment/like`, params);
/**
 * @url /hug/comment
 * @description 抱一抱评论
 */
export const hugComment = (params?: object) => getData(`/hug/comment`, params);
/**
 * @url /comment/hug/list
 * @description 评论抱一抱列表
 */
export const commentHugList = (params?: object) =>
  getData(`/comment/hug/list`, params);
/**
 * @url /comment
 * @description 发送/删除评论
 */
export const comment = (params?: object) => getData(`/comment`, params);
/**
 * @url /banner
 * @description banner
 */
export const banner = (params?: object) => getData(`/banner`, params);
/**
 * @url /resource/like
 * @description 资源点赞( MV,电台,视频)
 */
export const resourceLike = (params?: object) =>
  getData(`/resource/like`, params);
/**
 * @url /playlist/mylike
 * @description 获取点赞过的视频
 */
export const playlistMylike = (params?: object) =>
  getData(`/playlist/mylike`, params);
/**
 * @url /song/detail
 * @description 获取歌曲详情
 */
export const songDetail = (params?: object) => getData(`/song/detail`, params);
/**
 * @url /album
 * @description 获取专辑内容
 */
export const album = (params?: object) => getData(`/album`, params);
/**
 * @url /album/detail/dynamic
 * @description 专辑动态信息
 */
export const albumDetailDynamic = (params?: object) =>
  getData(`/album/detail/dynamic`, params);
/**
 * @url /album/sub
 * @description 收藏/取消收藏专辑
 */
export const albumSub = (params?: object) => getData(`/album/sub`, params);
/**
 * @url /album/sublist
 * @description 获取已收藏专辑列表
 */
export const albumSublist = (params?: object) =>
  getData(`/album/sublist`, params);
/**
 * @url /artists
 * @description 获取歌手单曲
 */
export const artists = (params?: object) => getData(`/artists`, params);
/**
 * @url /artist/mv
 * @description 获取歌手 mv
 */
export const artistMv = (params?: object) => getData(`/artist/mv`, params);
/**
 * @url /artist/album
 * @description 获取歌手专辑
 */
export const artistAlbum = (params?: object) =>
  getData(`/artist/album`, params);
/**
 * @url /artist/desc
 * @description 获取歌手描述
 */
export const artistDesc = (params?: object) => getData(`/artist/desc`, params);
/**
 * @url /artist/detail
 * @description 获取歌手详情
 */
export const artistDetail = (params?: object) =>
  getData(`/artist/detail`, params);
/**
 * @url /simi/artist
 * @description 获取相似歌手
 */
export const simiArtist = (params?: object) => getData(`/simi/artist`, params);
/**
 * @url /simi/playlist
 * @description 获取相似歌单
 */
export const simiPlaylist = (params?: object) =>
  getData(`/simi/playlist`, params);
/**
 * @url /simi/mv
 * @description 相似 mv
 */
export const simiMv = (params?: object) => getData(`/simi/mv`, params);
/**
 * @url /simi/song
 * @description 获取相似音乐
 */
export const simiSong = (params?: object) => getData(`/simi/song`, params);
/**
 * @url /simi/user
 * @description 获取最近 5 个听了这首歌的用户
 */
export const simiUser = (params?: object) => getData(`/simi/user`, params);
/**
 * @url /recommend/resource
 * @description 获取每日推荐歌单
 */
export const recommendResource = (params?: object) =>
  getData(`/recommend/resource`, params);
/**
 * @url /recommend/songs
 * @description 获取每日推荐歌曲
 */
export const recommendSongs = (params?: object) =>
  getData(`/recommend/songs`, params);
/**
 * @url /history/recommend/songs
 * @description 获取历史日推可用日期列表
 */
export const historyRecommendSongs = (params?: object) =>
  getData(`/history/recommend/songs`, params);
/**
 * @url /history/recommend/songs/detail
 * @description 获取历史日推详情数据
 */
export const historyRecommendSongsDetail = (params?: object) =>
  getData(`/history/recommend/songs/detail`, params);
/**
 * @url /personal_fm
 * @description 私人 FM
 */
export const personal_fm = (params?: object) => getData(`/personal_fm`, params);
/**
 * @url /daily_signin
 * @description 签到
 */
export const daily_signin = (params?: object) =>
  getData(`/daily_signin`, params);
/**
 * @url /like
 * @description 喜欢音乐
 */
export const like = (params?: object) => getData(`/like`, params);
/**
 * @url /likelist
 * @description 喜欢音乐列表
 */
export const likelist = (params?: object) => getData(`/likelist`, params);
/**
 * @url /fm_trash
 * @description 垃圾桶
 */
export const fm_trash = (params?: object) => getData(`/fm_trash`, params);
/**
 * @url /top/album
 * @description 新碟上架
 */
export const topAlbum = (params?: object) => getData(`/top/album`, params);
/**
 * @url /album/new
 * @description 全部新碟
 */
export const albumNew = (params?: object) => getData(`/album/new`, params);
/**
 * @url /album/newest
 * @description 最新专辑
 */
export const albumNewest = (params?: object) =>
  getData(`/album/newest`, params);
/**
 * @url /scrobble
 * @description 听歌打卡
 */
export const scrobble = (params?: object) => getData(`/scrobble`, params);
/**
 * @url /top/artists
 * @description 热门歌手
 */
export const topArtists = (params?: object) => getData(`/top/artists`, params);
/**
 * @url /mv/all
 * @description 全部 mv
 */
export const mvAll = (params?: object) => getData(`/mv/all`, params);
/**
 * @url /mv/first
 * @description 最新 mv
 */
export const mvFirst = (params?: object) => getData(`/mv/first`, params);
/**
 * @url /mv/exclusive/rcmd
 * @description 网易出品mv
 */
export const mvExclusiveRcmd = (params?: object) =>
  getData(`/mv/exclusive/rcmd`, params);
/**
 * @url /personalized/mv
 * @description 推荐 mv
 */
export const personalizedMv = (params?: object) =>
  getData(`/personalized/mv`, params);
/**
 * @url /personalized
 * @description 推荐歌单
 */
export const personalized = (params?: object) =>
  getData(`/personalized`, params);
/**
 * @url /personalized/newsong
 * @description 推荐新音乐
 */
export const personalizedNewsong = (params?: object) =>
  getData(`/personalized/newsong`, params);
/**
 * @url /personalized/djprogram
 * @description 推荐电台
 */
export const personalizedDjprogram = (params?: object) =>
  getData(`/personalized/djprogram`, params);
/**
 * @url /program/recommend
 * @description 推荐节目
 */
export const programRecommend = (params?: object) =>
  getData(`/program/recommend`, params);
/**
 * @url /personalized/privatecontent
 * @description 独家放送(入口列表)
 */
export const personalizedPrivatecontent = (params?: object) =>
  getData(`/personalized/privatecontent`, params);
/**
 * @url /personalized/privatecontent/list
 * @description 独家放送列表
 */
export const personalizedPrivatecontentList = (params?: object) =>
  getData(`/personalized/privatecontent/list`, params);
/**
 * @url /top/mv
 * @description mv 排行
 */
export const topMv = (params?: object) => getData(`/top/mv`, params);
/**
 * @url /mv/detail
 * @description 获取 mv 数据
 */
export const mvDetail = (params?: object) => getData(`/mv/detail`, params);
/**
 * @url /mv/detail/info
 * @description 获取 mv 点赞转发评论数数据
 */
export const mvDetailInfo = (params?: object) =>
  getData(`/mv/detail/info`, params);
/**
 * @url /mv/url
 * @description mv 地址
 */
export const mvUrl = (params?: object) => getData(`/mv/url`, params);
/**
 * @url /video/group/list
 * @description 获取视频标签列表
 */
export const videoGroupList = (params?: object) =>
  getData(`/video/group/list`, params);
/**
 * @url /video/category/list
 * @description 获取视频分类列表
 */
export const videoCategoryList = (params?: object) =>
  getData(`/video/category/list`, params);
/**
 * @url /video/group
 * @description 获取视频标签/分类下的视频
 */
export const videoGroup = (params?: object) => getData(`/video/group`, params);
/**
 * @url /video/timeline/all
 * @description 获取全部视频列表
 */
export const videoTimelineAll = (params?: object) =>
  getData(`/video/timeline/all`, params);
/**
 * @url /video/timeline/recommend
 * @description 获取推荐视频
 */
export const videoTimelineRecommend = (params?: object) =>
  getData(`/video/timeline/recommend`, params);
/**
 * @url /related/allvideo
 * @description 相关视频
 */
export const relatedAllvideo = (params?: object) =>
  getData(`/related/allvideo`, params);
/**
 * @url /video/detail
 * @description 视频详情
 */
export const videoDetail = (params?: object) =>
  getData(`/video/detail`, params);
/**
 * @url /video/detail/info
 * @description 获取视频点赞转发评论数数据
 */
export const videoDetailInfo = (params?: object) =>
  getData(`/video/detail/info`, params);
/**
 * @url /video/url
 * @description 获取视频播放地址
 */
export const videoUrl = (params?: object) => getData(`/video/url`, params);
/**
 * @url /toplist
 * @description 所有榜单
 */
export const toplist = (params?: object) => getData(`/toplist`, params);
/**
 * @url /top/list
 * @description 排行榜详情
 */
export const topList = (params?: object) => getData(`/top/list`, params);
/**
 * @url /toplist/detail
 * @description 所有榜单内容摘要
 */
export const toplistDetail = (params?: object) =>
  getData(`/toplist/detail`, params);
/**
 * @url /toplist/artist
 * @description 歌手榜
 */
export const toplistArtist = (params?: object) =>
  getData(`/toplist/artist`, params);
/**
 * @url /user/cloud
 * @description 云盘
 */
export const userCloud = (params?: object) => getData(`/user/cloud`, params);
/**
 * @url /user/cloud/detail
 * @description 云盘数据详情
 */
export const userCloudDetail = (params?: object) =>
  getData(`/user/cloud/detail`, params);
/**
 * @url /user/cloud/del
 * @description 云盘歌曲删除
 */
export const userCloudDel = (params?: object) =>
  getData(`/user/cloud/del`, params);
/**
 * @url /cloud
 * @description 云盘上传
 */
export const cloud = (params?: object) => getData(`/cloud`, params);
/**
 * @url /cloud/match
 * @description 云盘歌曲信息匹配纠正
 */
export const cloudMatch = (params?: object) => getData(`/cloud/match`, params);
/**
 * @url /dj/banner
 * @description 电台banner
 */
export const djBanner = (params?: object) => getData(`/dj/banner`, params);
/**
 * @url /dj/personalize/recommend
 * @description 电台个性推荐
 */
export const djPersonalizeRecommend = (params?: object) =>
  getData(`/dj/personalize/recommend`, params);
/**
 * @url /dj/subscriber
 * @description 电台订阅者列表
 */
export const djSubscriber = (params?: object) =>
  getData(`/dj/subscriber`, params);
/**
 * @url /user/audio
 * @description 用户电台
 */
export const userAudio = (params?: object) => getData(`/user/audio`, params);
/**
 * @url /dj/hot
 * @description 热门电台
 */
export const djHot = (params?: object) => getData(`/dj/hot`, params);
/**
 * @url /dj/program/toplist
 * @description 电台 - 节目榜
 */
export const djProgramToplist = (params?: object) =>
  getData(`/dj/program/toplist`, params);
/**
 * @url /dj/toplist/pay
 * @description 电台 - 付费精品
 */
export const djToplistPay = (params?: object) =>
  getData(`/dj/toplist/pay`, params);
/**
 * @url /dj/program/toplist/hours
 * @description 电台 - 24小时节目榜
 */
export const djProgramToplistHours = (params?: object) =>
  getData(`/dj/program/toplist/hours`, params);
/**
 * @url /dj/toplist/hours
 * @description 电台 - 24小时主播榜
 */
export const djToplistHours = (params?: object) =>
  getData(`/dj/toplist/hours`, params);
/**
 * @url /dj/toplist/newcomer
 * @description 电台 - 主播新人榜
 */
export const djToplistNewcomer = (params?: object) =>
  getData(`/dj/toplist/newcomer`, params);
/**
 * @url /dj/toplist/popular
 * @description 电台 - 最热主播榜
 */
export const djToplistPopular = (params?: object) =>
  getData(`/dj/toplist/popular`, params);
/**
 * @url /dj/toplist
 * @description 电台 - 新晋电台榜/热门电台榜
 */
export const djToplist = (params?: object) => getData(`/dj/toplist`, params);
/**
 * @url /dj/radio/hot
 * @description 电台 - 类别热门电台
 */
export const djRadioHot = (params?: object) => getData(`/dj/radio/hot`, params);
/**
 * @url /dj/recommend
 * @description 电台 - 推荐
 */
export const djRecommend = (params?: object) =>
  getData(`/dj/recommend`, params);
/**
 * @url /dj/catelist
 * @description 电台 - 分类
 */
export const djCatelist = (params?: object) => getData(`/dj/catelist`, params);
/**
 * @url /dj/recommend/type
 * @description 电台 - 分类推荐
 */
export const djRecommendType = (params?: object) =>
  getData(`/dj/recommend/type`, params);
/**
 * @url /dj/sub
 * @description 电台 - 订阅
 */
export const djSub = (params?: object) => getData(`/dj/sub`, params);
/**
 * @url /dj/sublist
 * @description 电台的订阅列表
 */
export const djSublist = (params?: object) => getData(`/dj/sublist`, params);
/**
 * @url /dj/paygift
 * @description 电台 - 付费精选
 */
export const djPaygift = (params?: object) => getData(`/dj/paygift`, params);
/**
 * @url /dj/category/excludehot
 * @description 电台 - 非热门类型
 */
export const djCategoryExcludehot = (params?: object) =>
  getData(`/dj/category/excludehot`, params);
/**
 * @url /dj/category/recommend
 * @description 电台 - 推荐类型
 */
export const djCategoryRecommend = (params?: object) =>
  getData(`/dj/category/recommend`, params);
/**
 * @url /dj/today/perfered
 * @description 电台 - 今日优选
 */
export const djTodayPerfered = (params?: object) =>
  getData(`/dj/today/perfered`, params);
/**
 * @url /dj/detail
 * @description 电台 - 详情
 */
export const djDetail = (params?: object) => getData(`/dj/detail`, params);
/**
 * @url /dj/program
 * @description 电台 - 节目
 */
export const djProgram = (params?: object) => getData(`/dj/program`, params);
/**
 * @url /dj/program/detail
 * @description 电台 - 节目详情
 */
export const djProgramDetail = (params?: object) =>
  getData(`/dj/program/detail`, params);
/**
 * @url /msg/private
 * @description 通知 - 私信
 */
export const msgPrivate = (params?: object) => getData(`/msg/private`, params);
/**
 * @url /send/text
 * @description 发送私信
 */
export const sendText = (params?: object) => getData(`/send/text`, params);
/**
 * @url /send/song
 * @description 发送私信(带歌曲)
 */
export const sendSong = (params?: object) => getData(`/send/song`, params);
/**
 * @url /send/album
 * @description 发送私信(带专辑)
 */
export const sendAlbum = (params?: object) => getData(`/send/album`, params);
/**
 * @url /send/playlist
 * @description 发送私信(带歌单)
 */
export const sendPlaylist = (params?: object) =>
  getData(`/send/playlist`, params);
/**
 * @url /msg/recentcontact
 * @description 最近联系人
 */
export const msgRecentcontact = (params?: object) =>
  getData(`/msg/recentcontact`, params);
/**
 * @url /msg/private/history
 * @description 私信内容
 */
export const msgPrivateHistory = (params?: object) =>
  getData(`/msg/private/history`, params);
/**
 * @url /msg/comments
 * @description 通知 - 评论
 */
export const msgComments = (params?: object) =>
  getData(`/msg/comments`, params);
/**
 * @url /msg/forwards
 * @description 通知 - @我
 */
export const msgForwards = (params?: object) =>
  getData(`/msg/forwards`, params);
/**
 * @url /msg/notices
 * @description 通知 - 通知
 */
export const msgNotices = (params?: object) => getData(`/msg/notices`, params);
/**
 * @url /setting
 * @description 设置
 */
export const setting = (params?: object) => getData(`/setting`, params);
/**
 * @url /album/list
 * @description 数字专辑-新碟上架
 */
export const albumList = (params?: object) => getData(`/album/list`, params);
/**
 * @url /album_songsaleboard
 * @description 数字专辑&数字单曲-榜单
 */
export const album_songsaleboard = (params?: object) =>
  getData(`/album_songsaleboard`, params);
/**
 * @url /album/list/style
 * @description 数字专辑-语种风格馆
 */
export const albumListStyle = (params?: object) =>
  getData(`/album/list/style`, params);
/**
 * @url /album/detail
 * @description 数字专辑详情
 */
export const albumDetail = (params?: object) =>
  getData(`/album/detail`, params);
/**
 * @url /digitalAlbum/purchased
 * @description 我的数字专辑
 */
export const digitalAlbumPurchased = (params?: object) =>
  getData(`/digitalAlbum/purchased`, params);
/**
 * @url /digitalAlbum/ordering
 * @description 购买数字专辑
 */
export const digitalAlbumOrdering = (params?: object) =>
  getData(`/digitalAlbum/ordering`, params);
/**
 * @url /calendar
 * @description 音乐日历
 */
export const calendar = (params?: object) => getData(`/calendar`, params);
/**
 * @url /yunbei
 * @description 云贝
 */
export const yunbei = (params?: object) => getData(`/yunbei`, params);
/**
 * @url /yunbei/today
 * @description 云贝今日签到信息
 */
export const yunbeiToday = (params?: object) =>
  getData(`/yunbei/today`, params);
/**
 * @url /yunbei/sign
 * @description 云贝签到
 */
export const yunbeiSign = (params?: object) => getData(`/yunbei/sign`, params);
/**
 * @url /yunbei/info
 * @description 云贝账户信息
 */
export const yunbeiInfo = (params?: object) => getData(`/yunbei/info`, params);
/**
 * @url /yunbei/tasks
 * @description 云贝所有任务
 */
export const yunbeiTasks = (params?: object) =>
  getData(`/yunbei/tasks`, params);
/**
 * @url /yunbei/tasks/todo
 * @description 云贝todo任务
 */
export const yunbeiTasksTodo = (params?: object) =>
  getData(`/yunbei/tasks/todo`, params);
/**
 * @url /yunbei/task/finish
 * @description 云贝完成任务
 */
export const yunbeiTaskFinish = (params?: object) =>
  getData(`/yunbei/task/finish`, params);
/**
 * @url /yunbei/tasks/receipt
 * @description 云贝收入
 */
export const yunbeiTasksReceipt = (params?: object) =>
  getData(`/yunbei/tasks/receipt`, params);
/**
 * @url /yunbei/tasks/expense
 * @description 云贝支出
 */
export const yunbeiTasksExpense = (params?: object) =>
  getData(`/yunbei/tasks/expense`, params);
/**
 * @url /artist/new/song
 * @description 关注歌手新歌
 */
export const artistNewSong = (params?: object) =>
  getData(`/artist/new/song`, params);
/**
 * @url /artist/new/mv
 * @description 关注歌手新MV
 */
export const artistNewMv = (params?: object) =>
  getData(`/artist/new/mv`, params);
/**
 * @url /listen/together/status
 * @description 一起听状态
 */
export const listenTogetherStatus = (params?: object) =>
  getData(`/listen/together/status`, params);
/**
 * @url /batch
 * @description batch批量请求接口
 */
export const batch = (params?: object) => getData(`/batch`, params);
/**
 * @url /yunbei/rcmd/song
 * @description 云贝推歌
 */
export const yunbeiRcmdSong = (params?: object) =>
  getData(`/yunbei/rcmd/song`, params);
/**
 * @url /yunbei/rcmd/song/history
 * @description 云贝推歌历史记录
 */
export const yunbeiRcmdSongHistory = (params?: object) =>
  getData(`/yunbei/rcmd/song/history`, params);
/**
 * @url /song/purchased
 * @description 已购单曲
 */
export const songPurchased = (params?: object) =>
  getData(`/song/purchased`, params);
/**
 * @url /mlog/url
 * @description 获取mlog播放地址
 */
export const mlogUrl = (params?: object) => getData(`/mlog/url`, params);
/**
 * @url /mlog/to/video
 * @description 将mlog id转为视频id
 */
export const mlogToVideo = (params?: object) =>
  getData(`/mlog/to/video`, params);
/**
 * @url /vip/growthpoint
 * @description vip成长值
 */
export const vipGrowthpoint = (params?: object) =>
  getData(`/vip/growthpoint`, params);
/**
 * @url /vip/growthpoint/details
 * @description vip成长值获取记录
 */
export const vipGrowthpointDetails = (params?: object) =>
  getData(`/vip/growthpoint/details`, params);
/**
 * @url /vip/tasks
 * @description vip任务
 */
export const vipTasks = (params?: object) => getData(`/vip/tasks`, params);
/**
 * @url /vip/growthpoint/get
 * @description 领取vip成长值
 */
export const vipGrowthpointGet = (params?: object) =>
  getData(`/vip/growthpoint/get`, params);
/**
 * @url /artist/fans
 * @description 歌手粉丝
 */
export const artistFans = (params?: object) => getData(`/artist/fans`, params);
/**
 * @url /digitalAlbum/detail
 * @description 数字专辑详情
 */
export const digitalAlbumDetail = (params?: object) =>
  getData(`/digitalAlbum/detail`, params);
/**
 * @url /digitalAlbum/sales
 * @description 数字专辑销量
 */
export const digitalAlbumSales = (params?: object) =>
  getData(`/digitalAlbum/sales`, params);
/**
 * @url /musician/data/overview
 * @description 音乐人数据概况
 */
export const musicianDataOverview = (params?: object) =>
  getData(`/musician/data/overview`, params);
/**
 * @url /musician/play/trend
 * @description 音乐人播放趋势
 */
export const musicianPlayTrend = (params?: object) =>
  getData(`/musician/play/trend`, params);
/**
 * @url /musician/tasks
 * @description 音乐人任务
 */
export const musicianTasks = (params?: object) =>
  getData(`/musician/tasks`, params);
/**
 * @url /musician/cloudbean
 * @description 账号云豆数
 */
export const musicianCloudbean = (params?: object) =>
  getData(`/musician/cloudbean`, params);
/**
 * @url /musician/cloudbean/obtai
 * @description 领取云豆
 */
export const musicianCloudbeanObtain = (params?: object) =>
  getData(`/musician/cloudbean/obtain`, params);
