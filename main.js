
const API_KEY = `84b8c0ef44af454f9c4a4135a5cc3ab9`;
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`); // News API
let url = new URL(`https://cheery-centaur-e0cea7.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`); // 누나 API


let newsList = [];
let searchInput = document.getElementById("search-input")
const menus = document.querySelectorAll(".menus button");
const sideMenus = document.querySelectorAll(".side-menu-list button")


menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));
sideMenus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));


const getNews = async () => {    

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200 && data.totalResults === 0) {
            throw new Error("No result for your search")
        }
        else if (response.status === 200) {
            newsList = data.articles;
            render();
        }
        else {
            throw new Error(data.message)
        };

    }

    catch(error) {
        errorRender(error.message);
    };
    
};


const getNewsByCategory = async (event) => {

    const category = event.target.textContent.toLowerCase();
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`); // News API
    url = new URL(`https://cheery-centaur-e0cea7.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`); // 누나 API (과제 제출용)

    getNews();
};


const getNewsByKeyword = async () => {

    const keyword = searchInput.value.toLowerCase();
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`); // News API
    url = new URL(`https://cheery-centaur-e0cea7.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`); // 누나 API (과제 제출용)

    getNews();
};


const errorRender = (errorMessage) => {

    const errorHtml = `
    <div class="alert alert-warning" role="alert">
        ${errorMessage}
    </div>
    `
    document.getElementById("news-board").innerHTML = errorHtml;
};



const render = () => {

    const newsHtml = newsList.map((news) => 
    `
    <div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${
                news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
            }"/>
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
                ${
                    news.description == null || news.description == ""
                        ? "내용없음" : news.description.length > 200
                        ? news.description.substring(0, 200) + "..."
                        : news.description
                }
            </p>
            <div>
                출처: ${news.source.name || "no source"} / ${moment(news.publishedAt).fromNow()}
            </div>
        </div>
    </div>
    `
    ).join("");
    
    document.getElementById("news-board").innerHTML = newsHtml;
};


const openNav = () => {

    document.getElementById("mySidenav").style.width = "250px";
};
  
const closeNav = () => {

    document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
    
    let inputArea = document.getElementById("input-area");
    console.log(inputArea.style.display);

    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    }
    else {
        inputArea.style.display = "inline"
    };
};

getNews();

