import { forwardRef } from 'react';

const SIZES = {
  sm: 'h-9 px-3.5 text-[13px] tracking-[0.01em]',
  md: 'h-11 px-5 text-[15px] tracking-[0.01em]',
  lg: 'h-[54px] px-6 text-[18px] tracking-[0.01em]',
  xl: 'h-[62px] px-8 text-[22px] tracking-[0.01em]',
  icon: 'h-11 w-11 p-0',
};

const VARIANTS = {
  primary: 'bg-peach text-ink',
  accent: 'bg-butter text-ink',
  mint: 'bg-mint text-ink',
  sky: 'bg-sky text-ink',
  rose: 'bg-rose text-ink',
  ghost: 'bg-white text-ink',
  paper: 'bg-paper text-ink',
};

const SHAPES = {
  pill: 'rounded-pill',
  square: 'rounded-sm',
  md: 'rounded-md',
};

export const Button = forwardRef(function Button(
  {
    children,
    size = 'md',
    variant = 'accent',
    shape = 'pill',
    disabled,
    type = 'button',
    iconStart,
    iconEnd,
    fullWidth,
    className = '',
    onClick,
    ...rest
  },
  ref,
) {
  const sizeCls = SIZES[size] ?? SIZES.md;
  const variantCls = VARIANTS[variant] ?? VARIANTS.accent;
  const shapeCls = SHAPES[shape] ?? SHAPES.pill;
  const widthCls = fullWidth ? 'w-full' : '';
  const stateCls = disabled
    ? 'cursor-not-allowed opacity-55'
    : 'cursor-pointer hover:-translate-y-[2px] hover:-rotate-[0.5deg] active:translate-y-[3px] active:rotate-0';

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group/btn inline-flex items-center justify-center gap-2 border-[3px] border-line font-extrabold leading-none ${sizeCls} ${variantCls} ${shapeCls} ${widthCls} ${stateCls} ${className}`}
      style={{
        boxShadow: disabled
          ? '0 2px 0 var(--line)'
          : '0 5px 0 var(--line), 0 10px 18px rgba(43,30,22,0.18)',
        transition:
          'transform 140ms cubic-bezier(.5,1.7,.4,1), box-shadow 140ms cubic-bezier(.5,1.7,.4,1)',
      }}
      {...rest}
    >
      {iconStart && <span className="flex flex-none">{iconStart}</span>}
      {children && <span className="flex-1 text-center">{children}</span>}
      {iconEnd && <span className="flex flex-none">{iconEnd}</span>}
    </button>
  );
});
