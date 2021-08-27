//Recuperation de l'url

const objectUrl= window.location.search;
const articleId = objectUrl.slice(1);

// recuperation des donnees de l'article
let articleData = [];

const fetchSingleArticle = async () => {
    await fetch(`http://localhost:3000/api/cameras/${articleId}`)
        .then((res) => res.json())
        .then((data) => articleData = (data));
};

//affichage des options

//affichage de l'article
const displaySingleArticle = async () => {
    await fetchSingleArticle()
   .then (() =>{
          let articleOnPage =
                                  `
                                  
                                  <div class="col">
                                  <div class="card">
                                  <img src="${articleData.imageUrl}" class="card-img-top photo-change" alt="image de ${articleData.name}">
                                  <div class="card-body">
                                    <h2 class="card-title">${articleData.name}</h2>        
                                    <p class=>${articleData.description}</p><p>${(articleData.price/ 100)}.00 $</p>
                                    <label for="pet-select">Choose a lense:</label>
                                    <select name="vernis" class="lense-select">
                                          <option value="">--Choisissez une option--</option>
                                    </select> 
                                    
                                </div>
                              </div>
                                </div>
                                
                      `
                      let singleArticle=document.getElementById("single-article");
                      singleArticle.innerHTML= articleOnPage;

   })
        .then (()=>{
           const lenses = articleData.lenses;
        for(let lense of lenses){
                let option=document.createElement("option");
                let lenseSelect=document.querySelector(".lense-select")
                lenseSelect.appendChild(option);
                option.textContent =lense;
              }
              
        })      
       
};
       
displaySingleArticle();
// recuperer les donnees
const addToCart = async() =>{
  await displaySingleArticle();
 
    document.getElementById("submit").addEventListener("click", (event)=>{
   
   let articleAdded={
    ImgArticle: articleData.imageUrl,
    IdArticle: articleData._id,
    NameArticle: articleData.name,
    PriceArticle:articleData.price/100 + ".00 $"
  }

// ajouter au local storage

let articleToLocalStorage = JSON.parse(localStorage.getItem('produit'));
console.log(articleToLocalStorage);

if(articleToLocalStorage){
  
  articleToLocalStorage.push(articleAdded);
  localStorage.setItem("produit", JSON.stringify(articleToLocalStorage));
}
else{
  articleToLocalStorage=[];
  articleToLocalStorage.push(articleAdded);
  localStorage.setItem("produit", JSON.stringify(articleToLocalStorage));
}
});
}
addToCart();

//alert panier incremente et icone sur panier
