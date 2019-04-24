import Vue, { PluginObject } from 'vue'

/**
 * Component that will render provided VNode objects.
 */
Vue.component('v-nodes', {
  functional: true,
  props: {
    nodes: {
      required: true,
      type: [Object, Array]
    }
  },
  render: (h, ctx) => ctx.props.nodes
})

/**
 * Automatically register all UI components as globals.
 */
const requireGlobals = require.context('~/components/ui', true, /index\.js/)
requireGlobals.keys().forEach(fileName => {
  const component = requireGlobals<PluginObject<void>>(fileName)
  Vue.use(component.default || component)
})
