//过滤特殊字符
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{ }【】‘；：”“'。，、？]", "g");
    var res = s.replaceAll(pattern, '');
    return res
}

export function validate_email(value) {
    let reg_email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg_email.test(value);
}

export function validate_pwd(value) {
    let reg_pwd = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return reg_pwd.test(value);
}
