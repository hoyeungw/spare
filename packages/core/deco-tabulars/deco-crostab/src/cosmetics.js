import { COLORANT }       from '@palett/enum-colorant-modes'
import { fluoMatrix }     from '@palett/fluo-matrix'
import { fluoVector }     from '@palett/fluo-vector'
import { AEU }            from '@spare/enum-chars'
import { liner }          from '@spare/liner'
import { mattro }         from '@spare/mattro'
import { padKeyedColumn } from '@spare/pad-keyed-column'
import { padTable }       from '@spare/pad-table'
import { vettro }         from '@spare/vettro'
import { size }           from '@vect/matrix'
import { zipper }         from '@vect/vector-zipper'
import { HCONN, VLINE }   from '../resources/conns'

export const cosmetics = function (crostab) {
  let matrix = crostab.rows || crostab.matrix, banner = crostab.head || crostab.banner,
    stand = crostab.side, name = crostab.title || ''
  const [height, width] = size(matrix), labelWidth = banner && banner.length, labelHeight = stand && stand.length
  if (!height || !width || !labelWidth || !labelHeight) return AEU
  const {
    direct, read, headRead, sideRead, presets,
    top, left, bottom, right, ansi, fullAngle, discrete, delim, level
  } = this
  const [x, b, s] = [
    mattro(matrix, { top, bottom, left, right, height, width, read }),
    vettro(banner, { head: left, tail: right, read: headRead }),
    vettro(stand, { head: top, tail: bottom, read: sideRead }),
  ]
  let dyeX, dyeB, dyeS
  if (presets) {
    const
      [numericPreset, , headingPreset] = presets,
      labelPresets = [numericPreset, headingPreset]
    dyeX = fluoMatrix.call(COLORANT, x.raw, direct, presets)
    dyeB = fluoVector.call(COLORANT, b.raw, labelPresets)
    dyeS = fluoVector.call(COLORANT, s.raw, labelPresets)
  }
  let { title, hr: br, side } = padKeyedColumn(s.text, name, { dye: dyeS, fullAngle })
  let { head, hr, rows } = padTable(x.text, b.text, { raw: x.raw, dye: dyeX, headDye: dyeB, ansi, fullAngle })
  const lines = [
    title + VLINE + head.join(VLINE),
    br + HCONN + hr.join(HCONN)
  ].concat(
    zipper(side, rows, (sd, row) => sd + VLINE + row.join(VLINE))
  )
  return liner(lines, { discrete, delim, level })
}
