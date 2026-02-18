interface CrestPlaceholderProps {
  width?: number;
  className?: string;
}

const CrestPlaceholder = ({ width = 250, className = "" }: CrestPlaceholderProps) => {
  return (
    <svg
      width={width}
      height={width * 0.4}
      viewBox="0 0 250 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Decorative lines */}
      <line x1="0" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="0.5" />
      <line x1="180" y1="50" x2="250" y2="50" stroke="currentColor" strokeWidth="0.5" />

      {/* Monogram */}
      <text
        x="125"
        y="56"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="28"
        fontWeight="300"
        letterSpacing="8"
        fill="currentColor"
      >
        HOS
      </text>

      {/* Top and bottom decorative marks */}
      <line x1="95" y1="25" x2="155" y2="25" stroke="currentColor" strokeWidth="0.5" />
      <line x1="95" y1="75" x2="155" y2="75" stroke="currentColor" strokeWidth="0.5" />

      {/* Small diamond accents */}
      <polygon points="125,18 128,22 125,26 122,22" fill="currentColor" opacity="0.6" />
      <polygon points="125,74 128,78 125,82 122,78" fill="currentColor" opacity="0.6" />
    </svg>
  );
};

export default CrestPlaceholder;
