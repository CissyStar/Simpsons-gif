const giphyApiKey = "3Bqe6VoIAUhdUAAl6FcwPNGowW9nGU0m";
const output = document.querySelector("#output");
const getButton = document.querySelector("#generate-button");
const clearButton = document.querySelector("#clear-button");

async function getSimpsonsQuote() {
  try {
    const simpsonsPromise = await fetch(
      "https://thesimpsonsquoteapi.glitch.me/quotes"
    );
    const simpsonsJson = await simpsonsPromise.json();

    return simpsonsJson[0].character;
  } catch (error) {
    console.log(`Giphy API request error: ${error}`);
  }
}

async function getGiphyApi(character) {
  try {
    const giphyPromise = await fetch(
      "https://api.giphy.com/v1/gifs/search?" +
        new URLSearchParams({ api_key: giphyApiKey, q: character })
    );
    const giphyJson = await giphyPromise.json();
    const randomNum = Math.floor(Math.random() * giphyJson.data.length);

    return giphyJson.data[randomNum].images.original.url;
  } catch (error) {
    console.log(`Giphy API request error: ${error}`);
  }
}

async function initGif() {
  console.log(`initGif triggered `);
  try {
    let searchCharacter = await getSimpsonsQuote();
    output.innerHTML += `<h1>${searchCharacter}</h1>`;
    let gifUrl = await getGiphyApi(searchCharacter);
    output.innerHTML += `<img src=${gifUrl}/>`;
  } catch (error) {
    console.log(error);
  }
}

function clearGif() {
  output.innerHTML ="";
}

getButton.addEventListener("click", initGif);
clearButton.addEventListener("click", clearGif);
