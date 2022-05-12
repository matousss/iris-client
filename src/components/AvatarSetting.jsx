import React, {useEffect, useState} from 'react';
import ReactCrop, {centerCrop, makeAspectCrop, Crop, PixelCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import Modal from "react-modal";

function AvatarSetting(props) {
    const [srcImage, setSrcImage] = useState('');
    const [crop, setCrop] = useState();
    const [className, setClassName] = useState('');

    useEffect(() => {
        setSize();
        window.addEventListener('resize', () => setSize());
    }, [])

    useEffect(() => {
        console.log(crop);}, [crop])

    const setSize = () => {
        if (window.screen.width > window.screen.height){
            setClassName('h-70-screen md:h-80-screen');
        } else {
            setClassName('w-70-screen md:w-80-screen')
        }
    }

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>{
                setSrcImage(reader.result.toString() || '');
                console.log(srcImage);
                }
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        )
    }

    const onImageLoad = (e) => {
        const {width, height} = e.currentTarget;
        console.log(height);
        setCrop(centerAspectCrop(width, height, 1));
    }

    const handleResult = () => {
        setSrcImage('');
    }

    return (
        <div className='flex flex-col w-4/5 mx-auto justify-center relative'>
            <h1 className='text-2xl mb-5'>Change avatar</h1>
            <input type='file' onChange={onSelectFile}/>
            <Modal className='w-fit h-fit border-2 border-gray-300 rounded-3xl p-5 absolute top-1/2 left-1/2 translate'  isOpen={Boolean(srcImage)}>
                <ReactCrop crop={crop} onChange={(absoluteCrop, percentCrop) => setCrop(absoluteCrop)} aspect={1} className={className}>
                    <img src={srcImage} onLoad={onImageLoad} id='image' className={className}/>
                </ReactCrop>
                <div className='flex justify-end'>
                    <button className='bg-gray-300 mr-4 border-2 border-gray-300 settingsButton'
                            onClick={() => setSrcImage('')}>Cancel</button>
                    <button className='bg-orange-500 border-orange-500 settingsButton'
                            onClick={() => handleResult()}>Ok</button>
                </div>
            </Modal>
        </div>
    );
}

export default AvatarSetting;