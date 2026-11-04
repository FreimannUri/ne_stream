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
      <span style={{ position: "absolute", top: 8, left: 8, color: "#fff" }}>
        {status}
      </span>
    </div>
  );
}
