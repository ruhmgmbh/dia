// schemas/objects/media.ts
import {ImageIcon, VideoIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const media = defineType({
  name: 'media',
  type: 'object',
  icon: ImageIcon,
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
      type: 'imageWithMetadata',
      name: 'image',
      title: 'Image',
      hidden: ({parent}) => parent?.mediaType !== 'image',
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
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
  ],

  preview: {
    select: {
      media: 'image',
      mediaType: 'mediaType',
      altImg: 'image.asset.altText',
      captionVideo: 'caption',
    },
    prepare({media, mediaType, altImg, captionVideo}) {
      const heading = mediaType == 'image' ? altImg : captionVideo

      return {
        title: heading,
        subtitle: mediaType,
        media: mediaType == 'image' ? media : VideoIcon,
      }
    },
  },
})
