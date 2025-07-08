import {defineType, defineField} from 'sanity'
import {capitalizeText} from '../../../_helpers/textFunctions'
import {linkReferencePreview} from '../../../_helpers/preview_types/linkReference'

export const tabLink = defineType({
  name: 'tabLink',
  type: 'object',
  title: 'Link or Reference',
  fields: [
    defineField({
      name: 'link',
      type: 'link',
      title: 'Links',
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Button Label (optional)',
      description: 'Leave empty to use the title from the referenced content.',
    }),
  ],
  preview: linkReferencePreview,
})
