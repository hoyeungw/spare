import { tableToSamples }       from '@analys/convert'
import { TableCollection }      from '@foba/table'
import { FRESH, METRO, SUBTLE } from '@palett/presets'
import { deco }                 from '@spare/deco'
import { BRACKET }              from '@spare/enum-brackets'
import { logger }       from '@spare/logger'
import { _decoSamples } from '../src/_decoSamples'

const samples = TableCollection.AeroEngineSpecs |> tableToSamples
_decoSamples.call({
  top: 4,
  bottom: 4,
  left: 3,
  right: 1,
  indexed: true,
  presets: [FRESH, METRO, SUBTLE],
  bracket: BRACKET
}, samples) |> deco |> logger