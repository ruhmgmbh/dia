import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  icon: CogIcon,
  type: 'document',

  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        group: "content",
    }),
    defineField({
        name: 'coverImage',
        title: 'Cover Image',
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
        group: "content",
      }),
      defineField({
        name: "seo",
        title: "SEO Settings",
        type: "seo",
        group: "seo"
      }),
  ],
})
