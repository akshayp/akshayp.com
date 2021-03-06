---
title: "Node.js on OSX"
link: "/node-js-on-osx/"
category: "Geek Stuff"
id: "1458"
date: "2010-11-12
11:24:54"
---

[Node.js](https://nodejs.org/) is a fun new technology. If you are looking to experiment with it, here is a quick start
guide on how to install it for people using OSX

**Macports is so 1995**

Install [Homebrew](https://brew.sh/ "Homebrew Guide"), a much better alternative to macports

```bash
ruby -e "$(curl -fsSL https://gist.github.com/raw/323731/install_homebrew.rb)"
```

**Install Node.js and NPM**

[npm](https://github.com/isaacs/npm "npm") (Node Package Manager) is a nifty little tool to manage node
[packages](https://npmjs.com/ "Node Package Repo")

```bash
brew install node
brew install npm
export NODE_PATH="/usr/local/lib/node"
```

That'll do it's thing and voila!, you now have node installed. To quickly test if this is working create a file called
test.js. In the file paste the following contents

```javascript
const http = require('http');
http
    .createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    })
    .listen(8124, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8124/');
```

Now run and you should be able to hit http://127.0.0.1:8124/ to view the results

```bash
node test.js
```

A few more packages to play with while you experiment:

```bash
npm install expressjs

npm install jsdom

npm install yui3

npm install yql
```
