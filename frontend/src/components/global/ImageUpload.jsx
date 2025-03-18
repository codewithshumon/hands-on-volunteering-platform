const ImageUpload = ({
  image,
  alt = "Image",
  imgRef,
  isImageLoaded,
  setImageLoaded,
  isEditing,
  imagePreview,
  setImagePreview,
  setImageFile,
  classes = {
    mainClass: "",
    imgWraperClass: "",
    imgClass: "",
    labelClass: "",
  },
}) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  return (
    <>
      <div
        className={
          classes.mainClass
            ? classes.mainClass
            : "relative overflow-hidden rounded-full"
        }
      >
        <div
          className={
            classes.imgWraperClass
              ? classes.imgWraperClass
              : "flex flex-wrap gap-2"
          }
        >
          <img
            ref={imgRef}
            src={image}
            alt={alt}
            className={
              classes.imgClass
                ? classes.imgClass
                : "w-32 h-32 rounded-full object-cover "
            }
            style={{
              filter: isImageLoaded ? "none" : "blur(20px)",
              transition: isImageLoaded ? "filter 0.3s ease-out" : "none",
            }}
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
        </div>
      </div>
      {isEditing && !imagePreview && (
        <label
          htmlFor="profile-image-upload"
          className={
            classes.labelClass
              ? classes.labelClass
              : "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
          }
        >
          <span className="text-white text-sm">Upload</span>
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      )}
    </>
  );
};

export default ImageUpload;
