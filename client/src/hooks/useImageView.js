import { useState } from 'react';
import { ImgUrlDefault } from '../utils/consts';

function useImageView(image) {
    const [selectedImage, setSelectedImage] = useState('')

    const imgUrl = selectedImage.length === 0 ?
        `${ImgUrlDefault.ADVANTAGES}${image}` : URL.createObjectURL(selectedImage);

    return {
        setSelectedImage,
        imgUrl
    }

}

export default useImageView