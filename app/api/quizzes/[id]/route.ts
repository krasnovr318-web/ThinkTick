import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

type RouteContext = {
params: Promise<{
id: string;
}>;
};

export async function GET(
request: NextRequest,
context: RouteContext
) {
try {
const { id } =
await context.params;


const { data, error } =
  await supabase
    .from("quizzes")
    .select(`
      *,
      questions (
        *,
        answers (*)
      )
    `)
    .eq("id", id)
    .single();

if (error || !data) {
  return NextResponse.json(
    {
      success: false,
      message: "Quiz not found"
    },
    {
      status: 404
    }
  );
}

return NextResponse.json({
  success: true,
  quiz: data
});


} catch {
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

export async function PUT(
request: NextRequest,
context: RouteContext
) {
try {
const { id } =
await context.params;


const body =
  await request.json();

const {
  title,
  description
} = body;

const { data, error } =
  await supabase
    .from("quizzes")
    .update({
      title,
      description,
      updated_at:
        new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();

if (error) {
  return NextResponse.json(
    {
      success: false,
      message: error.message
    },
    {
      status: 500
    }
  );
}

return NextResponse.json({
  success: true,
  quiz: data
});
```

} catch {
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

export async function DELETE(
request: NextRequest,
context: RouteContext
) {
try {
const { id } =
await context.params;


const { error } =
  await supabase
    .from("quizzes")
    .delete()
    .eq("id", id);

if (error) {
  return NextResponse.json(
    {
      success: false,
      message: error.message
    },
    {
      status: 500
    }
  );
}

return NextResponse.json({
  success: true,
  message:
    "Quiz deleted successfully"
});


} catch {
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
