import util from '../util'
export default {
    bind (el, binding, vnode) {
        const text = binding.value;
        const position = util.css(el, 'position');
        if (position != 'absolute' || position != 'relative' || position != 'fixed') {
            el.style.position = 'relative';
        }
        const classObj = Object.assign({
            'y-tooltip': true,
            'center': true
        }, binding.modifiers);
        const span = document.createElement('span');
        span.setAttribute('class', Object.keys(classObj).join(' '));
        span.innerText = text;
        el.append(span);
        el.addEventListener('mouseover', function () {
            util.addClass(span, 'show');
        });
        el.addEventListener('mouseleave', function () {
            util.removeClass(span, 'show');
        });
    }
}
