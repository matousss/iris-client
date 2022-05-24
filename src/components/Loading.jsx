import loading from '../assets/loading.gif'
import '../assets/animations.css'

export default function Loading({opacity}) {

    return (
        <>
            <div className={'fixed left-0 top-0 w-screen h-screen z-[500] backdrop-blur-sm'}>
                <div className={'opacity-' + opacity}>
                    <div className={'bg-primary/50 w-full h-full fixed'}/>
                    <div className={'bg-black/20 w-full h-full fixed'}/>
                </div>
                <img className={'fixed z-[101] left-0 bottom-0 h-max-[10%]  m-[10px] animate-rotate-logo'} src={loading}
                     alt={'Loading...'}/>
            </div>
        </>
    );
}
