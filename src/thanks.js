localStorage.removeItem('produit');// vide le panier

// recupere et affiche l'order id et le prix total et l'affiche sur la page
const getOrderId = ()=>{
    let orderID = localStorage.getItem('order')

    return JSON.parse(orderID);
}
const getTotalPrice = ()=>{
    let totalPrice =localStorage.getItem('totalPrice')
    return JSON.parse(totalPrice);
}

const displayOrderId =()=>{
    
    document.querySelector('.order-ID').innerText=`Votre commande porte le Numero: ${getOrderId()}`
}
displayOrderId();

const displayTotalPrice = ()=>{
    document.querySelector('.commande-total').innerText = `Prix total de votre commande: ${getTotalPrice()} €`
}
displayTotalPrice();