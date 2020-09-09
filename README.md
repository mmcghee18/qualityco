# QualityCo MVP

## Backend
This is a server that accepts requests from the frontend and pings the Airtable database for information.

#### Endpoints ☎️
```
/api/products
/api/services
```
#### Deployment 🚀
```
git subtree push --prefix api-proxy heroku master
```
This app is hosted on Heroku. It's connected to this git repo (a `git push` will deploy it automatically), but because api-proxy is nested inside qualityco, this command needs to be run (from the base repo) in order to deploy successfully.

## Frontend
This project was bootstrapped with Create React App.

#### Dev Mode 🎨
`npm start` runs the app in development mode. Open http://localhost:3000 to view it in the browser.

#### Deployment 🚀
The frontend app is deployed to Netlify, and will automatically deploy on `git push`. You can see it here: https://kind-fermi-56627d.netlify.app/
