import { Suspense } from 'react';

import S from './page.module.scss';
import { ProductList, ProductListSkeleton } from './ui/products';
import { WelcomeSection } from './ui/sections';

export default function Home() {
  return (
    <main className={S.container}>
      <WelcomeSection />
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </main>
  );
}
