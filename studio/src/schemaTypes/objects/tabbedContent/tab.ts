import {DotIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export const tab = defineType({
  name: 'tab',
  type: 'object',
  title: 'Tab',
  icon: DotIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tab Group Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          {title: 'Content (Image or Video with Text)', value: 'content'},
          {title: 'Link/Relationship', value: 'links'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      type: 'string',
      title: 'Media Type',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent?.contentType !== 'content',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      hidden: ({parent}) => parent?.contentType !== 'content' || parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'video',
      type: 'file',
      title: 'Video File',
      options: {
        accept: 'video/*',
      },
      hidden: ({parent}) => parent?.contentType !== 'content' || parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'content',
      type: 'infoSection',
      title: 'Content',
      hidden: ({parent}) => parent?.contentType !== 'content',
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      hidden: ({parent}) => parent?.contentType !== 'links',
      of: [{type: 'tabLink'}],
    }),
  ],
})
