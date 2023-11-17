# Chatbot using OpenAI and nodejs

Tech stack used : nodejs, expressjs, socket.io, reactjs, mongodb, MUI, CSS

How to run : 
1. Clone to the repo.
2. Add environment variables in .env file.
3. run npm install command on both client and server folder.
4. run npm run dev command on both client and server folder.

Working : 
All the user messages are sent to openAPI which sends a response to the user request. That response is returned to the user, all the chat history is stored on mongodb so that it can be accessed in future.

Future Improvements:
A significant amount of improvements can be made to this project out of which some are :
1. Option can be added for user to attach a image to search from it.
2. Some controls can be added so that chatbot is able to play music and videos from the device.