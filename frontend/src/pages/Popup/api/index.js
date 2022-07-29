import axios from 'axios';
import { APIErrorCode, ClientErrorCode } from '@notionhq/client';
import { Client } from '@notionhq/client';
const errorHandler = (apiFunc) => {
  try {
    return apiFunc;
  } catch (error) {
    switch (error.code) {
      case ClientErrorCode.RequestTimeout:
        break;
      case APIErrorCode.ObjectNotFound:
        break;
      case APIErrorCode.Unauthorized:
        break;

      default:
        assertNever(error.code);
    }
  }
};

const getDatabase = async () => {
  const notion = new Client({
    auth: window.localStorage.getItem('secretKey', ''),
  });

  (async () => {
    const databaseId = window.localStorage.getItem('dbid', '');
    const response = await errorHandler(
      notion.databases.retrieve({
        database_id: databaseId,
      })
    );

    console.log(response);
  })();
};

export default getDatabase;
