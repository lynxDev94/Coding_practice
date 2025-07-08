Sure! Here's the clean Markdown version ready to copy:

markdown
Copy
Edit
# Supabase Edge Functions and Auth

Edge Functions work seamlessly with Supabase Auth.

---

## 🧠 Auth Context

When a user makes a request to an Edge Function, you can use the `Authorization` header to set the Auth context in the Supabase client:

```ts
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  // Get the session or user object
  const authHeader = req.headers.get('Authorization')!;
  const token = authHeader.replace('Bearer ', '');
  const { data } = await supabaseClient.auth.getUser(token);
});
The client is created inside the Deno.serve() callback so the Authorization header is captured per request.

🙋 Fetching the User
Extract the JWT token from the Authorization header and use getUser() to fetch the user object:

ts
Copy
Edit
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization') },
      },
    }
  );

  const authHeader = req.headers.get('Authorization')!;
  const token = authHeader.replace('Bearer ', '');
  const { data } = await supabaseClient.auth.getUser(token);
  const user = data.user;

  return new Response(JSON.stringify({ user }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
});
🔒 Row Level Security (RLS)
After initializing the Supabase client with the user's Auth context, all queries will automatically enforce RLS policies:

ts
Copy
Edit
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  const authHeader = req.headers.get('Authorization')!;
  const token = authHeader.replace('Bearer ', '');
  const { data: userData } = await supabaseClient.auth.getUser(token);

  const { data, error } = await supabaseClient.from('profiles').select('*');

  return new Response(JSON.stringify({ data }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
});
