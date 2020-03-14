import { simpleEntries } from '@foba/foo'
import { OCEAN } from '@palett/presets'
import { delogger } from '@spare/deco'
import { says } from '@palett/says'
import { Deco } from '../index'

let SimpleEntries = simpleEntries({ h: 12 })
// SimpleEntries = { numeric: SimpleEntries.numeric }
SimpleEntries |> delogger

for (const [key, entries] of Object.entries(SimpleEntries)) {
  entries |> Deco({
    head: 5,
    tail: 2,
    stringPreset: OCEAN,
    bracket: false,
    discrete: false,
  }) |> says[key]
  // entries |> Deco({ dash: ',', delimiter: ',\n', bracket: true, quote: '\'' }) |> logger
}
