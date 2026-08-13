import { useCallback, useEffect, useRef, useState } from "react";

const SCALE = 2;
// Multiplier applied to each animation's native per-frame duration (ticks
// below are taken straight from the source sprite's timing data, so this is
// the one knob that scales the whole cast slower/faster).
const TICK_MS = 30;
const WALK_SPEED = 42;
const RUN_SPEED = 120;
const RUN_DISTANCE = 160;

// Each animation is its own strip in companion.png: native frame size (w x h),
// vertical offset (y) into the sheet, and per-frame hold durations (in ticks,
// scaled by TICK_MS) carried over from the original sprite's animation data
// so holds/blinks keep their natural, uneven pacing instead of a flat tick.
const ANIMS = {
  idle: { w: 40, h: 56, y: 0, durations: [40, 2, 3, 3, 3, 2] },
  walk: { w: 32, h: 40, y: 56, durations: [8, 10, 8, 10] },
  run: { w: 40, h: 88, y: 96, durations: [2, 1, 2, 3, 4, 4, 3, 2, 1, 2] },
  sleep: { w: 32, h: 40, y: 184, durations: [30, 35] },
  wake: { w: 40, h: 40, y: 224, durations: [8, 6, 4, 14, 10] },
  talk: { w: 32, h: 48, y: 264, durations: [6, 8, 6] },
  happy: { w: 32, h: 40, y: 312, durations: [12, 2, 8] },
  eat: { w: 24, h: 48, y: 352, durations: [6, 8, 6, 8] },
  sit: { w: 32, h: 40, y: 400, durations: [8, 8, 8] },
  look: { w: 32, h: 40, y: 440, durations: [6, 6, 6] },
};
const SHEET_W = 400;
const SHEET_H = 480;

const totalMs = (anim) =>
  anim.durations.reduce((sum, d) => sum + d, 0) * TICK_MS;

// Animation to play for each site interaction topic. Click/nav topics react
// with talk/happy/sit; scroll-observed topics (page sections coming into
// view) mostly use "look" - a quick curious glance rather than a full reply.
const REACTIONS = {
  work: "talk",
  research: "happy",
  life: "sit",
  contact: "talk",
  github: "run",
  email: "happy",
  schedule: "talk",
  pgp: "sit",
  story: "talk",
  "open-source": "look",
  skills: "look",
  education: "look",
  footer: "happy",
  back: "look",
};

const LINES = {
  greet: [
    "pika. systems online.",
    "you scroll. i route the flow.",
    "hey. i live in the corner of your uptime.",
  ],
  click: [
    "landed top-of-block. small talk after.",
    "chai first. then the mempool.",
    "entropy is the only alpha that compounds.",
    "i read your PRs before you merge them.",
    "validators sleep. i mostly don't.",
    "somewhere a bundle just landed. probably yours.",
    "open source or it didn't happen.",
    "the spread narrows. i do not.",
    "i don't fork chains. i just walk them.",
    "click me again. i have more latency jokes.",
  ],
  sleep: [
    "zzz... the orderbook can wait.",
    "shh. backtesting a nap.",
    "offline, like a validator mid-fork.",
  ],
  wake: [
    "five more slots.",
    "i was dreaming in candlesticks.",
    "fine. spinning back up.",
  ],
  idle: [
    "still here. still watching the tape.",
    "a quiet block is a good block.",
    "somewhere, an arb just closed.",
    "don't forget to touch grass. i can't.",
  ],
  eat: [
    "chai break. mandatory.",
    "five minute snack. don't tell the markets.",
    "samosa beats sleep, sometimes.",
  ],
  sit: [
    "sitting with a thought about entropy.",
    "just vibing near the footer.",
    "thinking about the next migration. maybe.",
  ],
  work: [
    "execution logs look clean today.",
    "four roles deep. still shipping.",
    "routing flow, one validator at a time.",
  ],
  research: [
    "five projects. zero unwatched charts.",
    "power markets, HFT bots, on-chain indexers. busy quant era.",
    "peer review: i approve. i am biased though.",
  ],
  life: [
    "chapter three: entropy. my favorite one.",
    "scuba, camping, and a spreadsheet somewhere.",
    "the long version has a timeline. i checked.",
  ],
  contact: [
    "say hi. i will relay the message. eventually.",
    "he replies faster than block finality.",
    "chai is on him if you ask nicely.",
  ],
  github: [
    "racing over to github.",
    "star it. i am counting.",
    "green squares make me happy.",
  ],
  email: [
    "copied. do not lose it this time.",
    "clipboard loaded. inbox is your move.",
    "shoot him a note. he answers.",
  ],
  schedule: [
    "calendar invite incoming.",
    "pick a slot. i will hold his seat.",
    "meetings beat cold emails.",
  ],
  pgp: [
    "encrypted. as it should be.",
    "trust, but verify the fingerprint.",
    "key copied. guard it well.",
  ],
  story: [
    "chapter unlocked.",
    "the long version. i respect the commitment.",
    "reading time. i will just wait here.",
  ],
  "open-source": [
    "oh, the PRs. i watched him write those.",
    "merged upstream. i approve of merges.",
    "open source: read, fork, walk away smarter.",
  ],
  skills: [
    "rust, C++, python. i speak none of them.",
    "that stack again. still holds up.",
    "tools, sharpened. mostly for markets.",
  ],
  education: [
    "stochastic processes. i just wing it.",
    "jodhpur to here. long walk, that one.",
    "the degree checks out. i checked.",
  ],
  footer: [
    "end of the page. start of a chai break.",
    "you scrolled all the way down. respect.",
    "that is everything. for now.",
  ],
  back: [
    "oh, you're back.",
    "missed you. also, nothing happened.",
    "welcome back. the tape kept moving.",
  ],
};

