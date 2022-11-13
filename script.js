const giphyApiKey = "3Bqe6VoIAUhdUAAl6FcwPNGowW9nGU0m";
const output = document.querySelector("#output");

fetch("https://thesimpsonsquoteapi.glitch.me/quotes")
  .then((res) => res.json())
  .then((res) => {
    const searchCharacter = res[0].character;
    fetch(
      "https://api.giphy.com/v1/gifs/search?" +
        new URLSearchParams({ api_key: giphyApiKey, q: searchCharacter })
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.data);
        const randomNum = Math.floor(Math.random() * res.data.length);
        // console.log(randomNum);
        output.innerHTML = `<h1>${searchCharacter}</h1>
                            <img src=${res.data[randomNum].images.original.url}/>`;
      })
      .catch((e) => console.log(`Giphy API request error: ${e}`));
  })
  .catch((e) => console.log(`Simpsons' quote API request error: ${e}`));
