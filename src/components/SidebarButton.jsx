export default function (props) {
    return (
        <button onClick={() => props.onClick()}
                className={'h-16 w-full hover:bg-white/20 ' + props.className}>
            {props.children}
        </button>
    )
}