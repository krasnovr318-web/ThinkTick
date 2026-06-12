import Link from "next/link";

type Props = {
  id: string;

  title: string;

  description: string;

  createdAt: string;

  reactions?: {
    good: number;
    normal: number;
    upset: number;
    angry: number;
  };

  editable?: boolean;

  onDelete?: (
    quizId: string
  ) => void;
};

export default function QuizCard({
  id,
  title,
  description,
  createdAt,

  reactions,

  editable = false,

  onDelete
}: Props) {
  const totalReactions =
    (reactions?.good || 0) +
    (reactions?.normal || 0) +
    (reactions?.upset || 0) +
    (reactions?.angry || 0);

  return (
    <div className="card">

      <div className="flex justify-between items-start">

        <div className="flex-1">

          <Link href={`/quiz/${id}`}>
            <h2 className="text-2xl font-semibold hover:underline">
              {title}
            </h2>
          </Link>

          <p className="mt-2 opacity-80">
            {description}
          </p>

          <div className="mt-4 text-sm opacity-70">
            Created:
            {" "}
            {new Date(
              createdAt
            ).toLocaleDateString()}
          </div>

        </div>

        {editable && (
          <div className="flex gap-3 ml-4">

            <Link
              href={`/create/editor?id=${id}`}
              className="hover:scale-105 transition"
            >
              <img
                src="/pic/pencil.png"
                alt="Edit"
                width={32}
                height={32}
              />
            </Link>

            <button
              onClick={() =>
                onDelete?.(id)
              }
              className="hover:scale-105 transition"
            >
              <img
                src="/pic/trashcan.png"
                alt="Delete"
                width={32}
                height={32}
              />
            </button>

          </div>
        )}

      </div>

      {reactions && (
        <div className="flex flex-wrap gap-4 mt-6">

          <div className="flex items-center gap-2">

            <img
              src="/pic/good reaction.png"
              alt="Good"
              width={24}
              height={24}
            />

            <span>
              {reactions.good}
            </span>

          </div>

          <div className="flex items-center gap-2">

            <img
              src="/pic/normal reaction.png"
              alt="Normal"
              width={24}
              height={24}
            />

            <span>
              {reactions.normal}
            </span>

          </div>

          <div className="flex items-center gap-2">

            <img
              src="/pic/upset reaction.png"
              alt="Upset"
              width={24}
              height={24}
            />

            <span>
              {reactions.upset}
            </span>

          </div>

          <div className="flex items-center gap-2">

            <img
              src="/pic/angry reaction.png"
              alt="Angry"
              width={24}
              height={24}
            />

            <span>
              {reactions.angry}
            </span>

          </div>

          <div className="ml-auto font-semibold">
            Total:
            {" "}
            {totalReactions}
          </div>

        </div>
      )}

    </div>
  );
}