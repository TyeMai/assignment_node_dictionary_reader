var fs = require('fs');


var dic = {
  path: '../../data',

  finder: (dir) => { //finds all dictionarys in dirrectory and displays them.

      // dictorry to look in
      var dicIdentifier = /.json/; // making a regex, all files that end in .json are dictionaries
      var matches = []; //an empty arry to contain the matches
      //var dictionaries = [];

      return new Promise( (resolve, reject) => {
      fs.readdir(dic.path, (err, dirNames) => { //reading directory specfiied in var path
        //console.log(fileName)
        if (err){
          throw err;
        }
        dirNames.forEach((name) => {
          //console.log(name)
          if (dicIdentifier.test(name)){
            //console.log('im in test')
            matches.push(name)
            resolve(matches)
          } else {
            reject(err)
          }
        })
      })
  })
},
//  async blowLoad(name){
  blowLoad: async (name) => { //once a dictionary has been loaded.. this will open and read the dictionary. and count up the stats.
    var finalData = '';
    var dicSelected = `${dic.path}/${name}`
    console.log(`Successfully loaded: ${name}`)
    var wordCount = 0;
    var readStream = fs.createReadStream(dicSelected, 'utf8')

    readStream.on('data', (data) => {
       finalData += data
    })

    readStream.on('end', () => {
    //  var letterCounts = {}
    // new Promise( (resolve, reject) => {
    //  if (JSON.parse(finalData)){
        console.log('i have data')
        //console.log(JSON.parse(finalData))

        return  (JSON.parse(finalData))
      // else {
        //reject(console.log(error))
    //s  }






//    })

      /*
      for(word of Object.keys(obj)){
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
      */



    })

    //return obj
  }
}




module.exports = dic
