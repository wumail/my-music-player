export function transTime(time) {
    var duration = parseInt(time);
    var minute = parseInt(duration / 60);
    var sec = duration % 60 + '';
    var isM0 = ':';
    if (minute == 0) {
        minute = '00';
    } else if (minute < 10) {
        minute = '0' + minute;
    }
    if (sec.length == 1) {
        sec = '0' + sec;
    }
    return minute + isM0 + sec
}

export function formatLyricTime(time) {
    // console.log(time);
    const reg = /\[|\|\s]/g;
    let timeArr = time.replaceAll(reg, '').split(':');
    let [min, secNms] = timeArr;
    let secArr = secNms.split('.');
    let [sec, ms] = secArr;
    if (+min >= 0) {
        let lyrictime = +`${+min * 60 + +sec}.${ms}`;
        // console.log(lyrictime);
        return lyrictime;
    }
}