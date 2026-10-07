import "./ImageCard.css";

type ImageCardProps = {
  title: string;
  image: string;
  showCorners?: boolean;
  isActive?: boolean;
  onToggle?: () => void;
};

function ImageCard({
  title,
  image,
  showCorners = false,
  isActive = true,
  onToggle
}: ImageCardProps) {
  const content = (
    <>
      {isActive ? (
        <img src={image} alt={title} />
      ) : (
        <span>Klicka för att starta kameran</span>
      )}

      {showCorners && (
        <>
          <span className="corner top-left" />
          <span className="corner top-right" />
          <span className="corner bottom-left" />
          <span className="corner bottom-right" />
        </>
      )}
    </>
  );

  return (
    <div className="images-container">
      <div className="image-title">
        <span>{title}</span>
      </div>

      {onToggle ? (
        <button
          type="button"
          className="image-placeholder camera-toggle"
          onClick={onToggle}
          aria-label={isActive ? "Stäng kameran" : "Starta kameran"}
          aria-pressed={isActive}
        >
          {content}
        </button>
      ) : (
        <div className="image-placeholder">
          {content}
        </div>
      )}
    </div>
  );
}

export default ImageCard;