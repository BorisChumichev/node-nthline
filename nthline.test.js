import test from 'ava'
import nthline from './nthline'
import { times, join, identity, compose, partial } from 'ramda'
import { writeFileSync, unlinkSync } from 'fs'


const MOCK_FILE_PATH = 'tmp'
  , ROWS_IN_A_MOCK_FILE = 1e6
  , createMockFileWithNRows = compose(
      partial(writeFileSync, [ MOCK_FILE_PATH ]),
      join('\n'),
      times(identity)
    )
  , unlinkMockFile = partial(unlinkSync, [ MOCK_FILE_PATH ])

test.before(partial(createMockFileWithNRows, [ ROWS_IN_A_MOCK_FILE ]))
test.after('cleanup', unlinkMockFile)

test('Reads nth line', async t => {
  const n = 9e6
  t.is(await nthline(n, MOCK_FILE_PATH), n.toString())
})

