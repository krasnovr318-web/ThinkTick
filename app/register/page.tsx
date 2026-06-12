"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
const [username, setUsername] =
useState("");

const [password, setPassword] =
useState("");

const [confirmPassword, setConfirmPassword] =
useState("");

const handleRegister = (
e: React.FormEvent
) => {
e.preventDefault();

```
if (password !== confirmPassword) {
  alert("Passwords do not match");
  return;
}

console.log({
  username,
  password
});

alert(
  "Registration will be connected later."
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
        Create Account
      </h1>

      <p className="opacity-70 mt-2">
        Join ThinkTick
      </p>

    </div>

    <form
      onSubmit={handleRegister}
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

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-3 border rounded"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }
        required
      />

      <button
        type="submit"
        className="primary-btn w-full"
      >
        Register
      </button>

    </form>

    <div className="text-center mt-6">

      <p className="opacity-70">
        Already have an account?
      </p>

      <Link
        href="/login"
        className="font-semibold"
      >
        Login
      </Link>

    </div>

  </div>
</main>
```

);
}
