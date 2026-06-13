"use client";

interface ReactionBarProps {
  likes: number;
  dislikes: number;
  onLike: () => void;
  onDislike: () => void;
}

export default function ReactionBar({
  likes,
  dislikes,
  onLike,
  onDislike
}: ReactionBarProps) {
  return (
    <div className="flex gap-4">

      <button
        onClick={onLike}
        className="
          px-4
          py-2
          border
          rounded
          hover:opacity-80
        "
      >
        👍 {likes}
      </button>

      <button
        onClick={onDislike}
        className="
          px-4
          py-2
          border
          rounded
          hover:opacity-80
        "
      >
        👎 {dislikes}
      </button>

    </div>
  );
}