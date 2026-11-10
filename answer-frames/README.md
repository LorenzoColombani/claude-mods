# answer-frames

A Claude Code mod for the terminal. It draws a rounded Claude-orange frame around each of Claude's replies and a blue frame around each prompt you type, so a long session is easy to scan.

```
╭──────────────────────────────────────────────╮
│ ❯ What's the weather like for a walk?        │
╰──────────────────────────────────────────────╯

╭──────────────────────────────────────────────╮
│ ⏺ Dry until six, then light rain. Go now.    │
╰──────────────────────────────────────────────╯
```

## What it does, and what it doesn't

- It only changes how messages are drawn in the terminal. It runs no commands, reads no files, makes no network or model calls, and stores nothing.
- Stored messages, transcripts and `/copy` are untouched. The desktop app, VS Code and the mobile app are left as they are.
- A reply that runs a tool halfway through gets one frame per piece of text, with the tool row between them.
- Selecting text with the mouse may pick up the frame edges; `/copy` gives clean text.
- Shell commands typed with `!` keep Claude Code's own look.

## Use cases

1. **Scanning a long session.** Scroll back through a morning of work and spot where each of your questions starts (blue) and each answer begins (orange) without reading every line.
2. **Screen-sharing or recording.** On a call or in a screen recording, viewers can tell at a glance who is speaking, you or Claude.
3. **Reviewing a reply that ran tools.** When Claude runs a command halfway through an answer, the frames show which text came before the tool and which came after.

## Troubleshooting

- **No frames after installing:** run `/reload-plugins` in a session that was already open, or start a new session. Check it is enabled with `claude plugin list`.
- **Frames in the wrong colours:** your terminal may show only 256 colours; the frames then use the nearest match. Most modern terminals show the exact colours.
- **Copied text has `│` at the line ends:** that is the frame. Type `/copy` to copy the last reply without it.
- **Nothing changes in the desktop app or VS Code:** by design, the mod draws in the terminal only.

Privacy: see [PRIVACY.md](PRIVACY.md).

## Install

```
/plugin install answer-frames --marketplace LorenzoColombani/claude-mods
```

Switch it off with `claude plugin disable answer-frames@claude-mods`. Built and tested on Claude Code 2.1.322; the mod interface is early access. MIT licensed.
