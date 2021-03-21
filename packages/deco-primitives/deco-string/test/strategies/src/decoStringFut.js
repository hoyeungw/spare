import { MUTABLE }      from '@analys/enum-mutabilities'
import { fluoVector }      from '@palett/fluo-vector'
import { splitLiteral } from '@spare/splitter'
import { Joiner }       from '../../../src/_decoString'

export const decoStringFut = function (text) {
  // const { delim, vectify, joiner, presets } = this ?? {}
  const delim = this?.delim ?? ''
  const vectify = this?.vectify ?? splitLiteral
  const joiner = this?.joiner ?? Joiner(delim)
  const presets = this?.presets
  const words = (vectify ?? splitLiteral)(text)
  fluoVector.call(MUTABLE, words, presets)
  return (joiner ?? Joiner(delim))(words)
}
