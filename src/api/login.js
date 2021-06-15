import service from '../utils/request.js';

export function net163_login(data) {
    return service.request({
        method: "post",
        url: "/net163/login/",
        data
    })
}