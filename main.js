
const API_KEY = `84b8c0ef44af454f9c4a4135a5cc3ab9`;
let news = [];

const getNews = async () => {
    let url = new URL(`https://cheery-centaur-e0cea7.netlify.app/top-headlines?q=아이유&country=kr&apiKey=${API_KEY}`);
    let response = await fetch(url);
    console.log(response);
    let data = await response.json();
    news = data.articles;

    console.log("data: ", news);
};

getNews();