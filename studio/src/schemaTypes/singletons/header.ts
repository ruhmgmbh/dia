import {defineField, defineType} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'object',

  fields: [
    defineField({
      name: 'primaryLinks',
      title: 'Primary Links',
      type: 'array',
      of: [
        {type: 'linkWithLabel'}, // Your custom link type
      ],
    }),

    defineField({
      name: 'secondaryLinks',
      title: 'Secondary Links',
      type: 'array',
      of: [
        {type: 'linkWithLabel'}, // Your custom link type
      ],
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {type: 'linkWithLabel'}, // Your custom link type
      ],
    }),
  ],
})
