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

Privacy: see [PRIVACY.md](PRIVACY.md).

## Install

```
/plugin install answer-frames --marketplace LorenzoColombani/claude-mods
```

Switch it off with `claude plugin disable answer-frames@claude-mods`. Built and tested on Claude Code 2.1.322; the mod interface is early access. MIT licensed.
