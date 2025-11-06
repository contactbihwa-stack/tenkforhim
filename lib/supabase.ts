// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 타입 정의
export type PoemRow = {
  id: string;
  title: string;      // "ELON-SUN-0008 - 3" 형식
  content: string;    // 시 본문
  category: string;   // "IGNITION" 같은 소주제
  created_at?: string;
};
