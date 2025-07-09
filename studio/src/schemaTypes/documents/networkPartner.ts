import {EarthGlobeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const networkPartner = defineType({
  name: 'networkPartner',
  title: 'Network Partner',
  icon: EarthGlobeIcon,
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
      description: 'A slug is required for the network partner to show up in the preview',
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
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'technology'}]}],
      options: {
        layout: 'tags',
      },
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
