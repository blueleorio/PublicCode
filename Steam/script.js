const BASE_URL = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com`;
const HOME_PAGE = `index.html`;
const GAME_PAGE = `game.html`;

// Redirect when click on image

// get Alt value in img for app Id - i have no idea what im doing but thnaks stackoverflow
let appID = "";
const getAppID = (img) => {
  appID = img.alt;
  let cloneSide = document.querySelector(".side").innerHTML;
  window.localStorage.setItem("sideHTML", cloneSide);
  window.localStorage.setItem("appID", appID);
};

const redirectPage = (id) => {
  getAppID(id);
  window.location.href = `${GAME_PAGE}`;
};

// get search Result
const getSearchResult = () => {
  let search = document.getElementById("input-search").value;
  return renderGamesList(`q=${search}`, `Results for ${search}`);
};
let input = document.getElementById("input-search");
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-btn").click();
  }
});

const getGenresList = async () => {
  try {
    const url = `${BASE_URL}/genres?limit=30`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);

    return data;
  } catch (error) {
    console.log("WTF", err);
  }
};

const renderGenresList = async () => {
  try {
    const data = await getGenresList();

    //sort unordered list JSON
    data.data = data.data.sort((a, b) => {
      if (a.count > b.count) {
        return -1;
      }
    });

    const genresList = document.getElementById("genres-list");

    const ulGenresList = genresList.children[1];

    ulGenresList.innerHTML = "";

    data.data.forEach((genre, index) => {
      //   console.log("Did get passed loop shit");
      const x = document.createElement("li");
      x.innerHTML = `<span onclick="renderGamesList(\`genres=${genre.name}\`,\`${genre.name}\`)">${genre.name}</span`;
      ulGenresList.appendChild(x);
    });
  } catch (error) {
    console.log("WTF IS THIS SHIT", err);
  }
};

// Click genre to sort game

// Featured game display first

const getFeaturesList = async () => {
  try {
    const url = `${BASE_URL}/features`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("WTF", err);
  }
};

const renderFeaturesList = async () => {
  try {
    const data = await getFeaturesList();

    const genresList = document.getElementById("games-list");

    // const ulGenresList = genresList.children[1];

    genresList.innerHTML = "";

    data.data.forEach((feature, index) => {
      //   console.log("Did get passed loop shit");
      const x = document.createElement("div");
      // add class to above newly added div shit
      x.classList.add("game-box-container");

      x.innerHTML = `<div class="game-box">
      <img
        class="header-img"
        src="${feature.header_image}"
        alt="${feature.appid}"
        onclick="redirectPage(this)"
      />
    </div>
    <div class="text-box">
      <span>${feature.name}</span>
    </div>`;
      genresList.appendChild(x);
    });
  } catch (error) {
    console.log("WTF IS THIS SHIT", err);
  }
};

const getGamesList = async (name) => {
  try {
    const url = `${BASE_URL}/games?${name}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("WTF", err);
  }
};

const renderGamesList = async (name, title) => {
  try {
    const data = await getGamesList(name);

    const genresList = document.getElementById("games-list");
    const titleContent = document.getElementById("title-manner");
    // const ulGenresList = genresList.children[1];

    genresList.innerHTML = "";
    titleContent.textContent = title;

    data.data.forEach((game, index) => {
      //   console.log("Did get passed loop shit");
      const x = document.createElement("div");
      // add class to above newly added div shit
      x.classList.add("game-box-container");

      x.innerHTML = `<div class="game-box">
      <img
        class="header-img"
        src="${game.header_image}"
        alt="${game.appid}"
        onclick="redirectPage(this)"
      />
    </div>
    <div class="text-box">
      <span>${game.name}</span>
    </div>`;
      genresList.appendChild(x);
    });
  } catch (error) {
    console.log("WTF IS THIS SHIT", err);
  }
};

// Initialize Nuke in 3 2 1....
renderGenresList();
renderFeaturesList();

// Proceed to cause chaos
