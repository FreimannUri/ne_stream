"use client";
import { useEffect, useRef, useState } from "react";

export default function Viewer() {
  const video = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState("connecting…");

  useEffect(() => {
    let pc: RTCPeerConnection | null = null;
    let stopped = false;

    async function connect() {
      pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      pc.addTransceiver("video", { direction: "recvonly" });
      pc.ontrack = (e) => {
        if (video.current) video.current.srcObject = e.streams[0];
      };
      pc.onconnectionstatechange = () => {
        const s = pc!.connectionState;
        if (s === "connected") setStatus("live");
        if (s === "failed" || s === "disconnected") retry();
      };

      await pc.setLocalDescription(await pc.createOffer());
      await new Promise<void>((done) => {
        if (pc!.iceGatheringState === "complete") return done();
        pc!.onicegatheringstatechange = () =>
          pc!.iceGatheringState === "complete" && done();
        setTimeout(done, 2000);
      });

      const r = await fetch("/api/whep", {
        method: "POST",
        headers: { "Content-Type": "application/sdp" },
        body: pc.localDescription!.sdp,
      });
      if (!r.ok) {
        setStatus(r.status === 404 ? "stream offline" : `error ${r.status}`);
        return retry();
      }
      await pc.setRemoteDescription({ type: "answer", sdp: await r.text() });
    }

    function retry() {
      pc?.close();
      if (!stopped) setTimeout(() => connect().catch(retry), 3000);
    }

    connect().catch(retry);
    return () => {
      stopped = true;
      pc?.close();
    };
  }, []);

  return (
    <div className="@container relative aspect-video w-full max-w-300 overflow-hidden rounded-xl bg-black">
      <video
        ref={video}
        autoPlay
        muted
        playsInline
        className="block h-full w-full object-contain"
      />

      <span
        className="absolute left-[2cqw] top-[2cqw] flex items-center gap-[1cqw] rounded-full bg-black/50
                    px-[1.6cqw] py-[0.5cqw] text-[length:clamp(10px,2.4cqw,18px)] text-white"
      >
        <span
          className={`size-[1.4cqw] min-h-1.5 min-w-1.5 rounded-full ${
            status === "live" ? "bg-green-500" : "bg-red-500"
          }`}
        />
        {status}
      </span>
    </div>
  );
}
