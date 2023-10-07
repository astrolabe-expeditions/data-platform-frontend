import { Select } from './Select'

export default {
  component: Select,
}

export const Simple = {
  args: {
    label: 'Test',
  },
}

export const Full = {
  args: {
    label: 'Email',
    placeholder: 'olivia@astrolabe-expeditions.org',
    helperText: 'This is a hint text to help user.',
  },
}
