import { PersonalBlockType } from './enums'
import { RMethods } from '~/types/enums'
import { InputTypeSchemas } from '~/types'

export interface IPersonalPage {
  items: IPersonalBlock[]
}

export interface IPersonalBlock {
  type: PersonalBlockType
  title: string
  button?: {
    title: string
    type: string
  }
  action: {
    type: RMethods
    url: string
  }
  inputs: InputTypeSchemas[]
}
