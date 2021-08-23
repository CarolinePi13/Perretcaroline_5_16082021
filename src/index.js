let articleData = [];


const fetchArticle = async () => {
    await fetch('http://localhost:3000/api/cameras')
        .then((res) => res.json())
        .then((data) => articleData = (data));

};

const displayArticle = async () => {
    await fetchArticle();
    const dispalyOption = () => {
        for (let i = 0; i < article.lenses.length ; i++) {
            str = str + i;
          }
    }
   document.getElementById("card-contain").innerHTML += articleData.map
    (
        (article) =>
            `
            
            <div class="col">
            <div class="card">
            <img src="${article.imageUrl}" class="card-img-top photo-change" alt="image de ${article.name}">
            <div class="card-body">
              <h2 class="card-title">${article.name}</h2>        
              <p class=${article.description}</p><p>${(article.price/ 100)}.00 $</p>
             \<a href="#" class="btn btn-primary">Consulter</a>
            </div>
          </div>
          </div>
          
    `).join(' ');
    
};

displayArticle();

{/* <label for="pet-select">Choose a pet:</label>

<select name="vernis" id="pet-select">
    <option value="">--Choisissez une option--</option>
    <option value="${article.lenses[0]}">${article.lenses[0]}</option>
    <option value="${article.lenses[1]}">${article.lenses[1]}</option>
    <option value="${article.lenses[2]}">${article.lenses[2]}</option>
    
</select> */}