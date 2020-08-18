# Backend
This is a server that accepts requests from the frontend and pings the Airtable database for information.

## Endpoints ☎️
```
/api/products
/api/services
```

## Deployment 🚀
```
git subtree push --prefix api-proxy heroku master
```
This app is hosted on Heroku. It's connected to this git repo (a `git push` will deploy it automatically), but because `api-proxy` is nested inside `qualityco`, this command needs to be run in order to deploy successfully.
