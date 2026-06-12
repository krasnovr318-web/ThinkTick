import Link from "next/link";

export default function CreatePage() {
return ( <main className="min-h-screen p-6"> <div className="max-w-5xl mx-auto">


    {/* Заголовок */}

    <div className="mb-10">
      <h1 className="text-4xl font-bold">
        Create Quiz
      </h1>

      <p className="opacity-70 mt-2">
        Choose how you want to create your quiz.
      </p>
    </div>

    {/* Кнопка назад */}

    <Link
      href="/"
      className="inline-block mb-8 opacity-70 hover:opacity-100"
    >
      ← Back to Home
    </Link>

    {/* Выбор режима */}

    <div className="grid md:grid-cols-2 gap-8">

      {/* Templates */}

      <Link
        href="/create/templates"
        className="card hover:scale-[1.02] transition"
      >
        <div className="flex flex-col items-center text-center gap-4">

          <img
            src="/pic/brush.png"
            alt="Templates"
            width={80}
            height={80}
          />

          <h2 className="text-3xl font-bold">
            Templates
          </h2>

          <p className="opacity-80">
            Start from a ready-made quiz and
            customize it to your needs.
          </p>

        </div>
      </Link>

      {/* Editor */}

      <Link
        href="/create/editor"
        className="card hover:scale-[1.02] transition"
      >
        <div className="flex flex-col items-center text-center gap-4">

          <img
            src="/pic/pencil.png"
            alt="Editor"
            width={80}
            height={80}
          />

          <h2 className="text-3xl font-bold">
            Editor
          </h2>

          <p className="opacity-80">
            Create a completely new quiz
            from scratch.
          </p>

        </div>
      </Link>

    </div>

    {/* Информация */}

    <div className="card mt-10">
      <h3 className="text-xl font-semibold mb-3">
        Quiz Rules
      </h3>

      <ul className="list-disc ml-6 space-y-2">
        <li>Minimum 1 question</li>
        <li>Maximum 31 questions</li>
        <li>Each question must have answers</li>
        <li>At least one correct answer is required</li>
        <li>Multiple correct answers are supported</li>
      </ul>
    </div>

  </div>
</main>


);
}
