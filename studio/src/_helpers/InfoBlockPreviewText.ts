export function InfoBlockPreviewText(content: any): string {
  const firstBlock = content?.[0]
  const firstSpan = firstBlock?.children?.find((child: any) => child._type === 'span')
  const firstText = firstSpan?.text

  if (firstText) {
    return firstText.slice(0, 80)
  } else {
    return 'No content'
  }
}
