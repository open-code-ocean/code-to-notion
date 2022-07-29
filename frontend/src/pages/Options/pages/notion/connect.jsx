import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import OauthPopup from "./poplogin"
import { ToastContainer, toast } from 'react-toastify';
export default function Connect() {
    const onCode = async (code) => {
        try {
            console.log(code);
        } catch (e) {
            console.error(e);
        } finally {
            window.localStorage.removeItem("code"); //remove code from localStorage
        }
    };
    return (
        <div><div>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>

                    <button
                        onClick={() => {
                            chrome.tabs.create({
                                url: 'https://api.notion.com/v1/oauth/authorize?owner=user&client_id=8dd5d779-a08a-48eb-bcf9-38a1115b3c8d&redirect_uri=http://localhost:5000/v1/notion/call-back&response_type=code'
                            });
                        }}
                        // target={'_blank'}
                        // href="https://api.notion.com/v1/oauth/authorize?owner=user&client_id=8dd5d779-a08a-48eb-bcf9-38a1115b3c8d&redirect_uri=http://localhost:5000/v1/notion/call-back&response_type=code"
                        className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                    >
                        <span className="inline-block mr-2">Connect Notion</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4 inline-block"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div></div>
    )
}
