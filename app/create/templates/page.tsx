import Link from "next/link";

const templates = [
{
id: 1,
title: "World History",
description: "A quiz about important events in world history."
},
{
id: 2,
title: "Basic Mathematics",
description: "Arithmetic, algebra and logical thinking."
},
{
id: 3,
title: "English Language",
description: "Grammar, vocabulary and reading skills."
},
{
id: 4,
title: "Geography of Europe",
description: "Countries, capitals and landmarks."
},
{
id: 5,
title: "Video Games",
description: "Popular games and gaming culture."
},
{
id: 6,
title: "Science",
description: "Physics, chemistry and biology."
}
];

export default function TemplatesPage() {
return ( <main className="min-h-screen p-6"> <div className="max-w-6xl mx-auto">

```
    <Link
      href="/create"
      className="inline-block mb-8 opacity-70 hover:opacity-100"
    >
      ← Back
    </Link>

    <h1 className="text-4xl font-bold mb-2">
      Quiz Templates
    </h1>

    <p className="opacity-70 mb-10">
      Choose a template and customize it.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {templates.map((template) => (
        <div
          key={template.id}
          className="card"
        >
          <div className="flex flex-col gap-4">

            <img
              src="/pic/brush.png"
              alt="Template"
              width={60}
              height={60}
            />

            <h2 className="text-2xl font-semibold">
              {template.title}
            </h2>

            <p className="opacity-80">
              {template.description}
            </p>

            <Link
              href={`/create/editor?template=${template.id}`}
              className="primary-btn text-center"
            >
              Use Template
            </Link>

          </div>
        </div>
      ))}

    </div>

  </div>
</main>
```

);
}

