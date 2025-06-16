import {CodeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const technology = defineType({
  name: 'technology',
  title: 'Technology',
  icon: CodeIcon,
  type: 'document',
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
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
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
      }),
  ],
})
