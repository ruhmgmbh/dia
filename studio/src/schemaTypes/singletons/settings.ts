import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,

  groups: [
    {name: 'home', title: 'Home'},
    {name: 'header', title: 'Header'},
    {name: 'footer', title: 'Footer'},
  ],

  fields: [
    defineField({
      name: 'websiteTitle',
      title: 'Website Title',
      type: 'string',
      group: 'home',
      validation: (Rule) => Rule.required(),
      description:
        "Get's added as suffix to the end of each page's meta title. (E.g. About Us | [Website Title])",
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'home',
      description: 'Default Metadata',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
      group: 'header',
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footer',
      group: 'footer',
    }),
  ],
})
