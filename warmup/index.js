function one() {

  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = (err) => {
    console.log('State one');
    console.log('Type "next" to continue');
    if (err) {
      console.error(err);
    }
  };

  // Display message
  showMessage();


  // Handler for STDIN data
  // event
  var onData = (data) => {
    data = data.trim();

    // If user input "next"
    // let's go to the next
    // state
    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);// why remove?

      // ----------------------------------------
      // Go to next view here
      // ----------------------------------------
      two();
    } else {

      // All other input is invalid
      showMessage(`Invalid: ${ data }`);
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}

// Start the app
one();




var two = (err) => {
  var showMessage2 = (err) => {
    console.log("you're in state 2")
    console.log("type 'next' to continue")
    if (err) {
      console.error(err)
    }
  };

  showMessage2();

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var onData = (data) => {
    data = data.trim();
    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      three();
    } else {
      showMessage2(`Invalid: ${ data }`);
    }
  };

  process.stdin.on('data', onData);
};

function three() {
  var showMessage3 = (err) => {
    console.log("you're in state 3")
    console.log("type 'next' to quit")
    if (err) {
      console.error(err)
    }
  };
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  showMessage3();

  var onData = (data) => {
    data = data.trim();
    if (data === 'next') {
      //process.stdin.pause();
      //process.stdin.removeListener('data', onData);
      console.log('goodBye')
      process.exit()
    } else {
      showMessage(`Invalid: ${ data }`);
    }
  };
  process.stdin.on('data', onData);

};
