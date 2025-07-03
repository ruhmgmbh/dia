import {ProjectsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  icon: ProjectsIcon,

  groups: [
    {name: 'basicInfo', title: 'Basic Info'},
    {name: 'content', title: 'Content'},
    {name: 'seo', title: 'SEO'},
  ],

  type: 'document',
  fields: [
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Should the project be featured on the home page?',
      group: 'basicInfo',
    }),
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
      description: 'A slug is required for the project to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'basicInfo',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      group: 'basicInfo',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'basicInfo',
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
      validation: (rule) => rule.required(),
      group: 'basicInfo',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'pageBuilder',
      group: 'content',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{type: 'client'}],
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
      name: 'networkPartners',
      title: 'Network Partners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'networkPartner'}]}],
      options: {
        layout: 'tags',
      },
      group: 'basicInfo',
    }),
    defineField({
      name: 'projects',
      title: 'Relevant Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
      options: {
        layout: 'tags',
      },
      group: 'basicInfo',
    }),
    defineField({
      name: 'services',
      title: 'Relevant Services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      options: {
        layout: 'tags',
      },
      group: 'basicInfo',
    }),
  ],
})
