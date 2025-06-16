import {EarthGlobeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const networkPartner = defineType({
  name: 'networkPartner',
  title: 'Network Partner',
  icon: EarthGlobeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name Partner',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
    }),
    defineField({
        name: 'technologies',
        title: 'Technologies',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'technology' }] }],
        options: {
          layout: 'tags'
        }
    }),
    defineField({
        name: 'linkWebsite',
        title: 'Link Website',
        type: 'url',
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
