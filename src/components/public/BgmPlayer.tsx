"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

interface BgmSettings {
  enableBgm?: boolean | null;
  audioUrl?: string | null;
  volume?: number | null;
}

interface BgmContextValue {
  isPlaying: boolean;
  hasError: boolean;
  hasAudio: boolean;
  togglePlay: () => void;
  stopAll: () => void;
}

const BgmContext = createContext<BgmContextValue>({
  isPlaying: false,
  hasError: false,
  hasAudio: false,
  togglePlay: () => {},
  stopAll: () => {},
});

export function useBgm() {
  return useContext(BgmContext);
}

declare global {
  interface Window { YT?: any; onYouTubeIframeAPIReady?: () => void }
}

function isYoutubeUrl(url: string) {
  return /(?:youtube\.com|youtu\.be)/.test(url);
}

function extractYoutubeId(url: string) {
  const m = url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/|youtube\.com\/embed\/)([^?&"'>\s]+)/);
  return m ? m[1] : null;
}

export default function BgmPlayer({ settings, children }: { settings: BgmSettings | null; children?: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const ytReadyRef = useRef(false);

  const url = settings?.audioUrl || "";
  const isYt = settings?.enableBgm && url ? isYoutubeUrl(url) : false;
  const youtubeId = isYt && url ? extractYoutubeId(url) : null;
  const hasAudio = !!(settings?.enableBgm && url);

  const stopAll = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (ytPlayerRef.current && ytReadyRef.current) {
      ytPlayerRef.current.stopVideo();
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!settings?.enableBgm || !url || isYoutubeUrl(url)) return;
    const audio = new Audio(url);
    audio.volume = ((settings.volume ?? 30) / 100);
    audio.loop = true;
    audioRef.current = audio;
    return () => { stopAll(); audioRef.current = null; };
  }, [settings?.enableBgm, url, settings?.volume, stopAll]);

  useEffect(() => {
    if (!settings?.enableBgm || !youtubeId) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {
      ytPlayerRef.current = new window.YT.Player("yt-bgm-player", {
        height: "1", width: "1",
        videoId: youtubeId,
        playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, playsinline: 1, loop: 1, playlist: youtubeId },
        events: {
          onReady: () => { ytReadyRef.current = true; ytPlayerRef.current.setVolume(settings?.volume ?? 30); },
        },
      });
    };
    return () => { stopAll(); ytReadyRef.current = false; ytPlayerRef.current = null; };
  }, [settings?.enableBgm, youtubeId, settings?.volume, stopAll]);

  const togglePlay = useCallback(() => {
    if (!hasAudio || hasError) return;
    if (isPlaying) {
      stopAll();
    } else {
      setHasError(false);
      if (isYt && ytPlayerRef.current && ytReadyRef.current) {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      } else if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
      } else if (!isYt) {
        const audio = new Audio(url);
        audio.volume = ((settings?.volume ?? 30) / 100);
        audio.loop = true;
        audioRef.current = audio;
        audio.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
      }
    }
  }, [hasAudio, hasError, isPlaying, isYt, url, settings?.volume, stopAll]);

  return (
    <BgmContext.Provider value={{ isPlaying, hasError, hasAudio, togglePlay, stopAll }}>
      {isYt && <div id="yt-bgm-player" className="hidden" />}
      {children}
      {settings?.enableBgm && isPlaying && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-1.5 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow-lg border border-gray-200 text-xs text-gray-600">
          <span className="w-1 h-3 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
          <span className="w-1 h-3 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
          <span className="w-1 h-3 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
          <span className="ml-1.5 font-medium">Now Playing</span>
        </div>
      )}
    </BgmContext.Provider>
  );
}
