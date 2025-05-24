import { useState } from "react";

const ImageView = ({
  image,
  alt = "Image",
  classes = {
    mainClass: "",
    imgWrapperClass: "",
    imgClass: "",
  },
}) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

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
          classes.imgWrapperClass
            ? classes.imgWrapperClass
            : "flex flex-wrap gap-2"
        }
      >
        <img
          src={image}
          alt={alt}
          className={
            classes.imgClass
              ? classes.imgClass
              : "w-32 h-32 rounded-full object-cover"
          }
          style={{
            filter: isImageLoaded ? "none" : "blur(20px)", // Apply blur effect if image is not loaded
            transition: isImageLoaded ? "filter 0.3s ease-out" : "none", // Smooth transition for blur effect
          }}
          onLoad={() => setImageLoaded(true)} // Set image as loaded
          loading="lazy" // Lazy load the image
        />
      </div>
    </div>
  );
};

export default ImageView;
