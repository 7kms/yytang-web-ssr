import toolTip from './tooltip';
import scroll from './scroll';
const yDirectives = {
    toolTip,
    scroll
}
const install = function (Vue) {
     Object.keys(yDirectives).forEach((key) => {
        Vue.directive(key, yDirectives[key]);
    });
}
module.exports = Object.assign(yDirectives, { install });
