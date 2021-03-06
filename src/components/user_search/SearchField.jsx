import React from 'react';


export function SearchField({onSearch, enabled, reset}) {
    const onEnabled = () => enabled ? '' : ' cursor-not-allowed'

    return (
        <div className={'flex items-center w-full '}>
            <div className={'flex justify-center item w-full mx-auto'}>
                <input
                    id={'userSearchField'}
                    onChange={reset}
                    className={'w-2/3 resize-none p-2 border-2 border-ptext/40 rounded-3xl message-input bg-ptext/10 rounded-3xl message-input' + onEnabled()}
                    onKeyDown={e => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.canceled = true;
                            onSearch(e.target.value)
                        }
                    }}
                    disabled={!enabled}
                    placeholder={'Enter username or email'}
                    autoFocus
                />
                <button className={'ml-2 group' + onEnabled()} onClick={() => {
                    if (enabled) {
                        let input = document.getElementById('userSearchField');
                        onSearch(input.value);
                    }
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 group-hover:text-ptext/60" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

