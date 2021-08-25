let articleData = [];



const fetchArticles = async () => {
    await fetch('http://localhost:3000/api/cameras')
        .then((res) => res.json())
        .then((data) => articleData = (data));
    
};

const displayArticles = async () => {
    await fetchArticles();
    
   
   const allItems = articleData.map
    (
        (article) =>
            `
            
            <div class="col">
            <div class="card">
            <img src="${article.imageUrl}" class="card-img-top photo-change" alt="image de ${article.name}">
            <div class="card-body">
              <h2 class="card-title">${article.name}</h2>        
              <p>${(article.price/ 100)}.00 $</p>
             <a href="./article.html?${article._id}" data-index-number=${article._id} class="btn btn-primary stretched-link" id="link-to-article">Consulter</a>
            </div>
          </div>
          </div>
          
    `).join(' ');
    document.getElementById("card-contain").innerHTML += allItems
};

displayArticles();
//  const GoToSingleArticlePage =
//  ()=>{document.getElementById("link-to-article").addEventListener("click", )},
