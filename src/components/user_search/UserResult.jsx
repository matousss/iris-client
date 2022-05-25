export default function UserResult(props) {


    return (
        <li className={'flex flex-row px-4'}>
            <button
                className={'w-full h-full text-left pl-4 py-2 align-middle  border-y-.5 hover:bg-primary/10 rounded-lg'}
                onClick={() => props.onClick(props.user.id)}
            >
                {props.user.username}
            </button>
        </li>
    )
}