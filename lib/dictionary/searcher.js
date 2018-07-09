var load = require('./load.js');


var searchMethods = {
  modes: ['exact', 'partial', 'begins with', 'ends with'],
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
          }
        } else if (mode === 'partial') {
          if (word.includes(searchWord)) {
            matches.push(word)
          }
        } else if (mode === 'begins with') {
          if (word.startsWith(searchWord)) {
            matches.push(word)
          }
        } else if (mode === 'ends with') {
          if (word.endsWith(searchWord)) {
            matches.push(word)
          }
        }
        resolve(matches)
      }
    })
  }
};


module.exports = searchMethods
