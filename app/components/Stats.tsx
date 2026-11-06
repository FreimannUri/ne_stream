"use client";
import { useEffect, useState } from "react";

type Esp = {
  up: number;
  cap: number;
  inv: number;
  err: number;
  fps: number;
  kbs: number;
  send_ms: number;
  drop: number;
  // sent by the newer firmware only
  wait?: number;
  kb_frame?: number;
  lag?: number;
  wdrops?: number;
  pdrops?: number;
  heap?: number;
  rssi?: number;
  temp?: number;
};
type Sample = {
  seq: number;
  ts: number;
  esp: Esp;
  ffmpeg_cpu: number;
  mtx_cpu: number;
};

const CARDS: {
  label: string;
  unit: string;
  get: (s: Sample) => number | undefined;
}[] = [
  { label: "Capture", unit: "fps", get: (s) => s.esp.cap },
  { label: "Sent", unit: "fps", get: (s) => s.esp.fps },
  { label: "Upload", unit: "KB/s", get: (s) => s.esp.kbs },
  { label: "Frame size", unit: "KB", get: (s) => s.esp.kb_frame },
  { label: "Send wait", unit: "ms/frame", get: (s) => s.esp.send_ms },
  { label: "Waiting for buffer", unit: "%", get: (s) => s.esp.wait },
  { label: "Dropped", unit: "/s", get: (s) => s.esp.drop },
  { label: "Scheduler lag", unit: "ms (max)", get: (s) => s.esp.lag },
  { label: "Chip temperature", unit: "°C", get: (s) => s.esp.temp },
  { label: "Wi-Fi signal", unit: "dBm", get: (s) => s.esp.rssi },
  { label: "Free heap", unit: "KB", get: (s) => s.esp.heap },
  { label: "Transcoder CPU", unit: "% of 1 core", get: (s) => s.ffmpeg_cpu },
];

function Spark({ data }: { data: number[] }) {
  // zero-based for normal counters; spans down to the minimum for negative values (dBm)
  const lo = Math.min(0, ...data);
  const hi = Math.max(lo + 1, ...data);
  const pts = data
    .map(
      (v, i) =>
        `${(i / Math.max(1, data.length - 1)) * 100},${29 - ((v - lo) / (hi - lo)) * 27}`,
    )
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className="h-8 w-full text-emerald-500"
    >
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Card({
  label,
  value,
  unit,
  data,
}: {
  label: string;
  value: number;
  unit: string;
  data: number[];
}) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold tabular-nums">
        {value} <span className="text-xs font-normal">{unit}</span>
      </div>
      <Spark data={data} />
    </div>
  );
}

export default function Stats() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [offline, setOffline] = useState(true);

  useEffect(() => {
    let since = 0,
      boot = 0,
      lastTs = 0,
      stop = false;
    async function tick() {
      try {
        const d = await (
          await fetch(`/api/stats?since=${since}`, { cache: "no-store" })
        ).json();
        if (d.boot && d.boot !== boot) {
          boot = d.boot;
          since = 0;
          setSamples([]);
        }
        if (d.samples?.length) {
          since = d.samples[d.samples.length - 1].seq;
          lastTs = d.samples[d.samples.length - 1].ts;
          setSamples((p) => [...p, ...d.samples].slice(-120));
        }
        setOffline(!!d.offline || !lastTs || d.now - lastTs > 5);
      } catch {
        setOffline(true);
      }
      if (!stop) setTimeout(tick, 1000);
    }
    tick();
    return () => {
      stop = true;
    };
  }, []);

  const last = samples[samples.length - 1];
  if (!last)
    return (
      <p className="text-sm text-muted-foreground">
        SoC stats: waiting for data…
      </p>
    );

  return (
    <section
      className={`mx-auto mt-4 w-full max-w-160 ${offline ? "opacity-50" : ""}`}
    >
      <h2 className="mb-2 text-sm font-medium">
        ESP32-S3 {offline && "(offline)"}
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {CARDS.map((c) => {
          const value = c.get(last);
          if (value === undefined) return null; // firmware doesn't send this field
          return (
            <Card
              key={c.label}
              label={c.label}
              value={value}
              unit={c.unit}
              data={samples.map((s) => c.get(s) ?? 0)}
            />
          );
        })}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Uptime {Math.floor(last.esp.up / 60)} min · bad frames {last.esp.inv} ·
        capture errors {last.esp.err}
        {last.esp.wdrops !== undefined && ` · Wi-Fi drops ${last.esp.wdrops}`}
        {last.esp.pdrops !== undefined && ` · push drops ${last.esp.pdrops}`}
      </p>
    </section>
  );
}
