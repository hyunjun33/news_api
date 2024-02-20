
const API_KEY = `84b8c0ef44af454f9c4a4135a5cc3ab9`;
let news = [];

const getNews = async () => {
    let url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=아이유`);
    let response = await fetch(url);
    console.log(response);
    let data = await response.json();
    news = data.articles;

    console.log("data: ", news);
};

getNews();