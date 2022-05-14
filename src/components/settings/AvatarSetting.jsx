import React, {useEffect, useState} from 'react';
import {centerCrop, makeAspectCrop} from 'react-image-crop';
import {TitledSettingContainer} from "./SettingsContainer";
import {SettingsForm} from "./SettingsForm";
import {FileInput} from "./FileInput";
import CropModal from "./CropModal";

function AvatarSetting(props) {
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
        <TitledSettingContainer title={'Change avatar'} {...props}>
            <SettingsForm onSubmit={() => console.log('submitted')}>
                <FileInput fileName={fileName} onChange={onSelectFile}/>

                {/*// todo cropped preview
                    (crop && editorOpen === false) ?
                        <div style={{width: crop.width.toString() + crop.unit, height: crop.height}}>
                            <img src={srcImage}/>
                        </div> : ''
                */}
            </SettingsForm>


            <CropModal
                isOpen={editorOpen === true}
                crop={crop} setCrop={setCrop}
                srcImage={srcImage} onImageLoad={onImageLoad}
                onSubmit={handleResult} onCancel={() => {
                    setSrcImage('');
                    setFileName('not selected')
                    setEditorOpen(false);
            }}/>
        </TitledSettingContainer>
    );
}

export default AvatarSetting;