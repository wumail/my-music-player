export function throttle(func, ms) {
    let isThrottle = false;
    return function () {
        if (isThrottle) {
            return
        }
        isThrottle = true;
        func(arguments[0]);
        setTimeout(() => {
            func(arguments[0])
            isThrottle = false;
        }, ms);
    }
}

