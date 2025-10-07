import * as React from 'react';


const Img: React.FC<{ src?: string; alt: string; className?: string }> = ({ src, alt, className }) => (
src ? <img src={src} alt={alt} className={className} loading="lazy" />
: <div aria-hidden className={`bg-neutral-200 ${className}`} />
);
export default Img;