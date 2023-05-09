# Getting Started with Create React App
root:
npm start

runs front & back

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Runs [http://localhost:5000](http://localhost:5000) as server.

http://localhost:5000/api/records/

### `database`

postgres

backend/databse

CREATE TABLE record (
  id SERIAL PRIMARY KEY,
  name TEXT,
  address TEXT,
  amount NUMERIC,
  role VARCHAR(255),
  status VARCHAR(255)
);

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
