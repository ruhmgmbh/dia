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

  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
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
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        },
      ],
      group: 'basicInfo',
    }),
  ],
})
