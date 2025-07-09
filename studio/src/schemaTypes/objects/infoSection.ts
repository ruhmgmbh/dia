import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'
import {InfoBlockPreviewText} from '../../_helpers/InfoBlockPreviewText'

export const infoSection = defineType({
  name: 'infoSection',
  title: 'Info Section',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      content: 'content',
    },
    prepare({title, content}) {
      return {
        title: title || 'Info Section',
        subtitle: InfoBlockPreviewText(content),
      }
    },
  },
})
