import { deca }            from '@spare/deco'
import { logger }          from '@spare/logger'
import { Mx }              from 'veho'
import { MatrixMargin }    from '../../../src/MatrixMargin'
import { MatrixMarginDev } from '../matriginDev'

const matrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30],
]

const prexStable = MatrixMarginDev.fromMx(Mx.clone(matrix), [2, 1], [2, 1])
const prexDev = MatrixMargin.build(Mx.clone(matrix), 2, 1, 2, 1)

prexStable.toMx('.') |> deca({ vu: 1 }) |> logger
prexDev.toMatrix('.') |> deca({ vu: 1 }) |> logger;

({
  param: [2, 2, 2, 2],
  result: MatrixMargin.build(Mx.clone(matrix), 2, 2, 2, 2).toMatrix('.')
}) |> deca({ vu: 1 }) |> logger;
({
  param: [0, 0, 0, 0],
  result: MatrixMargin.build(Mx.clone(matrix), 0, 0, 0, 0).toMatrix('.')
}) |> deca({ vu: 1 }) |> logger;
({
  param: [2, 0, 0, 2],
  result: MatrixMargin.build(Mx.clone(matrix), 2, 0, 0, 2).toMatrix('.')
}) |> deca({ vu: 1 }) |> logger;
({
  param: [0, 2, 2, 0],
  result: MatrixMargin.build(Mx.clone(matrix), 0, 2, 2, 0).toMatrix('.')
}) |> deca({ vu: 1 }) |> logger
