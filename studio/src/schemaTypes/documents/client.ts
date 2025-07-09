import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const client = defineType({
  name: 'client',
  title: 'Client',
  icon: UsersIcon,
  type: 'document',

  groups: [
    {name: 'basicInfo', title: 'Basic Info'},
    {name: 'content', title: 'Content'},
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'basicInfo',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the client to show up in the preview',
      options: {
        source: 'name',
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
      name: 'linkWebsite',
      title: 'Link Website',
      type: 'url',
      group: 'basicInfo',
    }),
    defineField({
      type: 'imageWithMetadata',
      name: 'coverImage',
      title: 'Cover Image',
      validation: (rule) => rule.required(),
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
      title: 'name',
      media: 'coverImage',
    },
  },
})
