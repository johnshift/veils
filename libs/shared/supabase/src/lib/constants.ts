// Environment variables (anonymous fn to check if exists)
export const {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE,
} = (() => {
  const {
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE,
  } = process.env;

  if (!NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing environment variable NEXT_PUBLIC_SUPABASE_URL');
  }

  if (!NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error(
      'Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY',
    );
  }

  if (!SUPABASE_SERVICE_ROLE) {
    throw new Error('Missing environment variable SUPABASE_SERVICE_ROLE');
  }

  return {
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE,
  };
})();
