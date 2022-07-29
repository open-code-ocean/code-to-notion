import axios from 'axios';

const getLevel = (level) => {
  switch (level) {
    case 'Easy':
      return {
        name: 'Easy',
        color: 'blue',
      };
    case 'Medium':
      return {
        name: 'Medium',
        color: 'pink',
      };
    case 'Hard':
      return {
        name: 'Hard',
        color: 'red',
      };
    default:
      return {
        name: 'Easy',
        color: 'blue',
      };
  }
};
const getFormatedJson = (data) => {
  const formatedData = {
    parent: {
      database_id: '0b9f3544552b4899812bf56e71d48f3e',
    },
    properties: {
      Date: {
        type: 'date',
        date: {
          start: new Date().toLocaleString('sv-SE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
          end: null,
          time_zone: null,
        },
      },
      level: {
        type: 'select',
        select: getLevel(data.level),
      },
      Tags: {
        type: 'multi_select',
        multi_select: [
          {
            name: 'tree',
            color: 'green',
          },
          {
            name: 'Breadth-First Search',
            color: 'blue',
          },
          {
            name: 'Binary Tree',
            color: 'red',
          },
        ],
      },
      Name: {
        id: 'title',
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: data.title,
              link: {
                url: data.problemLink,
              },
            },
            annotations: {
              bold: true,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
            plain_text: data.title,
            href: data.problemLink,
          },
        ],
      },
    },
  };
  return formatedData;
};

function parseCode() {
  const codeEle = document.getElementsByClassName('CodeMirror-code');
  if (codeEle !== undefined && codeEle.length > 0) {
    const elem = codeEle[0];
    let parsedCode = '';
    const textArr = elem.innerText.split('\n');
    for (let i = 1; i < textArr.length; i += 2) {
      parsedCode += `${textArr[i]}\n`;
    }
    return parsedCode;
  }
  return null;
}

const uploader = (data) => {
  axios
    .post('http://localhost:5000/', getFormatedJson(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const leetloader = setInterval(() => {
  const success = document.getElementsByClassName('success__3Ai7');
  console.log('Code to Notion worker running fine!');
  if (success.length > 0 && !success[0].classList.contains('uploaded')) {
    console.log('Success!');
    const title = document.getElementsByClassName('css-v3d350')[0].textContent;
    const problemDescription = document.getElementsByClassName(
      'content__u3I1 question-content__JfgR'
    )[0].textContent;
    var tags = document.getElementsByClassName('tag__24Rd');
    tags = Array.from(tags).map((tag) => tag.textContent);
    const level = document.querySelector('.css-10o4wqw > div').textContent;
    const code = parseCode();
    const problemLink = window.location.href.replace('/submissions/', '/');
    const problem = {};
    problem.title = title;
    problem.tags = tags;
    problem.description = problemDescription;
    problem.level = level;
    problem.code = code;
    problem.problemLink = problemLink;
    console.log(problem);
    uploader(problem);
    success[0].classList.add('uploaded');
  }
}, 2000);

export const notionCallBack = (code) => {
  axios
    .get(`http://localhost:5000/v1/notion/call-back1?code=${code}&state=`)
    .then((res) => {
      console.log(res);
    });
  return {
    status: 200,
  };
};
