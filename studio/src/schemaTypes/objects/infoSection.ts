import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

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
      // Extract the first text span from the first block
      const firstBlock = content?.[0]
      const firstSpan = firstBlock?.children?.find((child: any) => child._type === 'span')
      const firstText = firstSpan?.text || ''

      return {
        title: title || 'Info Section',
        subtitle: firstText ? firstText.slice(0, 80) : 'No content',
      }
    },
  },
})
