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
    <div className="relative w-full max-w-7xl mt-16 mx-auto bg-black">
      <video
        ref={video}
        autoPlay
        muted
        playsInline
        style={{ width: "100%", display: "block" }}
      />
      <span className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
        <span
          className={`size-2 rounded-full ${
            status === "live" ? "bg-green-500" : "bg-red-500"
          }`}
        />
        {status}
      </span>

      <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        ESP32-S3 + OV5640 + Rust
      </span>
    </div>
  );
}
