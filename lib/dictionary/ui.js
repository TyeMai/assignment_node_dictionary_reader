var search = require('./searcher.js')
var loader = require('./load.js')



var messages = {
   dicArr: loader.finder().then((arr) => {
     messages.dicArr = arr
   }),

    step2:(options) => {
      if(options === 'q'){
        process.exit()
      } else if (options < messages.dicArr.length) {
        var dicName = (messages.dicArr[options])
        loader.blowLoad(dicName)
      } else{
        console.error("that is not a valid respose.")
        console.log(`please input a number between 0 and ${messages.dicArr.length - 1}`)
      }
    }
};






module.exports = messages
