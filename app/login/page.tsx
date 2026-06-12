"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
const [username, setUsername] =
useState("");

const [password, setPassword] =
useState("");

const handleLogin = (
e: React.FormEvent
) => {
e.preventDefault();

```
console.log({
  username,
  password
});

alert(
  "Login system will be connected later."
);
```

};

return ( <main className="min-h-screen flex items-center justify-center p-6"> <div className="card w-full max-w-md">

```
    <div className="text-center mb-8">

      <img
        src="/pic/create-test-profile.png"
        alt="Profile"
        width={80}
        height={80}
        className="mx-auto mb-4"
      />

      <h1 className="text-4xl font-bold">
        ThinkTick
      </h1>

      <p className="opacity-70 mt-2">
        Sign in to your account
      </p>

    </div>

    <form
      onSubmit={handleLogin}
      className="space-y-4"
    >

      <input
        type="text"
        placeholder="Username"
        className="w-full p-3 border rounded"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border rounded"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        required
      />

      <button
        type="submit"
        className="primary-btn w-full"
      >
        Login
      </button>

    </form>

    <div className="text-center mt-6">

      <p className="opacity-70">
        Don't have an account?
      </p>

      <Link
        href="/register"
        className="font-semibold"
      >
        Create Account
      </Link>

    </div>

  </div>
</main>
```

);
}
