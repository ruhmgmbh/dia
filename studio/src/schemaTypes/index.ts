import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {project} from './documents/project'
import { client } from './documents/client'
import seo from './objects/seo'
import { technology } from './documents/technology'
import { networkPartner } from './documents/networkPartner'
import { service } from './documents/service'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  service,
  project,
  client,
  networkPartner,
  technology,
  person,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  seo
]
