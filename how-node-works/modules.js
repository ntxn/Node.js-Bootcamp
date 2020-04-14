/*
  arguments is an array in JavaScript. This array contains all the value being passed into a function
  so if there are any values in arguments, that means we're in a function

  returned result: [exports, require, module, __filename, __dirname]
  {
  '0': {},
  '1': [Function: require] {
    resolve: [Function: resolve] { paths: [Function: paths] },
    main: Module {
      id: '.',
      path: '/Users/Kiera/Documents/workspace/learning_web/nodejs-bootcamp/how-node-works',
      exports: {},
      parent: null,
      filename: '/Users/Kiera/Documents/workspace/learning_web/nodejs-bootcamp/how-node-works/modules.js',
      loaded: false,
      children: [],
      paths: [Array]
    },
    extensions: [Object: null prototype] {
      '.js': [Function (anonymous)],
      '.json': [Function (anonymous)],
      '.node': [Function (anonymous)]
    },
    cache: [Object: null prototype] {
      '/Users/Kiera/Documents/workspace/learning_web/nodejs-bootcamp/how-node-works/modules.js': [Module]
    }
  },
  '2': Module {
    id: '.',
    path: '/Users/Kiera/Documents/workspace/learning_web/nodejs-bootcamp/how-node-works',
    exports: {},
    parent: null,
    filename: '/Users/Kiera/Documents/workspace/learning_web/nodejs-bootcamp/how-node-works/modules.js',
    loaded: false,
    children: [],
    paths: [
      '/Users/Kiera/Documents/workspace/learning_web/nodejs-bootcamp/how-node-works/node_modules',
      '/Users/Kiera/Documents/workspace/learning_web/nodejs-bootcamp/node_modules',
      '/Users/Kiera/Documents/workspace/learning_web/node_modules',
      '/Users/Kiera/Documents/workspace/node_modules',
      '/Users/Kiera/Documents/node_modules',
      '/Users/Kiera/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  },
  '3': '/Users/Kiera/Documents/workspace/learning_web/nodejs-bootcamp/how-node-works/modules.js',
  '4': '/Users/Kiera/Documents/workspace/learning_web/nodejs-bootcamp/how-node-works'
}
*/
console.log(arguments);

/*
  the module module that node.js used internally.
  require("module").wrapper is the wrapper function that wraps all the module

  [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
  ]
*/
console.log(require("module").wrapper);

// Using module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5)); // result: 7

// exports
const calc2 = require("./test-module-2"); // calc2 is the exports object
console.log(calc2.add(2, 5)); // result: 7

// exports using ES6 destructoring
const { add, multiply } = require("./test-module-2");
console.log(add(2, 5)); // result: 7

// Caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
/*
  result: - Hello from the module ONLY ONCE because it's loaded once and save to the cache
    Hello from the module
    Log this beautiful text
    Log this beautiful text
    Log this beautiful text
*/
