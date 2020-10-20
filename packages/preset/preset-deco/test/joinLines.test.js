import { says }      from '@palett/says'
import { deco }      from '@spare/deco'
import { joinLines } from '../index'

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

const lines = matrix.map(deco)

for (let i = 0; i < 4; i++) {
  '[' + joinLines(lines, i) + ']'|> says['level ' + i]
}

