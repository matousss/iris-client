import {useEffect, useState} from "react";

export function useWindowFocus() {
    const [isFocused, setIsFocused] = useState(document.hasFocus());

    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    useEffect(() => {
        window.addEventListener('focus', onFocus)
        window.addEventListener('blur', onBlur)

        return () => {
            window.removeEventListener('focus', onFocus)
            window.removeEventListener('blur', onBlur)
        }
    }, [])


    return isFocused;
}