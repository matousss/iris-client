export default function (props) {
    return (
        <button onClick={() => props.onClick()}
                className={'h-16 w-full ' + props.className}>
            {props.children}
        </button>
    )
}