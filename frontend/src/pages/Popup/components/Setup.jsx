import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Client } from '@notionhq/client';
import getDatabase from "../api/index"
const schema = yup
    .object({
        dbid: yup.string().required(),
        secretKey: yup.string().required().test(
            'no-leading-zero',
            'Key is Invalid',
            (value, context) => {
                return context.originalValue && context.originalValue.startsWith('secret_');
            }
        ).length(50, 'length should be 50 characters'),
    })
    .required();


function Setup() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            dbid: window.localStorage.getItem('dbid', ''),
            secretKey: window.localStorage.getItem('secretKey', ''),
        }
    });
    const watchFields = watch(["dbid", "secretKey"]);
    window.localStorage.setItem('dbid', watchFields[0]);
    window.localStorage.setItem('secretKey', watchFields[1]);

    const onSubmit = async (data) => {
        console.log(data);
        const notion = new Client({ auth: data.secretKey });

        (async () => {
            const databaseId = data.dbid;
            const response = await notion.databases.retrieve({ database_id: databaseId });
            console.log(response);
        })();
        // chrome.storage.sync.set({ dbid: data.dbid }, function (value) {
        //     console.log('Value is set to ' + value);
        // });
        // chrome.storage.sync.set({ secretKey: data.secretKey }, function (value) {
        //     console.log('Value is set to ' + value);
        // });

    };

    return (
        <div className="p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 xl:w-96 text-center">
                    <label className="form-label inline-block mb-2 text-lg text-gray-700 text-center">
                        Secret Key
                    </label>
                    <input
                        name="secretKey"
                        type="text"
                        {...register('secretKey')}
                        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${errors.secretKey ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Secret Key"
                    />
                    {errors.secretKey && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            Invalid Secretkey! {errors.secretKey?.message}
                        </span>
                    )}
                </div>
                <div className="mb-3 xl:w-96 text-center">
                    <label className="form-label inline-block mb-2 text-lg text-gray-700 text-center">
                        Database ID
                    </label>
                    <input
                        {...register('dbid')}
                        name="dbid"
                        type="text"
                        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${errors.dbid ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Database Id"
                    />
                    {errors.dbid && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            Invalid Database ID! {errors.dbid?.message}
                        </span>
                    )}
                </div>
                <div className="text-center mt-3">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 "
                    >
                        Add Integration{' '}
                    </button>
                </div>
            </form>
            <div className="text-center mt-3">
                <button
                    onClick={() => getDatabase()}
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 "
                >
                    SaveToNotion{' '}
                </button>
            </div>
        </div>
    );
}

export default Setup;
