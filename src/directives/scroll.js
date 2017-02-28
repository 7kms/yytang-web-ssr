const ctx = '@@InfiniteScroll';

var throttle = function (fn, delay) {
  var now, lastExec, timer, context, args; //eslint-disable-line
  var execute = function () {
    fn.apply(context, args);
    lastExec = now;
  };
  return function () {
    context = this;
    args = arguments;
    now = Date.now();
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (lastExec) {
      var diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(() => {
          execute();
        }, diff);
      }
    } else {
      execute();
    }
  };
};

var getScrollEventTarget = function (element) {
    return window;
};

var doCheck = function () {
    var element = this.el;
    var distance = this.distance;
    if (this.disabled) return; //eslint-disable-line
    if (document.body.scrollTop + window.innerHeight + distance >= element.clientHeight) {
        this.expression && this.expression();
   }
};

var doBind = function () {
  if (this.binded) return; // eslint-disable-line
  this.binded = true;
  var directive = this;
  var element = directive.el;
  directive.scrollEventTarget = getScrollEventTarget(element);
  directive.scrollListener = throttle(doCheck.bind(directive), 200);
  directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

  var disabledExpr = element.getAttribute('scroll-disabled');
  var disabled = false;

  if (disabledExpr) {
    this.vm.$watch(disabledExpr, function (value) {
      directive.disabled = value;
      if (!value && directive.immediateCheck) {
        doCheck.call(directive);
      }
    });
    disabled = Boolean(directive.vm[disabledExpr]);
  }
  directive.disabled = disabled;

  var distanceExpr = element.getAttribute('scroll-distance');
  var distance = 0;
  if (distanceExpr) {
    distance = Number(directive.vm[distanceExpr] || distanceExpr);
    if (isNaN(distance)) {
      distance = 0;
    }
  }
  directive.distance = distance;
  doCheck.call(directive);
};

export default {
    bind (el, binding, vnode) {
        const args = arguments;
        el[ctx] = {
            el,
            vm: vnode.context,
            expression: binding.value
        }
        el[ctx].vm.$on('hook:mounted', function () {
            el[ctx].vm.$nextTick(function () {
                 doBind.call(el[ctx], args);
            });
        });
    },
    unbind (el) {
       el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener);
    }
}
