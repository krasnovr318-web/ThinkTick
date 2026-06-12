import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
title: "ThinkTick",
description: "Create and share quizzes with ThinkTick",
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return ( <html lang="en"> <body>
{/* Декоративные элементы */}

```
    <img
      src="/pic/Confetti.png"
      alt=""
      className="bg-confetti"
    />

    <img
      src="/pic/pencil.png"
      alt=""
      className="bg-pencil"
    />

    {children}
  </body>
</html>
```

);
}
