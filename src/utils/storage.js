const _storage = window.localStorage
const storage = {
    get(key, data = []) {
        if (_storage) {
            return _storage.getItem(key)
                ? Array.isArray(data)
                    ? JSON.parse(_storage.getItem(key))
                    : _storage.getItem(key)
                : data
        }
    },
    set(key, val) {
        if (_storage) {
            _storage.setItem(key, val)
        }
    },
    clear(key) {
        if (_storage) {
            _storage.removeItem(key)
        }
    }
}


const VOLUME_KEY = '__volume__'
// 获取音量
export function getVolume() {
    return storage.get(VOLUME_KEY, null)
}
// 修改音量
export function setVolume(volume) {
    storage.set(VOLUME_KEY, volume)
    return volume
}

/**
 * 播放模式
 * @type    MODE_KEY：key值
 *          HistoryListMAX：最大长度
 */
const MODE_KEY = '__mode__'
// 获取播放模式
export function getMode() {
    return storage.get(MODE_KEY, null)
}
// 修改播放模式
export function setMode(mode) {
    storage.set(MODE_KEY, mode)
    return mode
}
/**
 * 网易云用户uid
 * @type USERID_KEY：key值
 */
const NET163ID_KEY = '__neteaseUID__'
// 获取用户uid
export function getNet163Uid() {
    return Number(storage.get(NET163ID_KEY, null))
}
// 修改用户uid
export function setNet163Uid(uid) {
    storage.set(NET163ID_KEY, uid)
    return uid
}

/**
 * QQ音乐用户cookie
 * @type USERCOOKIE_KEY：key值
 */
const QQCOOKIE_KEY = '__qqmusicCookie__'
// 获取用户uid
export function getQQCookie() {
    return Number(storage.get(QQCOOKIE_KEY, null))
}
// 修改用户uid
export function setQQCookie(uid) {
    storage.set(QQCOOKIE_KEY, uid)
    return uid
}