//Recuperation de l'url

const objectUrl= window.location.search;
console.log(objectUrl);

const articleId = objectUrl.slice(1);
console.log(articleId);

let articleData = [];

const fetchSingleArticle = async () => {
    await fetch(`http://localhost:3000/api/cameras/${articleId}`)
        .then((res) => res.json())
        .then((data) => articleData = (data));
};


    


const DisplaySingleArticle = async () => {
    await fetchSingleArticle();
   
   let articleOnPage =
                        `
                        
                        <div class="col">
                        <div class="card">
                        <img src="${articleData.imageUrl}" class="card-img-top photo-change" alt="image de ${articleData.name}">
                        <div class="card-body">
                          <h2 class="card-title">${articleData.name}</h2>        
                          <p class=${articleData.description}</p><p>${(articleData.price/ 100)}.00 $</p>
                          <label for="pet-select">Choose a lense:</label>
                            <select name="vernis" id="lense-select">
                                <option value="">--Choisissez une option--</option>
                                <option value="${articleData.lenses[0]}">${articleData.lenses[0]}</option>
                                <option value="${articleData.lenses[1]}">${articleData.lenses[1]}</option>
                                <option value="${articleData.lenses[2]}">${articleData.lenses[2]}</option>
                                
                          </select> 
                          
                       </div>
                     </div>
                      </div>
                      
             `;
         document.getElementById("single-article").innerHTML= articleOnPage;
};
        
     


 DisplaySingleArticle();
//  const GoToSingleArticlePage =
//  ()=>{document.getElementById("link-to-article").addEventListener("click", )},



//  document.getElementById("link-topage").addEventListener("click", )


