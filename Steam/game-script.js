const BASE_URL = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com`;

const appID = window.localStorage.getItem("appID");
const cloneSide = window.localStorage.getItem("sideHTML");

document.querySelector(".side").innerHTML = "";
document.querySelector(".side").innerHTML = cloneSide;

const getGameDetail = async (appID) => {
  try {
    const url = `${BASE_URL}/single-game/${appID}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("WTF", err);
  }
};

const titleContent = document.getElementById("title-manner");
const header = document.getElementById("game-img");
const background = document.getElementById("game-bg");
const description = document.getElementById("desc");
const price = document.getElementById("price");
const date = document.getElementById("date").children[0];
const dev = document.getElementById("dev").children[0];
const tag = document.getElementById("tag-wrap");

const renderGameDetail = async (appID) => {
  try {
    const data = await getGameDetail(appID);

    // Bg -img
    background.innerHTML = "";
    background.innerHTML = `<img src="${data.data.background}" 
    alt =""bg_img id="bg"/>`;
    // Header IMG
    header.innerHTML = "";
    header.innerHTML = `<img src="${data.data.header_image}" 
    alt =""header_img id="head-img"/>`;
    // Description
    description.textContent = "";
    description.textContent = `${data.data.description}`;
    // Price
    price.textContent = "";
    price.textContent = `$${data.data.price}`;
    // Date
    date.textContent = "";
    date.textContent = `${data.data.release_date.substring(0, 10)}`;
    // Dev
    dev.textContent = "";
    dev.textContent = `${data.data.developer}`;

    titleContent.innerHTML = "";
    titleContent.textContent = `${data.data.name}`;

    // Tag cl
    tag.innerHTML = "";
    const tagsList = data.data.steamspy_tags;
    tagsList.forEach((tagger, index) => {
      const x = document.createElement("a");
      x.classList.add("tag");
      x.innerHTML = `${tagger}`;
      tag.appendChild(x);
    });
  } catch (error) {
    console.log("WTF IS THIS SHIT", err);
  }
};

renderGameDetail(appID);
