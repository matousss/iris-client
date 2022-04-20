import loading from '../assets/loading.gif'
import '../assets/animations.css'

const wrapper_style = {
    position: 'fixed',
    left: '0',
    top: '0',
    zIndex: '100',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}

const logo_style = {
    position: 'fixed',
    zIndex: '101',
    left: '0',
    bottom: '0',
    maxHeight: '10%',
    margin: '10px',
    animation: 'rotate-center 1200ms ease-in-out infinite both'
}

export default function Loading({opacity}) {


    const bg_style = {
        backgroundColor: 'grey',
        opacity: opacity.toString(),
        backdropFilter: `blur(50px)`,
        width: '100%',
        height: '100%',
        position: 'fixed',
    };

    return (
        <>
            <div style={wrapper_style}>
                <div style={bg_style}></div>
                <img style={logo_style} src={loading} alt={''}/>
            </div>
        </>
    );
}
