import { useEffect, useState } from "react";

const FRAMES = [
  `    /\\_/\\
   ( o.o )
    > ^ <
   /|   |\\
  (_|   |_)`,
  `    /\\_/\\
   ( -.- )
    > ^ <
   /|   |\\
  (_|   |_)`,
  `    /\\_/\\
   ( o.o )
    > ^ <
   /|   |\\\\
  (_|   | )`,
  `    /\\_/\\
   ( o.o )
    > ^ <
  //|   |\\
  ( |   |_)`,
  `    /\\_/\\
   ( o o )
    > O <
   /|   |\\
  (_|   |_)`,
];

const CYCLE = [0, 0, 0, 1, 0, 0, 2, 3, 0, 0, 0, 4, 0];

const AsciiPet = () => {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setPaused(true);
      return undefined;
    }
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % CYCLE.length);
    }, 480);
    return () => window.clearInterval(id);
  }, []);

  const frame = FRAMES[paused ? 0 : CYCLE[step]];

  return (
    <button
      type="button"
      className="ascii-pet"
      aria-label="ASCII cat. Click to pause."
      title={paused ? "Click to wake" : "Click to pause"}
      onClick={() => setPaused((p) => !p)}
    >
      <pre>{frame}</pre>
    </button>
  );
};

export default AsciiPet;
