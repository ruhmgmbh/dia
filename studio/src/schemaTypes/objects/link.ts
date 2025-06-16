import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  name: 'link',
  type: 'object',
  icon: LinkIcon,
  title: 'Link',
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'href',
      options: {
        list: [
          {title: 'URL', value: 'href'},
          {title: 'Page', value: 'page'},
          {title: 'Post', value: 'post'},
          {title: 'Person', value: 'person'},
          {title: 'Client', value: 'client'},
          {title: 'Network Partner', value: 'networkPartner'},
          {title: 'Project', value: 'project'},
          {title: 'Service', value: 'service'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'href' && parent?.linkType != null,
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'href' && !value) {
            return 'URL is required when Link Type is URL'
          }
          return true
        }),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.linkType !== 'page',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'page' && !value) {
            return 'Page reference is required when Link Type is Page'
          }
          return true
        }),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      hidden: ({parent}) => parent?.linkType !== 'post',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'post' && !value) {
            return 'Post reference is required when Link Type is Post'
          }
          return true
        }),
    }),
    defineField({
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{type: 'person'}],
      hidden: ({parent}) => parent?.linkType !== 'person',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'person' && !value) {
            return 'Person reference is required when Link Type is Person'
          }
          return true
        }),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{type: 'client'}],
      hidden: ({parent}) => parent?.linkType !== 'client',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'client' && !value) {
            return 'Client reference is required when Link Type is Client'
          }
          return true
        }),
    }),
    defineField({
      name: 'networkPartner',
      title: 'Network Partner',
      type: 'reference',
      to: [{type: 'networkPartner'}],
      hidden: ({parent}) => parent?.linkType !== 'networkPartner',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'networkPartner' && !value) {
            return 'Network Partner reference is required when Link Type is Network Partner'
          }
          return true
        }),
    }),
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{type: 'project'}],
      hidden: ({parent}) => parent?.linkType !== 'project',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'project' && !value) {
            return 'Project reference is required when Link Type is Project'
          }
          return true
        }),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{type: 'service'}],
      hidden: ({parent}) => parent?.linkType !== 'service',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'service' && !value) {
            return 'Service reference is required when Link Type is Service'
          }
          return true
        }),
    }),
    defineField({
      name: 'technology',
      title: 'Technology',
      type: 'reference',
      to: [{type: 'technology'}],
      hidden: ({parent}) => parent?.linkType !== 'technology',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'technology' && !value) {
            return 'Technology reference is required when Link Type is Technology'
          }
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
