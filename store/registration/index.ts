import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { IBasicObject, InputValue, IPageMeta, Route } from '~/types'

import { $axios } from '~/utils/api'
import { API } from '~/utils/endpoints'
import {
  IRegistrationPageForm,
  IRegistrationPageData,
  FormValues,
  IApiAction,
} from '~/types/registration'
import { Request } from '~/utils/request'

@Module({
  name: 'registration',
  stateFactory: true,
  namespaced: true,
})
export default class Registration extends VuexModule {
  pageData: IRegistrationPageData | null = null
  pageMeta: IPageMeta | null = null
  formData: IRegistrationPageForm | null = null
  formValues: FormValues = {}

  get PageData() {
    return this.pageData
  }

  get FormValues() {
    return this.formValues
  }

  get PageMeta() {
    return this.pageMeta
  }

  get FormData() {
    return this.formData
  }

  @Mutation
  setPageData(data: IRegistrationPageData | null = null) {
    this.pageData = data
  }

  @Mutation
  setPageMeta(data: IPageMeta | null = null) {
    this.pageMeta = data
  }

  @Mutation
  setPageForm(data: IRegistrationPageForm | null = null) {
    this.formData = data
  }

  @Mutation
  setFormValues(data: FormValues = {}) {
    this.formValues = data
  }

  @Mutation
  resetForm() {
    this.formValues = {}
    this.formData = null
  }

  @Mutation
  setFormField({
    name,
    value,
    required,
  }: {
    name: string
    value: InputValue
    required?: boolean
  }) {
    const formData: FormValues = { ...this.formValues }
    if (value === undefined || value === null || value === '') {
      if (!required) {
        delete formData[name]
      } else if (required) {
        formData[name] = value
      }
    } else {
      formData[name] = value
    }
    this.formValues = formData
  }

  @Action
  async getData() {
    await Request(async () => {
      const { data } = await $axios.get(API.REGISTRATION.INDEX)
      this.setPageData(data.data)
      this.setPageMeta(data.meta)
    })
  }

  @Action
  async getForm({ params }: Route) {
    await Request(async () => {
      const url = API.REGISTRATION.INDEX + (params.slug || '')
      const { data } = await $axios.get(url)
      this.setPageForm(data.data)
      this.setPageMeta(data.meta)
    })
  }

  @Action
  async submitForm({
    action,
    payload,
  }: {
    action: IApiAction
    payload: IBasicObject
  }) {
    try {
      const { method, url } = action
      return await $axios({ method, url, data: payload })
    } catch (err) {
      // eslint-disable-next-line no-console
      return err.response
    }
  }
}
