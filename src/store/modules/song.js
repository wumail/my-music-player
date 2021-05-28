import { playMode } from './config';
import {
    getMode, getNet163Uid, getQQCookie, getVolume,
    setMode, setNet163Uid, setQQCookie, setVolume
} from '@/utils/storage'
import * as types from './mutations';


const state = {
    //mode
    play_mode: Number(getMode()) || playMode.loop,
    //播放列表
    play_list: [],
    //音量
    volume: getVolume() || 0.5,
    currentIndex: 0,
    neteaseUID: getNet163Uid() || null,
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
    // 网易云用户UID
    net163uid: state => state.neteaseUID,
    qqmsuiccookie: state => state.qqmusicCookie,
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
    [types.SET_NET163UID](state, neteaseUID) {
        state.neteaseUID = neteaseUID;
    },
    [types.SET_QQCOOKIE](state, qqmusicCookie) {
        state.qqmusicCookie = qqmusicCookie;
    },
}
const actions = {
    setPlaylist({ commit }, { list }) {
        commit(types.SET_PLAYLIST, list)
    },
    selectPlay({ commit }, { list, index }) {
        commit(types.SET_PLAYLIST, list)
        commit(types.SET_CURRENTINDEX, index)
    },
    clearPlayList({ commit }) {
        commit(types.SET_CURRENTINDEX, -1)
        commit(types.SET_PLAYLIST, [])
    },
    setVolume({ commit }, volume) {
        commit(types.SET_VOLUME, setVolume(volume))
    },
    setPlayMode({ commit }, mode) {
        commit(types.SET_PLAYMODE, setMode(mode))
    },
    setNet163Uid({ commit }, uid) {
        commit(types.SET_NET163UID, setNet163Uid(uid))
    },
    setQQCookie({ commit }, uid) {
        commit(types.SET_QQCOOKIE, setQQCookie(uid))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};