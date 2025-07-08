import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'
import {capitalizeText} from '../../_helpers/textFunctions'
import {linkReferencePreview} from '../../_helpers/preview_types/linkReference'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'link',
      title: 'Button link',
      type: 'link',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'When empty, Title of Reference is taken',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      description:
        'When empty, Excerpt of Reference is taken (Attention: Not every post type has an excerpt field! Pls check before publishing)',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button text',
      type: 'string',
    }),
    defineField({
      name: 'hideImage',
      title: 'Hide Image',
      type: 'boolean',
    }),
  ],
  preview: {
    select: linkReferencePreview.select,
    prepare(selection) {
      const base = linkReferencePreview.prepare!(selection)

      return {
        ...base,
        title: `Call to Action`,
        subtitle: `${base.title} | ${base.subtitle}`,
      }
    },
  },
})
