import { expect, test } from 'claude-code/testing'

// The hooks here stand for the engine. A call on `$` is answered `{ value }`.
function engine(on: any, registered: string[]) {
  on('command.register', (_: any, e: any) => { registered.push(e.name); return { value: { command: e.name } } })
  on('session.start', (_: any, e: any) => ({ cwd: e.cwd }))
  on('command.run', () => ({ text: 'engine' }))
}

test('a headless run (nobody at the screen) registers no /short and the mod stays out of the way', async ($, on) => {
  const registered: string[] = []
  engine(on, registered)
  await $.session.start({ cwd: '/', surface: null, isInteractive: false })
  expect(registered).toEqual([])
  const r: any = await $.command.run({ command: 'short', args: '' } as any)
  expect(r.text).toBe('Not in a headless run.')
})

test('a session with a person at the screen registers /short', async ($, on) => {
  const registered: string[] = []
  engine(on, registered)
  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })
  expect(registered).toEqual(['short'])
})
