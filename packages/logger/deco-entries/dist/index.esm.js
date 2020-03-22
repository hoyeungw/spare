import { presetEntries } from '@spare/preset-deco';
import { liner, pipeQuote } from '@spare/deco-util';
import { enttro } from '@spare/enttro';
import { padEntries } from '@spare/pad-entries';
import { fluoEntries } from '@palett/fluo-entries';
import { Duozipper } from '@vect/entries-zipper';

const bracket = x => '[' + x + ']';

const HR_ENTRY = ['..', '..'];

const cosmetics = function (entries) {
  var _entries;

  if (!entries) return String(entries);
  if (!((_entries = entries) === null || _entries === void 0 ? void 0 : _entries.length)) return liner([], this);
  const {
    keyRead,
    read,
    preset,
    stringPreset,
    head,
    tail,
    ansi,
    dash,
    delim,
    keyQuote,
    quote,
    bracket: bracket$1
  } = this;
  const {
    raw,
    text
  } = enttro(entries, {
    head,
    tail,
    keyRead: pipeQuote(keyRead, keyQuote),
    read: pipeQuote(read, quote),
    hr: HR_ENTRY
  });
  const dye = preset && fluoEntries(raw, {
    preset,
    stringPreset,
    colorant: true
  });
  entries = /\n/.test(delim) ? padEntries(text, {
    raw,
    dye,
    ansi: preset || ansi
  }) : preset ? Duozipper((t, d) => {
    var _t;

    return _t = t, d(_t);
  })(text, dye) : text;
  const lines = bracket$1 ? entries.map(([k, v]) => bracket(k + dash + v)) : entries.map(([k, v]) => k + dash + v.trimRight());
  return liner(lines, this);
};

/**
 * @typedef {{[max]:string|*[],[min]:string|*[],[na]:string|*[]}} Preset
 */

/**
 *
 * @param {Object} options
 * @param {Function} [options.utils]
 * @param {Function} [options.read]
 * @param {Object} [options.preset=FRESH]
 * @param {Object} [options.stringPreset=OCEAN]
 * @param {number} [options.head]
 * @param {number} [options.tail]
 * @param {string} [options.keyQuote]
 * @param {string} [options.quote]
 * @param {boolean} [options.discrete]
 * @param {string} [options.dash=' > ']
 * @param {string} [options.delim='\n']
 * @param {number} [options.bracket=BRK] - BRK = 1
 * @param {boolean} [options.ansi]
 * @param {number} [options.level=0]
 * @returns {string}
 */

const Deco = (options = {}) => cosmetics.bind(presetEntries(options));
/***
 *
 * @param {[*,*][]} entries
 * @param {Object} options
 * @param {Function} [options.utils]
 * @param {Function} [options.read]
 * @param {Object} [options.preset=FRESH]
 * @param {Object} [options.stringPreset=OCEAN]
 * @param {number} [options.head]
 * @param {number} [options.tail]
 * @param {string} [options.keyQuote]
 * @param {string} [options.quote]
 * @param {boolean} [options.discrete]
 * @param {string} [options.dash=' > ']
 * @param {string} [options.delim='\n']
 * @param {number} [options.bracket=BRK] - BRK = 1
 * @param {boolean} [options.ansi]
 * @param {number} [options.level=0]
 * @returns {string}
 */

const deco = (entries, options = {}) => cosmetics.call(presetEntries(options), entries);

export { Deco, cosmetics, deco };
