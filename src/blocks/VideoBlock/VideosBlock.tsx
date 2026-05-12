"use client";

import clsx from "clsx";
import s from "./VideosBlock.module.scss";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { VideoT } from "@/types/types";

interface VideosBlockProps {
  className?: string;
  videos: VideoT | null;
}

export const VideosBlock = ({ className, videos }: VideosBlockProps) => {
  // Функция для извлечения videoId из URL
  const getVideoId = (html: string | undefined) => {
    if (!html) return "";
    const urlPart = html.replace("<p>", "").replace("</p>", "");
    const videoId = urlPart.split("v=")[1];
    return videoId || "";
  };

  return (
    <div className={clsx(s.container, className)}>
      <div className={clsx(s.title, "h2")}>Видео проектов</div>

      <div className={s.videos}>
        {Object.values(videos?.fields || {}).map((video, index) => {
          const videoId = getVideoId(video.html);
          return (
            <div className={s.video} key={index}>
              <LiteYouTubeEmbed
                id={videoId}
                title="YouTube video player"
                noCookie={true}
                poster="hqdefault"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
