import type { Register } from 'claude-code'

// Short version. When the main reply ran long, a one-line band under it offers
// the same reply in three plain sentences, shown in the band.
// No number keys: a bare digit typed into an empty composer would press a band Button,
// and a bare "1" or "2" is a common way to answer Claude's questions. Click the button,
// or type /short.

const LONG = 600 // characters of reply text that count as long
const PROMPT = 'Rewrite your last reply for the reader in at most three short sentences of plain English: everyday words, the answer first, no jargon, no file names or commands unless the reader has to type one, no bullet points. Output only the sentences.'

let pending = ''       // the long reply, while the offer stands
let short = ''         // the three sentences, once made
let busy = false
let hidden = false
let last = ''           // the last finished reply's text, kept in memory only
let off = true         // until session.start says a person is at the screen; a headless run (claude -p) stays off

function reset() { pending = ''; short = ''; busy = false; hidden = false }

async function makeShort($: any) {
  if (busy || !pending) return
  busy = true
  $.ui.invalidate('ui.render')
  try {
    const r = await $.model.fork({ prompt: PROMPT })
    short = r.isAnswered ? String(r.text).trim() : 'No short version: ' + String(r.reason ?? 'the model gave none')
  } catch (err) {
    short = 'No short version: ' + String(err).slice(0, 120)
  }
  busy = false
  $.ui.invalidate('ui.render')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    // Nobody at the screen (claude -p, the SDK): the mod stays off. The engine says so directly.
    off = !e.isInteractive
    if (off) return next(e)
    await $.command.register({ name: 'short', description: 'The last reply in three plain sentences' })
    return next(e)
  })

  on('prompt.submit', async ($, e, next) => {
    if (off) return next(e)
    reset()
    $.ui.invalidate('ui.render')
    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    const done = await next(e)
    if (off || (e as any).agentId !== undefined) return done
    // Only the reply the turn just finished, as the engine hands it over: no session history is read.
    const text = String(done?.text ?? '').trim()
    if (text) last = text
    if (text.length >= LONG) { pending = text; short = ''; hidden = false; $.ui.invalidate('ui.render') }
    return done
  })

  on('command.run', { command: 'short' }, async ($, e) => {
    if (off) return { text: 'Not in a headless run.' }
    if (!last) return { text: 'Nothing to shorten yet.' }
    pending = last; short = ''; hidden = false
    await makeShort($)
    return { text: 'SHORT: ' + short }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (off || !pending || hidden || e.props.hasSurvey || e.props.isWorking) return next(e)
    const { Box, Text, Button } = $.ui.resolve(e)
    if (busy) return (<Box><Text dimColor>Making the short version…</Text></Box>)
    if (short) {
      return (
        <Box flexDirection="column">
          <Text>{short}</Text>
          <Box>
            <Button key="hide" onPress={() => { hidden = true; $.ui.invalidate('ui.render') }}>hide</Button>
          </Box>
        </Box>
      )
    }
    return (
      <Box gap={2}>
        <Text dimColor>That was a long one.</Text>
        <Button key="make" variant="primary" onPress={() => makeShort($)}>the short version</Button>
        <Button key="skip" onPress={() => { hidden = true; $.ui.invalidate('ui.render') }}>hide</Button>
      </Box>
    )
  })
}
