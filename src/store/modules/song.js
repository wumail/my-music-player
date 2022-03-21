import { playMode } from './config';
import {
    getMode, getUserName, getNet163Uid, getNet163Cookie, getNet163Userinfo, getQQCookie, getVolume,
    setMode, setUserName, setNet163Uid, setNet163Cookie, setNet163Userinfo, setQQCookie, setVolume,
    getHistoryList, setHistoryList, removeHistoryList, clearHistoryList
} from '@/utils/storage'
import * as types from './mutations';


const state = {
    //mode
    play_mode: Number(getMode()) || playMode.loop,
    //播放列表
    play_list: [],
    //音量
    volume: getVolume() || 0.4,
    currentIndex: 0,
    historyList: getHistoryList() || [],
    username: getUserName() || null,
    net163Userinfo: getNet163Userinfo() || {},
    net163UID: getNet163Uid() || null,
    net163Cookie: getNet163Cookie() || null,
    qqmusicCookie: getQQCookie() || null,
}
const getters = {
    // 播放模式
    mode: state => state.play_mode,
    // 播放列表
    playlist: state => state.play_list,
    //音量
    volume: state => state.volume,
    // 当前音乐索引
    currentIndex: state => state.currentIndex,
    // 当前音乐
    currentMusic: state => {
        return state.play_list[state.currentIndex] || {}
    },
    historyList: state => state.historyList,
    username: state => state.username,
    // 网易云
    net163UID: state => state.net163UID,
    net163Cookie: state => state.net163Cookie,
    net163Userinfo: state => state.net163Userinfo,
    //qq音乐
    qqmusicCookie: state => state.qqmusicCookie,
}
const mutations = {
    [types.SET_PLAYMODE](state, play_mode) {
        state.play_mode = play_mode;
    },
    [types.SET_PLAYLIST](state, play_list) {
        state.play_list = play_list;
    },
    [types.SET_VOLUME](state, volume) {
        state.volume = volume;
    },
    [types.SET_CURRENTINDEX](state, currentIndex) {
        state.currentIndex = currentIndex;
    },
    [types.SET_HISTORYLIST](state, historyList) {
        state.historyList = historyList
    },
    [types.SET_USERNAME](state, username) {
        state.username = username;
    },
    [types.SET_NET163USERINFO](state, userinfo) {
        state.net163Userinfo = userinfo;
    },
    [types.SET_NET163UID](state, net163UID) {
        state.net163UID = net163UID;
    },
    [types.SET_NET163COOKIE](state, net163Cookie) {
        state.net163Cookie = net163Cookie;
    },
    [types.SET_QQCOOKIE](state, qqmusicCookie) {
        state.qqmusicCookie = qqmusicCookie;
    },
}
const actions = {
    setPlaylist({ commit }, { list }) {
        commit(types.SET_PLAYLIST, list)
    },
    selectAddPlay({ commit, state }, music) {
        let list = [...state.play_list]
        // 查询当前播放列表是否有待插入的音乐，并返回其索引值
        let index = findIndex(list, music)
        // 当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引值
        if (index > -1) {
            commit(types.SET_CURRENTINDEX, index)
        } else {
            list.unshift(music)
            commit(types.SET_PLAYLIST, list)
            commit(types.SET_CURRENTINDEX, 0)
        }
    },
    selectPlay({ commit }, { list, index }) {
        commit(types.SET_PLAYLIST, list)
        commit(types.SET_CURRENTINDEX, index)
    },
    clearPlayList({ commit }) {
        commit(types.SET_CURRENTINDEX, -1)
        commit(types.SET_PLAYLIST, [])
    },
    // 设置播放历史
    setHistory({ commit }, music) {
        // console.log(music);
        commit(types.SET_HISTORYLIST, setHistoryList(music))
    },
    // 删除播放历史
    removeHistory({ commit }, music) {
        commit(types.SET_HISTORYLIST, removeHistoryList(music))
    },
    // 清空播放历史
    clearHistory({ commit }) {
        commit(types.SET_HISTORYLIST, clearHistoryList())
    },
    setVolume({ commit }, volume) {
        commit(types.SET_VOLUME, setVolume(volume))
    },
    setPlayMode({ commit }, mode) {
        commit(types.SET_PLAYMODE, setMode(mode))
    },
    setUserName({ commit }, username) {
        commit(types.SET_USERNAME, setUserName(username))
    },
    setNet163Userinfo({ commit }, userinfo) {
        commit(types.SET_USERNAME, setNet163Userinfo(userinfo))
    },
    setNet163Uid({ commit }, userinfo) {
        commit(types.SET_NET163UID, setNet163Uid(userinfo))
    },
    setNet163Cookie({ commit }, cookie) {
        commit(types.SET_NET163COOKIE, setNet163Cookie(cookie))
    },
    setQQCookie({ commit }, cookie) {
        commit(types.SET_QQCOOKIE, setQQCookie(cookie))
    }
}

function findIndex(list, music) {
    return list.findIndex(item => {
        return item.id === music.id
    })
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};