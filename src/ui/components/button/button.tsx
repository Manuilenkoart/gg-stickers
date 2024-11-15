import { memo } from 'react';
import S from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
function Button({ children }: ButtonProps) {
  return <button className={S.container}>{children}</button>;
}
export default memo(Button);
