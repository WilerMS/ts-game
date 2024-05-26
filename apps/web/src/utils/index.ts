const mappedImages = new Map<string, HTMLImageElement>()

export const loadImage = (url: string, callback?: (image: HTMLImageElement) => void): HTMLImageElement => {
  const mappedImage = mappedImages.get(url)
  if (mappedImage) {
    callback?.(mappedImage)
    return mappedImage
  }

  const image = new Image()
  image.src = url
  image.onload = () => {
    mappedImages.set(url, image)
    callback?.(image)
  }
  return image
}