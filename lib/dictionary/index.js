var search = require('./searcher.js');
var save = require('./saver.js');
var ui = require('./ui.js');
var loader = require('./load.js')
var names;

  console.log('Hi You! and Welcome to the Node Dic Reader')
  console.log('==========================================')
  console.log('enter q to quit')
  console.log('or enter the number of the dictionry youd like to serach')

  loader.finder().then((name) => {
      name.forEach((ele, index) => {
        console.log(`${index}.  ${ele}`)
      })
    })

process.stdin.resume();
process.stdin.setEncoding('utf8');



var onData = (data) => {
  data = data.trim();
  ui.step2(data)
}


process.stdin.on("data", onData)
