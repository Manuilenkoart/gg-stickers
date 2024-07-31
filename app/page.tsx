import { Suspense } from 'react';

import S from './page.module.scss';
import { Products, ProductsSkeleton } from './ui/products';
import { WelcomeSection } from './ui/sections';

export default function Home() {
  return (
    <main className={S.container}>
      <WelcomeSection />
      <Suspense fallback={<ProductsSkeleton />}>
        <Products />
      </Suspense>
    </main>
  );
}
