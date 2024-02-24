// import config from "./apikey.js"

// URL 및 API_KEY 정보
const API_KEY = `84b8c0ef44af454f9c4a4135a5cc3ab9`;
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`); // News API
let url = new URL(`https://cheery-centaur-e0cea7.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`); // 누나 API


let newsList = [];
let searchInput = document.getElementById("search-input")
const menus = document.querySelectorAll(".menus button");
const sideMenus = document.querySelectorAll(".side-menu-list button");
const menuIcon = document.getElementsByClassName("menu-icon")[0];


// 카테고리 별 생성한 버튼에 클릭 이벤트 추가
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));
sideMenus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));



// 페이지네이션 구현을 위한 변수 선언
let totalResults = 0;
let currentPage = 1;
const pageSize = 10; // 한 페이지에 보여줄 콘텐츠 개수
const groupSize = 5; // 몇 페이지씩 보여줄 것인지


const getNews = async () => {    
    try {
        url.searchParams.set("page", currentPage); // URL에 현재 페이지 값과 페이지 사이즈 값을 추가
        url.searchParams.set("pageSize", pageSize);

        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200 && data.totalResults === 0) {
            throw new Error("No result for your search")
        }
        else if (response.status === 200) {
            newsList = data.articles;
            totalResults = data.totalResults
            console.log("totalResults: ", totalResults);
            
            render();
            paginationRender();
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


const paginationRender = () => {
    // 알아야 하는 정보 totalResults, currentPage, pageSize, groupSize, totalPageNumber, pageGroupNumber, lastPageNumber, firstPageNumber
    const totalPageNumber = Math.ceil(totalResults / pageSize);
    const pageGroupNumber = Math.ceil(currentPage / groupSize);
    
    let lastPageNumber = pageGroupNumber * groupSize; // 마지막 페이지 숫자가 전체 페이지 개수보다 크다면, 마지막 페이지를 totalPageNumber로 설정해야 함
    if (totalPageNumber < lastPageNumber) {
        lastPageNumber = totalPageNumber
    };

    let firstPageNumber = lastPageNumber - (groupSize - 1);
    if (firstPageNumber <= 0) {
        firstPageNumber = 1
    };


    let nextPage = currentPage + 1;
    if (nextPage >= totalPageNumber) {
        nextPage = totalPageNumber
    };
    
    let prevPage = currentPage - 1;
    if (prevPage <= 0) {
        prevPage = firstPageNumber
    };

    let paginationHtml = ``;
    
    paginationHtml += 
    `
        <li class="page-item">
            <a class="page-link" onclick="moveToPage(${prevPage})"><</a>
        </li>    
    `


    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
        paginationHtml += 
        `
            <li class="page-item ${i===currentPage?'active':''}">
                <a class="page-link" onclick="moveToPage(${i})">${i}</a>
            </li>
        `
    };

    paginationHtml += 
    `
        <li class="page-item">
            <a class="page-link" onclick="moveToPage(${nextPage})">></a>
        </li>    
    `   


    document.querySelector(".pagination").innerHTML = paginationHtml
};


const moveToPage = (pageNumber) => {
    console.log("pageNumber:", pageNumber);
    currentPage = pageNumber
    getNews();
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

