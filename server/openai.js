const OpenAIApi  = require("openai");
require('dotenv').config()
const openai = new OpenAIApi({
    apiKey: process.env.OPEN_API_KEY
}); 

  async function main(prompt) {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });
    // console.log(chatCompletion.choices[0].message );
    return chatCompletion.choices[0].message;
  }
  
  module.exports = main;