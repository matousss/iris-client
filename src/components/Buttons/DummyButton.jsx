import React from "react";
import SidebarButton from "./SidebarButton";

export default function () {

    return (
        <SidebarButton onClick={() => {}}
                       className={'w-sidebar inline hover:bg-white/0 cursor-not-allowed'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-sidebar group-hover:animate-flip" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
                <path className={"opacity-100 group-hover:opacity-0 duration-[250ms]"}
                      strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>

                <path className={"opacity-0 group-hover:opacity-100 duration-[250ms]"}
                      strokeLinecap="round" strokeLinejoin="round"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>


            </svg>

        </SidebarButton>
    )
}