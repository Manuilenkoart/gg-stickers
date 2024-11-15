import { Product } from '@/lib/definitions';
import { getImageProps } from 'next/image';

function ProductListCardPicture({ alt, src }: { src: Product['src']; alt: string }) {
  const common = { alt: alt, sizes: '100vw' };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    height: 600,
    quality: 100,
    src: src[600],
    width: 600,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    height: 300,
    quality: 100,
    src: src[300],
    width: 300,
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    height: 350,
    quality: 100,
    src: src[350],
    width: 350,
  });

  return (
    <picture>
      <source
        media="(max-width: 375px)"
        srcSet={mobile}
      />
      <source
        media="(max-width: 768px"
        srcSet={tablet}
      />
      <source
        media="(max-width: 1200px)"
        srcSet={desktop}
      />
      <source
        media="(min-width: 1201px)"
        srcSet={'xlDesktop'}
      />
      <img
        {...rest}
        alt={alt}
      />
    </picture>
  );
}

export default ProductListCardPicture;
