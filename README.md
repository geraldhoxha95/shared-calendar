## Project
Straightforward shared calendar that I built
to keep track of events with friends. Single login that
can be shared. <br>
Once logged in, allows creation of events that get persisted in mongo DB. <br>
Relies heavily on [react-big-calendar](https://github.com/jquense/react-big-calendar)


Note: VERY VERY rough draft. Room for a LOT of improvement in terms of security, state management, code cleanup, among other things.

### USE AT YOUR OWN RISK
## Setup
1. Install client npm packages: `cd client && npm install`
2. Install server npm packages: `cd server && npm install`
3. In `server` folder, create a `.env` file with the following content:<br>
````DB_URI=mongodb+srv://...```` <br>
````PORT=3001````<br>
Note that this uses MongoDB. I used the free version of Mongo Atlas to run the DB <br>
4. In `client` folder, create a `.env` file with the following content:
````REACT_APP_BACKEND_URI=http://localhost:5000````
Again, replace this with the URL that hosts your server
5. Create a login using following script: 
````node server/scripts/loginCreationScript.js 'username1' 'password'````<br>
This will be used to log into the app
6. Start the server: `cd server && npm start`
7. Start the client: `cd client && npm start`
8. Open `http://localhost:3000` in your browser
