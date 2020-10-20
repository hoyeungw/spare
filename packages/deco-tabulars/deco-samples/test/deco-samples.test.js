import { tableToSamples }  from '@analys/convert'
import { TableCollection } from '@foba/table'
import { FRESH, PLANET }   from '@palett/presets'
import { says }            from '@palett/says'
import { Deco }            from '../index'

const tableCollection = Object.assign({},
  TableCollection.flopShuffle({ h: 11, keyed: true }),
  TableCollection.flopShuffle({ h: 11, keyed: true }),
  TableCollection.flopShuffle({ h: 11, keyed: true }),
  TableCollection.flopShuffle({ h: 11, keyed: true }),
  { AgeOfEmpiresIIUnits: TableCollection.AgeOfEmpiresIIUnits }
)

// const titles = [
//   'AeroEngineSpecs',
//   'BistroDutyRoster',
//   'FrontierEconomies'
// ]

for (const [key, table] of Object.entries(tableCollection)) {
  table|> tableToSamples |> Deco({ presets: [FRESH, PLANET] }) |> says[key]
}

const samplesCollection = {
  Countries: {
    china: { gdp_ppp: 29.47, gdp: 15.27, pop: 14.00, area: 9600 },
    usa: { gdp_ppp: 20.81, gdp: 20.81, pop: 3.28, area: 9834 },
    japan: { gdp_ppp: 5.45, gdp: 5.08, pop: 1.26, area: 378 },
    eu: { gdp_ppp: 20.72, gdp: 15.62, pop: 4.48, area: 4233 },
  }
}

for (const [key, samples] of Object.entries(samplesCollection)) {
  samples |> Deco({ presets: [FRESH, PLANET] }) |> says[key]
}

