# short-version

A Claude Code mod for the terminal. After a reply of 600 characters or more, a line appears under it: **That was a long one. [ the short version ] [ hide ]**. Click the button and the same reply comes back in at most three plain sentences, shown in that line. Type `/short` to do the same for the last reply at any time.

## What it runs and sends

- Each press makes one extra call to Claude's own model, under your Claude account, with the current conversation (a fork of the session). That is the only thing it sends, and only when you press the button or type `/short`.
- It reads the session's messages to see how long the last reply was. It runs no shell commands, makes no other network calls, and stores nothing.
- In a run with nobody at the screen (`claude -p`, the SDK) it switches itself off.

Privacy: see [PRIVACY.md](PRIVACY.md).

## Install

```
/plugin install short-version --marketplace LorenzoColombani/claude-mods
```

Switch it off with `claude plugin disable short-version@claude-mods`. Built and tested on Claude Code 2.1.322; the mod interface is early access. MIT licensed.
