import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import auth from "../services/auth";
export default function Register() {
    const [error, setError] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        auth.register(data).then(
            (res) => {
                console.log(res, "success")
            }
        ).catch(
            (err) => {

                // console.log(err.response.data.message, "error")
                // setError(err.response.data.message);
                toast.error(err.response.data.message);

            }
        );
    };
    return (
        <div><div>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                        {error && <div className="text-red-500">{error}</div>}
                        <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-7">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                Name
                            </label>
                            <div className="mt-1 mb-5">
                                <input
                                    type="text"
                                    {...register("name")}
                                    className="border rounded-lg px-3 py-2  text-sm w-full"
                                />
                                <p className="text-red-600">This is required</p>
                            </div>

                            <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                E-mail
                            </label>
                            <div className="mt-1 mb-5">
                                <input
                                    type="email"
                                    {...register("email")}
                                    className="border rounded-lg px-3 py-2  text-sm w-full"
                                />
                                <p className="text-red-600">This is required</p>
                            </div>
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                Password
                            </label>
                            <div className="mt-1 mb-5">
                                <input
                                    type="text"
                                    {...register("password")}
                                    className="border rounded-lg px-3 py-2  text-sm w-full"
                                />
                                <p className="text-red-600">This is required</p>
                            </div>
                            <button
                                type="submit"
                                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Signup</span>
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
                        </form>

                        <div className="py-5">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="text-center sm:text-left whitespace-nowrap">
                                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
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
                                        <span className="inline-block ml-1">Already have an account? Signin</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div></div>
    )
}
