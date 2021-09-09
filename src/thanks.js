localStorage.removeItem('produit');


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