import React, {useState} from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// import EmojiPicker from "emoji-picker-react";

function InputField(props) {
    const [input, setInput] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
    }

    const handleSend = () => {
        if (input.trim().length > 0) props.sendMessage(input) //sendMessageOG(props.channel, input);
        document.getElementById('input').value = '';
    }

    return (
        <div className='w-full h-auto p-5 mx-auto bg-text-1/5 shadow-[0_-10px_15px_-3px_rgba(0,0,0,.1)]'>
            <form className='flex justify-center item w-full' onSubmit={handleSubmit}>
                <TextareaAutosize id={'input'} maxRows={4} onChange={e => setInput(e.target.value)}
                                  className='w-2/3 resize-none p-2 border-2 border-text-1/40 rounded-3xl message-input bg-text-1/10'
                                  onKeyDown={
                                      e => {
                                          if (e.key === "Enter" && !e.shiftKey) {
                                              e.canceled = true;
                                              handleSend();
                                          }
                                      }
                                  }
                                  onInput={e => {
                                      if (e.target.value.trim().length === 0) e.target.value = '';
                                  }}
                />
                {/*<BrowserView>
                    <button onClick={() => {
                        let picker = document.getElementById('picker');
                        picker.classList.remove('hidden')
                        picker.classList.remove('opacity-0')

                    }}>a
                    </button>
                    <div id={'picker'} className={'opacity-0 duration-[250ms] fixed bottom-[5rem] right-[6rem]'}>
                        <EmojiPicker onEmojiClick={(e, emoji) => {
                            let inputField = document.getElementById('input');
                            inputField.value = inputField.value + emoji.emoji
                        }}/>
                    </div>
                </BrowserView>*/}
                <button onClick={() => handleSend()} className={'group'}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="h-8 w-8 justify-self-end ml-5 group-hover:text-orange-500" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path
                            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                    </svg>
                </button>
            </form>
        </div>
    );
}

export default InputField;
