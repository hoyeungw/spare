import { BRACKET } from '@spare/enum-brackets'
import { COSP } from '@spare/enum-chars'
import { smartValueRead } from '../utils/smartValueRead'

/**
 * @param {Object} p
 *
 * @param {string} [p.delim=', ']
 * @param {number} [p.quote=NONE]
 *
 * @param {Function} [p.read=smartValueRead]
 *
 * @param {number} [p.level]
 *
 * @returns {Object}
 */
export const presetMatrix = p => {
  p.delim = p.delim || COSP
  p.read = p.read || smartValueRead
  p.bracket = BRACKET
  p.discrete = true
  return p
}

