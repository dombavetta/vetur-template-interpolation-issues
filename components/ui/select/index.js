import Select from './select.vue'
import SelectItem from './select-item.vue'

export default {
  install(Vue) {
    Vue.component('sd-select', Select)
    Vue.component('sd-select-item', SelectItem)
  }
}
