# short-version

A Claude Code mod for the terminal. After a reply of 600 characters or more, a line appears under it: **That was a long one. [ the short version ] [ hide ]**. Click the button and the same reply comes back in at most three plain sentences, shown in that line. Type `/short` to do the same for the last reply at any time.

## What it runs and sends

- Each press makes one extra call to Claude's own model, under your Claude account, with the current conversation (a fork of the session). That is the only thing it sends, and only when you press the button or type `/short`.
- It looks only at the reply Claude has just finished, to see how long it was; it does not read the session's history. It runs no shell commands, makes no other network calls, and stores nothing on disk.
- In a run with nobody at the screen (`claude -p`, the SDK) it switches itself off.

## Use cases

1. **A long technical answer.** Claude explains a fix in twenty lines; press the button to get the gist in three sentences before deciding whether to read the rest.
2. **Coming back to a session.** Type `/short` to be reminded in three sentences of what the last reply said.
3. **Explaining to someone else.** Turn a detailed reply into three plain sentences you can pass on to a colleague who doesn't use the terminal.

## Troubleshooting

- **No band after a long reply:** the band shows only after replies of 600 characters or more, and only in a session with a person at the screen. Run `/reload-plugins` after installing, or start a new session.
- **"Nothing to shorten yet.":** no reply has finished since the session started or the mod was reloaded. Ask something first.
- **"No short version: …":** the model call failed (for example a usage limit or a lost connection). Press the button again later.
- **The band covers something you need:** press **hide**; it comes back after the next long reply.

Privacy: see [PRIVACY.md](PRIVACY.md).

## Install

```
/plugin install short-version --marketplace LorenzoColombani/claude-mods
```

Switch it off with `claude plugin disable short-version@claude-mods`. Built and tested on Claude Code 2.1.322; the mod interface is early access. MIT licensed.
