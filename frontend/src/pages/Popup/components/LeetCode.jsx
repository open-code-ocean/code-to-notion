import React from 'react';

function LeetCode() {
    const [code, setCode] = React.useState({
        title: '',
        description: '',
        code: '',
    });
    // const getDocument = async () => {
    //     function getProblem() {
    //         const title = document.getElementsByClassName('css-v3d350')[0].textContent;
    //         const problemDescription = document.getElementsByClassName('content__u3I1 question-content__JfgR')[0].textContent;
    //         // console.log(title, problemDescription);


    //     }
    //     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    //     chrome.scripting.executeScript({
    //         target: { tabId: tab.id },
    //         function: getProblem,
    //     });
    // }
    return (
        <div className='text-center'>

            <button

                className=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 "
            >
                Save To Notion
            </button>
        </div>
    )
}

export default LeetCode