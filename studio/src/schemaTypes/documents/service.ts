import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  icon: CogIcon,
  type: 'document',

  groups: [
    {name: 'basicInfo', title: 'Basic Info'},
    {name: 'content', title: 'Content'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'basicInfo',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the service to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'basicInfo',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'basicInfo',
    }),
    defineField({
      type: 'imageWithMetadata',
      name: 'coverImage',
      title: 'Cover Image',
      group: 'basicInfo',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'pageBuilder',
      group: 'content',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
})
