import React from "react";

export const FileInput = ({onChange, selected, fileName, disabled}) => <label className='block mb-2 w-3/5 text-sm font-medium
                    rounded-3xl border-2 border-ptext/10 bg-ptext/10 cursor-pointer'>
                    <input
                        className={'opacity-0 border-3 border-black w-0 h-0 fixed'}
                        type='file'
                        onChange={onChange}
                        value={selected}
                        disabled={disabled}
                    />
                    <div className={'flex'}>
                        <div
                            className={'h-full pl-1.5 py-1.5 pr-0 border-r-2 border-ptext/20 bg-middle/70 rounded-l-3xl'}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5 mr-1"
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                            </svg>
                        </div>

                        <div className={'m-auto h-full px-2 truncate'}>
                            {fileName}
                        </div>
                    </div>
                </label>