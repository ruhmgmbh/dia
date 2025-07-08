import {VersionsIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export const tabbedContent = defineType({
  name: 'tabbedContent',
  type: 'object',
  title: 'Tabbed Content Block',
  icon: VersionsIcon,
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
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: 'TabbedContent',
        subtitle: selection.title,
      }
    },
  },
})
