# node-nthline [![Build Status](https://travis-ci.org/BorisChumichev/node-nthline.svg?branch=master)](https://travis-ci.org/BorisChumichev/node-nthline) [![Coverage Status](https://coveralls.io/repos/github/BorisChumichev/node-nthline/badge.svg)](https://coveralls.io/github/BorisChumichev/node-nthline)

`nthline` reads specific line from file without buffering the entire file to memory. Under the hood it uses Node’s [readline](https://nodejs.org/api/readline.html) module.

### Install

```
npm i -S nthline
```

### Usage

Module exposes just one function: `nthline` with signature: `(rowIndex:Number, filePath:String) → Promise`. Row indexing is zero-based.

```javascript
;(async () => {
  const nthline = require('nthline'),
    filePath = '/path/to/100-million-rows-file',
    rowIndex = 42

  console.log(await nthline(rowIndex, filePath))
})()
```

Since it returns a promise you could rewrite previous example like that:

```javascript
const nthline = require('nthline'),
  filePath = '/path/to/100-million-rows-file',
  rowIndex = 42

nthline(rowIndex, filePath).then(line => console.log(line))
```
