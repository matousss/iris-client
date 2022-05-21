import ReactCrop from "react-image-crop";
import React from "react";
import 'react-image-crop/dist/ReactCrop.css'
import {CustomModal} from "../CustomModal";
import {ModalButton} from "./ModalButton";

export default function CropModal({
                                      isOpen,
                                      crop,
                                      setCrop,
                                      srcImage,
                                      imgRef,
                                      onImageLoad,
                                      onCancel,
                                      onSubmit
                                  }) {
    return <CustomModal className={'mx-auto border-2 rounded-2xl max-h-full'}
        isOpen={isOpen}>
        <ReactCrop crop={crop} onChange={(crop) => setCrop(crop)} aspect={1} className={'mx-auto mb-2 w-fit h-fit'}>
            <img ref={imgRef} src={srcImage} onLoad={onImageLoad} id='image' className={'object-scale-down w-max-[80vw] h-max-[80vw]'}
                 alt={'Error'}/>
        </ReactCrop>
        <div className='flex justify-end'>
            <ModalButton onClick={onCancel} className={'text-ptext hover:bg-warning/50 mr-2 border-warning/50'}>
                Cancel
            </ModalButton>
            <ModalButton onClick={onSubmit} className={'text-ptext border-lime-600/50 hover:bg-lime-600/50'}>
                Ok
            </ModalButton>
        </div>
    </CustomModal>
}