import { Component, Vue } from 'nuxt-property-decorator'

import BreadCrumbs from '~/components/pages/BreadCrumbs.vue'
import FormGenerator from '~/components/inputs/FormGenerator/FormGenerator.vue'
import { CloseIcon } from '~/components/icons'

import { authStore, registrationStore } from '~/store'
import { IBasicObject, InputValue, Route } from '~/types'
import { EventTypes, Routes } from '~/types/enums'

const defaultError = {
  server: 'При запросе на сервер произошел непредвиденный сбой',
}

@Component({
  components: { BreadCrumbs, FormGenerator, CloseIcon },
})
export default class RegistrationFormPage extends Vue {
  errors: IBasicObject | null = null

  get formError() {
    if (this.errors && Object.values(this.errors).length) {
      return Object.values(this.errors)[0]
    }
    return ''
  }

  get values() {
    return registrationStore.FormValues
  }

  get pageMeta() {
    return registrationStore.PageMeta
  }

  get pageData() {
    return registrationStore.FormData
  }

  get isValid() {
    let valid = true
    const values = Object.values(this.values)
    values.forEach((val) => {
      if (!val) valid = false
    })
    return valid
  }

  formHandler(
    name: string,
    value: InputValue,
    required?: boolean,
    type?: EventTypes
  ) {
    this.errors = null
    const pl = { name, value, required, type }
    registrationStore.setFormField(pl)
  }

  setError(name: string, value: string) {
    return (this.$refs.form as any).setError(name, value)
  }

  setErrors(errors: IBasicObject) {
    if (errors) {
      const field = Object.keys(errors)[0]
      const errorHaveBeenSet = this.setError(field, errors[field])
      if (!errorHaveBeenSet) this.errors = errors
    }
  }

  async asyncData({ route }: { route: Route }) {
    await registrationStore.getForm(route)
  }

  async submit() {
    if (this.pageData?.action) {
      const res = await registrationStore.submitForm({
        action: this.pageData?.action,
        payload: this.values,
      })
      if (res && res.status > 400) {
        this.setErrors(res.data?.errors || defaultError)
      } else if (res && (res.status === 200 || res.status === 201)) {
        await authStore.authorize({
          phone: this.values.phone,
          password: this.values.password,
        })
        this.$router.push(Routes.personal)
      }
    }
  }
}
