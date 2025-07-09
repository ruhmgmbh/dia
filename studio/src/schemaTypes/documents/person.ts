import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Person schema.  Define and edit the fields for the 'person' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const person = defineType({
  name: 'person',
  title: 'Person',
  icon: UserIcon,
  type: 'document',

  groups: [
    {name: 'basicInfo', title: 'Basic Info'},
    {name: 'content', title: 'Content'},
  ],

  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the person to show up in the preview',
      options: {
        source: 'firstName',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'basicInfo',
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'basicInfo',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'basicInfo',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (rule) => rule.required(),
      group: 'basicInfo',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'basicInfo',
    }),
    defineField({
      type: 'imageWithMetadata',
      name: 'picture',
      title: 'Picture',
      validation: (rule) => rule.required(),
      group: 'basicInfo',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'pageBuilder',
      group: 'content',
    }),
  ],

  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      picture: 'picture',
    },
    prepare(selection) {
      return {
        title: `${selection.firstName} ${selection.lastName}`,
        subtitle: 'Person',
        media: selection.picture,
      }
    },
  },
})
