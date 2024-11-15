import S from './productDetails.module.scss';

export default function ProductDetailsSkeleton() {
  return (
    <main className={S.skeleton}>
      <div className={S.img}></div>
      <section></section>
    </main>
  );
}
