interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number; // em pixels
}

export function Avatar({ src, alt = '', size = 40 }: AvatarProps) {
  const initials = alt
    ? alt
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()
    : '?';

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#ccc',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: size * 0.4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        initials
      )}
    </div>
  );
}
