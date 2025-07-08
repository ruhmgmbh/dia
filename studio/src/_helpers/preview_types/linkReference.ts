import {PreviewConfig} from 'sanity'
import {capitalizeText} from '../textFunctions'

export const linkReferencePreview: PreviewConfig = {
  select: {
    label: 'label',
    linkType: 'link.linkType',
    page: 'link.page.slug',
    post: 'link.post.title',
    postMedia: 'link.post.coverImage',
    person: 'link.person.firstName',
    personMedia: 'link.post.picture',
    client: 'link.client.name',
    clientMedia: 'link.client.coverImage',
    networkPartner: 'link.networkPartner.name',
    networkPartnerMedia: 'link.networkPartner.logo',
    project: 'link.project.title',
    projectMedia: 'link.project.coverImage',
    service: 'link.service.title',
    serviceMedia: 'link.service.coverImage',
    technology: 'link.technology.name',
    technologyMedia: 'link.technology.logo',
  },
  prepare({
    label,
    linkType,
    page,
    post,
    person,
    client,
    networkPartner,
    project,
    service,
    technology,
    postMedia,
    personMedia,
    clientMedia,
    networkPartnerMedia,
    projectMedia,
    serviceMedia,
    technologyMedia,
  }) {
    const titlesByType = {
      page,
      post,
      person,
      client,
      networkPartner,
      project,
      service,
      technology,
    }

    const mediaByType = {
      post: postMedia,
      person: personMedia,
      client: clientMedia,
      networkPartner: networkPartnerMedia,
      project: projectMedia,
      service: serviceMedia,
      technology: technologyMedia,
    }

    const title = label || titlesByType[linkType] || 'Untitled'
    const media = mediaByType[linkType] || undefined

    return {
      title,
      subtitle: capitalizeText(linkType),
      media,
    }
  },
}
