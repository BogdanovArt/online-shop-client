export enum regFields {
  name_user = 'name_user',
  name_shop = 'name_shop',
  name_org = 'name_org',
  name_supplier = 'name_supplier',
  location = 'location',
  phone = 'phone',
  password = 'password',
  confirm = 'confirm',
  email = 'email',
}

export const regex = {
  email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
}
