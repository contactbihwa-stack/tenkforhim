// app/essays/page.tsx  ← 서버 컴포넌트 (여기에 'use client' 쓰지 마세요)
export const dynamic = 'force-dynamic';

import EssaysClient from './EssaysClient';  // ✅ 직접 임포트

export default function Page() {
  return <EssaysClient />;
}
