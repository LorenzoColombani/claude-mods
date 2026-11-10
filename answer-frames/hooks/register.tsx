import type { Register } from 'claude-code'

// Answer frames. In the terminal, each block of Claude's reply sits in a rounded
// Claude-orange frame and each prompt you typed (at the keyboard or from your phone through
// Remote Control) in a blue frame. Your prompt is drawn by the mod (a dim ❯ and the text),
// not by the engine's row, so the engine's grey highlight bar is not drawn inside the frame.
// It changes the drawing only: the stored messages, copies made with /copy, the transcript
// files and every other surface stay as they were.

const ANSWER = 'claude'   // the app's own Claude orange, from the theme
const PROMPT = '#5FD7FF'  // blue topaz (256-colour 81)

// Your own words: typed at the prompt, or sent through Remote Control from the phone.
// An unstamped row with no sender is yours too: prompts of a resumed older session.
const YOURS = new Set(['composer', 'bridge'])
const isYours = (p: { origin: { kind: string }, from?: unknown }) =>
  YOURS.has(p.origin.kind) || (p.origin.kind === 'unclassified' && p.from === undefined)

export const register: Register = on => {
  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    // A summary row keeps the engine's own drawing, so its faint \u00b7 summary mark stays.
    if (e.surface !== 'terminal' || e.props.isSummary) return next(e)
    const { Box } = $.ui.resolve(e)
    const row = await next(e)
    return (
      <Box flexDirection="column" paddingTop={1}>
        <Box flexDirection="column" borderStyle="round" borderColor={ANSWER} paddingX={1}>
          <Box flexDirection="column" marginTop={-1}>{row}</Box>
        </Box>
      </Box>
    )
  })

  on('ui.render', { component: 'UserMessage' }, async ($, e, next) => {
    if (e.surface !== 'terminal' || !isYours(e.props) || !e.props.text.trim()) return next(e)
    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box flexDirection="column" paddingTop={1}>
        <Box flexDirection="row" borderStyle="round" borderColor={PROMPT} paddingX={1}>
          <Text dimColor>❯ </Text>
          <Box flexDirection="column" flexGrow={1} flexShrink={1}>
            <Text>{e.props.text}</Text>
          </Box>
        </Box>
      </Box>
    )
  })
}
