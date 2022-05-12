import React, {useEffect, useState} from 'react';
import ReactCrop, {centerCrop, makeAspectCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import Modal from "react-modal";

function AvatarSetting() {
    const [srcImage, setSrcImage] = useState('');
    const [crop, setCrop] = useState(null);
    const [editorOpen, setEditorOpen] = useState(false);

    useEffect(() => {
        console.log(crop);
    }, [crop])

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                    setSrcImage(reader.result.toString() || '');
                    setEditorOpen(true);
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
        setCrop(centerAspectCrop(width, height, 1));
    }

    const handleResult = () => {
        setEditorOpen(false);
    }

    return (
        <div className='flex flex-col w-4/5 mx-auto justify-center relative'>
            <h1 className='text-2xl mb-5'>Change avatar</h1>
            <input type='file' onChange={onSelectFile}/>
            {// todo cropped preview
                (crop && editorOpen === false) ?
                    <div style={{width: crop.width.toString() + crop.unit, height: crop.height}}>
                        <img src={srcImage}/>
                    </div> : ''
            }
            <Modal
                className='w-[80%] sm:w-[50%] h-fit border-2 border-gray-300 rounded-3xl p-5 absolute top-1/2 left-1/2 translate'
                isOpen={Boolean(editorOpen)}>
                <ReactCrop crop={crop} onChange={(crop) => setCrop(crop)} aspect={1} className={'w-full'}>
                    <img src={srcImage} onLoad={onImageLoad} id='image' className={'object-cover w-full'}
                         alt={'Error'}/>
                </ReactCrop>
                <div className='flex justify-end'>
                    <button className='bg-gray-300 mr-4 border-2 border-gray-300 settingsButton'
                            onClick={() => setSrcImage('')}>Cancel
                    </button>
                    <button className='bg-orange-500 border-orange-500 settingsButton'
                            onClick={() => handleResult()}>Ok
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default AvatarSetting;