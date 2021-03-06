import { DA as DA$1 } from '@spare/enum-chars';
import { PadFull, Pad } from '@texting/padder';
import { mapper } from '@vect/vector-mapper';
import { DA } from '@spare/enum-full-angle-chars';
import { FullWidth } from '@spare/fullwidth';
import { max } from '@aryth/comparer';
import { Lange } from '@spare/lange';
import { maxBy } from '@vect/vector-indicator';

const CJK_PUNCS = '\u3000-\u303f';
const CJK_LETTERS = '\u4e00-\u9fbf';
const FULL_CHARS = '\uff00-\uffef'; // full letters + full puncs

const HAN = new RegExp(`[${CJK_PUNCS}${CJK_LETTERS}${FULL_CHARS}]`); // HAN ideographs

const fieldWidth = (name, list, ansi) => {
  const lange = Lange(ansi);
  return max(lange(name), maxBy(list, lange));
};

/**
 *
 * @param {object} field
 * @param {string} field.name
 * @param {string[]} field.list
 * @param {object} config
 * @param {boolean} [config.ansi]
 * @returns {{name:string,rule:string,list:string[]}}
 */

const fieldPadderFull = (field, config = {}) => {
  const {
    name,
    list
  } = field;
  const toFull = FullWidth(config); // use config.ansi

  const pad = PadFull(config, config);
  const width = fieldWidth(name, list, config.ansi);
  return {
    name: pad(toFull(name), width, true),
    rule: DA.repeat(width),
    list: mapper(list, x => pad(toFull(x), width, true))
  };
};

const hasHan = HAN.test.bind(HAN);
/**
 *
 * @param {object} field
 * @param {string} field.name
 * @param {string[]} field.list
 * @param {object} config
 * @param {function[]} [config.dye]
 * @param {boolean} [config.ansi]
 * @param {boolean} [config.fullAngle]
 * @returns {{name:string,rule:string,list:string[]}}
 */

const fieldPadder = (field, config = {}) => {
  if (config.fullAngle && (hasHan(field.name) || field.list.some(hasHan))) return fieldPadderFull(field, config);
  const pad = Pad(config); // use config.ansi

  const width = fieldWidth(field.name, field.list, config.ansi);
  return {
    name: pad(field.name, width),
    rule: DA$1.repeat(width),
    list: mapper(field.list, x => pad(x, width))
  };
};

export { fieldPadder, fieldWidth };
