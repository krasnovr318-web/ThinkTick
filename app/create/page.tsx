import Link from "next/link";

export default function CreatePage() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">

          <img
            src="/pic/create-test.png"
            alt="Create Test"
            width={120}
            height={120}
            className="mx-auto mb-6"
          />

          <h1 className="text-5xl font-bold mb-4">
            Create Quiz
          </h1>

          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Start from a ready-made template
            or build your own quiz from scratch.
          </p>

        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Templates */}
          <Link
            href="/create/templates"
            className="card p-10 text-center hover:scale-105 transition"
          >

            <img
              src="/pic/create-test-search.png"
              alt="Templates"
              width={140}
              height={140}
              className="mx-auto mb-6"
            />

            <h2 className="text-3xl font-bold mb-4">
              Templates
            </h2>

            <p className="opacity-70">
              Choose from ready-made quizzes
              and customize them however you want.
            </p>

          </Link>

          {/* Editor */}
          <Link
            href="/create/editor"
            className="card p-10 text-center hover:scale-105 transition"
          >

            <img
              src="/pic/create-test-profile.png"
              alt="Editor"
              width={140}
              height={140}
              className="mx-auto mb-6"
            />

            <h2 className="text-3xl font-bold mb-4">
              Editor
            </h2>

            <p className="opacity-70">
              Create your own quiz with up to
              31 questions and multiple correct answers.
            </p>

          </Link>

        </div>

        {/* Bottom Information */}
        <div className="card p-8 mt-16 max-w-4xl mx-auto">

          <h3 className="text-2xl font-bold mb-4 text-center">
            What can you create?
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="text-center">
              <h4 className="font-bold mb-2">
                Education
              </h4>

              <p className="opacity-70">
                Exams, homework and classroom tests.
              </p>
            </div>

            <div className="text-center">
              <h4 className="font-bold mb-2">
                Entertainment
              </h4>

              <p className="opacity-70">
                Fun quizzes for friends and communities.
              </p>
            </div>

            <div className="text-center">
              <h4 className="font-bold mb-2">
                Knowledge
              </h4>

              <p className="opacity-70">
                Practice languages, history,
                mathematics and much more.
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}