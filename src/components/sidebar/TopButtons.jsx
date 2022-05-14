import React from "react";
import {BrowserView, MobileView} from "react-device-detect";
import {DummyButton, SettingsButton, ThemeButton, ExpandButton} from "./Buttons";
import {UserContext} from "../Main";

export default function (props) {


    return (
        <li className={'duration-250 flex overflow-hidden h-[6rem]'}>

            <div className={'h-full w-full'}>
                <BrowserView className={'h-full w-sidebar'}>
                    <UserContext.Consumer>
                        {(user) => <DummyButton avatar={user.avatar} username={user.username} email={user.email}/>}
                    </UserContext.Consumer>

                </BrowserView>

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