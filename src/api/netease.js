import service from '../utils/request.js';

export function net163_playlist(data) {
    return service.request({
        method: "post",
        url: "/net163/playlist/",
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

export function net163_song_url(data) {
    return service.request({
        method: "post",
        url: "/net163/song_url/",
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