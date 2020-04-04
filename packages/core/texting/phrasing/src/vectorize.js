import { CAPWORD, INILOW } from '../resources/regexes'

/**
 * Camel/pascal case phrase -> split vector
 * Snake: fox_jumps_over_dog
 * Kebab: fox-jumps-over-dog
 * @param {string} phrase camel/pascal-case phrase
 * @returns {string[]}
 */
export function camelToVector (phrase) {
  let ms, wd, ve = []
  if ((ms = INILOW.exec(phrase)) && ([wd] = ms)) ve.push(wd)
  while ((ms = CAPWORD.exec(phrase)) && ([wd] = ms)) ve.push(wd)
  return ve
}

/**
 * snake or kebab phrase -> split vector
 * @param {string} phrase - dashed phrase
 * @returns {string[]}
 */
export const snakeToVector = (phrase) => phrase.split(/\W/g)