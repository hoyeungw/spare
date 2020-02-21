import { logger, logNeL } from '@spare/logger'
import { xr } from '@spare/xr'
import { deco } from '../src/deco'
import { simpleVectors } from '@foba/foo'
import { FobaNum } from '@foba/vector'
import { rand } from '@aryth/rand'
import { Deco } from '../src/Deco'

const Strangers = {
  empty: [],
  arithmetic: FobaNum.flop(),
  soleElement: [rand(256)],
  textNum: FobaNum.flop().map(String),
  misc: [null, undefined, NaN, 'Infinity', '+', 1.2E+1, 1.2E+2, 1.2E+3, 1.2E+4]
}

const SimpleVectors = simpleVectors({ h: 16 })

const candidates = { ...Strangers, ...SimpleVectors }

export class VectorDecoTest {
  static test () {
    for (const [key, vector] of Object.entries(candidates)) {
      xr(key) |> logger
      vector |> Deco({ head: 4, tail: 4, indexed: true }) |> logNeL
    }
  }
}

VectorDecoTest.test()