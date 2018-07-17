var load = require('./load.js');


var searchMethods = {
  modes: ['exact', 'partial', 'begins with', 'ends with', 'strict anagram', 'anagram repeat', 'anagram no repeat'],
  /*
  search: (mode, searchWord) => {
    return new Promise((resolve, reject) => { //try to see
      var result;
      var matches = [];

      if (mode === 'exact') {
        //result = /searchWord/g
        //result = new RegExp(`${^searchWord$}`, 'g')
        result = searchWord
      } else if (mode === 'partial') {
        result = new RegExp(`${searchWord}`, 'g')
        //index of ===
        //result = /searchWord/g
      } else if (mode === 'begins with') {
        result = new RegExp(`^${searchWord}`, 'g')
        //result = /^searchWord/g
        //start  with
      } else if (mode === 'ends with') {
        result = new RegExp(`${searchWord}$`, 'g')
        //result = /searchWord$/g
        //console.log(mode, dic)
        //endsWith
      }
      console.log(result)
      for (let word of Object.keys(loader.selectedDic)) {
        //console.log(word)
        //console.log(result)

        if (result.indexOf(word) !== -1) {
          matches.push(word)
           console.log('i match!!!')
        }
      }
      resolve(matches)
    })
  }
*/

  search: (mode, searchWord) => {
    return new Promise((resolve, reject) => { //try to see
      var matches = [];
      for (let word of Object.keys(load.selectedDic)) {
        if (mode === 'exact') {
          if (word === searchWord) {
            matches.push(word)
            // printing the defination of the word
            //console.log(load.selectedDic[word])
          }
        } else if (mode === 'partial') {
          if (word.includes(searchWord)) {
            matches.push(word)
            //console.log(load.selectedDic[word])
          }
        } else if (mode === 'begins with') {
          if (word.startsWith(searchWord)) {
            matches.push(word)
            //console.log(load.selectedDic[word])
          }
        } else if (mode === 'ends with') {
          if (word.endsWith(searchWord)) {
            matches.push(word)
            //console.log(load.selectedDic[word])
          }
        } else if (mode === 'strict anagram') {
          if (word.length === searchWord.length) {

            if (testSearchWord === testWord) {
              matches.push(word)
            }
          }
        } else if (mode === 'anagram repeat') {
          var isAnagram = true;
          for (var i = 0; i < word.length; i++) {
            if (searchWord.indexOf(word[i]) !== -1) {
              isAnagram = true
            } else {
              isAnagram = false
              break;
            }
          }
          if (isAnagram ) {
            matches.push(word)
          }

        } else if (mode === 'anagram no repeat') {
          var testSearchWord = searchWord.split('')
          //console.log(testSearchWord)
          //var testWord = word.split('')
          var isAnagram = true;
          for (var i = 0; i < word.length; i++) {
            //var indexOfSW = (testWord)
            if (testSearchWord.indexOf(word[i]) !== -1 && isAnagram === true) { // && isAnagram === true){
              //isAnagram = true
              var letToErase = testSearchWord.indexOf(word[i])
              console.log(letToErase)
              testSearchWord = delete testSearchWord[letToErase]
            } else {
              isAnagram = false
              //break;
            }
            if (isAnagram === true && i === (word.length - 1)) {
              matches.push(word)
            }

          }


        }



      }
      resolve(matches)
    })




  }

}
module.exports = searchMethods
