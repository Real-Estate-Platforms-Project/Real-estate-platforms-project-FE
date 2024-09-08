const ImagePreview = ({ imagePreviews }) => (
    <div className="image-previews mt-3">
        {imagePreviews.map((url, index) => (
            <img key={index} src={url} alt={`Preview ${index}`} className="img-thumbnail" />
        ))}
    </div>
);

export default ImagePreview;
