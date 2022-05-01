import React from "react";
import {BrowserView, MobileView} from "react-device-detect";
import {DummyButton, SettingsButton, ThemeButton, ExpandButton} from "./Buttons";

export default function (props) {
    return (
        <li className={'duration-[250ms] flex overflow-hidden'}>

            <div>
                <BrowserView><DummyButton/></BrowserView>

                <MobileView><ExpandButton onClick={props.toggleExpansion}/></MobileView>
            </div>


            <div className={"w-full top-btn"}>
                <SettingsButton/>
            </div>
            <div className={"top-btn"}>
                <ThemeButton/>
            </div>
        </li>
    )
}