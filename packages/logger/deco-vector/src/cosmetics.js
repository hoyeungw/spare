import { ELLIP } from '@spare/enum-chars'
import { vettro } from '@spare/vettro'
import { cosmetics as cosmeticsEntries } from '@spare/deco-entries'
import { fluoVector } from '@palett/fluo-vector'
import { liner, pipeQuote } from '@spare/deco-util'

export function cosmetics (vec) {
  if (this?.indexed) return cosmeticsEntries.call(this, Object.entries(vec))
  if (!vec) return String(vec)
  const { head, tail, preset, stringPreset, abstract, quote } = this
  let { raw, text } = vettro(vec, {
    head, tail,
    abstract: pipeQuote(abstract, quote),
    hr: ELLIP
  })
  if (preset) fluoVector(text, { values: raw, preset, stringPreset, mutate: true })
  return liner(text, this)
}
