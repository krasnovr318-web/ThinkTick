import Link from "next/link";

export default function HomePage() {
return ( <main className="min-h-screen flex items-center justify-center p-6"> <div className="w-full max-w-4xl">


    {/* Верхняя панель */}

    <header className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold">
        ThinkTick
      </h1>

      <div className="flex gap-3">
        <Link
          href="/settings"
          className="card hover:scale-105 transition"
        >
          <img
            src="/pic/setting.png"
            alt="Settings"
            width={28}
            height={28}
          />
        </Link>

        <Link
          href="/profile"
          className="card hover:scale-105 transition"
        >
          <img
            src="/pic/create-test-profile.png"
            alt="Profile"
            width={28}
            height={28}
          />
        </Link>
      </div>
    </header>

    {/* Заголовок */}

    <section className="text-center mb-12">
      <h2 className="text-5xl font-bold mb-4">
        ThinkTick
      </h2>

      <p className="text-lg opacity-80">
        Create quizzes, share knowledge,
        and challenge your friends.
      </p>
    </section>

    {/* Главные кнопки */}

    <section className="grid md:grid-cols-2 gap-6 mb-12">

      <Link
        href="/create"
        className="card text-center hover:scale-[1.02] transition"
      >
        <div className="flex flex-col items-center gap-4">
          <img
            src="/pic/pencil.png"
            alt="Create Quiz"
            width={64}
            height={64}
          />

          <h3 className="text-2xl font-semibold">
            Create Test
          </h3>

          <p>
            Build your own quiz from scratch
            or use a template.
          </p>
        </div>
      </Link>

      <Link
        href="/search"
        className="card text-center hover:scale-[1.02] transition"
      >
        <div className="flex flex-col items-center gap-4">
          <img
            src="/pic/time.png"
            alt="Search"
            width={64}
            height={64}
          />

          <h3 className="text-2xl font-semibold">
            Search
          </h3>

          <p>
            Find quizzes by name,
            ID, popularity, or date.
          </p>
        </div>
      </Link>

    </section>

    {/* Популярные тесты */}

    <section>
      <h3 className="text-2xl font-bold mb-4">
        Popular Quizzes
      </h3>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="card">
          <h4 className="font-semibold">
            World History
          </h4>

          <p className="text-sm opacity-70">
            Test your knowledge of history.
          </p>
        </div>

        <div className="card">
          <h4 className="font-semibold">
            Basic Mathematics
          </h4>

          <p className="text-sm opacity-70">
            Numbers, formulas and logic.
          </p>
        </div>

        <div className="card">
          <h4 className="font-semibold">
            Video Games
          </h4>

          <p className="text-sm opacity-70">
            Popular gaming quiz.
          </p>
        </div>

      </div>
    </section>

  </div>
</main>


);
}
