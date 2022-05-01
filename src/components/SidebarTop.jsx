import {isMobile} from "react-device-detect";
import ExpandButton from "./ExpandButton";
import SettingsButton from "./SettingsButton";
import ThemeButton from "./ThemeButton";
import React from "react";
import DummyButton from "./DummyButton";

export default function (props) {
    return (
        <li className={'duration-[250ms] flex overflow-hidden'}>
            {isMobile ?

                <div><ExpandButton onClick={props.toggleExpansion}/></div>

                : <div><DummyButton/></div>}


            <div className={"mx-auto top-btn"}>
                <SettingsButton/>
            </div>
            <div className={"top-btn"}>
                <ThemeButton/>
            </div>
        </li>
    )
}