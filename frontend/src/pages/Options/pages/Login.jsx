import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import auth from "../services/auth";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
export default function Login() {
    const [error, setError] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm(
        {

        }
    );
    const onSubmit = data => {
        console.log(data)
        auth.login(data).then(
            (res) => {
                chrome.storage.sync.set({
                    tokens: JSON.stringify(res.data.tokens),
                    user: JSON.stringify(res.data.user),
                    isAuthenticated: true
                });
                console.log(initStorageCache, "success");

            }
        ).catch(
            (err) => {
                toast.error(err);
            }
        );
    };
    return (
        <div><div>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                        <div className="px-5 py-7">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                E-mail
                            </label>
                            <input
                                type="text"
                                {...register("email")}
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                Password
                            </label>
                            <input
                                type="text"
                                {...register("password")}
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                            <button
                                type="submit"
                                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Login</span>
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

                        <div className="py-5">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="text-center sm:text-left whitespace-nowrap">
                                    <Link to="/register" className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-4 h-4 inline-block align-text-top"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="inline-block ml-1">Don't have an account? Create Now.</span>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div></div>
    )
}
