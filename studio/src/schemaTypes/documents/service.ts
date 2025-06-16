import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  icon: CogIcon,
  type: 'document',

  groups: [
    { name: 'basicInfo', title: 'Basic Info' },
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: "basicInfo",
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the project to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: "basicInfo",
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        group: "basicInfo",
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
        group: "basicInfo",
      }),
      defineField({
        name: 'pageBuilder',
        title: 'Page builder',
        type: 'array',
        of: [{type: 'callToAction'}, {type: 'infoSection'}],
        options: {
          insertMenu: {
            // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
            views: [
              {
                name: 'grid',
                previewImageUrl: (schemaTypeName) =>
                  `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
              },
            ],
          },
        },
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
