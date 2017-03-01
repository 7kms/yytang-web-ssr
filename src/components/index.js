import Toast from './toast';
import Icon from './icon';
import Button from './button';
import yHint from './hint';
const yview = {
    Toast,
    yHint,
    yIcon: Icon,
    yButton: Button
};
const install = function (Vue) {
    Object.keys(yview).forEach((key) => {
        Vue.component(key, yview[key]);
    });
    Vue.prototype.$Toast = Toast;
}

module.exports = Object.assign(yview, { install });
