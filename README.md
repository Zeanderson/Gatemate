# Gatemate Team 7 - Spring 2023

- A web app using react,vite,express,and node to monitor and adjust gatemates at any time any place

## Table of Contents

- [General Info](#general-info)
- [Setup](#setup)
- [Dependencies](#dependencies)
- [Cloning](#cloning-repo)
- [How to run](#how-to-run)
- [Extension Setup](#extension-setup)
- [express-server](#express-server)
- [gatemate](#gatemate)

## General Info

- Project Contributors: -------------

## Setup

- Install [vscode](https://code.visualstudio.com/download/)

- Install [Node](https://nodejs.org/en/download)

- Install [Git](https://git-scm.com/download/win)

- Navigate to set path variable ->
  - advanced system settings
  - environment variables
  - new user variable
  - variable name : `node.js`
  - variable value : `C:\Program Files\nodejs`

## Cloning repository

- Open new vscode window and navigate to the source control tab
  - Clone Repository
  - Paste `https://github.com/Zeanderson/Gatemate.git`
  - Put inside a folder at your disgression

## Dependencies

```
cd express-server
npm install
cd ..
cd gatemate
npm install
cd ..
```

## How to run

- Terminal 1

```
cd express-server
npm run start
```

- Terminal 2

```
cd gatemate
npm run build
npm run dev
```

## Extension Setup

- Prettier

```
https://www.alphr.com/use-prettier-vs-code/
```

## express-server

- src

  - controllers

    - Each API made in 'express-server.ts' will have a corresponding controller file with a router created. CRUD operations go inside of this file (get,post). No logic here, just error handle

  - datasources

    - Logic for localized api's go here, and api data from out sourced data
    - db.ts
      - This database datasource is where all queries for mongoDB will be held

  - express-server.ts

    - The brains of the backend including the app becoming a express backend. Middleware for the application goes here, and definitions of localized apis we will be using

  - types-ts
    - Types for all datasource data

## gatemate

- src

  - components

    - These are "plug-in-play" tsx files that include things such as Spinners, Banners, Popups

  - routes

    - Routes are each page that the user sees. Signin page (signin.tsx) --> Home page (home.tsx)

  - app.tsx

    - This is where the react-router is created, and how to define new paths on the app

  - index.css
    - This project uses tailwind, but it uses this file to style every pages "theme"
  - main.tsx
    - Entry point to for react-scripts to build and start the app

- vite.config.ts
  - This is where you setup the front end proxy for the backend 'express-server'
