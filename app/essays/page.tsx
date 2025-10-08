// app/essays/page.tsx  ← 서버 컴포넌트
export const dynamic = 'force-dynamic';

import dynamic from 'next/dynamic';

// 클라이언트 전용 컴포넌트를 SSR 없이 불러오기
const EssaysClient = dynamic(() => import('./EssaysClient'), { ssr: false });

export default function Page() {
  return <EssaysClient />;
}
