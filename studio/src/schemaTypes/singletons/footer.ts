import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',

  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {type: 'linkWithLabel'}, // Your custom link type
      ],
    }),

    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    }),
  ],
})
