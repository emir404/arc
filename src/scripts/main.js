(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // sounds.js is optional: without it the page is simply silent.
  function sound(name) {
    if (window.arcSound) window.arcSound.play(name);
  }

  // Hover sounds are for a mouse pointer only; a finger has no hover.
  function addSounds(selector, hoverName, selectName) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), function (el) {
      el.addEventListener("pointerenter", function (event) {
        if (event.pointerType === "mouse") sound(hoverName);
      });
      el.addEventListener("click", function () {
        sound(selectName);
      });
    });
  }

  // Highlighter strokes swipe in the first time each one scrolls into view.
  var markers = Array.prototype.slice.call(document.querySelectorAll(".marker"));
  if ("IntersectionObserver" in window) {
    var markerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          markerObserver.unobserve(entry.target);
        });
      },
      { threshold: 1 }
    );
    markers.forEach(function (marker) {
      markerObserver.observe(marker);
    });
  } else {
    markers.forEach(function (marker) {
      marker.classList.add("is-in");
    });
  }

  addSounds(".sidebar__link", "nav-hover", "nav-select");
  addSounds(".button, .text-link", "cta-hover", "cta-select");

  // On a phone or tablet the site's own pages open in the same tab, so Back comes back to the page you left.
  // A computer keeps opening them in new tabs, and other sites open in new tabs everywhere.
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    Array.prototype.forEach.call(document.querySelectorAll('a[target="_blank"]'), function (link) {
      if (link.origin === location.origin) link.removeAttribute("target");
    });
  }

  /* ---------- Works strip ---------- */

  /*
    The covers switch the way they do in the reference video (9-16.mp4), measured frame by frame, only
    quicker. In the video each cover takes 1850ms on cubic-bezier(0.38, 0, 0, 1): a slow start, a quick
    middle and a long, soft landing. Each one sets off 50ms after the cover ahead of it in the direction
    of travel, so the gaps stretch while the row moves and close up as it lands. The ring never moves,
    and the name under it rolls over once the covers are under way.

    At the video's own speed a switch felt slow on the page, so PACE scales every one of those timings
    alike: the motion keeps its shape and its stagger, just played faster.

    A click, the arrow keys, a drag or swipe and a sideways trackpad scroll all go through that same
    motion, so the row is moved here with transforms rather than scrolled.
  */
  var PACE = 0.4; // 1 plays the video's timings as measured; lower is quicker
  var SWITCH_MS = 1850 * PACE;
  var EASE = [0.38, 0, 0, 1];
  var EASE_CSS = "cubic-bezier(" + EASE.join(", ") + ")";
  var STAGGER_MS = 50 * PACE;
  var MAX_LAG_MS = 4 * STAGGER_MS; // the fifth cover back and everything behind it trail by the same amount
  var LAG_EASE_MS = 110 * PACE; // when the lead changes mid-move, each cover eases to its new lag on this time scale
  var NAME_MS = 720 * PACE; // the name rolls on the same curve, in this long,
  var NAME_DELAY_MS = 215 * PACE; // starting this long after the first cover sets off

  var strip = document.querySelector(".strip");
  var track = document.querySelector(".track");
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var label = document.querySelector(".frame__label");
  var names = document.querySelector(".frame__names");

  var step = 0; // distance between two slide centres
  var index = 0; // the work in the frame, or on its way there
  var position = 0; // how far along the leading cover has the row: index × step once it is still
  var move = null; // the switch under way
  var history = []; // [time, position] pairs, for the covers that trail the leading one
  var lags = []; // how far each slide trails the leading cover, in ms
  var lagTargets = [];
  var lagRates = []; // how fast each lag is changing on its way to its target
  var heading = 0; // which way the row is moving: 1 towards the next work, -1 back
  var lastPosition = 0;
  var lastMoved = 0; // when the leading cover last moved
  var lastTick = 0;
  var pendingFrame = 0;
  var placed = []; // each slide's last transform, so unchanged ones aren't written again
  var shown = 0; // the work whose name is on the label
  var nameTimer = 0;
  var rolls = 0; // counts name rolls, so a finished one can tell whether a newer one has taken over

  function clampIndex(i) {
    return Math.max(0, Math.min(slides.length - 1, i));
  }

  // From the layout, which the transforms don't change: a slide's width plus the gap.
  function measure() {
    return slides[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
  }

  // CSS's cubic-bezier() as a function of time from 0 to 1. Its slope carries the row's speed into a new move.
  function cubicBezier(x1, y1, x2, y2) {
    var ax = 3 * x1 - 3 * x2 + 1;
    var bx = 3 * x2 - 6 * x1;
    var cx = 3 * x1;
    var ay = 3 * y1 - 3 * y2 + 1;
    var by = 3 * y2 - 6 * y1;
    var cy = 3 * y1;

    function x(u) {
      return ((ax * u + bx) * u + cx) * u;
    }
    function y(u) {
      return ((ay * u + by) * u + cy) * u;
    }
    function dx(u) {
      return (3 * ax * u + 2 * bx) * u + cx;
    }
    function dy(u) {
      return (3 * ay * u + 2 * by) * u + cy;
    }

    // The point on the curve at time t: Newton's method, falling back to halving where the curve is too flat for it.
    function solve(t) {
      var u = t;
      for (var i = 0; i < 8; i++) {
        var error = x(u) - t;
        if (Math.abs(error) < 1e-7 && u >= 0 && u <= 1) return u;
        var slope = dx(u);
        if (Math.abs(slope) < 1e-7) break;
        u -= error / slope;
      }
      var low = 0;
      var high = 1;
      u = t;
      for (var j = 0; j < 40; j++) {
        if (x(u) < t) low = u;
        else high = u;
        u = (low + high) / 2;
      }
      return u;
    }

    return {
      value: function (t) {
        return t <= 0 ? 0 : t >= 1 ? 1 : y(solve(t));
      },
      slope: function (t) {
        var u = solve(Math.max(0, Math.min(1, t)));
        var run = dx(u);
        return run > 1e-7 ? dy(u) / run : 0;
      },
    };
  }

  // One switch: the leading cover from `from` to `to` on the video's curve, starting at `start`. A row that
  // is already moving (a throw, a second click) carries its speed in: the curve's first handle tilts to match
  // it, so the row never stops dead before setting off again.
  function makeMove(from, to, start, speed) {
    var distance = to - from;
    var x1 = EASE[0];
    var y1 = EASE[1];
    if (speed && distance) {
      var tilt = (speed * SWITCH_MS) / distance; // the starting slope that matches the speed
      // The steeper the tilt, the shorter the handle, which keeps the swing past the target small. It never gets
      // shorter than a tenth of the move, so even a fast row turning back brakes over 100ms or more, never dead.
      x1 = Math.max(0.1, Math.min(x1, 1 / Math.abs(tilt)));
      y1 = tilt * x1;
    }
    var ease = cubicBezier(x1, y1, EASE[2], EASE[3]);
    return {
      to: to,
      start: start,
      at: function (time) {
        return from + distance * ease.value((time - start) / SWITCH_MS);
      },
      speed: function (time) {
        return (distance / SWITCH_MS) * ease.slope((time - start) / SWITCH_MS);
      },
      done: function (time) {
        return time - start >= SWITCH_MS;
      },
    };
  }

  // The leading cover's path, kept as far back as the cover furthest behind it needs.
  function remember(time) {
    var last = history[history.length - 1];
    if (last && time <= last[0]) {
      last[1] = position;
    } else {
      history.push([time, position]);
    }
    while (history.length > 2 && history[1][0] <= time - MAX_LAG_MS - 20) history.shift();
  }

  // Where the leading cover was at a given time: exact from the curve during the current move, otherwise
  // read off its path between frames.
  function positionAt(time) {
    if (move && time >= move.start) return move.at(time);
    var last = history[history.length - 1];
    if (!last || time >= last[0]) return last ? last[1] : position;
    for (var k = history.length - 1; k > 0; k--) {
      var a = history[k - 1];
      if (a[0] <= time) {
        var b = history[k];
        return a[1] + ((b[1] - a[1]) * (time - a[0])) / (b[0] - a[0]);
      }
    }
    return history[0][1];
  }

  // Ranks the covers for a move heading one way from slide `from`: the cover just ahead of the one in the frame
  // leads, and each one behind it sets off STAGGER_MS later. At either end of the row nothing is ahead, so the
  // cover in the frame leads. Heading nowhere (a drag), they all move as one.
  function setLags(towards, from, instant) {
    var ranks = slides.map(function (slide, i) {
      return towards > 0 ? i - from + 1 : towards < 0 ? from + 1 - i : 0;
    });
    var first = Math.max(0, Math.min.apply(null, ranks));
    lagTargets = ranks.map(function (rank) {
      return Math.min(Math.max(rank - first, 0) * STAGGER_MS, MAX_LAG_MS);
    });
    if (!instant) return;
    lags = lagTargets.slice();
    lagRates = lagTargets.map(function () {
      return 0;
    });
  }

  // Still, and every cover has caught up with the leading one.
  function isStill(time) {
    return !move && !drag.active && time - lastMoved > MAX_LAG_MS;
  }

  // Sends the row to slide i. After a drag, `speed` is how fast it was moving when let go (px/ms, positive
  // towards the next work), and the name catches up at once rather than after NAME_DELAY_MS.
  function go(i, speed, nameDelay) {
    if (drag.active) return;
    i = clampIndex(i);
    var now = performance.now();
    var still = isStill(now);
    if (move) {
      position = move.at(now);
      if (speed === undefined) speed = move.speed(now);
    }
    remember(now);

    var target = i * step;
    var towards = target > position ? 1 : target < position ? -1 : 0;
    if (reduceMotion) {
      move = null;
      position = target;
      setLags(0, 0, true);
    } else {
      // From a standstill the covers line up for the stagger at once. Mid-move, tick re-ranks them if and
      // when the row turns round.
      if (still) {
        heading = towards;
        setLags(towards, clampIndex(Math.round(position / step)), true);
      }
      move = Math.abs(target - position) < 0.5 && !speed ? null : makeMove(position, target, now, speed || 0);
      if (!move) position = target;
    }

    if (i !== index) {
      index = i;
      slides.forEach(function (slide, k) {
        slide.classList.toggle("is-current", k === i);
      });
      keepInHistory();
    }
    showName(i, reduceMotion ? 0 : nameDelay === undefined ? NAME_DELAY_MS : nameDelay);
    wake();
  }

  // The page's history entry keeps the work in the frame, so coming back to the page (Back from a project page)
  // finds the same one there, even when the browser has to load the page again. (window.history, as `history`
  // here is the row's path.)
  function keepInHistory() {
    try {
      var state = window.history.state && typeof window.history.state === "object" ? window.history.state : {};
      window.history.replaceState(Object.assign({}, state, { work: slides[index].getAttribute("data-name") }), "");
    } catch (error) {
      // Safari limits how often a page may do this; the next change tries again.
    }
  }

  function wake() {
    if (pendingFrame) return;
    lastTick = performance.now();
    pendingFrame = requestAnimationFrame(tick);
  }

  function tick(time) {
    pendingFrame = 0;
    var elapsed = Math.min(Math.max(time - lastTick, 0), 50);
    lastTick = time;
    if (move) {
      position = move.at(time);
      // The cover ahead in the direction of travel leads. When the row turns round (a throw let go the other
      // way, a second click back), the order flips as it turns, while everything is moving slowest.
      var speed = move.speed(time);
      var towards = speed > 0.05 ? 1 : speed < -0.05 ? -1 : 0;
      if (towards && towards !== heading) {
        heading = towards;
        setLags(towards, clampIndex(Math.round(position / step)), false);
      }
      if (move.done(time)) {
        position = move.to;
        move = null;
      }
    }
    if (position !== lastPosition) {
      lastPosition = position;
      lastMoved = time;
    }
    remember(time);

    var busy = move || drag.active || time - lastMoved <= MAX_LAG_MS + 50;
    // A cover whose lag changes gets there like a critically damped spring: its pace eases off or picks up,
    // never lurches, and never falls below a third of the leading cover's.
    var w = 1 / LAG_EASE_MS;
    var decay = Math.exp(-w * elapsed);
    for (var i = 0; i < slides.length; i++) {
      var off = lags[i] - lagTargets[i];
      var rate = lagRates[i];
      if (!off && !rate) continue;
      if (Math.abs(off) < 0.05 && Math.abs(rate) < 1e-4) {
        lags[i] = lagTargets[i];
        lagRates[i] = 0;
        continue;
      }
      var pull = rate + w * off;
      lags[i] = lagTargets[i] + (off + pull * elapsed) * decay;
      lagRates[i] = (rate - w * pull * elapsed) * decay;
      busy = true;
    }
    render(time);
    if (busy) pendingFrame = requestAnimationFrame(tick);
  }

  // Each slide sits where the leading cover was its lag ago, and fades with its distance from the frame.
  function render(time) {
    slides.forEach(function (slide, i) {
      var at = lags[i] > 0 ? positionAt(time - lags[i]) : position;
      var x = (-at).toFixed(2);
      if (placed[i] === x) return;
      placed[i] = x;
      slide.style.transform = "translate3d(" + x + "px, 0, 0)";
      slide.style.setProperty("--d", Math.min(Math.abs(i * step - at) / step, 1).toFixed(3));
    });
  }

  /* The name under the frame */

  function showName(i, delay) {
    clearTimeout(nameTimer);
    if (delay) {
      nameTimer = setTimeout(function () {
        showName(i, 0);
      }, delay);
      return;
    }
    if (i === shown) return;
    var towards = i > shown ? 1 : -1;
    shown = i;
    sound("work-change");
    rollName(slides[i].getAttribute("data-name"), towards);
  }

  // How far a name has got up or down, mid-roll.
  function currentY(el) {
    var transform = getComputedStyle(el).transform;
    if (!transform || transform === "none") return 0;
    var values = transform.slice(transform.indexOf("(") + 1, -1).split(",");
    return parseFloat(values[values.length === 16 ? 13 : 5]) || 0;
  }

  function cancelAnimations(el) {
    el.getAnimations().forEach(function (animation) {
      animation.cancel();
    });
  }

  // The old name slides up and out of the label's window as the new one comes up from below (the other way when
  // going back), and the label eases from one name's width to the other's. A roll cut short by the next one
  // sends its names on out from wherever they have got to, or brings one back if it is the name wanted again.
  function rollName(text, towards) {
    if (!names) {
      label.textContent = text;
      return;
    }
    var incoming = document.createElement("span");
    incoming.className = "frame__name";
    incoming.textContent = text;
    if (reduceMotion || !names.animate) {
      names.replaceChildren(incoming);
      return;
    }

    var leaving = Array.prototype.slice.call(names.children);
    var fromWidth = names.getBoundingClientRect().width;
    var offsets = leaving.map(currentY);
    var travel = names.offsetHeight * 1.25; // a little more than the window, so each name is fully out of sight
    var startY = towards * travel;
    cancelAnimations(names);
    leaving.forEach(cancelAnimations);
    names.classList.add("is-rolling");
    var back = leaving.findIndex(function (el) {
      return el.textContent === text;
    });
    if (back >= 0) {
      incoming = leaving.splice(back, 1)[0];
      startY = offsets.splice(back, 1)[0];
    } else {
      names.appendChild(incoming);
    }
    var toWidth = incoming.getBoundingClientRect().width;
    var timing = { duration: NAME_MS, easing: EASE_CSS, fill: "forwards" };

    names.animate([{ width: fromWidth + "px" }, { width: toWidth + "px" }], timing);
    leaving.forEach(function (el, k) {
      el.animate([{ transform: "translateY(" + offsets[k] + "px)" }, { transform: "translateY(" + -towards * travel + "px)" }], timing);
    });
    var roll = ++rolls;
    incoming.animate([{ transform: "translateY(" + startY + "px)" }, { transform: "translateY(0)" }], timing).finished.then(
      function () {
        if (roll !== rolls) return;
        leaving.forEach(function (el) {
          el.remove();
        });
        names.classList.remove("is-rolling");
        cancelAnimations(names);
        cancelAnimations(incoming);
      },
      function () {
        // Cancelled by a newer roll, which takes over from here.
      }
    );
  }

  /* Dragging, clicking, keys and the trackpad */

  // Mouse, finger or pen. The row follows the pointer exactly; let go, it carries on to the next cover or
  // settles back, depending on how far and how fast it was thrown.
  var drag = {
    id: null,
    active: false,
    moved: false,
    downAt: 0,
    startX: 0,
    startY: 0,
    grabX: 0,
    grabPosition: 0,
    startPosition: 0,
    from: 0,
    trail: [],
    pressed: null,
  };

  // Past either end the row gives less and less, like a rubber band.
  function rubberBand(p) {
    var end = (slides.length - 1) * step;
    if (p >= 0 && p <= end) return p;
    var over = p < 0 ? -p : p - end;
    var give = step * (1 - 1 / ((over * 0.55) / step + 1));
    return p < 0 ? -give : end + give;
  }

  // The reverse, so a row caught while it springs back from past an end doesn't jump.
  function unstretch(p) {
    var end = (slides.length - 1) * step;
    if (p >= 0 && p <= end) return p;
    var give = Math.min(p < 0 ? -p : p - end, step * 0.99);
    var over = (step / 0.55) * (1 / (1 - give / step) - 1);
    return p < 0 ? -over : end + over;
  }

  // The cover in the frame sinks a little under a press, until the press turns into a drag or lets go.
  function press(slide) {
    if (drag.pressed) drag.pressed.classList.remove("is-pressed");
    drag.pressed = slide || null;
    if (slide) slide.classList.add("is-pressed");
  }

  // A new press replaces one still waiting to become a drag (its release may have landed outside the row).
  function onPointerDown(event) {
    if (drag.active || (event.pointerType === "mouse" && event.button !== 0)) return;
    drag.id = event.pointerId;
    drag.active = false;
    drag.moved = false;
    drag.downAt = performance.now();
    drag.startX = event.clientX;
    drag.startY = event.clientY;
    press(event.target.closest(".slide.is-current"));
  }

  function startDrag(event) {
    var now = performance.now();
    if (move) {
      // Catch the row where it is.
      position = move.at(now);
      move = null;
    }
    remember(now);
    press(null);
    drag.active = true;
    drag.moved = true;
    drag.grabX = event.clientX;
    drag.grabPosition = unstretch(position);
    drag.startPosition = position;
    // The cover the row is on, or on its way to: a second swipe while the row is still moving carries on from there.
    drag.from = index;
    drag.trail = [[now, position]];
    // Under the pointer the covers close up and move as one; the stagger comes back when it lets go.
    heading = 0;
    setLags(0, 0, false);
    track.classList.add("is-dragging");
    try {
      track.setPointerCapture(event.pointerId);
    } catch (error) {
      // Capture is a nicety (keeps the drag alive outside the row); dragging works without it.
    }
  }

  function onPointerMove(event) {
    if (event.pointerId !== drag.id) return;
    if (!drag.active) {
      // The button went up somewhere else: this is just the mouse passing over.
      if (event.pointerType === "mouse" && !(event.buttons & 1)) {
        drag.id = null;
        return;
      }
      var dx = event.clientX - drag.startX;
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(event.clientY - drag.startY)) return;
      startDrag(event);
    }
    position = rubberBand(drag.grabPosition - (event.clientX - drag.grabX));
    var now = performance.now();
    drag.trail.push([now, position]);
    while (drag.trail.length > 2 && drag.trail[0][0] < now - 100) drag.trail.shift();
    // While dragging, the name follows whichever cover is nearest the frame.
    showName(clampIndex(Math.round(position / step)), 0);
    wake();
  }

  function onPointerUp(event) {
    if (event.pointerId !== drag.id) return;
    drag.id = null;
    press(null);
    if (!drag.active) return;
    drag.active = false;
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    // The speed over the last tenth of a second; a pointer held still before letting go throws nothing.
    var now = performance.now();
    var released = event.type === "pointerup";
    var speed = 0;
    var first = drag.trail[0];
    var last = drag.trail[drag.trail.length - 1];
    if (released && now - last[0] < 80 && last[0] > first[0]) {
      speed = (last[1] - first[1]) / (last[0] - first[0]);
    }
    // A swipe is a throw, or a quick flick of a thumb, which may be short and end slowly. It moves one cover on
    // from where the row was heading; thrown back against the drag, it cancels it. A slow drag settles on the
    // nearest cover. One cover at most either way.
    var travelled = position - drag.startPosition;
    var drawn = travelled > 0 ? 1 : -1;
    var flick = released && now - drag.downAt < 300 && Math.abs(travelled) > Math.min(30, step * 0.1);
    var thrown = Math.abs(speed) > 0.2 ? (speed > 0 ? 1 : -1) : flick ? drawn : 0;
    var target = !thrown ? Math.round(position / step) : thrown === drawn ? drag.from + thrown : drag.from;
    go(Math.max(drag.from - 1, Math.min(drag.from + 1, target)), speed, 0);
  }

  // While the row follows a finger sideways, the page mustn't start scrolling up or down under it (Safari would).
  function onTouchMove(event) {
    if (drag.active && event.cancelable) event.preventDefault();
  }

  function onTrackClick(event) {
    // A drag that ends over a cover isn't a click on it.
    if (drag.moved) {
      drag.moved = false;
      event.preventDefault();
      return;
    }
    var slide = event.target.closest(".slide");
    if (!slide) return;
    var i = slides.indexOf(slide);
    // The cover in the frame is a link to its project page, and a click with a modifier key opens any cover's link as usual.
    if (i === index || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // A cover beside the frame comes into it instead.
    event.preventDefault();
    go(i);
  }

  // Opens the project page of the cover in the frame by following its link (see WorksStrip.astro), for Enter
  // and for the name under the frame: in a new tab on a computer, in the same tab on a phone or tablet.
  function openWork(slide) {
    var link = slide.querySelector(".slide__link");
    drag.moved = false;
    if (link) link.click();
  }

  function onTrackKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      openWork(slides[index]);
    } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      go(index + (event.key === "ArrowRight" ? 1 : -1));
    }
  }

  // A sideways trackpad swipe (or shift and the mouse wheel) moves one work per gesture; up and down scroll the page.
  var wheel = { total: 0, locked: false, lockedAt: 0, last: 0, timer: 0 };

  function onWheel(event) {
    var lines = event.deltaMode === 1 ? 16 : 1;
    var dx = event.deltaX * lines;
    if (Math.abs(dx) <= Math.abs(event.deltaY * lines)) return;
    event.preventDefault();
    var now = performance.now();
    var size = Math.abs(dx);
    // A swipe's momentum sends smaller and smaller steps, so a sudden bigger one is a new swipe.
    if (wheel.locked && now - wheel.lockedAt > 400 && size > 10 && size > wheel.last * 1.5) wheel.locked = false;
    wheel.last = size;
    clearTimeout(wheel.timer);
    wheel.timer = setTimeout(function () {
      wheel.locked = false;
      wheel.total = 0;
    }, 160);
    if (wheel.locked) return;
    wheel.total += dx;
    if (Math.abs(wheel.total) < 30) return;
    wheel.locked = true;
    wheel.lockedAt = now;
    wheel.total = 0;
    go(index + (dx > 0 ? 1 : -1));
  }

  function initStrip() {
    if (!strip || !track || !slides.length) return;
    // The work kept in the page's history entry from an earlier visit, or else the page's starting one.
    var kept = window.history.state && window.history.state.work;
    index = slides.findIndex(function (slide) {
      return slide.getAttribute("data-name") === kept;
    });
    if (index < 0) {
      index = Math.max(
        0,
        slides.findIndex(function (slide) {
          return slide.hasAttribute("data-start");
        })
      );
    }
    shown = index;
    slides[index].classList.add("is-current");
    if (names && names.firstElementChild) names.firstElementChild.textContent = slides[index].getAttribute("data-name");
    if (slides.length < 2) return;
    step = measure();
    position = lastPosition = index * step;
    setLags(0, 0, true);
    var now = performance.now();
    remember(now);
    render(now);

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);
    track.addEventListener("touchmove", onTouchMove, { passive: false });
    track.addEventListener("click", onTrackClick);
    track.addEventListener("keydown", onTrackKeydown);
    track.addEventListener("wheel", onWheel, { passive: false });
    // The name under the frame opens the work too.
    if (label) {
      label.addEventListener("click", function () {
        openWork(slides[index]);
      });
    }
  }

  // A new slide width puts the same cover back in the frame, without animating.
  function resizeStrip() {
    if (!step) return;
    var next = measure();
    if (Math.abs(next - step) < 0.01) return;
    step = next;
    move = null;
    position = lastPosition = index * step;
    history = [];
    setLags(0, 0, true);
    placed = [];
    var now = performance.now();
    remember(now);
    render(now);
  }

  /* ---------- Sidebar ---------- */

  var sidebar = document.querySelector(".sidebar");
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll("[data-spy]"));
  var sections = spyLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute("data-spy"));
    })
    .filter(Boolean);

  // Highlight the section whose top has most recently passed the upper third of the window.
  function updateActiveLink() {
    var line = window.innerHeight / 3;
    var current = sections[0];
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= line) current = section;
    });
    // At the very top the first section counts, even on a window tall enough to show the next one in its upper third.
    if (window.scrollY <= 0) current = sections[0];
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) current = sections[sections.length - 1];
    spyLinks.forEach(function (link) {
      link.classList.toggle("is-active", current && link.getAttribute("data-spy") === current.id);
    });
  }

  // The works strip is full-bleed, so its covers pass under the fixed sidebar. Fade the sidebar out while they do.
  function updateSidebarVisibility() {
    if (!sidebar || !track) return;
    var side = sidebar.getBoundingClientRect();
    // Measured from the top of the covers to the bottom of the name under them, not the empty padding around them.
    var top = track.getBoundingClientRect().top;
    var bottom = (label || track).getBoundingClientRect().bottom;
    var overlaps = top < side.bottom + 24 && bottom > side.top - 24;
    sidebar.classList.toggle("is-hidden", overlaps);
  }

  // Both checks are a handful of rect reads, so they run straight from the scroll event.
  function onScroll() {
    updateActiveLink();
    updateSidebarVisibility();
  }

  function onResize() {
    resizeStrip();
    onScroll();
  }

  initStrip();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  onScroll();
})();
