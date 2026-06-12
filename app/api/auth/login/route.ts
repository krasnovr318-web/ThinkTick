import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

import { verifyPassword } from "@/lib/password";

export async function POST(
request: NextRequest
) {
try {
const body = await request.json();

```
const {
  username,
  password
} = body;

if (!username || !password) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Username and password are required"
    },
    {
      status: 400
    }
  );
}

const { data: user, error } =
  await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

if (error || !user) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Invalid username or password"
    },
    {
      status: 401
    }
  );
}

const passwordValid =
  await verifyPassword(
    password,
    user.password_hash
  );

if (!passwordValid) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Invalid username or password"
    },
    {
      status: 401
    }
  );
}

const sessionToken =
  crypto.randomUUID();

return NextResponse.json({
  success: true,
  message:
    "Login successful",

  token: sessionToken,

  user: {
    id: user.id,
    username:
      user.username,
    theme: user.theme,
    primaryColor:
      user.primary_color
  }
});
```

} catch (error) {
return NextResponse.json(
{
success: false,
message:
"Internal server error"
},
{
status: 500
}
);
}
}
