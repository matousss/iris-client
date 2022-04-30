import React from 'react';

function Message(props) {
    const messageFrom = 'mr-auto border border-primary/30 bg-primary/10';
    const messageTo = 'ml-auto bg-primary/40';

    return (
        <p className={'max-w-3/5 lg:max-w-1/2 mx-5 my-2 p-2 rounded-3xl ' + (props.from ? messageFrom : messageTo)}>
            {props.message}
        </p>
    );
}

export default Message;