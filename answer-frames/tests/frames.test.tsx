import { expect, test } from 'claude-code/testing'

const ANSWER = { plugin: 'answer-frames', component: 'AssistantMessage', props: { text: 'Hello there.', isFirstOfReply: true } } as const
const typed = (kind: string) => ({ plugin: 'answer-frames', component: 'UserMessage', props: { text: 'check the router', origin: { kind }, isExpanded: true } }) as any

// The frame is the Box with a border, one level under the spacer Box.
function frameOf(found: any): any {
  if (!found || typeof found !== 'object') return undefined
  if (found.props?.borderStyle) return found
  for (const c of found.children ?? []) { const f = frameOf(c); if (f) return f }
  return undefined
}

// The hook here stands for the engine: it draws the row the mod wraps.
function engine(on: any) {
  on('ui.render', ($: any, e: any) => {
    const { Text } = $.ui.resolve(e)
    return <Text>engine row</Text>
  })
}

test('a reply gets a round Claude-orange frame in the terminal, row kept inside', async ($, on) => {
  engine(on)
  const ui = await $.ui.mount({ ...ANSWER, surface: 'terminal' })
  const box = frameOf(await ui.find({ type: 'Box' }))
  expect(box?.props.borderStyle).toBe('round')
  expect(box?.props.borderColor).toBe('claude')
  expect((await ui.find({ type: 'Text' }))?.text).toBe('engine row')
  await ui.unmount()
})

test('a typed prompt, a phone prompt and a resumed prompt get a blue frame', async ($, on) => {
  engine(on)
  for (const kind of ['composer', 'bridge', 'unclassified']) {
    const ui = await $.ui.mount({ ...typed(kind), surface: 'terminal' })
    const box = frameOf(await ui.find({ type: 'Box' }))
    expect(box?.props.borderColor).toBe('#5FD7FF')
    expect(await ui.find({ type: 'Text', text: /engine row/ })).toBeUndefined()
    expect((await ui.find({ type: 'Text', text: /check the router/ }))?.text).toBe('check the router')
    await ui.unmount()
  }
})

test('other messages, and every other surface, are left to the engine', async ($, on) => {
  engine(on)
  for (const kind of ['task-notification', 'peer', 'scheduled-trigger', 'auto-continuation']) {
    const ui = await $.ui.mount({ ...typed(kind), surface: 'terminal' })
    expect(await ui.find({ type: 'Box' })).toBeUndefined()
    expect((await ui.find({ type: 'Text' }))?.text).toBe('engine row')
    await ui.unmount()
  }
  const teammate = { ...typed('unclassified'), props: { ...typed('unclassified').props, from: { kind: 'teammate', name: 'x' } } }
  const summary = { ...ANSWER, props: { ...ANSWER.props, isSummary: true } }
  for (const m of [teammate, summary]) {
    const ui = await $.ui.mount({ ...m, surface: 'terminal' })
    expect(await ui.find({ type: 'Box' })).toBeUndefined()
    await ui.unmount()
  }
  for (const surface of ['desktop', 'vscode', 'mobile'] as const) {
    for (const m of [ANSWER, typed('composer')]) {
      const ui = await $.ui.mount({ ...m, surface })
      expect(await ui.find({ type: 'Box' })).toBeUndefined()
      await ui.unmount()
    }
  }
})
