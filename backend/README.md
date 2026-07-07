# Server for local testing

## How to test the backend
1.  Open [env_example](./server/env_example), modify according to instructions.
    - **IMPORTANT**: Change the name of the file to .env, then save.
    - `.env` files are explicitly ignored when uploading to GitHub, and therefore are unique to your local copy. Any global changes that cannot be demonstrated in the env_example file will need to be communicated verbally or in private messaging.

2.  From inside the `server` directory:
    - Perform an `npm install`
    - Then `npm start` to run the backend

3.  The console output should give the url where the app is running, open it or copy to an API testing software like Postman.

4. You should see text rendered that reads "The BackEnd (\_|_)".