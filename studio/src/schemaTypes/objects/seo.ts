// /schemas/objects/seo.ts
import {defineType} from 'sanity'

const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  description:
    'If left empty, metadata will be automatically generated based on the values from "Basic Info."',
  fields: [
    {
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('Best practice: 50–60 characters.'),
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Best practice: 150–160 characters.'),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'image',
      title: 'Social Image (OG)',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'noIndex',
      title: 'Hide from Search Engines',
      description: 'Prevents indexing by search engines (adds `noindex` meta).',
      type: 'boolean',
    },
  ],
})

export default seo
