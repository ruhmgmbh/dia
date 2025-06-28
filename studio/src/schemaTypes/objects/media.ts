// schemas/objects/media.ts
import {defineField, defineType} from 'sanity'

export const media = defineType({
  name: 'media',
  type: 'object',
  title: 'Media',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({parent}) => parent?.mediaType !== 'image',
      options: {
        hotspot: true,
        metadata: ['palette', 'lqip'],
      },
    }),
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'caption',
      title: 'Caption text',
      type: 'string',
    }),
  ],
})
