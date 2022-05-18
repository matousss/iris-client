import {SearchField} from "./SearchField";
import React, {useEffect, useState} from "react";
import {searchUser} from "../../utils/requests/DataReq";

export function UserSearch() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [displayed, setDisplayed] = useState("todo not searched")

    const search = async (keyword) => {
        setLoading(true);
        let result = await searchUser(keyword);
        switch (result.status) {
            case 200:
                setResult(await result.json())
                break;
            default:
                setResult(undefined)
        }
    }

    useEffect(() => setLoading(false), [displayed])

    useEffect(() => {
        if (result === undefined) return setDisplayed("todo error");
        if (result === null) return setDisplayed("todo not searched");
        if (result.length === 0) return setDisplayed("todo no result");

        setDisplayed(result.map((v, i) => <li key={i}>{v.username}</li>))

    }, [result])

    return <div className={'fixed left-0 top-0 w-screen h-screen z-100 backdrop-blur-[2.5px] text-ptext'}>
        <div className={'fixed bg-primary w-1/2 h-1/2 top-[25%] left-[25%]'}>
            <SearchField onSearch={search} enabled={!loading} reset={() => setResult(null)}/>
            <ul>
                {displayed}
            </ul>
        </div>
    </div>
}