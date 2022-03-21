import service from '../utils/request.js';

/**
 * 
 * @param {*} data: require: uid, options: limit offset
 * @returns 
 */
export function net163_playlist(data) {
    return service.request({
        method: "post",
        url: "/net163/playlist/",
        data
    })
}

/**
 * 
 * @param {*} data:uid 
 * @returns 
 */
export function net163_user_detail(data) {
    return service.request({
        method: "post",
        url: "/net163/user_detail/",
        data
    })
}

export function net163_playlist_detail(data) {
    return service.request({
        method: "post",
        url: "/net163/playlist_detail/",
        data
    })
}

/**
 * 
 * @param {*} data: require: uid, options: limit offset
 * @returns 
*/
export function net163_playlist_all(data) {
    return service.request({
        method: 'post',
        url: '/net163/playlist_all',
        data
    })
}

export function net163_song_url(data) {
    return service.request({
        method: "post",
        url: "/net163/song_url/",
        data
    })
}

export function net163_song_detail(data) {
    return service.request({
        method: "post",
        url: "/net163/song_detail",
        data
    })
}

export function net163_mv(data) {
    return service.request({
        method: "post",
        url: "/net163/mv/",
        data
    })
}

export function net163_lyric(data) {
    return service.request({
        method: "post",
        url: "/net163/lyric/",
        data
    })
}

export function net163_search(data) {
    return service.request({
        method: "post",
        url: "/net163/search/",
        data
    })
}

export function net163_hot(data) {
    return service.request({
        method: "post",
        url: "/net163/hot/",
        data
    })
}

export function net163_hot_detail(data) {
    return service.request({
        method: "post",
        url: "/net163/hot_detail/",
        data
    })
}

export function net163_top_song(data) {
    return service.request({
        method: "post",
        url: "/net163/top/song/",
        data
    })
}