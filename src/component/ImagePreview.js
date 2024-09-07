import React from 'react';

const ImagePreview = ({ imageUrl, onRemove }) => {
    return (
        <div className="position-relative">
            <img src={imageUrl} alt="Preview" className="img-thumbnail" />
            <button
                type="button"
                className="remove-btn"
                onClick={onRemove}
            >
                ×
            </button>
        </div>
    );
};

export default ImagePreview;
