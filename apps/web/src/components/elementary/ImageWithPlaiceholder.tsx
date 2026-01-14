/* eslint-disable jsx-a11y/alt-text */

import Image from "next/image"

import { ImageExtendedProps } from "@/types/next"

import { FALLBACK_IMAGE_PATH } from "@/lib/constants"
import { formatStrapiMediaUrl } from "@/lib/strapi-helpers"

const loadPlaiceholder = async () => {
  const module = await import("plaiceholder")
  return module.getPlaiceholder
}

const generatePlaceholder = async (src: string) => {
  if (typeof window !== "undefined") {
    return { plaiceholderError: true }
  }

  let response: Response
  try {
    response = await fetch(src)
  } catch (e) {
    console.error(`Image ${src} wasn't fetched: `, e)
    return null
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const getPlaiceholder = await loadPlaiceholder()

  try {
    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 })

    return {
      plaiceholder,
      img: { src, height, width },
    }
  } catch (e) {
    console.error(`Plaiceholder generation for image ${src} failed: `, e)
    return { plaiceholderError: true }
  }
}

export const ImageWithPlaiceholder = async (props: ImageExtendedProps) => {
  const src = formatStrapiMediaUrl(props.src)
  const fallbackSrc = formatStrapiMediaUrl(props.fallbackSrc)

  const srcPlaceholder =
    src != null ? await generatePlaceholder(src) : undefined

  const fallbackSrcPlaceholder =
    srcPlaceholder == null && fallbackSrc != null
      ? await generatePlaceholder(fallbackSrc)
      : undefined

  const placeholder = srcPlaceholder ?? fallbackSrcPlaceholder

  if (placeholder == null) {
    // Image and fallback image weren't loaded -> show local fallback image
    return (
      <Image {...props} src={FALLBACK_IMAGE_PATH} width={50} height={50} />
    )
  }

  if (placeholder.plaiceholderError) {
    // Plaiceholder generation failed -> show image with fallback handling
    const { ImageWithFallback } = await import("./ImageWithFallback")
    return <ImageWithFallback {...props} blurOff />
  }

  // eslint-disable-next-line no-unused-vars
  const { fallbackSrc: fallback, ...imageProps } = props

  return (
    <Image
      placeholder="blur"
      blurDataURL={placeholder.plaiceholder!.base64}
      {...imageProps}
      {...placeholder.img}
    />
  )
}
