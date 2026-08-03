export default function Image({ src, alt, className, fill, width, height, priority, sizes, ...props }) {
  let imageSrc = src;
  // Handle Next.js static imports where src is an object
  if (typeof src === 'object' && src !== null && 'src' in src) {
    imageSrc = src.src;
  }
  
  // Handle Next.js 'fill' prop
  const style = fill ? { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' } : {};
  
  return (
    <img 
      src={imageSrc} 
      alt={alt || ''} 
      className={className} 
      width={width} 
      height={height} 
      style={{ ...style, ...(props.style || {}) }}
      {...props} 
    />
  );
}
