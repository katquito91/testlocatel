import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button = ({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) => (
  <button className={`button button--${variant} ${className}`.trim()} {...props}>
    {children}
  </button>
);

export default Button;
