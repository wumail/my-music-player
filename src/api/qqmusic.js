import service from '../utils/request.js';

/**
 * 
 * @param {*} data: require: uid, options: limit offset
 * @returns 
 */
export function qqmusic_setCookie(data) {
    return service.request({
        method: "post",
        url: "/qq/setCookie/",
        data
    })
}