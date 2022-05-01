export default function (props) {
    return (
        <button onClick={e => props.onClick(e)}
                className={'h-16 w-full hover:bg-white/20 group ' + props.className}>
            {props.children}
        </button>
    )
}