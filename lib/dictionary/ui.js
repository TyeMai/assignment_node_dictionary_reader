var searcher = require('./searcher.js')
var loader = require('./load.js')
var saver = require('./saver.js')
const fs = require('fs')

var messages = { //step one is to load a dictionary,

  // could make on data function here to han

  loadingStep: () => {
    var dicArr = [];
    var finalData = '';

    console.log('Hi You! and Welcome to the Node Dic Reader')
    console.log('==========================================')
    console.log('enter q to quit')
    console.log('or enter the number of the dictionry youd like to serach')

    loader.finder().then((name) => { // searches for and then loads a dictionry
      dicArr = name; //saves the names of the dictionarys to an array. to be sued in onData function for length.
      name.forEach((ele, index) => {
        console.log(`${index}.  ${ele}`)
      })
      process.stdin.resume();
      process.stdin.setEncoding('utf8');

      var onData = (data) => { //this function handels the instream for step 1 selecting and loading a dic.
        data = data.trim();
        if (data === 'q') {
          process.exit()
        } else if (data < dicArr.length) {
          console.log('length error')
          var dicName = dicArr[data] //dicArry saved earlier.. saves the exact dictionary to a variable.
          var dicStats = loader.blowLoad(dicName) //loads(creates stream) the dictioanry by name.
          //logs the stats then moves to step 2
          dicStats.then(stat => {
            console.log(`Word frequency by starting letter: `) // ${stat.letterCounts}`)// this wont work.
            console.log(stat.letterCounts)
            console.log(`total number of words: ${stat.wordCount}`)
            console.log("=========================================")
            messages.matchTypeStep()
          })
          process.stdin.removeListener("data", onData)
        } else if (data >= dicArr.length) {
          console.error("that is not a valid respose.")
          console.log(`please input a number between 0 and ${dicArr.length - 1}`)
        }
      }
      process.stdin.on("data", onData)
    //  process.stdin.on('data', onQuit)
    })
  },

  //step 2 displasys then promots the user to select a serach mode.
  matchTypeStep: (term) => {
      console.log('what kind of match do you want? ')
      searcher.modes.forEach((mode, index) => {
        console.log(`${index}. ${mode}`)
      })
    var onSearch = (data) => {
      data = data.trim()
      if (data === 'q') {
        process.exit()
      }
      //gets the mode to serach in.
      if (data < searcher.modes.length) {
        console.log(`ok we will do an ${searcher.modes[data]} match`)
        var choice = searcher.modes[data]
        messages.searchStep(choice)
        process.stdin.removeListener("data", onSearch)
      } else {
        console.log(`thats not a valid choice please enter a number between 0 and ${searcher.modes.length - 1}`)
      }

    }
    process.stdin.on("data", onSearch)
  },

  //step 3 asks user for a word to serach for.
  searchStep: (choice) => { //search in the dictionary
    var matches = []
    console.log('enter a search term please')

    var onTermRecieved = (data) => {
      data = data.trim()
      if (data === 'q') {
        process.exit()
      }
      if ((/[^a-zA-Z]/.test(data))) {
        console.log('please enter a valid search term')
      } else {
        searcher.search(choice, data).then(term => {
          // a promise is returned from the seracer mod..when the promise resolves it has an arry of the found matches
          if (term.length > 1 || term.length === 0) {
            console.log(`There are ${term.length} matches`)
          } else {
            console.log(`There is ${term.length} match`)
          }
          term.forEach(match => {
            console.log(match)
          })
          if (term.length === 0) {
            console.log('please enter another search word')
          } else {
            //the array with the matches is sent to step 4
            messages.savePromptStep(term)
            process.stdin.removeListener("data", onTermRecieved)
          }
        })
      }
    }
    process.stdin.on("data", onTermRecieved)

  },
  //step 4 asks the user if they want to save the resutls..
  savePromptStep: (term) => {
    console.log('would you like to save the results? y/n? "q" quits')

    var onSave = (data) => {
      data = data.trim()
      if (data === 'q') {
        process.exit()
      } else if (data === 'y') {
        //the arry of matches from step 3 is sent to step 5
        messages.overwriteCheckStep(term)
        process.stdin.removeListener("data", onSave)
      } else if (data === 'n') {
        messages.matchTypeStep()
        process.stdin.removeListener("data", onSave)
      } else {
        console.log("sorry not a valid response please enter y or n")
      }
    }
    process.stdin.on('data', onSave)

  },
  //step 5 promts the user for the file to write the data to.
  overwriteCheckStep: (term) => { //save results step or whatever ...step
    console.log("What filepath should the results be written to?")
    var onPath = (data) => {
      data = data.trim()
      if (data === 'q') {
        process.exit()
      } else { //if file exists
        fs.open(data, 'wx', (err, fd) => {
          if (err) {
            if (err.code === 'EEXIST') {
              console.error(`${data} already exists`);
              messages.overwritingStep(data, term)
              process.stdin.removeListener('data', onPath)
            }
          } else { //if file dosen't exist.
            fs.writeFile(data, term, 'utf8', (err) =>{
              if(err){
                throw err;
              } else {
                console.log(`${term} successfully written to ${ data } `)
                messages.endStep()
              }
            })
            process.stdin.removeListener('data', onPath)
          }
      })
    }
  }
    process.stdin.on('data', onPath)

  },
 //step6/overwrite will overwrite the file or append to the file.
  overwritingStep: (file, term) => { //if file needs to be overwritten so if overwrite yes
    console.log('would you like to overwrite? y/n?')

    var onOverwrite = (data) => {
      data = data.trim()
      if (data === 'q') {
        process.exit()
      } else if (data === 'y') {
        fs.writeFile(file, term, (err)=> {
          if(err){
            throw err;
          } else {
            console.log(`${ term } succesffully written to ${ file }`)
            messages.endStep();
            process.stdin.removeListener('data', onOverwrite)
          }
        })
      } else if (data === 'n') {
        fs.appendFile(file, term, 'utf8', (err) =>{
          if(err){
            throw err;
          } else {
            console.log(`${ term } successfully written to ${ file }`)
            messages.endStep();
            process.stdin.removeListener('data', onOverwrite)
          }
      })

      } else {
        console.log('invalid reponse please enter y/n or q to quit')
      }

    }
      process.stdin.on('data', onOverwrite)
  },
  //end step/step 7 starts a new search or quits the program.
  endStep: () => {
    console.log('would you like to serach for another term?')
    var onNewSearch = (data) => {
      data = data.trim()
      if (data === 'q' || data === 'n') {
        process.exit()
      }
      if (data === 'y') {
        messages.matchTypeStep()
        process.stdin.removeListener('data', onNewSearch)
    }
  }
    process.stdin.on('data', onNewSearch)
  }
};






module.exports = messages
