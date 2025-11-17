# Express.js Revision Guide

A quick and clean revision sheet for **Express.js** — perfect for interview prep or refreshing your backend fundamentals.

---

## 🚀 What is Express?

Express.js is a **minimal, unopinionated web framework for Node.js** that makes it easy to build APIs and web servers.

Key features:

* Routing
* Middleware
* Request/Response handling
* Easy integration with databases
* No strict folder structure
* Lightweight & flexible

---

## 📦 Installation

```bash
npm init -y
npm install express
```

---

## 🔧 Basic Server Setup

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 🛣️ Routing

### Basic Routes

```js
app.get('/home', (req, res) => {});
app.post('/login', (req, res) => {});
app.put('/update', (req, res) => {});
app.delete('/delete', (req, res) => {});
```

### Route Parameters

```js
app.get('/user/:id', (req, res) => {
  res.send(req.params.id);
});
```

### Query Params

```js
app.get('/search', (req, res) => {
  res.send(req.query.keyword);
});
```

---

## ⚙️ Middleware

Express middleware is a function that executes **in order**, between request and response.

### Using Built-in Middleware

```js
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true }));
```

### Custom Middleware

```js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);
```

---

## 🗂️ Serving Static Files

```js
app.use(express.static('public'));
```

---

## 🔐 Error Handling

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});
```

---

## 🧩 Express Router

```js
const router = express.Router();

router.get('/profile', (req, res) => res.send('Profile'));

app.use('/user', router);
```

---

## 🗄️ Connecting a Database Example (MongoDB)

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test').then(() =>
  console.log('DB Connected')
);
```

---

## 🧪 Handling JSON

```js
app.post('/data', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Data received' });
}
```
