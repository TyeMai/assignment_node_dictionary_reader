var search = require('./searcher.js')
var loader = require('./load.js')



var messages = { //step one is to load a dictionary,
   one: () => {
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
    })

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var onData = async (data) => { //this function handels the instream for step 1 selecting and loading a dic.
      var letterCounts = {}
      data = data.trim();
      if (data === 'q') {
        process.exit()
      } else if (data < dicArr.length) {
        var dicName = (dicArr[data]) //dicArry saved earlier.. saves the exact dictionary to a variable.

        var wholeDic = await loader.blowLoad(dicName)
        console.log(wholeDic)
      // wholeDic.then(obj => {
          for(word of Object.keys(wholeDic)){
            var letter = word[0]
            wordCount++
            if (letterCounts.hasOwnProperty(letter)){
              letterCounts[letter]++
            } else{
              letterCounts[letter] = 1
            }
          }
          console.log(`total number of words: ${wordCount}`)
          console.log(`Word frequency by starting letter: ${letterCounts}`)
          console.log(letterCounts)
    //  }) //loads(creates stream) the dictioanry by name.




        messages.step2()
        process.stdin.removeListener("data", onData)
      } else {
        console.error("that is not a valid respose.")
        console.log(`please input a number between 0 and ${messages.dicArr.length - 1}`)
      }
    }
    process.stdin.on("data", onData)
  },


  step2: (term) => { //search in dic
    //return new Promise((resolve, reject) {
    var msg2 = () => {
      console.log('what kind of match do you want? ')

      search.modes.forEach((mode ,index) => {
      console.log(`${index}. ${mode}`)
      })
    }
      msg2();
    //  })
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var onSearch = (data) => {
      data = data.trim()
      if (data === 'q'){
        process.exit()
      }
      if (data <= search.modes.length) {
        console.log(`ok we will do an ${search.modes[data]} match`)
        var choice = search.modes[data]
      } else{
        console.log(`thats not a valid choice please enter a number between `)
      }
      messages.step3(choice)
      process.stdin.removeListener("data", onSearch)
    }
    process.stdin.on("data", onSearch)



  },
  step3: (choice) => { //search in the dictionary
    var matches = []
    console.log('enter a search term please')
    console.log('youre in step 3')
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var onTerm = (data) => {
      data = data.trim()
      if (data === 'q'){
        process.exit()
      } else {
        var term =  search.search(choice,data) //we get back the search term in the correct regEx format

        //process.stdin.removeListener("data", onTerm)

      }


    }

    process.stdin.on("data", onTerm)


  }

};






module.exports = messages
