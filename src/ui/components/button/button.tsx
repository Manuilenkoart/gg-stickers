import S from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export default function Button({ children }: ButtonProps) {
  return <button className={S.container}>{children}</button>;
}
