import React from "react";
import ImageGalleryLib from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface ImageGalleryProps {
	images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
	const items = images.map(img => ({
		original: img,
		thumbnail: img,
	}));

	return (
		<ImageGalleryLib
			items={items}
			showPlayButton={false}
			showFullscreenButton={true}
			showThumbnails={true}
			thumbnailPosition="bottom"
		/>
	);
};

export default ImageGallery;
