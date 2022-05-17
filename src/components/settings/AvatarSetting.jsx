import React, {useRef, useState} from 'react';
import {centerCrop, makeAspectCrop} from 'react-image-crop';
import {TitledSettingContainer} from "./SettingsContainer";
import {SettingsForm} from "./SettingsForm";
import {FileInput} from "./FileInput";
import CropModal from "./CropModal";

function AvatarSetting(props) {
    const [srcImage, setSrcImage] = useState('');
    const imgRef = useRef(null);
    const canvasRef = useRef(null);
    const [fileName, setFileName] = useState('not slected');
    const [crop, setCrop] = useState(null);
    const [editorOpen, setEditorOpen] = useState(false);

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
                    unit: 'px',
                    width: .9 * mediaWidth,
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
        drawPreview(imgRef.current, canvasRef.current, crop);
        setEditorOpen(false);
    }

    const drawPreview = (img, canvas, crop) => {
        const ctx = canvas.getContext('2d');

        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;

        canvas.width = Math.floor(crop.width * scaleX);
        canvas.height = Math.floor(crop.height * scaleY);

        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;

        const centerX = img.naturalWidth / 2;
        const centerY = img.naturalHeight / 2;

        ctx.save();

        ctx.translate(-cropX, -cropY);
        ctx.translate(centerX, centerY);
        ctx.translate(-centerX, -centerY);
        ctx.drawImage(
            img,
            0,
            0,
            img.naturalWidth,
            img.naturalHeight,
            0,
            0,
            img.naturalWidth,
            img.naturalHeight,
        )

        ctx.restore()
    }

    return (
        <TitledSettingContainer title={'Change avatar'} {...props}>
            <SettingsForm onSubmit={() => console.log('submitted')}>
                <FileInput fileName={fileName} onChange={onSelectFile}/>
                <div className={'w-1/2 bg-black/20 group ' + (srcImage ? 'visible' : 'hidden')}>
                    <canvas ref={canvasRef} className='border-2 border-ptext/20 group-hover:rounded-full w-full h-full'/>
                </div>
            </SettingsForm>

            <CropModal
                isOpen={editorOpen === true}
                crop={crop} setCrop={setCrop}
                srcImage={srcImage} imgRef={imgRef} onImageLoad={onImageLoad}
                canvasRef={canvasRef}
                onSubmit={handleResult} onCancel={() => {
                setSrcImage('');
                setFileName('not selected')
                setEditorOpen(false);
            }}/>
        </TitledSettingContainer>
    );
}

export default AvatarSetting;