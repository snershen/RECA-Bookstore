export function textBreak(text, space = 0) {
  const sentences = text.split(
    /(?<=[.!?])\s+(?=[^A-Za-z,\s])|(?<=[^:\s])\s+(?=[^A-Za-z,\s:])|(?<=[^A-Za-z:])\s+(?=[^A-Za-z,\s])|(?<=:\s)\s+/
  )

  const htmlSentences = sentences
    .filter((sentence) => sentence.trim() !== '')
    .map((sentence) => `<p class="mb-${space}">${sentence.trim()}</p>`)
  return htmlSentences.join('')
}
