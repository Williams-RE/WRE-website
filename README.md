# WRE-website

To get started, cd into the project and run this:

```
npm i
```

Afterwards, run this to do local development

```
npm run start
```

Note, this repo is a bit old and is compatible with Node version < 15. 
We've added the use of openssl legacy provider in the package.json to help those using newer versions of Node. 

```
"start": "NODE_OPTIONS=--openssl-legacy-provider react-scripts start",
```
