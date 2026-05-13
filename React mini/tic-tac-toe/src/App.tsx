import { useState, useEffect, useRef, useCallback } from "react";
import { useSpring, animated, useTrail, useTransition, config } from "@react-spring/web";

// ─── SVG Characters ───────────────────────────────────────────────────────────

const ElekidFace = ({ size = 60, angry = false }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* body */}
    <circle cx="40" cy="42" r="30" fill="#FFC348" stroke="#BA212A" strokeWidth="3"/>
    {/* horns/antennae */}
    <line x1="28" y1="14" x2="20" y2="2" stroke="#BA212A" strokeWidth="4" strokeLinecap="round"/>
    <line x1="20" y1="2" x2="26" y2="6" stroke="#BA212A" strokeWidth="3" strokeLinecap="round"/>
    <line x1="52" y1="14" x2="60" y2="2" stroke="#BA212A" strokeWidth="4" strokeLinecap="round"/>
    <line x1="60" y1="2" x2="54" y2="6" stroke="#BA212A" strokeWidth="3" strokeLinecap="round"/>
    {/* stripes */}
    <path d="M22 38 Q40 32 58 38" stroke="#BA212A" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M20 46 Q40 40 60 46" stroke="#BA212A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    {/* angry eyes */}
    {angry ? (
      <>
        <path d="M26 28 L34 32" stroke="#BA212A" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="30" cy="33" r="4" fill="#BA212A"/>
        <path d="M46 28 L54 32" stroke="#BA212A" strokeWidth="3" strokeLinecap="round" transform="scale(-1,1) translate(-80,0)"/>
        <circle cx="50" cy="33" r="4" fill="#BA212A"/>
      </>
    ) : (
      <>
        <path d="M26 30 L34 28" stroke="#BA212A" strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="30" cy="33" rx="4" ry="4.5" fill="#BA212A"/>
        <path d="M54 30 L46 28" stroke="#BA212A" strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="50" cy="33" rx="4" ry="4.5" fill="#BA212A"/>
      </>
    )}
    {/* glint */}
    <circle cx="28" cy="31" r="1.5" fill="white" opacity="0.8"/>
    <circle cx="48" cy="31" r="1.5" fill="white" opacity="0.8"/>
    {/* mouth */}
    <path d="M32 50 Q40 56 48 50" stroke="#BA212A" strokeWidth="3" fill="none" strokeLinecap="round"/>
    {/* zigzag chest */}
    <path d="M33 58 L37 54 L40 58 L43 54 L47 58" stroke="#BA212A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MagbyFace = ({ size = 60, angry = false }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* body */}
    <ellipse cx="40" cy="44" rx="26" ry="28" fill="#E84A4A" stroke="#8B0000" strokeWidth="3"/>
    {/* head bump */}
    <ellipse cx="40" cy="22" rx="18" ry="16" fill="#E84A4A" stroke="#8B0000" strokeWidth="3"/>
    {/* snout */}
    <ellipse cx="40" cy="54" rx="12" ry="8" fill="#C0392B"/>
    <ellipse cx="36" cy="53" rx="3" ry="3.5" fill="#8B0000"/>
    <ellipse cx="44" cy="53" rx="3" ry="3.5" fill="#8B0000"/>
    {/* flame on head */}
    <path d="M32 14 Q28 4 36 8 Q34 0 40 4 Q46 0 44 8 Q52 4 48 14" fill="#F5C842" stroke="#E8A020" strokeWidth="1.5"/>
    {/* angry eyes */}
    {angry ? (
      <>
        <path d="M28 24 L36 28" stroke="#8B0000" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="32" cy="29" r="3.5" fill="#8B0000"/>
        <path d="M52 24 L44 28" stroke="#8B0000" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="48" cy="29" r="3.5" fill="#8B0000"/>
      </>
    ) : (
      <>
        <ellipse cx="32" cy="27" rx="4" ry="5" fill="#8B0000"/>
        <ellipse cx="48" cy="27" rx="4" ry="5" fill="#8B0000"/>
        <circle cx="30" cy="25" r="1.5" fill="white" opacity="0.8"/>
        <circle cx="46" cy="25" r="1.5" fill="white" opacity="0.8"/>
      </>
    )}
    {/* arms */}
    <ellipse cx="16" cy="46" rx="7" ry="5" fill="#E84A4A" stroke="#8B0000" strokeWidth="2" transform="rotate(-20 16 46)"/>
    <ellipse cx="64" cy="46" rx="7" ry="5" fill="#E84A4A" stroke="#8B0000" strokeWidth="2" transform="rotate(20 64 46)"/>
    {/* stripes */}
    <path d="M26 40 Q40 36 54 40" stroke="#8B0000" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

const BerryIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="36" r="18" fill="#8B0000" stroke="#600000" strokeWidth="2"/>
    <ellipse cx="22" cy="30" r="10" fill="#8B0000" stroke="#600000" strokeWidth="2"/>
    <path d="M30 18 Q28 8 32 4 Q36 8 34 18" fill="#4a7c3f" stroke="#2d5c25" strokeWidth="1.5"/>
    <path d="M28 8 Q22 6 20 12" fill="none" stroke="#4a7c3f" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="24" cy="28" r="2" fill="#600000" opacity="0.5"/>
    <circle cx="32" cy="34" r="2" fill="#600000" opacity="0.5"/>
  </svg>
);

const PokeballIcon = ({ size = 40, half = false }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {half ? (
      <>
        <path d="M6 30 A24 24 0 0 1 54 30 Z" fill="#C0392B" stroke="#8B0000" strokeWidth="2"/>
        <path d="M6 30 A24 24 0 0 0 54 30 Z" fill="#888" stroke="#8B0000" strokeWidth="2"/>
        <line x1="6" y1="30" x2="54" y2="30" stroke="#8B0000" strokeWidth="2.5"/>
        <circle cx="30" cy="30" r="8" fill="#ccc" stroke="#8B0000" strokeWidth="2.5"/>
        <circle cx="30" cy="30" r="4" fill="white" stroke="#8B0000" strokeWidth="1.5"/>
      </>
    ) : (
      <>
        <path d="M6 30 A24 24 0 0 1 54 30 Z" fill="#C0392B" stroke="#8B0000" strokeWidth="2"/>
        <path d="M6 30 A24 24 0 0 0 54 30 Z" fill="white" stroke="#8B0000" strokeWidth="2"/>
        <line x1="6" y1="30" x2="54" y2="30" stroke="#8B0000" strokeWidth="2.5"/>
        <circle cx="30" cy="30" r="8" fill="white" stroke="#8B0000" strokeWidth="2.5"/>
        <circle cx="30" cy="30" r="4" fill="#C0392B" stroke="#8B0000" strokeWidth="1.5"/>
      </>
    )}
  </svg>
);

// ─── Animated Cell Content ─────────────────────────────────────────────────────
const CellContent = ({ value, isWinning }) => {
  const spring = useSpring({
    from: { scale: 0, rotate: -30, opacity: 0 },
    to: { scale: isWinning ? 1.18 : 1, rotate: 0, opacity: 1 },
    config: { tension: 280, friction: 18, mass: 1.2 },
  });

  const pulse = useSpring({
    from: { scale: 1 },
    to: isWinning ? [{ scale: 1.22 }, { scale: 1.12 }, { scale: 1.18 }] : { scale: 1 },
    loop: isWinning,
    config: { tension: 200, friction: 10 },
  });

  if (!value) return null;
  return (
    <animated.div
      style={{
        ...spring,
        ...(isWinning ? pulse : {}),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: isWinning ? "drop-shadow(0 0 12px rgba(245,200,66,0.9))" : "none",
      }}
    >
      {value === "X" ? (
        <ElekidFace size={64} angry={isWinning} />
      ) : (
        <MagbyFace size={64} angry={isWinning} />
      )}
    </animated.div>
  );
};

