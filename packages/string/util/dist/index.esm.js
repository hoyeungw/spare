export { pipeQuote, quoteString } from '@spare/deco-util/src/quoteString';
export { AEU, CR, ELLIP, LF, RN, SP, TB } from '@spare/enum-chars';
export { DASH, SP as SPACE } from '@spare/enum-full-angle-chars';

const noop = () => {};
/**
 *
 * @param {*} x
 * @return {string}
 */


const totx = x => `${x}`;

const isTab = c => c === '\t' || c === ' ';

const tabify = tx => {
  var _tx;

  const i = (_tx = tx, deNaTab(_tx));
  return endsBracs(tx) ? tx : `${tx.substring(0, i)}[${tx.substring(i)}]`;
};

const deNaTab = tx => {
  let i = 0;

  for (let {
    length
  } = tx; i < length; i++) if (!isTab(tx.charAt(i))) return i;

  return i;
};

const beforeNaTab = tx => tx.substring(0, deNaTab(tx));

const afterNaTab = tx => tx.substring(deNaTab(tx));

const pr = tx => '(' + tx + ')';

const br = tx => '[' + tx + ']';

const bc = tx => '{' + tx + '}';

const endsBracs = tx => tx.endsWith(')') || tx.endsWith(']');

export { afterNaTab, bc, beforeNaTab, br, deNaTab, endsBracs, isTab, noop, pr, tabify, totx };
