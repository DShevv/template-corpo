import { getVideos } from "@/services/ContentPagesService";
import { VideosBlock } from "./VideosBlock";

export const VideosBlockWrapper = async ({
  className,
}: {
  className?: string;
}) => {
  const videos = await getVideos();

  return <VideosBlock videos={videos} className={className} />;
};
