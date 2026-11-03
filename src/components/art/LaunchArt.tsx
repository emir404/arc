import type { CSSProperties } from 'react'
// Each part from its own file, so the page carries only these parts' styles, not the whole kit's.
import { Stage } from '../../stageshow/kit/stage'
import { Text, Window } from '../../stageshow/kit/window'
import './art.css'

/*
  Launch: the month, as a plan's timeline. The parts run the way the launch page's month does (LAUNCH_MONTH in
  src/data/site.ts): the brand in week 1, the site and the product designed in week 2 and built in week 3, the video cut
  in week 3 and polished in week 4, and the launch in week 4, in the site's blue. The two weeks of fixes after it run on
  out of the picture. Real words only on the weeks and the parts.

  Today's line stands at launch day, the end of week 4, where the launch's bar ends: every part before it is done, the
  fixes are still ahead. When the picture plays (art.css), the line sets off from just before the first day and the
  parts fill in as it passes them; the launch lights up in the blue as the line comes to rest on launch day.
*/
const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
// `launch` ends on today's line; `after` starts a step clear of it.
const PARTS = [
  { name: 'Brand', from: 0, to: 1 },
  { name: 'Site', from: 1, to: 2.8 },
  { name: 'Product', from: 1.2, to: 3 },
  { name: 'Video', from: 2, to: 3.6 },
  { name: 'Launch', from: 3, to: 4, launch: true },
  { name: 'Fixes', from: 4, to: 6, after: true },
]
type Part = (typeof PARTS)[number]
/** Launch day, in weeks from the start: where today's line stands. */
const LAUNCH_DAY = 4

/**
 * One layer of the parts' bars, on their tracks. Only the top one, `named`, carries their names, and in it the launch
 * has a second bar, lit: the blue with its name in white, which the picture lights up as the line arrives.
 */
function Tracks({ layer, parts, named = false }: { layer: string; parts: Part[]; named?: boolean }) {
  return (
    <div className="art-launch__tracks" data-layer={layer} aria-hidden={layer !== 'names' || undefined}>
      {parts.map((part) => {
        const place = { '--from': part.from, '--to': part.to } as CSSProperties
        const flags = { 'data-launch': ('launch' in part && part.launch) || undefined, 'data-after': ('after' in part && part.after) || undefined }
        return (
          <div key={part.name} className="art-launch__track">
            <span className="art-launch__bar" {...flags} style={place}>
              {named && <Text className="art-launch__name">{part.name}</Text>}
            </span>
            {named && 'launch' in part && (
              <span className="art-launch__bar art-launch__lit" {...flags} style={place} aria-hidden>
                <Text className="art-launch__name">{part.name}</Text>
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

/**
 * The bars are drawn in layers. At the bottom, every part as planned. Over it, the parts done by launch day, shown only
 * up to today's line, so as the line moves it fills them in. On top, the parts' names, which read the same planned or
 * done, so the line's edge never runs through a word, and the launch lit.
 */
function Month() {
  return (
    <div className="art-launch__chart" style={{ '--today': LAUNCH_DAY } as CSSProperties}>
      <div className="art-launch__rules" aria-hidden />
      <div className="art-launch__head">
        {WEEKS.map((week) => (
          <Text key={week} className="art-launch__week">{week}</Text>
        ))}
      </div>
      <Tracks layer="planned" parts={PARTS} />
      {/* data-crop: it crops the parts on purpose, up to today's line. */}
      <div className="art-launch__done" data-crop aria-hidden>
        <Tracks layer="done" parts={PARTS.filter((part) => part.to <= LAUNCH_DAY)} />
      </div>
      <Tracks layer="names" parts={PARTS} named />
      <span className="art-launch__today" aria-hidden />
    </div>
  )
}

/**
 * Both designs: global.css shows the one that suits the card. Unlike the other pictures they're never scaled: the weeks
 * take the card's width (art.css), so the type stays at its own size and the card always shows the month to week 5,
 * whatever its width. The title leads the bar, as in a plan app's unified toolbar: a toolbar slot, empty, moves it to
 * the left. The wide design fills a full card; the compact one, a phone's.
 */
export default function LaunchArt() {
  return (
    <>
      <div className="art art--wide art--fluid" data-width="598" style={{ '--art-w': 598, '--art-h': 264, '--art-canvas': 598 } as CSSProperties}>
        <Stage width={598} height={264} className="art-launch">
          {() => (
            <Window title="Launch plan" toolbar={<span />} className="art-launch__window">
              <Month />
            </Window>
          )}
        </Stage>
      </div>
      <div className="art art--compact art--fluid" data-width="348" style={{ '--art-w': 348, '--art-h': 264, '--art-canvas': 500 } as CSSProperties}>
        <Stage width={500} height={264} className="art-launch art-launch--compact">
          {() => (
            <Window title="Launch plan" toolbar={<span />} className="art-launch__window">
              <Month />
            </Window>
          )}
        </Stage>
      </div>
    </>
  )
}
