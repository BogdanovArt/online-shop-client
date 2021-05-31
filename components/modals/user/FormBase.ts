import { Component, Vue, Prop } from 'nuxt-property-decorator'

import DrawerHeading from '~/components/modals/blocks/DrawerHeading.vue'
import InputDispatcher from '~/components/inputs/FormGenerator/blocks/InputDispatcher.vue'

import { InputValue } from '~/types'

@Component({
  components: { InputDispatcher, DrawerHeading },
})
export default class FormBase extends Vue {
  refs: { [key: string]: Vue | null } = {}

  sent = false
  success = false

  @Prop({ type: Boolean, default: false })
  readonly active!: boolean

  setRef(name: string, value: Vue | null = null) {
    const chunk = { [name]: value }
    this.refs = { ...this.refs, ...chunk }
  }

  setError(name: string, value: string) {
    try {
      ;(this.refs[name] as any)?.setError(value)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  inputHandler(name: string, value: InputValue) {
    ;(this as any)[name] = value
    this.sent = false
  }
}
