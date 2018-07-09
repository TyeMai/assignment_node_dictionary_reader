var fs = require('fs');


var dic = {
  path: '../../data',
  selectedDic: undefined,

  finder: (dir) => { //finds all dictionarys in dirrectory and displays them.
    // dictorry to look in
    var matches = []; //an empty arry to contain the matches
    return new Promise((resolve, reject) => {
      fs.readdir(dic.path, (err, dirNames) => { //reading directory specfiied in var path
        if (err) {
          throw err;
        }
        dirNames.forEach((name) => {
          if (name.endsWith(".json")) {
            matches.push(name)
            resolve(matches)
          } else {
            reject(err)
          }
        })
      })
    })
  },

  blowLoad: (name) => { //once a dictionary has been loaded.. this will open and read the dictionary. and count up the stats.
    return new Promise((resolve, reject) => {
      var dicSelected = `${dic.path}/${name}`
      console.log(`Successfully loaded: ${name}`)
      var readStream = fs.createReadStream(dicSelected, 'utf8')
      var finalData = '';
      readStream.on('data', (data) => {
        finalData += data
      })

      readStream.on('end', () => {
        var obj = JSON.parse(finalData)
        dic.selectedDic = obj
        var wordCount = 0;
        var letterCounts = {}
        for (let word of Object.keys(obj)) {
          var letter = word[0]
          wordCount++
          if (letterCounts.hasOwnProperty(letter)) {
            letterCounts[letter]++
          } else {
            letterCounts[letter] = 1
          }
        }
        var dicStats = {
          letterCounts: letterCounts,
          wordCount: wordCount
        }
        resolve(dicStats)
      })
    })
  }
}




module.exports = dic
