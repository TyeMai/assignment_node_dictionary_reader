var loader = require('./load.js');


var searchMethods = {
  modes: ['exact', 'partial', 'begins with', 'ends with'],

  search: (mode,searchWord) => {

    return new Promise((resolve,reject) => {


    var result;
    var addOps = '';
    //var re = new RegEx(searchWord, "g");
    var arrMatch = [];
    if (mode === 'exact'){
      //console.log('dick dick dick')
      // addOps =  `^${searchWord}$`   ///^searchWord$/g
      result = new RegExp(`^${searchWord}$`, 'g')
    }else if (mode === 'partial'){
      result = new RegExp(`${searchWord}`, 'g')
      //result = /searchWord/g
    }else if (mode === 'begins with'){
      result = new RegExp(`^${searchWord}`, 'g')
      //result = /^searchWord/g
    }else if (mode === 'ends with'){
      result = new RegExp(`${searchWord}$`, 'g')
      //result = /searchWord$/g
      //console.log(mode, dic)
    }
    //console.log(mode + "im in mode")
    console.log(result)
    //console.log(loader.selectedDic)
    for (word of Object.keys(loader.selectedDic)) {
      //console.log(word)
      //console.log(result)

      if (result.exec(word)){
        arrMatch.push(word)
      //  console.log('i match!!!')
      }
    }

  //var arrWords = result.exec(loader.selectedDic)
    resolve(arrMatch)
  })
  }


};


module.exports = searchMethods
