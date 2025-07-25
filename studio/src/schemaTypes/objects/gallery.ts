import {DashboardIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  type: 'object',
  title: 'Gallery Block',
  icon: DashboardIcon,
  fields: [
    defineField({
      name: 'media',
      type: 'array',
      title: 'Gallery Media',
      of: [{type: 'media'}],
    }),
  ],
  preview: {
    select: {
      items: 'media',
    },
    prepare({items}) {
      return {
        title: 'Gallery',
        subtitle: items.length + ' Media items',
      }
    },
  },
})
