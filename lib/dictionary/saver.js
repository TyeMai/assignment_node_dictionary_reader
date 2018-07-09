var fs = require('fs')

var saver = {

  writeData: (path, data) => {
    fs.writeFile(path, data, 'utf8', (err) => {

    })
  },

  existCheck:(path) => {
    console.log('im in existcheck')
    console.log(path)
    var result;
    fs.open(path, "r", (err, fd) => {
      if (err) {
        console.error('file no exist')
        return true
      } else {
        return false
      }
    })
  },

  appendData: (path, term) => {

    console.log('im in append data')
    /*
    fs.appendFile(path, term, "utf8", {flag: 'a+'}, (err) => {
      if(err){
        throw err
      }

  })

*/
    fs.open(path, 'wx', (err, fd) => {
      if (err) {
        if (err.code === 'EEXIST') {
          console.error(`${path} already exists`);

          //fs.close(fd, () =>{

        //  })
          console.log('end of open 1')
        }
        console.log(err)
        return err;
      }

      //writeMyData(fd);
    });





}

}


module.exports = saver
