// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener('DOMContentLoaded', () => {
  const heartModes = [
    {
      type: EMPTY_HEART,
      className: 'like-glyph',
      message: 'You un-liked a post.',
    },
    {
      type: FULL_HEART,
      className: 'activated-heart',
      message: 'You liked a post.',
    },
  ];

  // Adding events to heart clicks.
  const likeGlyphs = Array.from(document.getElementsByClassName('like-glyph'));
  for (const likeGlyph of likeGlyphs) {
    let heartModeIndex = 0;
    likeGlyph.addEventListener('click', (event) => {
      return mimicServerCall()
      .then(() => {
        heartModeIndex = (heartModeIndex + 1) % heartModes.length;
        event.target.textContent = heartModes[heartModeIndex].type;
        event.target.setAttribute('class', heartModes[heartModeIndex].className);
        console.log(heartModes[heartModeIndex].message);
      })
      .catch((error) => {
        const modal = document.getElementById('modal');
        modal.textContent = error;
        modal.removeAttribute('class');
        setTimeout(() =>  modal.setAttribute('class', 'hidden'), 3000);
        console.error(error);
      });
    });
  }
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
