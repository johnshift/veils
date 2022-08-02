import { createClient } from '@supabase/supabase-js';

import { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE } from './constants';

export const adminClient = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE,
);
