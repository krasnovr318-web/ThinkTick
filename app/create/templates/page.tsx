import Link from "next/link";

const templates = [
  {
    id: 1,
    title: "Math Quiz",
    description:
      "Basic mathematics questions for students.",
    image:
      "/pic/create-test-profile.png"
  },
  {
    id: 2,
    title: "History Quiz",
    description:
      "Questions about historical events and famous people.",
    image:
      "/pic/create-test-search.png"
  },
  {
    id: 3,
    title: "Geography Quiz",
    description:
      "Countries, capitals and world landmarks.",
    image:
      "/pic/create-test-settings.png"
  },
  {
    id: 4,
    title: "English Vocabulary",
    description:
      "Practice words, grammar and translations.",
    image:
      "/pic/create-test-profile.png"
  },
  {
    id: 5,
    title: "Fun Quiz",
    description:
      "Funny questions for friends and communities.",
    image:
      "/pic/create-test-search.png"
  }
];

export default function TemplatesPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">

          <img
            src="/pic/create-test.png"
            alt="Templates"
            width={110}
            height={110}
            className="mx-auto mb-6"
          />

          <h1 className="text-5xl font-bold mb-4">
            Quiz Templates
          </h1>

          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Start with a ready-made template
            and customize it however you want.
          </p>

        </div>

        {/* Templates */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {templates.map((template) => (
            <div
              key={template.id}
              className="card p-8 flex flex-col"
            >

              <img
                src={template.image}
                alt={template.title}
                width={100}
                height={100}
                className="mx-auto mb-6"
              />

              <h2 className="text-2xl font-bold mb-4 text-center">
                {template.title}
              </h2>

              <p className="opacity-70 text-center flex-1">
                {template.description}
              </p>

              <Link
                href={`/create/editor?template=${template.id}`}
                className="primary-btn mt-8 text-center"
              >
                Use Template
              </Link>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}