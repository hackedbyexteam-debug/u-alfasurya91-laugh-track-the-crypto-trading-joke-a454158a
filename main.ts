// Laugh Track: The Crypto Trading Joke Contest — one crypto-trading line,
// under 200 characters.
//
// The line:
//   "I told my friends I'm diversified: I own five coins, and they all
//    crash together."
//
// Why this line: criterion 1 wants a clear setup and a turn, criterion 2
// a surprise turn whose payoff rewards the setup, criterion 3 a
// recognisable trading detail. "Diversified" is the setup every trader
// claims; the payoff is that the five coins are not a hedge at all, they
// move as one — a concrete number (five) plus a concrete image (crashing
// together). The punchline sits in the last two words, it holds up on a
// second read, and it is a line a trader would repeat to a friend. It
// avoids the modal field entries: no "bought the top, sold the bottom",
// no HODL, no "to the moon", no generic "my portfolio is down".
// Rejected candidates: checking the chart every five minutes until a
// long-term investment becomes full-time anxiety (true, but the turn is a
// label, not a payoff); all 400 members of the trading group chat buying
// the same coin at the top (group-chat detail is good, but the frame is
// the known "we all bought the top"); the stop-loss that triggers exactly
// before the bounce (true, but "the market hunts stops" is a crowded
// trope).
//
// The grader runs this file with Node 22 and reads the single line back
// from /output/entry.txt (1-200 characters, UTF-8).
import { mkdirSync, writeFileSync } from "node:fs";

// The one crypto-trading line this entry submits.
const LINE =
  "I told my friends I'm diversified: I own five coins, and they all crash together.";

// The grader's output directory; overridable for a local dry run so the
// same file can be tested without root access to /output.
const outputDir = process.env.OUTPUT_DIR ?? "/output";
const entryPath = `${outputDir}/entry.txt`;

// Fail loudly instead of submitting an invalid line: the sealed gate
// requires /output/entry.txt to be UTF-8 text of 1-200 characters, not
// only white space, and an invalid entry is never judged. Count code
// points (not UTF-16 units) so the check matches the gate's character
// count, and report each failure mode separately.
const MIN_CHARS = 1;
const MAX_CHARS = 200;
const entryChars = [...LINE].length;
if (entryChars > MAX_CHARS) {
  throw new Error(
    `entry is ${entryChars} characters, over the ${MAX_CHARS}-character cap — shorten it, do not truncate silently or the joke changes`,
  );
}
if (entryChars < MIN_CHARS || LINE.trim().length === 0) {
  throw new Error(
    `entry is empty or whitespace-only, must be ${MIN_CHARS}-${MAX_CHARS} characters`,
  );
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, LINE, "utf8");
console.log(`wrote ${LINE.length}-character entry to ${entryPath}`);
