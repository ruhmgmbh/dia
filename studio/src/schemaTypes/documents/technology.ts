import {CodeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const technology = defineType({
  name: 'technology',
  title: 'Technology',
  icon: CodeIcon,
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
      description: 'A slug is required for the technology to show up in the preview',
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
      type: 'imageWithMetadata',
      name: 'logo',
      title: 'Logo Image',
      validation: (rule) => rule.required(),
      group: 'basicInfo',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
