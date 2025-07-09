import {defineAssetAspect, defineField} from 'sanity'

export default defineAssetAspect({
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
      description: 'Alternative text for accessibility',
    },
    {
      name: 'copyright',
      type: 'string',
      title: 'Copyright',
      description: 'Copyright information',
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Date Taken',
      description: 'The date the media was created or published',
    },
  ],
})
