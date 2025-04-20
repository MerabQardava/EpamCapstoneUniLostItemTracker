import React from 'react';

function DirectImageComponent({ imageFileName,className }) {
    const imageUrl = `http://localhost:8080/uploads/${imageFileName}`;

    return <img src={imageUrl} className={className} alt="From server" />;
}

export default DirectImageComponent;