import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const linkWithLabel = defineType({
  name: 'linkWithLabel',
  type: 'object',
  icon: LinkIcon,
  title: 'Link',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'link',
      type: 'link',
    }),
  ],
})
