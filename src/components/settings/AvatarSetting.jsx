import React, {useEffect, useState} from 'react';
import ReactCrop, {centerCrop, makeAspectCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import Modal from "react-modal";
import {SettingsContainer, TitledSettingContainer} from "./SettingsContainer";
import {SettingsField, SettingsForm} from "./SettingsForm";

function AvatarSetting() {
    const [srcImage, setSrcImage] = useState('');
    const [fileName, setFileName] = useState('not slected');
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
            setFileName(e.target.files[0].name)
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
        <TitledSettingContainer title={'Change avatar'}>
            <SettingsForm>

                {/*<input type='file' onChange={onSelectFile}              />*/}
                <label className="block mb-2 w-1/2 text-sm font-medium rounded-2xl border-2 border-ptext/10 bg-ptext/10 cursor-pointer">
                    <input
                        className="opacity-0 border-3 border-black w-0 h-0 fixed"
                        type="file"
                        onChange={onSelectFile}
                    />
                    <div className={'flex'}>
                        <div className={'h-full pl-1.5 py-2 pr-0 border-r-2 bg-middle/70 rounded-l-2xl'}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>

                        <div className={'m-auto h-full px-2 truncate'}>
                            {fileName}
                        </div>
                    </div>
                </label>

                {/*// todo cropped preview
                    (crop && editorOpen === false) ?
                        <div style={{width: crop.width.toString() + crop.unit, height: crop.height}}>
                            <img src={srcImage}/>
                        </div> : ''
                */}
            </SettingsForm>


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
        </TitledSettingContainer>
    );
}

export default AvatarSetting;