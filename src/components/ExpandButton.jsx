import React from "react";
import SidebarButton from "./SidebarButton";

export default function ({onClick}) {

    return (
        <SidebarButton onClick={() => onClick()}
                className={'w-sidebar'}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 className={"h-8 w-full rotate duration-[250ms]"}
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
        </SidebarButton>
    )
}