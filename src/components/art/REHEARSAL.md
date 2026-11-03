# Rehearsal: pricing pictures (LaunchArt, PartnershipArt)

Pictures on top of the pricing cards (`src/components/Pricing.astro`), on the main, YC, speedrun and launch pages.
Built with the stageshow skill's kit and rendered to HTML at build time; no React in the browser. The motion is CSS
keyframes (`art.css`, transforms and opacity only), started by a few lines in `Pricing.astro`.

Gold:
- Launch: `calendar` (a plan app's window over a grid of time, corner bleed, one item in the accent). Kept the corner
  bleed with one gutter, the faint column rules and one accent item; changed the grid to a timeline whose bars are
  Launch's parts, with today's line in the blue resting on the end of the launch's bar: the parts before it done, the
  fixes after it planned.
- Partnership: `static-card` (a window pinned at the top with a satellite over its sidebar, a gutter from the left and
  the bottom). Kept the composition, the satellite's place and depth, and real words only where the story is; changed
  the product to a Slack channel (the request, and the reply about 28 hours later with the page's link unfurled, its
  title in the accent, and the client's reaction) and the satellite to the requests queue (done, under way, next).
  A fuller Slack (the bar with the search, the rail, tabs, day dividers) was built and turned down as too busy.

Beats, each played once as the picture scrolls into view (most of it in view), never on load:
- Launch, 4.9s: today's line sets off from just before the first day (0.5s) and crosses the month at an even pace,
  the parts filling in as it passes them, the launch in a tint of the blue; as it settles on launch day the launch
  lights up in the blue, its name in white (4.6s to 4.85s). The fixes stay planned.
- Partnership, 4.3s: opens on Maya's request at the foot of the channel under some of its history, the pricing page
  under way; Emir's answer lands and the feed moves up for it (1.2s); the link's preview (1.9s); the pricing page
  ticked off (2.5s) and its name steps back; the onboarding emails start (3.2s); Maya reacts (3.9s).
- Poster (reduced motion, print, no script, or already in view as the page opens): the last frame of each.
- Scrolled out of sight before it's over, a picture goes back to its first frame unseen and plays again when it's
  back; over, it's a still again (the kit's `data-still` goes back on).

Designs: Launch, wide and compact, is laid out for the card rather than scaled to it: its weeks take the card's
width (4.65 weeks across the wide design, 5.1 across the compact, so week 5 always shows whole and week 6 starts past
the crop), and its type stays at its own size at every width. Partnership wide 598 × 264, compact 500 × 338 (the
requests card straddling the window's foot), which Pricing.astro scales down on a narrower card and never up: a wider
phone card shows more of the canvas instead.

Captured: still gate (`--still --gate --reduced`) at 1280, 580, 460, 390, 360 and 320 (Launch also at 540 and 430); motion films (`--gate`) of both
wide designs at 1280 and both compact designs at 390; exact frames by pausing and seeking the animations over CDP;
the last frame of the motion against the still it hands over to; the rewind (scroll away mid-story and back).

Film: `rehearsal passed` on every run above. Lines left, each looked at:
- `jump:` and `vanishes with no exit:` at 0.05–0.07s: the picture being armed (put on its first frame) while it's
  out of view, below the fold; film records geometry whether or not it can be seen.
- `hard edge:` on the Launch bars: the done fills are cut by the edge that fills them in, under today's line. No
  name is: the names sit above the fills and never change.
- `hard edge:` on the earlier messages' avatar and bars: they slide up under the window's bar, its own edge, as a
  channel's history does.
- The hand-over from motion to still matches but for anti-aliasing a few levels off: the requests card's icons and
  done name, and a few pixels of Launch's line; no geometry moves.
- Marked: `data-crop` on the done parts' box (it crops them up to today's line on purpose) and on the feed's pane;
  `data-emoji` on the reaction (its emoji is content, not an icon).

Review (fresh eye, Launch, after the motion) → response:
1. The compact showed blank, unlabeled weeks past week 5 on wider phones (21px at 390 to three weeks at 540) → the
   weeks take the card's width, 5.1 across at any width.
2. The compact's fixes ran one week, the card says two → two weeks, running off the edge as in the wide design.
3. "Launch" was two colors for about 280ms as the fill crossed it → the names sit above the fills; the launch fills in a
   tint, under its blue name, and lights up whole as the line lands.
4. Today's line rested 1 to 3px from the bars → it starts 8px before the first day, and rests on the end of the
   launch's bar, squared to it, with the fixes starting 8px clear.
5. Type under 10px wherever a design was scaled down → Launch is never scaled now (10.5px at 320). Partnership still is:
   0.80 at a 320 window, 0.84 to 1 on cards 500 to 598 wide (not re-reviewed).
Left as is: the gold marks today in its header and Launch doesn't (the line and the lit launch say it); the arming at
first sight, out of view.
Earlier, Partnership's review (fresh eye, before the motion) asked for real words on the payoff and the requests card
on phones, both done; it wasn't reviewed again after the motion.

Assumptions:
- Plays once, on scroll: the project's CLAUDE.md asks for input-driven motion with no autoplay.
- The client is fictional (Maya Kim of Northwind); Emir answers, as the site promises Emir and Omer on every project.
  The other channels and the earlier messages are bars.
- Monday 10:04 AM to Tuesday 2:31 PM is about 28 hours, inside the 24 to 36 the plan promises.

Unresolved: none known.

Not checked: Safari and Firefox (only Chromium here; `var()` inside keyframes and `getAnimations({ subtree })` are
in both); live frame pacing on a real device or with CPU throttling; the kit's dark theme (the site has none).
