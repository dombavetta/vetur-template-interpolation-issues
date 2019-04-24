<script lang="tsx">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'

@Component
export default class SelectItem extends Vue {
  /**
   * The value to bind the item to.
   */
  @Prop({
    type: [String, Number, Date, Boolean],
    required: true,
    default: () => undefined
  })
  public value!: string | number | Date | boolean

  /**
   * The label to display in the select box when this item has been selected.
   * If this is not assigned to then the string representation of {@link value} is used.
   */
  @Prop({
    type: String,
    required: false,
    default: () => undefined
  })
  public label?: string

  /**
   * Toggles the state of the drop down menu.
   *  This method is injected from a parent component.
   * @returns {void}
   */
  @Inject()
  private toggleMenu!: () => void

  /**
   * A function which updates the components value and emits an input event
   * in order to make the component usable with v-model.
   * This method is injected from a parent component.
   */
  @Inject()
  private emitChange!: (value: any) => void

  /**
   * The Vue component's render function.
   */
  public render(): VNode {
    const emit = event => {
      this.emitChange(this.value)
      this.toggleMenu()
    }

    return (
      <div class="sd-select-item" on-click={emit}>
        {this.$slots.default || this.label || this.value}
      </div>
    )
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

.sd-select-item {
  @include transition;
  cursor: pointer;
  z-index: z(elevated);
  background-color: $color--grey-light-2;
  font-weight: 500px;

  &:hover {
    background-color: $color--yellow-primary;
    color: $color--grey-dark-3;
    transform: translateY(-5px);
  }

  padding: 10px;
}
</style>
