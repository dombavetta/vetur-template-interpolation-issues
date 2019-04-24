<template>
  <div
    v-click-outside="close"
    :class="{ 'sd-select': true, active: open }"
    @click="toggleMenu"
  >
    <input ref="input" readonly :value="display" />
    <div id="items" :class="{ open: open }" @click.stop>
      <slot />
    </div>
    <i id="icon" class="fas fa-angle-down"></i>
  </div>
</template>

<script lang="ts">
import { VNode, VNodeData, VNodeDirective } from 'vue'
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import SelectItem from './select-item.vue'

Vue.directive('click-outside', {
  bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    ;(el as any).clickOutsideEvent = event => {
      // Check that the click was outside the el and its children
      if (!(el === event.target || el.contains(event.target)))
        if (vnode.context)
          // If it was, call method provided in the attribute value
          // vnode.context[binding.expression](event);
          binding.value(event)
    }

    document.body.addEventListener('click', (el as any).clickOutsideEvent)
  },
  unbind(el: HTMLElement) {
    document.body.removeEventListener('click', (el as any).clickOutsideEvent)
  }
})

@Component
export default class Select extends Vue {
  /**
   * The value to bind the selected item to.
   */
  @Prop({
    type: [String, Number, Date, Boolean],
    required: false,
    default: () => null
  })
  public value!: string | number | Date | boolean

  /**
   * The current state of the drop down menu.
   */
  private open: boolean = false

  /**
   * The display value of the selected item.
   */
  private display: string = ''

  public mounted(): void {
    const item = this.findChildByValue(this.value)
    this.display = (item || {}).label || (this.value || '').toString()
  }

  /**
   * Toggles the state of the drop down menu.
   * This method can be injected into child components.
   * @returns {void}
   */
  @Provide()
  public toggleMenu(): void {
    this.open = !this.open
    this.$emit(this.open ? 'open' : 'close')
  }

  /**
   * A function which updates the components value and emits an input event
   * in order to make the component usable with v-model.
   * This method can be injected into child components.
   * @param {any} value - The updated value.
   * @returns {void}
   */
  @Provide()
  public emitChange(value: any): void {
    const item = this.findChildByValue(value)

    this.$emit('input', value)
    this.$emit('change', value)

    this.display = (item || {}).label || value.toString()
  }

  /**
   * Closes the dropdown.
   * @returns {void}
   */
  public close(): void {
    this.open = false
  }

  @Watch('value')
  private onValueChanged(value: any) {
    this.emitChange(value)
  }

  /**
   * Given a value, will return the Vue component associated with the provided value.
   * @param {any} The value to search by.
   * @returns {SelectItem} Vue component
   */
  private findChildByValue(value: any): SelectItem {
    return this.$children.find(
      (i: Vue) => (i as SelectItem).value === value
    ) as SelectItem
  }
}
</script>

<style lang="scss" scoped>
$style--padding-content: 15px;
$border--radius: 10px;
$color--white: #ffffff;
$color--red-primary: #ee3224;
$color--yellow-primary: #ffdd9a;
$color--grey-light-1: #e7e7e8;
$color--grey-light-2: #d8d8d8;
$color--grey-light-3: #9fa7b3;
$color--grey-dark-1: #485563;
$color--grey-dark-2: #4a5562;
$color--grey-dark-3: #2c353f;
$font-size-header-main: 1.375rem; // 30px
$font-size-header-sub: 1.125rem; // 18px
$font-size-paragraph: 1rem; // 16px
$font--style: (
  light: 300,
  regular: 400,
  bold: 700
);

@mixin font($style: regular, $size: null, $color: null) {
  @if map-has-key($font--style, $style) {
    font-family: 'Lato', sans-serif;
    font-weight: map-get($font--style, $style);

    @if ($size) {
      font-size: $size;
    }

    @if ($color) {
      color: $color;
    }
  } @else {
    @warn "Undefined font style: `#{$font--style}`";
  }
}

@mixin transition($field: all, $duration: 0.3s) {
  transition: $field $duration ease;
}

.sd-select {
  @include transition;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  justify-content: space-between;
  transform-origin: top;
  position: relative;
  background-color: $color--grey-light-1;
  color: $color--grey-dark-3;
  border-radius: $border--radius;
  // box-shadow: inset 0 0 0 1px $teal;

  &.active {
    background: $color--grey-light-2;
    border-radius: $border--radius $border--radius 0 0;

    > input {
      background-color: $color--grey-light-2;

      + #items + #icon {
        transform: rotate(180deg);
      }
    }
  }

  input {
    @include transition;
    @include font(regular, $font-size-header-sub, $color--grey-dark-3);
    cursor: default;
    flex-grow: 2;
    margin: ($style--padding-content - 5px) $style--padding-content;
    background-color: $color--grey-light-1;
    border: none;
  }

  #items {
    @include transition;
    z-index: 50;
    height: fit-content;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    background-color: $color--grey-light-1;
    border-radius: 0 0 5px 5px;
    box-shadow: 0px 10px 15px rgba(33, 41, 81, 0.1);
    padding-bottom: 10px;

    &:before {
      content: '';
      display: block;
      border-top: 2px solid $color--grey-dark-2;
      margin-bottom: 10px;
    }

    &.open {
      transform: scaleY(1);
      opacity: 1;
      background-color: $color--grey-light-2;
    }
  }

  #icon {
    @include transition;
    margin-right: 10px;
  }
}
</style>
