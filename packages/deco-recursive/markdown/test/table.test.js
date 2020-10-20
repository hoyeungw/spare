import { TableCollection } from '@foba/table'
import { says }            from '@spare/logger'
import { Markdown }        from '../src/Markdown'

const candidates = {
  // void0: null,
  void1: {},
  void2: { head: null, rows: null },
  void3: { head: [], rows: [[]] },
  table: TableCollection.flopShuffle()
}

for (let [key, table] of Object.entries(candidates)) {
  Markdown.table(table, { top: 2, bottom: 3 }) |> says[key]
}
