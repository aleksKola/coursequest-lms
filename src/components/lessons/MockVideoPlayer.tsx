import { Play } from "lucide-react";

type MockVideoPlayerProps = {
  thumbnail: string;
  title: string;
};

export function MockVideoPlayer({ thumbnail, title }: MockVideoPlayerProps) {
  return (
    <div
      className="relative flex aspect-video w-full items-center justify-center rounded-lg bg-cover bg-center"
      style={{ backgroundImage: `url(${thumbnail})` }}
    >
      <div className="absolute inset-0 rounded-lg bg-black/40" />
      <button
        type="button"
        aria-label={`Play ${title}`}
        className="relative flex size-16 items-center justify-center rounded-full bg-white/90 transition-transform hover:scale-105"
      >
        <Play className="size-6 fill-black text-black" />
      </button>
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 rounded-b-lg bg-black/50 px-3 py-2 text-xs text-white">
        <span>0:00</span>
        <div className="h-1 flex-1 rounded-full bg-white/30">
          <div className="h-full w-0 rounded-full bg-white" />
        </div>
        <span>—:—</span>
      </div>
    </div>
  );
}
