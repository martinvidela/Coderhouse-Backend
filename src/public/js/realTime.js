const socketClient = io(); // socket del lado del cliente

const btnAddForm = document.getElementById("btn-add-product");
const formProduct = document.getElementById("add-product");

const addProduct = (e) => {
  e.preventDefault();
  const formData = new FormData(formProduct);
  const product = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    thumbnail: formData.get("thumbnail"),
    code: formData.get("code"),
    stock: formData.get("stock"),
    category: formData.get("category"),
  };
  socketClient.emit("addProduct", product);
  formProduct.reset();
};



const deleteProduct = (e) => {
  socketClient.emit("deleteProduct", e.target);
};

socketClient.on("listProductsReal", (listProductRealTime) => {
  const listProductAll = document.getElementById("list-products-all");
  listProductAll.innerHTML = "";
  for (let product of listProductRealTime) {
    listProductAll.innerHTML += `
        <div class="card">
        <div class="card-header">
        <img class="cardImage" src=${product.thumbnail} alt="">
        </div>
        <div class="card-body">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <h3>${product.price}</h3>
            <button class='btn'> Add to cart </button>
            </div>
        </div>
        `;
  }
});

btnAddForm.addEventListener("click", addProduct);

const btnDel = document.getElementById('delete-btn')
const inputId = document.getElementById('id-product')

btnDel.addEventListener('click', ()=>{
  const deleteId = inputId.value
  socketClient.emit('deleteProduct', deleteId)
  inputId.value = "";
})