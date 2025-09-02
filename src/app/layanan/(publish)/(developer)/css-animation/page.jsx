"use client";
import { useState } from "react";

const keyframePresets = {
  fadeIn: `0% { opacity: 0; } 100% { opacity: 1; }`,
  fadeOut: `0% { opacity: 1; } 100% { opacity: 0; }`,
  slideInLeft: `0% { transform: translateX(-100%); } 100% { transform: translateX(0); }`,
  slideInRight: `0% { transform: translateX(100%); } 100% { transform: translateX(0); }`,
  slideInUp: `0% { transform: translateY(100%); } 100% { transform: translateY(0); }`,
  slideInDown: `0% { transform: translateY(-100%); } 100% { transform: translateY(0); }`,
  zoomIn: `0% { transform: scale(0); } 100% { transform: scale(1); }`,
  zoomOut: `0% { transform: scale(1); } 100% { transform: scale(0); }`,
  bounce: `
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
  `,
  flash: `
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  `,
  pulse: `
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `,
  rubberBand: `
    0% { transform: scale(1); }
    30% { transform: scale(1.25, 0.75); }
    40% { transform: scale(0.75, 1.25); }
    50% { transform: scale(1.15, 0.85); }
    65% { transform: scale(.95,1.05); }
    75% { transform: scale(1.05,.95); }
    100% { transform: scale(1); }
  `,
  shake: `
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
  `,
  swing: `
    20% { transform: rotate(15deg); }
    40% { transform: rotate(-10deg); }
    60% { transform: rotate(5deg); }
    80% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  `,
  wobble: `
    0% { transform: translateX(0%); }
    15% { transform: translateX(-25%) rotate(-5deg); }
    30% { transform: translateX(20%) rotate(3deg); }
    45% { transform: translateX(-15%) rotate(-3deg); }
    60% { transform: translateX(10%) rotate(2deg); }
    75% { transform: translateX(-5%) rotate(-1deg); }
    100% { transform: translateX(0%); }
  `,
  tada: `
    0% { transform: scale(1); }
    10%, 20% { transform: scale(0.9) rotate(-3deg); }
    30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
    40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
    100% { transform: scale(1) rotate(0); }
  `,
  flip: `
    0% { transform: perspective(400px) rotateY(0deg); }
    100% { transform: perspective(400px) rotateY(360deg); }
  `,
  rotateIn: `
    0% { transform: rotate(-200deg); opacity: 0; }
    100% { transform: rotate(0); opacity: 1; }
  `,
  rotateOut: `
    0% { transform: rotate(0); opacity: 1; }
    100% { transform: rotate(200deg); opacity: 0; }
  `,
  lightSpeedIn: `
    0% { transform: translateX(100%) skewX(-30deg); opacity: 0; }
    60% { transform: translateX(-20%) skewX(20deg); opacity: 1; }
    80% { transform: translateX(0%) skewX(-5deg); }
    100% { transform: translateX(0%) skewX(0); }
  `,
  lightSpeedOut: `
    0% { opacity: 1; }
    100% { transform: translateX(100%) skewX(30deg); opacity: 0; }
  `,
  fadeInDown: `
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  `,
  fadeOutUp: `
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
  `,
  bounceIn: `
    0% { opacity: 0; transform: scale(0.3); }
    50% { opacity: 1; transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); }
  `,
  bounceOut: `
    0% { transform: scale(1); }
    25% { transform: scale(0.95); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0; transform: scale(0.3); }
  `,
  rollIn: `
    0% { opacity: 0; transform: translateX(-100%) rotate(-120deg); }
    100% { opacity: 1; transform: translateX(0) rotate(0deg); }
  `,
  rollOut: `
    0% { opacity: 1; transform: translateX(0) rotate(0deg); }
    100% { opacity: 0; transform: translateX(100%) rotate(120deg); }
  `,
  flipInX: `
    0% { transform: perspective(400px) rotateX(90deg); opacity: 0; }
    100% { transform: perspective(400px) rotateX(0); opacity: 1; }
  `,
  flipOutX: `
    0% { transform: perspective(400px) rotateX(0); opacity: 1; }
    100% { transform: perspective(400px) rotateX(90deg); opacity: 0; }
  `,
};

export default function Page() {
  const [form, setForm] = useState({
    name: "fadeIn",
    duration: "1s",
    timingFunction: "ease-in-out",
    delay: "0s",
    iterationCount: "infinite",
    direction: "normal",
    fillMode: "forwards",
    playState: "running",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const keyframes = keyframePresets[form.name];

  const previewStyle = {
    animationName: form.name,
    animationDuration: form.duration,
    animationTimingFunction: form.timingFunction,
    animationDelay: form.delay,
    animationIterationCount: form.iterationCount,
    animationDirection: form.direction,
    animationFillMode: form.fillMode,
    animationPlayState: form.playState,
  };

  const cssOutput = `
.selector {
  animation-name: ${form.name};
  animation-duration: ${form.duration};
  animation-timing-function: ${form.timingFunction};
  animation-delay: ${form.delay};
  animation-iteration-count: ${form.iterationCount};
  animation-direction: ${form.direction};
  animation-fill-mode: ${form.fillMode};
  animation-play-state: ${form.playState};
}

@keyframes ${form.name} {
  ${keyframes}
}`.trim();

  return (
    <main className="container mx-auto min-h-screen px-3 md:px-0 pb-32">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          CSS Animation | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Ciptakan animasi CSS tanpa coding, mudah dan cepat. Pilih preset dan
          atur parameter
        </p>
      </div>

      <div className="bg-white p-4 rounded border border-slate-300 w-full space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block font-semibold mb-1">Preset Animasi</label>
            <select
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input w-full border border-slate-300 px-2 py-1.5 rounded-md"
            >
              {Object.keys(keyframePresets).map((preset) => (
                <option key={preset} value={preset}>
                  {preset}
                </option>
              ))}
            </select>
          </div>

          {[
            ["duration", ["0.5s", "1s", "2s", "3s", "5s"]],
            ["delay", ["0s", "0.5s", "1s", "2s"]],
            [
              "timingFunction",
              ["ease", "linear", "ease-in", "ease-out", "ease-in-out"],
            ],
            ["iterationCount", ["1", "2", "3", "infinite"]],
            [
              "direction",
              ["normal", "reverse", "alternate", "alternate-reverse"],
            ],
            ["fillMode", ["none", "forwards", "backwards", "both"]],
            ["playState", ["running", "paused"]],
          ].map(([name, options]) => (
            <div key={name}>
              <label className="block font-semibold mb-1 capitalize">
                {name}
              </label>
              <select
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="input w-full border border-slate-300 px-2 py-1.5 rounded-md"
              >
                {options.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes ${form.name} { ${keyframes} }`}</style>

      <div className="mt-8 border border-slate-300 rounded-md overflow-hidden p-4">
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <div
          className="w-32 h-32 bg-blue-500 text-white flex items-center justify-center rounded shadow"
          style={previewStyle}
        >
          <img
            src="/favicon.png"
            alt="box toolsz"
            width="auto"
            height="auto"
            className="rounded-sm"
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Hasil CSS</h2>
        <pre className="bg-black text-green-300 p-4 rounded overflow-auto text-sm whitespace-pre-wrap">
          {cssOutput}
        </pre>
      </div>
    </main>
  );
}
