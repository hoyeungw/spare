import { enttro }        from '@spare/entries-margin'
import { AEU, LF, RTSP } from '@spare/enum-chars'
import { liner, Liner }  from '@spare/liner'
import { mattro }        from '@spare/matrix-margin'
import { entriesPadder }    from '@spare/entries-padder'
import { tablePadder }      from '@spare/table-padder'
import { vettro }        from '@spare/vector-margin'
import { size }          from '@vect/matrix'

const HR_ENTRY = ['..', '..']

export class Markdown {

  /***
   *
   * @param {Object} ob
   * @param {Object} option
   *
   * @param {string} [option.dash=': ']
   *
   * @param {Function} [option.keyRead]
   * @param {Function} [option.read]
   *
   * @param {number} [option.head]
   * @param {number} [option.tail]
   *
   * @param {boolean} [option.ansi]
   * @param {number} [option.level=0]
   *
   * @param {string} [option.pad]
   * @param {string} [option.prefix]
   * @param {string} [option.suffix]
   *
   * @returns {string}
   */
  static object(ob = {}, option = {}) { return Markdown.entries(Object.entries(ob), option) }

  /***
   *
   * @param {[*,*][]} entries
   * @param {Object} option
   *
   * @param {string} [option.dash=': ']
   *
   * @param {Function} [option.keyRead]
   * @param {Function} [option.read]
   *
   * @param {number} [option.head]
   * @param {number} [option.tail]
   *
   * @param {boolean} [option.ansi]
   * @param {number} [option.level=0]
   *
   * @param {string} [option.pad]
   * @param {string} [option.prefix]
   * @param {string} [option.suffix]
   *
   * @returns {string}
   */
  static entries(entries = [], option = {}) {
    if (!entries?.length) return liner([], option)
    const delim = LF
    const { keyRead, read, head, tail, ansi, dash = RTSP, level, prefix, suffix, pad } = option
    const { raw, text } = enttro(entries, { head, tail, keyRead, read, rule: HR_ENTRY })
    entries = pad ? entriesPadder(text, { raw, ansi }) : text
    return entries
      .map(([k, v]) => (prefix ?? '') + k + dash + v.trimRight() + (suffix ?? ''))
      |> Liner({ delim, level })
  }
  /***
   *
   * @param {Object} table
   * @param {Object} option
   *
   *
   * @param {Function} [option.read]
   * @param {Function} [option.headRead]
   *
   * @param {number} [option.top]
   * @param {number} [option.bottom]
   * @param {number} [option.left]
   * @param {number} [option.right]
   *
   * @param {boolean} [option.ansi=true]
   * @param {boolean} [option.fullAngle]
   * @param {number} [option.level=0]
   *
   * @returns {string}
   */
  static table(table, option = {}) {
    if (!table) return AEU
    let matrix = table.rows || table.matrix, banner = table.head || table.banner
    const [height, width] = size(matrix), labelWidth = banner?.length
    if (!height || !width || !labelWidth) return AEU
    const delim = LF
    const { read, headRead, top, left, bottom, right, ansi, fullAngle, level } = option
    const x = mattro(matrix, { top, bottom, left, right, height, width, read })
    const b = vettro(banner, { head: left, tail: right, read: headRead })
    let { head, rule, rows } = tablePadder(x.alt, b.alt, { raw: x.raw, ansi, fullAngle })
    return [
      '| ' + head.join(' | ') + ' |',
      '| ' + rule.join(' | ') + ' |',
      ...rows.map(row => '| ' + row.join(' | ') + ' |')
    ] |> Liner({ delim, level })
  }
}


