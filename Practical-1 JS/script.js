// // let product = JSON.parse(localStorage.getItem("products")) || [];

// let proName = document.querySelector("#productName");
// let proPrice = document.querySelector("#productPrice");
// let proBtn = document.querySelector("#addBtn");
// let proList = document.querySelector("#productList");
// let productForm = document.querySelector("#productDetails");

// let editId = null;
// let nextId = 4;

// let products = [
//     {
//         id : 1,
//         name: "Keyboard",
//         price: 800
//     },
//     {
//         id : 2,
//         name: "Mouse",
//         price: 400
//     },
//     {
//         id : 3,
//         name: "Monitor",
//         price: 1200
//     },
// ]

// function saveProducts(){
//     localStorage.setItem("products", JSON.stringify("products"));
// }

// function displayProducts(){
//     proList.innerHTML = "";

//     products.forEach(function(product) {
//         proList.innerHTML += `
//         <div class="product">
//             <div class="productInfo">
//                 <strong>${proName}</strong>
//                 <p>Price: $${proPrice}</p>
//             </div>

//             <div>
//                 <button class="editBtn" onclick="editProduct(${product.id})">
//                     Edit
//                 </button>
//                 <button class="deleteBtn" onclick="deleteProduct(${product.id})">
//                     Delete
//                 </button>
//             </div>
//         `
//     })
// }

// productForm.addEventListener("submit", function(event){
//     event.preventDefault();

//     let name = proName.value.trim();
//     let price = Number(proPrice.value);

//     if(name === "" || proPrice.value === "" || price < 0){
//         alert("Please enter a product name and a valid price.");
//         return;
//     }

//     if(editId === null){
//         products.push({
//             id: nextId,
//             name: name,
//             price: price
//         });
//         nextId++;
//     }
//     else{
//         let product = products.find(function(item){
//             return item.id === editId;
//         });

//         product.name = name;
//         product.price = price;

//         editId = null;
//         addBtn.textContent = "Add Product";
//     }

//     productForm.reset();
//     displayProducts();
// });

// function editProduct(id){
//     let product = products.find(function(item){
//         return item.id === id;
//     });

//     proName.value = product.name;
//     proPrice.value = product.price;
    
//     editId = id;
//     proBtn.textContent = "Update Product";
// }

// function deleteProduct(id){
//     products = products.filter(function(product){
//         return product.id !== id;
//     });

//     displayProducts();
// }

// displayProducts();


let proName = document.querySelector("#productName");
let proPrice = document.querySelector("#productPrice");
let proBtn = document.querySelector("#addBtn");
let proList = document.querySelector("#productList");
let productForm = document.querySelector("#ProductDetails");

let editId = null;

let products = JSON.parse(localStorage.getItem("products")) || [
    { id: 1, name: "Keyboard", price: 800 },
    { id: 2, name: "Mouse", price: 400 },
    { id: 3, name: "Monitor", price: 1200 }
];

let nextId = products.length > 0
    ? Math.max(...products.map(product => product.id)) + 1
    : 1;

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function displayProducts() {
    proList.innerHTML = "";

    products.forEach(function(product) {
        proList.innerHTML += `
            <div class="product">
                <div class="productInfo">
                    <strong>${product.name}</strong>
                    <p>Price: ₹${product.price}</p>
                </div>

                <div>
                    <button type="button" class="editBtn"
                        onclick="editProduct(${product.id})">
                        Edit
                    </button>

                    <button type="button" class="deleteBtn"
                        onclick="deleteProduct(${product.id})">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });
}

productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = proName.value.trim();
    let price = Number(proPrice.value);

    if (
        name === "" ||
        proPrice.value.trim() === "" ||
        !Number.isFinite(price) ||
        price < 0
    ) {
        alert("Please enter a product name and a valid price.");
        return;
    }

    if (editId === null) {
        products.push({
            id: nextId,
            name: name,
            price: price
        });

        nextId++;
    } else {
        let product = products.find(function(item) {
            return item.id === editId;
        });

        if (product) {
            product.name = name;
            product.price = price;
        }

        editId = null;
        proBtn.textContent = "Add Product";
    }

    saveProducts();
    productForm.reset();
    displayProducts();
});

function editProduct(id) {
    let product = products.find(function(item) {
        return item.id === id;
    });

    if (!product) return;

    proName.value = product.name;
    proPrice.value = product.price;

    editId = id;
    proBtn.textContent = "Update Product";
}

function deleteProduct(id) {
    products = products.filter(function(product) {
        return product.id !== id;
    });

    if (editId === id) {
        editId = null;
        productForm.reset();
        proBtn.textContent = "Add Product";
    }

    saveProducts();
    displayProducts();
}

displayProducts();
