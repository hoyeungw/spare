import { max }        from '@aryth/comparer'
import { DA }         from '@spare/enum-chars'
import { DASH, SP }   from '@spare/enum-full-angle-chars'
import { FullWidth }  from '@spare/fullwidth'
import { Lange }      from '@spare/lange'
import { LPad, RPad } from '@spare/padder'
import { HAN }        from '@spare/regex-charset'
import { maxBy }      from '@vect/vector-indicator'
import { mapper }     from '@vect/vector-mapper'
import { zipper }     from '@vect/vector-zipper'

const hasHan = HAN.test.bind(HAN)

export const fieldPadder = ({ title = '', side }, { dye, ansi, fullAngle } = {}) => {
  if (fullAngle) return fieldPadderFullWidth({ title, side }, { dye, ansi })
  const lpad = LPad({ ansi }), rpad = RPad({ ansi }), lange = Lange(ansi)
  const pad = max(lange(title), maxBy(side, lange))
  return {
    title: rpad(title, pad),
    rule: DA.repeat(pad),
    side: dye
      ? zipper(side, dye, (x, d) => lpad(x, pad) |> d)
      : mapper(side, x => lpad(x, pad))
  }
}

export const fieldPadderFullWidth = ({ title = '', side }, { dye, ansi, dash = DASH, fill = SP } = {}) => {
  const fullWidth = FullWidth({ ansi })
  const han = hasHan(title) || side.some(hasHan)
  if (!han) return fieldPadder({ title, side }, { ansi })
  const lpad = LPad({ ansi, fill }), rpad = RPad({ ansi, fill }), lange = Lange(ansi)
  const pad = max(lange(title), maxBy(side, lange))
  return {
    title: rpad(fullWidth(title), pad),
    rule: dash.repeat(pad),
    side: dye
      ? zipper(side, dye, (x, d) => lpad(fullWidth(x), pad) |> d)
      : mapper(side, x => lpad(fullWidth(x), pad))
  }
}

