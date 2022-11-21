const giphyApiKey = "3Bqe6VoIAUhdUAAl6FcwPNGowW9nGU0m";
const output = document.querySelector("#output");

function getSimpsonsQuote() {
  fetch("https://thesimpsonsquoteapi.glitch.me/quotes")
    .then((res) => res.json())
    .then((res) => {
      console.log(res[0].character);
      return res[0].character;
    })
    .catch((error) => console.log(`Giphy API request error: ${error}`));
}

function getGiphyApi(character) {
  fetch(
    "https://api.giphy.com/v1/gifs/search?" +
      new URLSearchParams({ api_key: giphyApiKey, q: character })
  )
    .then((res) => res.json())
    .then((res) => {
      const randomNum = Math.floor(Math.random() * res.data.length);
      console.log(res.data[randomNum].images.original.url);
      return res.data[randomNum].images.original.url;
    })
    .catch((error) => console.log(`Giphy API request error: ${error}`));
}

async function getGif() {
  const character = await getSimpsonsQuote();
  const url = await getGiphyApi(character);
  output.innerHTML += `<img src=${url} />`;
}

getGif();
