# PostHTML-bemjson
[![npm version](https://badge.fury.io/js/posthtml-bemjson.svg)](http://badge.fury.io/js/posthtml-bemjson)

## Usage

```js
var posthtml = require('posthtml'),
    html = '<html><head><title>Wow</title></head><body><div class="button"><div class="button__text">Text</div></div></body></html>';

var bemjson = posthtml()
    .use(require('posthtml-bemjson'))
    .process(html).tree;
```

## Test

```
npm run test
```

