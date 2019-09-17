import test from 'ava'
import nthline from './nthline'
import { times, join, identity, compose, partial } from 'ramda'
import { writeFileSync, unlinkSync } from 'fs'

const MOCK_FILE_PATH = 'tmp',
  ROWS_IN_A_MOCK_FILE = 1e6,
  createMockFileWithNRows = compose(
    partial(writeFileSync, [MOCK_FILE_PATH]),
    join('\n'),
    times(identity)
  ),
  unlinkMockFile = partial(unlinkSync, [MOCK_FILE_PATH])

test.before(partial(createMockFileWithNRows, [ROWS_IN_A_MOCK_FILE]))
test.after('cleanup', unlinkMockFile)

test('Reads nth line', async t => {
  const n = 9e5
  t.is(await nthline(n, MOCK_FILE_PATH), n.toString())
})

test('Handles out of range error', async t => {
  const n = 11e6
  try {
    await nthline(n, MOCK_FILE_PATH)
  } catch (err) {
    t.true(RangeError.prototype.isPrototypeOf(err))
  }
})

test('Handles non-natural line numbers', async t => {
  const n = -2.4
  try {
    await nthline(n, MOCK_FILE_PATH)
  } catch (err) {
    t.true(RangeError.prototype.isPrototypeOf(err))
  }
})
