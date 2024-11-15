import dynamic from 'next/dynamic';
import S from './page.module.scss';

const NoSSRCartDetails = dynamic(() => import('@/ui/cart/cartDetails/cartDetails'), { ssr: false });

export default function Page() {
  return (
    <main className={S.main}>
      <NoSSRCartDetails />
    </main>
  );
}
