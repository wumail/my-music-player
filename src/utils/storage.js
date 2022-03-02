

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

/**
 * 播放历史
 * @type    HISTORYLIST_KEY：key值
 *          HistoryListMAX：最大长度
 */
const HISTORYLIST_KEY = '__historyList__'
const HistoryListMAX = 200
// 获取播放历史
export function getHistoryList() {
  return storage.get(HISTORYLIST_KEY)
}

// 更新播放历史
export function setHistoryList(music) {
  let list = storage.get(HISTORYLIST_KEY)
  const index = list.findIndex(item => {
    return item.id === music.id
  })
  if (index === 0) {
    return list
  }
  if (index > 0) {
    list.splice(index, 1)
  }
  list.unshift(music)
  if (HistoryListMAX && list.length > HistoryListMAX) {
    list.pop()
  }
  storage.set(HISTORYLIST_KEY, JSON.stringify(list))
  return list
}

// 删除一条播放历史
export function removeHistoryList(music) {
  storage.set(HISTORYLIST_KEY, JSON.stringify(music))
  return music
}

// 清空播放历史
export function clearHistoryList() {
  storage.clear(HISTORYLIST_KEY)
  return []
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
 * 用户名
 * @type USERID_KEY：key值
 */
const USERNAME_KEY = '__mp_username__'
// 获取用户uid
export function getUserName() {
  return storage.get(USERNAME_KEY, null)
}
// 修改用户uid
export function setUserName(username) {
  storage.set(USERNAME_KEY, username)
  return username
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
 * 网易云音乐用户cookie
 * @type USERCOOKIE_KEY：key值
 */
const NET163COOKIE_KEY = '__net163Cookie__'
// 获取用户uid
export function getNet163Cookie() {
  return storage.get(NET163COOKIE_KEY, null)
}
// 修改用户uid
export function setNet163Cookie(cookie) {
  storage.set(NET163COOKIE_KEY, JSON.stringify(cookie))
  return cookie
}

/**
 * 网易云信息
 * @type USERID_KEY：key值
 */
const NET163USERINFO_KEY = '__net163_userinfo__'

export function getNet163Userinfo() {
  return storage.get(NET163USERINFO_KEY, null)
}

export async function setNet163Userinfo(userinfo) {
  storage.set(NET163USERINFO_KEY, JSON.stringify(userinfo))
  return userinfo
}

// export function setNet163Userinfo2(phone, password) {
//   net163_login({
//     username: store.getters['playerNsong/username'],
//     phone,
//     password
//   }).then((result) => {
//     let data = result.body;
//     if (!data.flag) {
//       return data;
//     }
//     storage.set(NET163USERINFO_KEY, JSON.stringify({
//       ...data.data
//     }))
//     return data;
//   }).catch((err) => {
//     console.log(err);
//     return false;
//   })
// }

/**
 * QQ音乐用户cookie
 * @type USERCOOKIE_KEY：key值
 */
const QQCOOKIE_KEY = '__qqmusicCookie__'
// 获取用户uid
export function getQQCookie() {
  return storage.get(QQCOOKIE_KEY, null)
}
// 修改用户uid
export function setQQCookie(cookie) {
  storage.set(QQCOOKIE_KEY, cookie)
  return cookie
}