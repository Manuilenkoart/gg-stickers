import S from './welcomeSection.module.scss';
import { TitanOne, inter } from '@/ui/fonts';

export default function WelcomeSection() {
  return (
    <section className={`${S.container} ${TitanOne.className}`}>
      <h1>Get Gordon Stickers!</h1>
      <p className={inter.className}>make your uniq mark</p>
    </section>
  );
}