const pick = (list, lastRef) => {
  if (list.length === 1) return list[0];
  let next = list[Math.floor(Math.random() * list.length)];
  if (next === lastRef.current) {
    next = list[(list.indexOf(next) + 1) % list.length];
  }
  lastRef.current = next;
  return next;
};

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

const SitePet = () => {
  const [mode, setMode] = useState("idle");
  const [frame, setFrame] = useState(0);
  const [x, setX] = useState(24);
  const [dir, setDir] = useState(1);
  const [line, setLine] = useState("");
  const [typed, setTyped] = useState("");
  const [open, setOpen] = useState(false);

  const modeRef = useRef("idle");
  const frameRef = useRef(0);
  const animTimer = useRef(null);
  const xRef = useRef(24);
  const destRef = useRef(24);
  const moveSpeedRef = useRef(WALK_SPEED);
  const dirRef = useRef(1);
  const lastLine = useRef(null);
  const lastAction = useRef(Date.now());
  const hideTimer = useRef(null);
  const revertTimer = useRef(null);
  const reduceRef = useRef(false);

  const advanceFrame = useCallback(() => {
    const anim = ANIMS[modeRef.current] || ANIMS.idle;
    frameRef.current = (frameRef.current + 1) % anim.durations.length;
    setFrame(frameRef.current);
    animTimer.current = window.setTimeout(
      advanceFrame,
      anim.durations[frameRef.current] * TICK_MS,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setModeSafe = useCallback(
    (next) => {
      modeRef.current = next;
      frameRef.current = 0;
      setMode(next);
      setFrame(0);
      if (animTimer.current) window.clearTimeout(animTimer.current);
      const anim = ANIMS[next] || ANIMS.idle;
      animTimer.current = window.setTimeout(
        advanceFrame,
        anim.durations[0] * TICK_MS,
      );
    },
    [advanceFrame],
  );

  const say = (kind, holdMs = 4200) => {
    const text = pick(LINES[kind] || LINES.idle, lastLine);
    setLine(text);
    setTyped("");
    setOpen(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setOpen(false), holdMs);
  };

  useEffect(() => {
    if (!open || !line) return undefined;
    if (typed.length >= line.length) return undefined;
    const id = window.setTimeout(() => {
      setTyped(line.slice(0, typed.length + 1));
    }, 22);
    return () => window.clearTimeout(id);
  }, [open, line, typed]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceRef.current = reduce.matches;

    const greetId = window.setTimeout(() => {
      say("greet", 3800);
      lastAction.current = Date.now();
    }, 900);

    const triggerReaction = (topic, holdMs = 4000) => {
      if (!topic || modeRef.current === "sleep") return;
      lastAction.current = Date.now();
      const reactMode = REACTIONS[topic] || "talk";
      setModeSafe(reactMode);
      say(topic, holdMs);
      if (revertTimer.current) window.clearTimeout(revertTimer.current);
      const reactAnim = ANIMS[reactMode] || ANIMS.talk;
      const settleMs = Math.max(900, totalMs(reactAnim) + 300);
      revertTimer.current = window.setTimeout(() => {
        if (modeRef.current === reactMode) setModeSafe("idle");
      }, settleMs);
    };

    const onReact = (e) => {
      const topic = e && e.detail && e.detail.topic;
      triggerReaction(topic, 4000);
    };
    window.addEventListener("sitepet:react", onReact);

    // Notice page sections as they scroll into view - a quick "look" glance,
    // fired once per section so it reads as observation, not spam.
    const seenSections = new Set();
    const sectionTopics = {
      work: "work",
      research: "research",
      "open-source": "open-source",
      skills: "skills",
      education: "education",
      contact: "contact",
    };
    const watchTargets = [];
    Object.keys(sectionTopics).forEach((id) => {
      const el = document.getElementById(id);
      if (el) watchTargets.push([el, sectionTopics[id]]);
    });
    const footerEl = document.querySelector(".footer");
    if (footerEl) watchTargets.push([footerEl, "footer"]);

    let sectionObserver = null;
    if (watchTargets.length && "IntersectionObserver" in window) {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const match = watchTargets.find(([el]) => el === entry.target);
            if (!match) return;
            const [, topic] = match;
            if (seenSections.has(topic)) return;
            seenSections.add(topic);
            triggerReaction(topic, 3400);
          });
        },
        { threshold: 0.35 },
      );
      watchTargets.forEach(([el]) => sectionObserver.observe(el));
    }

    // Notice when the user leaves the tab and comes back after a while.
    let hiddenAt = 0;
    const onVisibility = () => {
      if (document.hidden) {
        hiddenAt = Date.now();
        return;
      }
      if (hiddenAt && Date.now() - hiddenAt > 5000) {
        triggerReaction("back", 3200);
      }
      hiddenAt = 0;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const anim0 = ANIMS[modeRef.current] || ANIMS.idle;
    animTimer.current = window.setTimeout(
      advanceFrame,
      anim0.durations[0] * TICK_MS,
    );

    let raf = 0;
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const displayW = ANIMS.idle.w * SCALE;
      const maxX = Math.max(16, window.innerWidth - displayW - 16);

      if (
        (modeRef.current === "walk" || modeRef.current === "run") &&
        !reduceRef.current
      ) {
        const dest = destRef.current;
        const cur = xRef.current;
        const delta = dest - cur;
        if (Math.abs(delta) < 1.2) {
          xRef.current = dest;
          setX(dest);
          setModeSafe("idle");
          lastAction.current = Date.now();
        } else {
          const sign = delta > 0 ? 1 : -1;
          dirRef.current = sign;
          setDir(sign);
          const next = clamp(
            cur + sign * moveSpeedRef.current * dt,
            16,
            maxX,
          );
          xRef.current = next;
          setX(next);
        }
      } else if (modeRef.current === "idle" && !reduceRef.current) {
        const idleFor = Date.now() - lastAction.current;
        if (idleFor > 16000) {
          setModeSafe("sleep");
          say("sleep", 2800);
        } else if (idleFor > 7000 && Math.random() < 0.012) {
          const dest = clamp(16 + Math.random() * (maxX - 16), 16, maxX);
          destRef.current = dest;
          const distance = Math.abs(dest - xRef.current);
          moveSpeedRef.current = distance > RUN_DISTANCE ? RUN_SPEED : WALK_SPEED;
          setModeSafe(distance > RUN_DISTANCE ? "run" : "walk");
        } else if (idleFor > 11000 && Math.random() < 0.006) {
          say("idle", 3400);
          lastAction.current = Date.now();
        } else if (idleFor > 9000 && Math.random() < 0.004) {
          setModeSafe("eat");
          say("eat", 2600);
          window.setTimeout(() => {
            if (modeRef.current === "eat") setModeSafe("idle");
          }, totalMs(ANIMS.eat) * 2);
          lastAction.current = Date.now();
        } else if (idleFor > 10000 && Math.random() < 0.004) {
          setModeSafe("sit");
          say("sit", 2800);
          window.setTimeout(() => {
            if (modeRef.current === "sit") setModeSafe("idle");
          }, totalMs(ANIMS.sit) * 2);
          lastAction.current = Date.now();
        }
      }
      raf = window.requestAnimationFrame(step);
    };
    raf = window.requestAnimationFrame(step);

    return () => {
      window.clearTimeout(greetId);
      window.cancelAnimationFrame(raf);
      window.removeEventListener("sitepet:react", onReact);
      document.removeEventListener("visibilitychange", onVisibility);
      if (sectionObserver) sectionObserver.disconnect();
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(revertTimer.current);
      window.clearTimeout(animTimer.current);
    };
  }, [advanceFrame, setModeSafe]);

  const onPet = () => {
    lastAction.current = Date.now();
    if (modeRef.current === "sleep") {
      setModeSafe("wake");
      say("wake", 3200);
      window.setTimeout(() => {
        if (modeRef.current === "wake") setModeSafe("idle");
      }, totalMs(ANIMS.wake) + 300);
      return;
    }
    const reactMode = Math.random() < 0.5 ? "talk" : "happy";
    setModeSafe(reactMode);
    say("click", 4200);
    window.setTimeout(() => {
      if (modeRef.current === reactMode) setModeSafe("idle");
    }, totalMs(ANIMS[reactMode]) + 400);
  };

  const anim = ANIMS[mode] || ANIMS.idle;
  const displayW = anim.w * SCALE;
  const displayH = anim.h * SCALE;
  const bgX = -(frame % anim.durations.length) * displayW;
  const bgY = -anim.y * SCALE;

  return (
    <div className="site-pet" style={{ left: x }}>
      {open ? (
        <div className="site-pet-box" role="status">
          <div className="site-pet-box-inner">
            {typed}
            {typed.length < line.length ? (
              <span className="site-pet-caret">_</span>
            ) : (
              <span className="site-pet-next">v</span>
            )}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        className={"site-pet-sprite" + (dir < 0 ? " is-left" : "")}
        aria-label="Pixel companion. Click to talk or wake."
        title={mode === "sleep" ? "Click to wake" : "Click to talk"}
        style={{
          width: displayW,
          height: displayH,
          backgroundPosition: `${bgX}px ${bgY}px`,
          backgroundSize: `${SHEET_W * SCALE}px ${SHEET_H * SCALE}px`,
        }}
        onClick={onPet}
      />
    </div>
  );
};

export default SitePet;
