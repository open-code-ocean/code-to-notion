const { Notion } = require('../models');

const createNotion = async (user, notion) => {
  const notionObj = await Notion.create({
    user: user._id,
    ...notion,
  });
  return notionObj;
};

module.exports = {
  createNotion,
};
