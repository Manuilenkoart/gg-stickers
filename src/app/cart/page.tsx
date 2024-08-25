import dynamic from 'next/dynamic';

const NoSSRCartDetails = dynamic(() => import('@/ui/cart/cartDetails/cartDetails'), { ssr: false });

export default function Page() {
  return <NoSSRCartDetails />;
}
