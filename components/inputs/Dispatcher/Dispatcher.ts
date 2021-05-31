import { Component, Prop, Vue } from 'nuxt-property-decorator'

import InputSimple from '~/components/inputs/Input.vue'
import Checkbox from '~/components/inputs/Checkbox.vue'
import Radio from '~/components/inputs/Radio.vue'
import DropDown from '~/components/inputs/DropDown/DropDown.vue'
import Range from '~/components/inputs/Range/RangeInput.vue'

import { EventTypes, InputTypes } from '~/types/enums'
import { InputTypeSchemas, InputValue } from '~/types'

@Component({
  name: 'Dispatcher',
})
export default class Dispatcher extends Vue {
  types = InputTypes

  @Prop({ type: Object, default: () => ({}) })
  readonly item!: InputTypeSchemas

  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (
    name: string,
    value: InputValue,
    required?: boolean,
    type?: EventTypes,
    inputType?: InputTypes
  ) => void

  get inputComponent() {
    switch (this.item.type) {
      case InputTypes.TEXT:
      case InputTypes.SIMPLE:
      case InputTypes.PASSWORD:
        return InputSimple
      case InputTypes.CHECK_BOX:
        return Checkbox
      case InputTypes.RADIO:
        return Radio
      case InputTypes.DROPDOWN:
        return DropDown
      case InputTypes.RANGE:
        return Range
      default:
        return null
    }
  }
}
