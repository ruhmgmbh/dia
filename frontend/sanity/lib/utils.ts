import createImageUrlBuilder from "@sanity/image-url";
import { Link } from "@/sanity.types";
import { dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { createDataAttribute, CreateDataAttributeProps } from "next-sanity";
import { getImageDimensions } from "@sanity/asset-utils";
import { getFileAsset } from "@sanity/asset-utils";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  const imageRef = source?.asset?._ref;
  const crop = source.crop;

  // get the image's og dimensions
  const { width, height } = getImageDimensions(imageRef);

  if (Boolean(crop)) {
    // compute the cropped image's area
    const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));

    const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

    // compute the cropped image's position
    const left = Math.floor(width * crop.left);
    const top = Math.floor(height * crop.top);

    // gather into a url
    return imageBuilder
      ?.image(source)
      .rect(left, top, croppedWidth, croppedHeight)
      .auto("format");
  }

  return imageBuilder?.image(source).auto("format");
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit("crop").url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

type linkSlug = {
  slug: {
    current: string;
  };
};

type groqLink = {
  page: linkSlug;
  post: linkSlug;
  client: linkSlug;
  person: linkSlug;
  project: linkSlug;
  service: linkSlug;
  networkPartner: linkSlug;
  technology: linkSlug;
};

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: (Link & groqLink) | undefined) {
  if (!link) return null;

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!link.linkType && link.href) {
    link.linkType = "href";
  }

  switch (link.linkType) {
    case "href":
      return link.href || null;
    case "page":
      if (link?.page && link?.page?.slug) {
        return `/${link.page.slug.current}`;
      }
    case "post":
      if (link?.post && link?.post?.slug) {
        return `/posts/${link.post.slug.current}`;
      }
    case "client":
      if (link?.client && link?.post?.slug) {
        return `/clients/${link.client.slug.current}`;
      }
    case "person":
      if (link?.person && link?.post?.slug) {
        return `/people/${link.person.slug.current}`;
      }
    case "project":
      if (link?.project && link?.project?.slug) {
        return `/projects/${link.project.slug.current}`;
      }
    case "service":
      if (link?.service && link?.service?.slug) {
        return `/services/${link.service.slug.current}`;
      }
    case "networkPartner":
      if (link?.networkPartner && link?.networkPartner?.slug) {
        return `/networkpartners/${link.networkPartner.slug.current}`;
      }
    case "technology":
      if (link?.technology && link?.technology?.slug) {
        return `/technologies/${link.technology.slug.current}`;
      }
    default:
      return null;
  }
}

const sanityConfig = {
  projectId: projectId || "",
  dataset: dataset || "",
};

export function urlForFile(source: any): string | undefined {
  if (!source?.asset?._ref) return undefined;

  const asset = getFileAsset(source, sanityConfig);
  return asset?.url;
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, "id" | "type" | "path">>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config);
}
