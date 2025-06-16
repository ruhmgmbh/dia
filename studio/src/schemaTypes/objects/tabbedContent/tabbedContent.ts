import {defineType, defineField} from 'sanity'

export const tabbedContent = defineType({
  name: 'tabbedContent',
  type: 'object',
  title: 'Tabbed Content Block',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
    }),
    defineField({
      name: 'tabs',
      type: 'array',
      title: 'Tabs',
      of: [{type: 'tab'}],
    }),
  ],
})
