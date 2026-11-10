# Privacy: short-version

short-version collects and stores no personal data, and sends nothing to any service other than Claude itself.

When you press **the short version** or type `/short`, it asks Claude's own model, under your Claude account, for a three-sentence version of the last reply. Like any Claude Code turn, that request carries the current conversation, and it is handled under the terms of your Claude account. Nothing is sent at any other time.

To decide when a reply is long, it reads the session's messages on your machine. It keeps only the last long reply and its short version in memory, until your next prompt, and writes nothing to disk. It runs no shell commands and makes no other network calls.

Questions: open an issue at https://github.com/LorenzoColombani/claude-mods/issues
