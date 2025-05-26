import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jsyvvffkzalsmrikepca.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzeXZ2ZmZremFsc21yaWtlcGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMjgxNzUsImV4cCI6MjA2MzgwNDE3NX0.qzVGuW4NjYmSS2Z1F7MK1vjKtbACBCY5bqHxIik5K2c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 