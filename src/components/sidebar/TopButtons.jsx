import React from "react";
import {BrowserView, MobileView} from "react-device-detect";
import {DummyButton, SettingsButton, ThemeButton, ExpandButton} from "./Buttons";

export default function (props) {
    return (
        <li className={'duration-[250ms] flex overflow-hidden h-[6rem]'}>

            <div className={'h-full w-full'}>
                <BrowserView className={'h-full w-sidebar'}><DummyButton avatar={props.user.avatar} username={props.user.username}/></BrowserView>

                <MobileView className={'h-full w-full'}><ExpandButton onClick={props.toggleExpansion}/></MobileView>
            </div>


            <div className={"w-full top-btn h-full"}>
                <SettingsButton onClick={() => props.setSettingsVisible(true)}/>
            </div>
            <div className={"top-btn"}>
                <ThemeButton/>
            </div>
        </li>
    )
}