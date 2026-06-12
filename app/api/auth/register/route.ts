import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

import {
hashPassword,
validatePassword
} from "@/lib/password";

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

const passwordValidation =
  validatePassword(password);

if (!passwordValidation.valid) {
  return NextResponse.json(
    {
      success: false,
      message:
        passwordValidation.message
    },
    {
      status: 400
    }
  );
}

const { data: existingUser } =
  await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .single();

if (existingUser) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Username already exists"
    },
    {
      status: 409
    }
  );
}

const passwordHash =
  await hashPassword(password);

const { data, error } =
  await supabase
    .from("users")
    .insert({
      username,
      password_hash:
        passwordHash
    })
    .select()
    .single();

if (error) {
  return NextResponse.json(
    {
      success: false,
      message:
        error.message
    },
    {
      status: 500
    }
  );
}

return NextResponse.json({
  success: true,
  message:
    "User registered successfully",
  user: {
    id: data.id,
    username: data.username
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