// ─── Particle Burst ────────────────────────────────────────────────────────────
const Particles = ({ active }) => {
  const count = 18;
  const trails = useTrail(count, {
    from: { opacity: 1, transform: "translate(0px, 0px) scale(1)" },
    to: active
      ? Array.from({ length: count }, (_, i) => {
          const angle = (i / count) * Math.PI * 2;
          const dist = 80 + Math.random() * 60;
          return {
            opacity: 0,
            transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`,
          };
        })
      : { opacity: 0, transform: "translate(0,0) scale(0)" },
    config: { tension: 120, friction: 20 },
    reset: active,
  });

  if (!active) return null;
  const colors = ["#F5C842", "#E84A4A", "#fff", "#8B0000", "#FFD700"];
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {trails.map((style, i) => (
        <animated.div
          key={i}
          style={{
            ...style,
            position: "absolute",
            width: 10 + (i % 3) * 6,
            height: 10 + (i % 3) * 6,
            borderRadius: i % 2 === 0 ? "50%" : "2px",
            background: colors[i % colors.length],
            boxShadow: `0 0 6px ${colors[i % colors.length]}`,
          }}
        />
      ))}
    </div>
  );
};

// ─── Screen Transition ─────────────────────────────────────────────────────────
const ScreenTransition = ({ show, children, from = "bottom" }) => {
  const transitions = useTransition(show, {
    from: {
      opacity: 0,
      transform: from === "bottom" ? "translateY(60px) scale(0.92)" : "translateY(-40px) scale(1.04)",
    },
    enter: { opacity: 1, transform: "translateY(0px) scale(1)" },
    leave: {
      opacity: 0,
      transform: from === "bottom" ? "translateY(-40px) scale(1.04)" : "translateY(60px) scale(0.92)",
    },
    config: { tension: 260, friction: 26 },
  });
  return transitions((style, item) =>
    item ? <animated.div style={{ ...style, position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>{children}</animated.div> : null
  );
};

// ─── Winner Screen ─────────────────────────────────────────────────────────────
const WinnerScreen = ({ winner, onReset, scores }) => {
  const [burst, setBurst] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBurst(true), 200);
    return () => clearTimeout(t);
  }, []);

  const charSpring = useSpring({
    from: { scale: 0, rotate: -20 },
    to: { scale: 1, rotate: 0 },
    delay: 300,
    config: { tension: 180, friction: 14, mass: 1.5 },
  });

  const textTrail = useTrail(3, {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 500,
    config: config.gentle,
  });

  const btnSpring = useSpring({
    from: { opacity: 0, scale: 0.7 },
    to: { opacity: 1, scale: 1 },
    delay: 900,
    config: { tension: 260, friction: 18 },
  });

  return (
    <div style={{ textAlign: "center", position: "relative", padding: "2rem" }}>
      <Particles active={burst} />
      <animated.div style={{ ...charSpring, display: "inline-block", marginBottom: "1.5rem" }}>
        <div style={{
          background: "rgba(139,0,0,0.25)",
          border: "3px dashed #C0392B",
          borderRadius: "50%",
          padding: "2rem",
          backdropFilter: "blur(4px)",
        }}>
          {winner === "X" ? <ElekidFace size={110} angry={true} /> : <MagbyFace size={110} angry={true} />}
        </div>
      </animated.div>

      <animated.div style={{ opacity: textTrail[0].opacity, transform: textTrail[0].y.to(y => `translateY(${y}px)`) }}>
        <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(1rem,3vw,1.3rem)", color: "#C0392B", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
          ⚡ WINNER ⚡
        </div>
      </animated.div>
      <animated.div style={{ opacity: textTrail[1].opacity, transform: textTrail[1].y.to(y => `translateY(${y}px)`) }}>
        <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(2.5rem,7vw,4rem)", color: "#F5C842", textShadow: "3px 3px 0 #C0392B, 6px 6px 0 #8B0000", letterSpacing: "0.05em", lineHeight: 1 }}>
          {winner === "X" ? "ELEKID" : "MAGBY"}
        </div>
      </animated.div>
      <animated.div style={{ opacity: textTrail[2].opacity, transform: textTrail[2].y.to(y => `translateY(${y}px)`) }}>
        <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(1rem,2.5vw,1.1rem)", color: "#8B0000", marginTop: "0.5rem" }}>
          WINS THE BATTLE!
        </div>
      </animated.div>

      <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginTop: "1.8rem", fontFamily: "'Boogaloo', cursive", color: "#8B0000", fontSize: "1.1rem" }}>
        <span>⚡ Elekid: {scores.X}</span>
        <span>🔥 Magby: {scores.O}</span>
      </div>

      <animated.div style={btnSpring}>
        <button
          onClick={onReset}
          style={{
            marginTop: "2rem",
            background: "#C0392B",
            color: "#F5C842",
            border: "3px solid #8B0000",
            borderRadius: "50px",
            padding: "0.8rem 2.5rem",
            fontFamily: "'Boogaloo', cursive",
            fontSize: "1.3rem",
            letterSpacing: "0.1em",
            cursor: "pointer",
            boxShadow: "0 6px 0 #8B0000",
            transition: "all 0.1s",
          }}
          onMouseDown={e => { e.currentTarget.style.transform = "translateY(4px)"; e.currentTarget.style.boxShadow = "0 2px 0 #8B0000"; }}
          onMouseUp={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 0 #8B0000"; }}
        >
          REMATCH! ⚡
        </button>
      </animated.div>
    </div>
  );
};

// ─── Draw Screen ───────────────────────────────────────────────────────────────
const DrawScreen = ({ onReset, scores }) => {
  const textSpring = useSpring({
    from: { scale: 0.5, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: { tension: 200, friction: 14 },
  });
  const btnSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 600,
  });
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <animated.div style={textSpring}>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", marginBottom: "1.5rem" }}>
          <ElekidFace size={72} />
          <MagbyFace size={72} />
        </div>
        <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(2rem,6vw,3.5rem)", color: "#C0392B", textShadow: "2px 2px 0 #8B0000", letterSpacing: "0.05em" }}>IT'S A DRAW!</div>
        <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "1rem", color: "#8B0000", marginTop: "0.5rem" }}>Both trainers tied this round</div>
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginTop: "1rem", fontFamily: "'Boogaloo', cursive", color: "#8B0000", fontSize: "1rem" }}>
          <span>⚡ Elekid: {scores.X}</span>
          <span>🔥 Magby: {scores.O}</span>
        </div>
      </animated.div>
      <animated.div style={btnSpring}>
        <button
          onClick={onReset}
          style={{
            marginTop: "1.5rem",
            background: "#C0392B",
            color: "#F5C842",
            border: "3px solid #8B0000",
            borderRadius: "50px",
            padding: "0.8rem 2.5rem",
            fontFamily: "'Boogaloo', cursive",
            fontSize: "1.3rem",
            cursor: "pointer",
            boxShadow: "0 6px 0 #8B0000",
          }}
          onMouseDown={e => { e.currentTarget.style.transform = "translateY(4px)"; e.currentTarget.style.boxShadow = "0 2px 0 #8B0000"; }}
          onMouseUp={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 0 #8B0000"; }}
        >
          TRY AGAIN! 🎮
        </button>
      </animated.div>
    </div>
  );
};

// ─── Intro Screen ──────────────────────────────────────────────────────────────
const IntroScreen = ({ onStart }) => {
  const [hovering, setHovering] = useState(false);

  const titleTrail = useTrail(4, {
    from: { opacity: 0, y: -40 },
    to: { opacity: 1, y: 0 },
    config: config.gentle,
    delay: 100,
  });

  const charTrail = useTrail(2, {
    from: { opacity: 0, scale: 0.4, y: 40 },
    to: { opacity: 1, scale: 1, y: 0 },
    config: { tension: 200, friction: 16, mass: 1.2 },
    delay: 400,
  });

  const btnSpring = useSpring({
    from: { opacity: 0, scale: 0.7 },
    to: { opacity: 1, scale: 1 },
    delay: 900,
    config: { tension: 240, friction: 16 },
  });

  const floatElekid = useSpring({
    from: { y: 0 },
    to: [{ y: -12 }, { y: 0 }],
    loop: true,
    config: { duration: 1800 },
  });

  const floatMagby = useSpring({
    from: { y: 0 },
    to: [{ y: -12 }, { y: 0 }],
    loop: true,
    delay: 900,
    config: { duration: 1800 },
  });

  const floatStyles = [floatElekid, floatMagby];

  return (
    <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <animated.div style={{ opacity: titleTrail[0].opacity, transform: titleTrail[0].y.to(y => `translateY(${y}px)`) }}>
        <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(0.7rem,2vw,0.85rem)", letterSpacing: "0.5em", color: "#C0392B", textTransform: "uppercase", marginBottom: "0.2rem" }}>
          ✦ Pokemon Edition ✦
        </div>
      </animated.div>
      <animated.div style={{ opacity: titleTrail[1].opacity, transform: titleTrail[1].y.to(y => `translateY(${y}px)`) }}>
        <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(2.4rem,8vw,4.5rem)", lineHeight: 1, color: "#F5C842", textShadow: "4px 4px 0 #C0392B, 7px 7px 0 #8B0000", letterSpacing: "0.04em" }}>
          TIC TAC
        </div>
      </animated.div>
      <animated.div style={{ opacity: titleTrail[2].opacity, transform: titleTrail[2].y.to(y => `translateY(${y}px)`) }}>
        <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(2.4rem,8vw,4.5rem)", lineHeight: 1, color: "#F5C842", textShadow: "4px 4px 0 #C0392B, 7px 7px 0 #8B0000", letterSpacing: "0.04em" }}>
          TOE
        </div>
      </animated.div>

      <animated.div style={{ opacity: titleTrail[3].opacity, transform: titleTrail[3].y.to(y => `translateY(${y}px)`), marginTop: "0.8rem" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", alignItems: "center" }}>
          <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(0.9rem,2.5vw,1.1rem)", color: "#F5C842", background: "rgba(139,0,0,0.15)", border: "2px dashed #C0392B", padding: "0.25rem 1rem", borderRadius: "4px" }}>ELEKID</div>
          <span style={{ fontFamily: "'Boogaloo', cursive", color: "#8B0000", fontSize: "1.2rem" }}>VS</span>
          <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(0.9rem,2.5vw,1.1rem)", color: "#F5C842", background: "rgba(139,0,0,0.15)", border: "2px dashed #C0392B", padding: "0.25rem 1rem", borderRadius: "4px" }}>MAGBY</div>
        </div>
      </animated.div>

      <div style={{ display: "flex", justifyContent: "center", gap: "3rem", marginTop: "2rem", alignItems: "flex-end" }}>
        {[<ElekidFace size={90} />, <MagbyFace size={90} />].map((char, i) => (
          <animated.div key={i} style={{ ...charTrail[i], transform: charTrail[i].scale.to(s => `scale(${s}) translateY(${floatStyles[i].y.get()}px)`) }}>
            <animated.div style={{ y: floatStyles[i].y }}>
              <div style={{
                background: "rgba(139,0,0,0.15)",
                border: "3px dashed #C0392B",
                borderRadius: "50%",
                padding: "1rem",
              }}>{char}</div>
            </animated.div>
          </animated.div>
        ))}
      </div>

      <animated.div style={btnSpring}>
        <button
          onClick={onStart}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{
            marginTop: "2rem",
            background: hovering ? "#8B0000" : "#C0392B",
            color: "#F5C842",
            border: "3px solid #8B0000",
            borderRadius: "50px",
            padding: "0.9rem 3rem",
            fontFamily: "'Boogaloo', cursive",
            fontSize: "clamp(1.1rem,3vw,1.4rem)",
            letterSpacing: "0.1em",
            cursor: "pointer",
            boxShadow: hovering ? "0 2px 0 #5a0000" : "0 6px 0 #8B0000",
            transform: hovering ? "translateY(4px)" : "translateY(0)",
            transition: "all 0.12s ease",
          }}
        >
          ⚡ START BATTLE ⚡
        </button>
      </animated.div>

      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem", opacity: 0.7 }}>
        <BerryIcon size={22} />
        <PokeballIcon size={22} />
        <PokeballIcon size={22} half />
        <BerryIcon size={22} />
      </div>
    </div>
  );
};

// ─── Game Board ────────────────────────────────────────────────────────────────
const WINNING_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function calcWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

const Cell = ({ value, index, onClick, isWinning, disabled, isXTurn }) => {
  const [hovered, setHovered] = useState(false);
  const hoverSpring = useSpring({
    scale: hovered && !value && !disabled ? 1.06 : 1,
    background: isWinning
      ? "rgba(245,200,66,0.22)"
      : hovered && !value && !disabled
      ? "rgba(139,0,0,0.18)"
      : "rgba(139,0,0,0.07)",
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !disabled && !value && onClick(index)}
      style={{
        ...hoverSpring,
        aspectRatio: "1",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: (!value && !disabled) ? "pointer" : "default",
        border: isWinning ? "2.5px solid #F5C842" : "2.5px solid rgba(139,0,0,0.3)",
        boxShadow: isWinning ? "0 0 18px rgba(245,200,66,0.4), inset 0 0 10px rgba(245,200,66,0.15)" : "inset 0 2px 8px rgba(0,0,0,0.08)",
        transition: "border-color 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hover ghost */}
      {hovered && !value && !disabled && (
  <div style={{ opacity: 0.18 }}>
    {isXTurn ? (
      <ElekidFace size={52} />
    ) : (
      <MagbyFace size={52} />
    )}
  </div>
)}
      <CellContent value={value} isWinning={isWinning} />
    </animated.div>
  );
};

const GameBoard = ({ onBackToIntro }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [screen, setScreen] = useState("game"); // game | winner | draw

  const result = calcWinner(squares);
  const winLine = result?.line || [];
  const isDraw = !result && squares.every(Boolean);
  const scoreUpdated = useRef(false);

 useEffect(() => {

  if (result && !scoreUpdated.current) {

    scoreUpdated.current = true;

    const timer = setTimeout(() => {

      setScores(s => ({
        ...s,
        [result.winner]: s[result.winner] + 1
      }));

      setScreen("winner");

    }, 900);

    return () => clearTimeout(timer);
  }

  if (isDraw) {

    const timer = setTimeout(() => {
      setScreen("draw");
    }, 600);

    return () => clearTimeout(timer);
  }

}, [result, isDraw]);

  const handleClick = useCallback((i) => {
    if (squares[i] || result) return;
    const next = squares.slice();
    next[i] = isX ? "X" : "O";
    setSquares(next);
    setIsX(x => !x);
  }, [squares, isX, result]);

  const resetGame = () => {

  scoreUpdated.current = false;

  setSquares(Array(9).fill(null));
  setIsX(true);
  setScreen("game");
};

  const turnSpring = useSpring({
    scale: 1,
    from: { scale: 0.85 },
    reset: true,
    config: { tension: 300, friction: 16 },
  });

  return (
    <div style={{ width: "100%", maxWidth: "420px", margin: "0 auto", position: "relative", minHeight: "560px" }}>
      <ScreenTransition show={screen === "winner"}>
        <WinnerScreen winner={result?.winner} onReset={resetGame} scores={scores} />
      </ScreenTransition>
      <ScreenTransition show={screen === "draw"}>
        <DrawScreen onReset={resetGame} scores={scores} />
      </ScreenTransition>
      <ScreenTransition show={screen === "game"}>
        <div style={{ width: "100%", padding: "0 1rem" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
            <button
              onClick={onBackToIntro}
              style={{ background: "none", border: "2px dashed #C0392B", borderRadius: "8px", padding: "0.3rem 0.8rem", fontFamily: "'Boogaloo', cursive", color: "#C0392B", fontSize: "0.9rem", cursor: "pointer" }}
            >
              ← MENU
            </button>
            <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(1.1rem,3vw,1.4rem)", color: "#F5C842", textShadow: "2px 2px 0 #C0392B", letterSpacing: "0.08em" }}>
              {/* ELEKID VS MAGBY */}
            </div>
            <button
              onClick={resetGame}
              style={{ background: "#C0392B", border: "2px solid #8B0000", borderRadius: "8px", padding: "0.3rem 0.8rem", fontFamily: "'Boogaloo', cursive", color: "#F5C842", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 3px 0 #8B0000" }}
            >
              RESET
            </button>
          </div>

          {/* Score + Turn */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", background: "rgba(139,0,0,0.1)", border: "2px dashed #C0392B", borderRadius: "12px", padding: "0.6rem 1.2rem" }}>
            <div style={{ textAlign: "center" }}>
              <ElekidFace size={32} />
              <div style={{ fontFamily: "'Boogaloo', cursive", color: "#8E0000", fontSize: "0.8rem" }}>ELEKID ⚡</div>
              <div style={{ fontFamily: "'Boogaloo', cursive", color: "#F5C842", fontSize: "1.4rem", textShadow: "1px 1px 0 #C0392B" }}>{scores.X}</div>
            </div>
            <animated.div style={turnSpring}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: "0.75rem", color: "#8B0000", letterSpacing: "0.2em", marginBottom: "0.3rem" }}>TURN</div>
                {isX ? <ElekidFace size={44} /> : <MagbyFace size={44} />}
                <div style={{ fontFamily: "'Boogaloo', cursive", color: "#F5C842", fontSize: "0.8rem", marginTop: "0.2rem" }}>{isX ? "ELEKID" : "MAGBY"}</div>
              </div>
            </animated.div>
            <div style={{ textAlign: "center" }}>
              <MagbyFace size={32} />
              <div style={{ fontFamily: "'Boogaloo', cursive", color: "#8E0000", fontSize: "0.8rem" }}>MAGBY 🔥</div>
              <div style={{ fontFamily: "'Boogaloo', cursive", color: "#F5C842", fontSize: "1.4rem", textShadow: "1px 1px 0 #C0392B" }}>{scores.O}</div>
            </div>
          </div>

          {/* Board */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            background: "rgba(139,0,0,0.12)",
            border: "3px dashed #C0392B",
            borderRadius: "16px",
            padding: "14px",
          }}>
            {squares.map((sq, i) => (
              <Cell
                key={i}
                value={sq}
                index={i}
                onClick={handleClick}
                isWinning={winLine.includes(i)}
                disabled={!!result || isDraw}
                isXTurn={isX}
              />
            ))}
          </div>

          {/* Decorative dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "1rem" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "2px", background: i === 2 ? "#C0392B" : "transparent", border: "2px solid #C0392B", opacity: 0.7 }} />
            ))}
          </div>
        </div>
      </ScreenTransition>
    </div>
  );
};

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [appScreen, setAppScreen] = useState("intro"); // intro | game

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Boogaloo&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FF644B; }
      `}</style>
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E8503A 0%, #D44030 40%, #C03428 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Boogaloo', cursive",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background texture */}
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(245,200,66,0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139,0,0,0.2) 0%, transparent 50%)`,
          pointerEvents: "none",
        }} />

        {/* Main card */}
        <div style={{
          width: "100%",
          maxWidth: "480px",
          background: "rgba(232, 80, 58, 0.55)",
          backdropFilter: "blur(12px)",
          border: "3px dashed #C0392B",
          borderRadius: "24px",
          padding: "1.5rem 1rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          position: "relative",
          minHeight: "580px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Top label */}
          <div style={{
            position: "absolute",
            top: "1rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#C0392B",
            border: "2px solid #8B0000",
            borderRadius: "6px",
            padding: "0.2rem 0.8rem",
            fontFamily: "'Boogaloo', cursive",
            fontSize: "0.75rem",
            color: "#F5C842",
            letterSpacing: "0.2em",
            whiteSpace: "nowrap",
          }}>
            ✦ ELEKID &amp; MAGBY ✦
          </div>

          <div style={{ position: "relative", width: "100%", marginTop: "1.5rem" }}>
            <ScreenTransition show={appScreen === "intro"} from="bottom">
              <IntroScreen onStart={() => setAppScreen("game")} />
            </ScreenTransition>
            <ScreenTransition show={appScreen === "game"} from="bottom">
              <GameBoard onBackToIntro={() => setAppScreen("intro")} />
            </ScreenTransition>
          </div>
        </div>
      </div>
    </>
  );
}