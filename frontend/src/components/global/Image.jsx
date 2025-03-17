import { useState, useRef } from "react";

const Image = ({
  src,
  alt = "Image",
  isEditable = false,
  isBlurStyle = true,
  isMultiple = false,
  onImageUpload,
  classes = {
    mainClass: "",
    multipleImgClass: "",
    imgClass: "",
    labelClass: "",
  },
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const imgRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = [];
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(() => {
      setImagePreviews((prev) =>
        isMultiple ? [...prev, ...newPreviews] : newPreviews
      );
    });

    if (onImageUpload) {
      onImageUpload(isMultiple ? files : files[0]);
    }
  };

  const displayImages = imagePreviews.length > 0 ? imagePreviews : [src];

  return (
    <div
      className={
        classes.mainClass
          ? classes.mainClass
          : "relative overflow-hidden rounded-full"
      }
    >
      <div
        className={
          classes.multipleImgClass
            ? classes.multipleImgClass
            : "flex flex-wrap gap-2"
        }
      >
        {displayImages.map((imgSrc, index) => (
          <img
            key={index}
            ref={imgRef}
            src={imgSrc || "https://placehold.co/400"}
            alt={alt}
            className={
              classes.imgClass ? classes.imgClass : "rounded-full object-cover"
            }
            style={
              isBlurStyle
                ? {
                    filter: imageLoaded ? "none" : "blur(20px)",
                    transition: imageLoaded ? "filter 0.3s ease-out" : "none",
                  }
                : null
            }
            onLoad={() => {
              if (
                imgRef.current &&
                typeof imgRef.current.decode === "function"
              ) {
                imgRef.current.decode().then(() => setImageLoaded(true));
              } else {
                setImageLoaded(true);
              }
            }}
            loading="lazy"
          />
        ))}
        {isEditable && (
          <label
            htmlFor="image-upload"
            className={
              classes.labelClass
                ? classes.labelClass
                : "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
            }
          >
            <span className="text-white text-sm">Upload</span>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              multiple={isMultiple}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default Image;
