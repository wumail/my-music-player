import { loopIcon, singleIcon, randomIcon } from './icon'

export function changeMode1(n) {
    switch (n) {
        case 0:
            return { icon: loopIcon, title: '列表循环' }
        case 1:
            return { icon: singleIcon, title: '单曲循环' }
        case 2:
            return { icon: randomIcon, title: '随机播放' }
        default:
            return { icon: loopIcon, title: '列表循环' }
    }
}

export function changeMode(n) {
    switch (n) {
        case 0:
            return { icon: 'loop', title: '列表循环' }
        case 1:
            return { icon: 'single', title: '单曲循环' }
        case 2:
            return { icon: 'random', title: '随机播放' }
        default:
            return { icon: 'loop', title: '列表循环' }
    }
}