import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12 overflow-hidden">
      <div className="max-w-6xl w-full">

        {/* Hero */}
        <div className="text-center mb-16">

          <div className="flex justify-center mb-6 gap-4 flex-wrap">

            <img
              src="/pic/create-test-profile.png"
              alt="ThinkTick"
              width={90}
              height={90}
              className="animate-bounce"
            />

            <img
              src="/pic/create-test-search.png"
              alt="Search"
              width={90}
              height={90}
              className="animate-pulse"
            />

            <img
              src="/pic/create-test-settings.png"
              alt="Settings"
              width={90}
              height={90}
              className="animate-bounce"
            />

          </div>

          <h1 className="text-6xl font-bold mb-4">
            ThinkTick
          </h1>

          <p className="text-xl opacity-75 max-w-2xl mx-auto">
            Create quizzes and tests for education and fun.
            Share them with friends, students and everyone
            around the world.
          </p>

        </div>

        {/* Main Buttons */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          <Link
            href="/create"
            className="card p-10 text-center hover:scale-105 transition"
          >
            <img
              src="/pic/create-test.png"
              alt="Create"
              width={140}
              height={140}
              className="mx-auto mb-6"
            />

            <h2 className="text-3xl font-bold mb-4">
              Create Test
            </h2>

            <p className="opacity-70">
              Build quizzes with up to
              31 questions and multiple
              correct answers.
            </p>
          </Link>

          <Link
            href="/search"
            className="card p-10 text-center hover:scale-105 transition"
          >
            <img
              src="/pic/search.png"
              alt="Search"
              width={140}
              height={140}
              className="mx-auto mb-6"
            />

            <h2 className="text-3xl font-bold mb-4">
              Search
            </h2>

            <p className="opacity-70">
              Find quizzes by ID,
              title, popularity
              or creation date.
            </p>
          </Link>

        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">

          <div className="card p-6 text-center">
            <h3 className="text-xl font-bold mb-3">
              Education
            </h3>

            <p className="opacity-70">
              Perfect for teachers,
              schools and online learning.
            </p>
          </div>

          <div className="card p-6 text-center">
            <h3 className="text-xl font-bold mb-3">
              Fun
            </h3>

            <p className="opacity-70">
              Create entertaining quizzes
              for friends and communities.
            </p>
          </div>

          <div className="card p-6 text-center">
            <h3 className="text-xl font-bold mb-3">
              Statistics
            </h3>

            <p className="opacity-70">
              Track likes, dislikes
              and quiz results.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}