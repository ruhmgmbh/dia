import {defineType, defineField} from 'sanity'

export const tabLink = defineType({
  name: 'tabLink',
  type: 'object',
  title: 'Link or Reference',
  fields: [
    defineField({
      name: 'externalUrl',
      type: 'url',
      title: 'External URL',
    }),
    defineField({
      name: 'reference',
      type: 'reference',
      title: 'Internal Reference',
      to: [
        {type: 'page'},
        {type: 'post'},
        {type: 'client'},
        {type: 'service'},
        {type: 'technology'},
        {type: 'person'},
        {type: 'project'},
        // Add any other linkable types here
      ],
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label (optional)',
      description: 'Leave empty to use the title from the referenced content.',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      pageSlug: 'reference.slug.current',
      external: 'externalUrl',
    },
    prepare(selection) {
      const {title, pageSlug, external} = selection
      return {
        title: title || pageSlug || external,
        subtitle: pageSlug ? 'Internal reference' : 'External link',
      }
    },
  },
})
