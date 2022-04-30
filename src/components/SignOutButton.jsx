import React, {useEffect} from 'react';
import SidebarButton from "./SidebarButton";

function SignOutButton(props) {
    function signOut() {
        props.clearDesk();
    }

    useEffect(() => {

    }, [props.expanded])

    return (
        <SidebarButton onClick={() => signOut()}
                       className={'max-h-[16rem] justify-self-end'}>

            <div className={"h-full w-sidebar float-left"}>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className={"h-10 w-full mt-[1rem] ml-[.2rem]"}
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>

                </svg>

            </div>

            <div className={"fixed text-xl p-[1.4rem] text-left h-[64px] left-10 on-expand"}>
                <nobr>
                    Sign Out
                </nobr>
            </div>


        </SidebarButton>


    );
}

export default SignOutButton;
