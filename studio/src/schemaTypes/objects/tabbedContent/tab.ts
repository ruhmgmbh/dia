import {DotIcon, LinkIcon, VideoIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'
import {InfoBlockPreviewText} from '../../../_helpers/InfoBlockPreviewText'

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
      name: 'media',
      title: 'Media',
      type: 'media',
      hidden: ({parent}) => parent?.contentType !== 'content',
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
  preview: {
    select: {
      title: 'title',
      contentType: 'contentType',
      content: 'content',
      media: 'media',
    },
    prepare({title, contentType, content, media}) {
      let subtitle: string = ''
      if (contentType == 'content' && content?.content) {
        subtitle = InfoBlockPreviewText(content.content)
      }

      let mediaPreview: any = DotIcon
      if (contentType == 'content') {
        if (media.mediaType == 'image' && media.image) {
          mediaPreview = media.image
        } else if (media.mediaType == 'video') {
          mediaPreview = VideoIcon
        }
      } else {
        mediaPreview = LinkIcon
      }

      return {
        title: title,
        subtitle: subtitle ?? '',
        media: mediaPreview,
      }
    },
  },
})
