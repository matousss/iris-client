import {isMobile} from "react-device-detect";
import ExpandButton from "./ExpandButton";
import SettingsButton from "./Buttons/SettingsButton";
import ThemeButton from "./Buttons/ThemeButton";
import React from "react";
import DummyButton from "./Buttons/DummyButton";

export default function (props) {
    return (
        <li className={'duration-[250ms] flex overflow-hidden'}>
            {isMobile ?

                <div><ExpandButton onClick={props.toggleExpansion}/></div>

                : <div><DummyButton/></div>}


            <div className={"w-full top-btn"}>
                <SettingsButton/>
            </div>
            <div className={"top-btn"}>
                <ThemeButton/>
            </div>
        </li>
    )
}