
const API_KEY = `84b8c0ef44af454f9c4a4135a5cc3ab9`;
let news = [];

const getNews = async () => {
    let url = new URL(`https://cheery-centaur-e0cea7.netlify.app/`);
    let response = await fetch(url);
    let data = await response.json();
    news = data.articles;

    console.log("data: ", news);
}

getNews();