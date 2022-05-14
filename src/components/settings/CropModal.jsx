import ReactCrop from "react-image-crop";
import Modal from "react-modal";
import React from "react";
import 'react-image-crop/dist/ReactCrop.css'
import SettingsButton from "./SettingsButton";

export default function CropModal({isOpen, crop, setCrop, srcImage, onImageLoad, onCancel, onSubmit}) {
    return <Modal
                className='w-[80%] sm:w-[50%] h-fit border-2 border-gray-300 rounded-3xl p-5 absolute top-1/2 left-1/2 translate'
                isOpen={isOpen}>
                <ReactCrop crop={crop} onChange={(crop) => setCrop(crop)} aspect={1} className={'w-full'}>
                    <img src={srcImage} onLoad={onImageLoad} id='image' className={'object-cover w-full'}
                         alt={'Error'}/>
                </ReactCrop>
                <div className='flex justify-end'>
                    <button className='bg-gray-300 mr-4 border-2 border-gray-300 settingsButton'
                            onClick={onCancel}>Cancel
                    </button>
                    <button className='bg-orange-500 border-orange-500 settingsButton'
                            onClick={onSubmit}>Ok
                    </button>
                </div>
            </Modal>
}