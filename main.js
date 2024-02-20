
const API_KEY = `####################`;
let news = [];

const getNews = async () => {
    let url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?country=kr&apikey=${API_KEY}`);
    let response = await fetch(url);
    let data = await response.json();
    news = data.articles;

    console.log("data: ", news);
}

getNews();