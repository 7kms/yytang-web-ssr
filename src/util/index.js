export default {
    isEmail (str) {
        const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        return reg.test(str);
    },
    css (el, attr) {
       let style;
       if (!attr) return;
       if (el.currentStyle) {
           style = el.currentStyle;
           return style.getAttribute(attr);
       } else {
           style = window.getComputedStyle(el, null);
           return style.getPropertyValue(attr);
       }
    },
    addClass (el, className) {
        let classStr = el.getAttribute('class');
        if (classStr.indexOf(className) < 0) {
            classStr += ' ' + className;
        }
        el.setAttribute('class', classStr);
    },
    removeClass (el, className) {
        const regular = new RegExp(className, 'ig');
        let classStr = el.getAttribute('class');
        classStr = classStr.replace(regular, '').trim();
        el.setAttribute('class', classStr);
    }
}
