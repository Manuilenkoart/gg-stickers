import S from './productListCard.module.scss';

export default function ProductListCardSkeleton() {
  return (
    <div className={S.containerSkeleton}>
      <div className={S.img}></div>
      <section>
        <h2></h2>
        <p></p>

        <div className={S.price}>
          <span></span>
        </div>
      </section>
    </div>
  );
}
