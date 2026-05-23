export function DotsBackground({ className = '' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(rgba(43, 30, 22, 0.16) 1.8px, transparent 2.5px)',
        backgroundSize: '22px 22px',
        backgroundPosition: '0 0',
        maskImage:
          'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
      }}
    />
  );
}
