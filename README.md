# claude-mods

Two small mods for [Claude Code](https://code.claude.com) in the terminal.

## answer-frames

Draws a rounded Claude-orange frame around each of Claude's replies and a blue frame around each prompt you type, so a long session is easy to scan.

```
╭──────────────────────────────────────────────╮
│ ❯ What's the weather like for a walk?        │
╰──────────────────────────────────────────────╯

╭──────────────────────────────────────────────╮
│ ⏺ Dry until six, then light rain. Go now.    │
╰──────────────────────────────────────────────╯
```

- Terminal only: the desktop app, VS Code and the mobile app are left as they are.
- It changes the drawing only. Stored messages, transcripts and `/copy` are untouched.
- A reply that runs a tool halfway through gets one frame per piece of text, with the tool row between them.
- Selecting text with the mouse may pick up the frame edges; `/copy` gives clean text.
- Shell commands typed with `!` keep Claude Code's own look.

## short-version

After a reply of 600 characters or more, a line appears under it: **That was a long one. [ the short version ] [ hide ]**. Click the button and the same reply comes back in at most three plain sentences. `/short` does the same for the last reply at any time.

- Each press makes one extra model call (a fork over the session's own transcript), billed like any other turn.
- It does nothing in a headless run (`claude -p`).

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install answer-frames --marketplace LorenzoColombani/claude-mods
/plugin install short-version --marketplace LorenzoColombani/claude-mods
```

Answer `y` to add the marketplace, then pick a scope (user installs it for every session).

From a shell:

```
claude plugin install answer-frames --marketplace LorenzoColombani/claude-mods
claude plugin install short-version --marketplace LorenzoColombani/claude-mods
```

In a session that was already open, run `/reload-plugins`.

To switch one off: `claude plugin disable answer-frames@claude-mods` (or `short-version@claude-mods`).

## Requirements

Claude Code with hooks-module plugins (mods). Built and tested on Claude Code 2.1.322. The mod interface is marked early access, so a Claude Code update can change it.

## Develop

```
claude plugin validate answer-frames
claude plugin test answer-frames
claude --plugin-dir ./answer-frames
```

## License

MIT, see [LICENSE](LICENSE).
