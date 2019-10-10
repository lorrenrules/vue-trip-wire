const isFunction = (toCheck) => {
  return {}.toString.call(toCheck) === '[object Function]'
}
const addIndicator = (context, pos = false) => {
  if (!context.text) {
    context.text = 'trigger'
  }
  if (!context.color) {
    context.color = 'green'
  }
  const indicator = document.createElement('div')
  indicator.innerHTML = context.text
  document.body.appendChild(indicator)
  indicator.style.position = 'fixed'
  indicator.style.borderTop = '2px solid ' + context.color
  indicator.style.top = (window.innerHeight * pos) + 'px'
}
export default {
  install(Vue, options = false) {
    Vue.directive('trip-wire', {
      inserted: function(el, binding) {
        let f = function () {
          if (!binding.ran && el.getBoundingClientRect().y < (window.innerHeight * binding.value.pos)) {
            if (isFunction(binding.value.func)) {
              binding.value.func()
              binding.ran = true
            } else {
              options[binding.value.func](el, binding.value.params)
              binding.ran = true
            }
          }
        }
        if (!binding.value.pos || binding.value.pos < 0 || binding.value.pos > 1) {
          console.warn('[Vue Scroll Global Plugin]: Please include a valid position trigger property "pos": float/integer between 0 and 1.')
          return
        }
        if (!binding.value.func) {
          console.warn('[Vue Scroll Global Plugin]: Please include a valid function or function name.')
          return
        }
        if (typeof binding.value.func === 'string' && !isFunction(options[binding.value.func])) {
          console.warn('[Vue Scroll Global Plugin]: The value on property "func" does not exist on the options object.')
          return
        }
        if (binding.value.indicator && process.env.NODE_ENV !== 'production') {
          addIndicator(binding.value.indicator, binding.value.pos)
        }
        f()
        window.addEventListener('scroll', f)
      }
    })
  }
}