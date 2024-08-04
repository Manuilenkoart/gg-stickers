import Link from 'next/link';
import S from './page.module.scss';

export default function Home() {
  const c: number = false;
  console.log(c);    
   

  return (
    <main>
      <header>
        <h1>Home</h1>
        <Link href="/about">About</Link>
      </header>

      <section className={S.section}>
        <img src="" 
        />  
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </section>
    </main>
  );
}
