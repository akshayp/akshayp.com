{{{"title" : "Node.js on OSX","link" : "/node-js-on-osx/","category" : "Geek Stuff","id" : "1458","date" : "2010-11-12 11:24:54"}}}
[Node.js](http://nodejs.org/) is a fun new technology. If you are looking to experiment with it, here is a quick start guide on how to install it for people using OSX

**Macports is so 1995**

** **Install [Homebrew](http://mxcl.github.com/homebrew/ "Homebrew Guide"), a much better alternative to macports

<pre class="prettyprint lang-bash linenums">

ruby -e "$(curl -fsSL https://gist.github.com/raw/323731/install_homebrew.rb)"

</pre>

**Install Node.js and NPM**

[npm](https://github.com/isaacs/npm "npm") (Node Package Manager) is a nifty little tool to manage node [packages](http://npm.mape.me/ "Node Package Repo")

<pre class="prettyprint lang-bash linenums">
brew install node
brew install npm
export NODE_PATH="/usr/local/lib/node"
</pre>

That'll do it's thing and voila!, you now have node installed. To quickly test if this is working create a file called test.js. In the file paste the following contents

<pre class="prettyprint lang-js linenums">
var http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Hello World\n');
}).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');
</pre>

Now run and you should be able to hit
http://127.0.0.1:8124/ to view the results
<pre class="prettyprint lang-bash linenums">
node test.js
</pre>

A few more packages to play with while you experiment:

<pre class="prettyprint lang-bash linenums">
npm install expressjs

npm install jsdom

npm install yui3

npm install yql
</pre>