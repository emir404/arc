import type { CSSProperties, ReactNode } from 'react'
// Each part from its own file, so the page carries only these parts' styles, not the whole kit's.
import { Stage } from '../../stageshow/kit/stage'
import { Bar, Text, Window } from '../../stageshow/kit/window'
import { Avatar } from '../../stageshow/kit/parts/Avatar'
import { Check } from '../../stageshow/kit/parts/Check'
import './art.css'

/*
  Partnership: requests in the client's Slack. Ethan asks for a pricing page on Monday morning and Emir answers on Tuesday
  afternoon that it's done, inside the 24 to 36 hours the plan promises, with the page's link, and Ethan says thanks with a
  reaction. Beside the channel, the requests the team works through in order: one done, one under way, one next.

  When the picture plays (art.css), it opens on Ethan's request at the foot of the channel, under a little of its history,
  with the pricing page under way, and the rest follows: Emir's answer lands and the channel moves up for it, its link's
  preview comes a beat later, the pricing page is ticked off and the next request starts, and Ethan reacts.
*/

/*
  The workspace's name and the open channel, in its weight, above the requests card; the rest of the channels and people,
  as filler, wholly under it. Their lines stop short of the card's right edge, so none peeks out beside it.
*/
const CHANNELS = [44, 52]
const PEOPLE = [46, 40]

function Sidebar() {
  return (
    <div className="art-chat__side">
      <Text className="art-chat__workspace">Flashnet</Text>
      <div className="art-chat__channel">
        <span className="art-chat__hash">#</span>
        <Text className="art-chat__channel-name">arc</Text>
      </div>
      <div className="art-chat__group art-chat__more">
        {CHANNELS.map((w, i) => (
          <div key={i} className="art-chat__channel">
            <span className="art-chat__hash">#</span>
            <Bar w={w} h={5} tone={3} />
          </div>
        ))}
      </div>
      <div className="art-chat__group">
        {PEOPLE.map((w, i) => (
          <div key={i} className="art-chat__channel">
            <Avatar plain size={10} />
            <Bar w={w} h={5} tone={3} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Message({ name, photo, time, text, className, children }: { name: string; photo?: string; time: string; text: string; className?: string; children?: ReactNode }) {
  return (
    <div className={`art-chat__message${className ? ` ${className}` : ''}`}>
      <Avatar name={name} src={photo} size={26} className="art-chat__avatar" />
      <div className="art-chat__words">
        <div className="art-chat__byline">
          <Text className="art-chat__name">{name}</Text>
          <Text className="art-chat__time">{time}</Text>
        </div>
        <Text wrap className="art-chat__text">{text}</Text>
        {children}
      </div>
    </div>
  )
}

/** An earlier message, as filler: a plain avatar, and bars for the name and the words, a line apart as real ones are. */
function Earlier({ name, line }: { name: number; line: number }) {
  return (
    <div className="art-chat__message">
      <Avatar plain size={26} className="art-chat__avatar" />
      <div className="art-chat__words">
        <div className="art-chat__byline art-chat__byline--filler">
          <Bar w={name} h={6} tone={4} />
        </div>
        <div className="art-chat__line">
          <Bar w={line} h={5} tone={3} />
        </div>
      </div>
    </div>
  )
}

/**
 * The channel's feed, in a pane that crops it under the bar: the messages before Ethan's sit above the pane's top, out of
 * sight, until the picture plays and opens on them (art.css).
 *
 * `reaction`: Ethan's thanks under Emir's answer, drawn as Slack draws a reaction of your own (it's the client's Slack):
 * outlined in blue, with its count. Only the wide design has the room; on a phone's card the requests card sits where it would go.
 */
function Channel({ reaction = false }: { reaction?: boolean }) {
  return (
    <div className="art-chat__pane" data-crop>
      <div className="art-chat__feed">
        <div className="art-chat__history" aria-hidden>
          <Earlier name={54} line={176} />
          <Earlier name={44} line={232} />
          <Earlier name={54} line={148} />
        </div>
        <Message name="Ethan Marcus" photo="/art/ethan-marcus.webp" time="Mon 10:04 AM" text="Can we get a pricing page for the new plan?" />
        <Message name="Emir Ayaz" photo="/art/emir-ayaz.webp" time="Tue 2:31 PM" text="Done, it’s on staging for review." className="art-chat__reply">
          {/* The link's preview, as Slack unfurls one: the site's name, and the page's title as the link, in the accent. */}
          <div className="art-chat__unfurl">
            <Text className="art-chat__site">Flashnet</Text>
            <Text className="art-chat__link">Pricing</Text>
          </div>
          {/* data-emoji: the emoji is the message's content, a reaction, not an icon standing in for one. */}
          {reaction && (
            <span className="art-chat__reaction" data-emoji>
              <span className="art-chat__emoji">🙌</span>
              <span className="art-chat__count">1</span>
            </span>
          )}
        </Message>
      </div>
    </div>
  )
}

/**
 * The requests, worked through in order: one done, one under way, one next. `data-request` names what each one does
 * when the picture plays: the pricing page goes from under way to done, and the onboarding emails start.
 */
function Requests() {
  return (
    <div className="art-chat__requests">
      <Text className="art-chat__requests-title">Requests</Text>
      <div className="art-chat__request" data-request="done">
        <Check on size={14} />
        <Text className="art-chat__request-name">Pricing page</Text>
      </div>
      <div className="art-chat__request" data-request="started">
        <Check on={false} pending size={14} />
        <Text className="art-chat__request-name">Onboarding emails</Text>
      </div>
      <div className="art-chat__request">
        <Check on={false} size={14} />
        <Text className="art-chat__request-name">Investor deck</Text>
      </div>
    </div>
  )
}

/**
 * Both designs: global.css shows the one that suits the card, and Pricing.astro scales it to the card's width.
 *
 * Wide: the channel with its sidebar, Ethan's reaction, and the requests card over the sidebar. Compact, drawn for a
 * 348px card and never enlarged: the channel alone in a narrow window, running on to the right on a wider phone (its
 * canvas is 500 wide), and the requests card straddling the window's foot. The channel's name leads the window's bar
 * there, as in a narrow Slack window: a toolbar slot, empty, moves the title to the left.
 */
export default function PartnershipArt() {
  return (
    <>
      <div className="art art--wide" data-width="598" style={{ '--art-w': 598, '--art-h': 264, '--art-canvas': 598 } as CSSProperties}>
        <Stage width={598} height={264} className="art-chat">
          {() => (
            <>
              <Window title="# arc" sidebar={<Sidebar />} sidebarWidth={136} className="art-chat__window">
                <Channel reaction />
              </Window>
              <Requests />
            </>
          )}
        </Stage>
      </div>
      <div className="art art--compact" data-width="348" style={{ '--art-w': 348, '--art-h': 338, '--art-canvas': 500 } as CSSProperties}>
        <Stage width={500} height={338} className="art-chat art-chat--compact">
          {() => (
            <>
              <Window title="# arc" toolbar={<span />} className="art-chat__window">
                <Channel />
              </Window>
              <Requests />
            </>
          )}
        </Stage>
      </div>
    </>
  )
}
