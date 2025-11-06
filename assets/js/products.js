document.addEventListener("DOMContentLoaded", () => {
  const featuredGrid = document.getElementById("featuredProducts");
  const productModal = new bootstrap.Modal(document.getElementById("productModal"));
  const modalAddToCart = document.getElementById("modalAddToCart");

  const products = [
    // 🔹 MEN PANTS
    { id: 1, name: "Men’s Casual Jeans", category: "Men’s Pant", price: 99, offer: "Big Offer", images: ["assets/images/products/1.jpeg"], desc: "Durable denim pants designed for comfort. Great value deal!" },
    { id: 2, name: "Men’s Slim Fit Denim", category: "Men’s Pant", price: 199, offer: "Big Offer", images: ["assets/images/products/2.jpeg"], desc: "Trendy slim fit denim for a modern look." },
    { id: 3, name: "Men’s Blue Stretch Jeans", category: "Men’s Pant", price: 499, offer: "Normal Price", images: ["assets/images/products/4.jpeg"], desc: "Comfort-fit stretch jeans for daily wear." },
    { id: 4, name: "Men’s Dual Pack Jeans", category: "Men’s Pant", price: 999, offer: "2 Pants Combo", images: ["assets/images/products/3.jpeg"], desc: "Pack of 2 comfortable denim jeans with perfect finish." },
    { id: 5, name: "Men’s Premium Denim", category: "Men’s Pant", price: 1999, offer: "Cool Product", images: ["assets/images/products/20.jpeg"], desc: "High-quality premium denim designed for long-lasting style." },

    // 🔹 WOMEN PANTS
    { id: 6, name: "Women’s Trendy Jeggings", category: "Women’s Pant", price: 99, offer: "Big Offer", images: ["assets/images/products/6.jpeg"], desc: "Super stretch jeggings with premium comfort." },
    { id: 7, name: "Women’s Slim Fit Jeans", category: "Women’s Pant", price: 199, offer: "Big Offer", images: ["assets/images/products/7.jpeg"], desc: "Soft touch denim with elegant style." },
    { id: 8, name: "Women’s Everyday Denim", category: "Women’s Pant", price: 499, offer: "Normal Price", images: ["assets/images/products/5.jpeg"], desc: "Classic denim pants ideal for casual wear." },
    { id: 9, name: "Women’s Dual Pack Pants", category: "Women’s Pant", price: 999, offer: "2 Pants Combo", images: ["assets/images/products/8.jpeg"], desc: "Pack of 2 soft cotton jeans for daily comfort." },
    { id: 10, name: "Women’s Designer Denim", category: "Women’s Pant", price: 1999, offer: "Cool Product", images: ["assets/images/products/9.jpeg"], desc: "Stylish and premium-quality jeans for every event." },

    // 🔹 MEN T-SHIRTS
    { id: 11, name: "Men’s Classic Tee", category: "Men’s T-Shirt", price: 4999, offer: "3 T-Shirts Combo", images: ["assets/images/products/15.jpeg"], desc: "Pack of 3 luxury cotton tees with modern fit and soft touch." },
    { id: 12, name: "Men’s Printed Tee", category: "Men’s T-Shirt", price: 9999, offer: "12 T-Shirts Pack", images: ["assets/images/products/11.jpeg", "assets/images/products/tshirt/5.jpg"], desc: "Combo pack of 12 stylish printed T-shirts with breathable fabric." },
    { id: 13, name: "Men’s Polo Shirt", category: "Men’s T-Shirt", price: 499, offer: "Normal Price", images: ["assets/images/products/12.jpeg"], desc: "Casual polo with premium cotton finish." },
    { id: 14, name: "Men’s Twin Pack Tee", category: "Men’s T-Shirt", price: 999, offer: "2 T-Shirts Combo", images: ["assets/images/products/13.jpeg"], desc: "Twin pack combo for daily comfort and style." },
    { id: 15, name: "Men’s Luxury Tee", category: "Men’s T-Shirt", price: 1999, offer: "Cool Product", images: ["assets/images/products/14.jpeg"], desc: "High-end cotton tee with luxury finish." },

    // 🔹 WOMEN T-SHIRTS
    { id: 16, name: "Women’s Basic Tee", category: "Women’s T-Shirt", price: 4999, offer: "3 T-Shirts Combo", images: ["assets/images/products/15.jpeg", "assets/images/products/tshirt/10.jpg"], desc: "Soft cotton combo tees ideal for daily use." },
    { id: 17, name: "Women’s Graphic Top", category: "Women’s T-Shirt", price: 9999, offer: "12 Tops Pack", images: ["assets/images/products/16.jpeg", "assets/images/products/tshirt/12.jpg"], desc: "Set of 12 trendy tops for your wardrobe makeover." },
    { id: 18, name: "Women’s Plain Tee", category: "Women’s T-Shirt", price: 499, offer: "Normal Price", images: ["assets/images/products/17.jpeg"], desc: "Simple and elegant plain tee for everyday wear." },
    { id: 19, name: "Women’s Dual Pack Top", category: "Women’s T-Shirt", price: 999, offer: "2 Tops Combo", images: ["assets/images/products/18.jpeg"], desc: "Twin pack cotton tops with fine stitch." },
    { id: 20, name: "Women’s Premium Top", category: "Women’s T-Shirt", price: 1999, offer: "Cool Product", images: ["assets/images/products/19.jpeg"], desc: "Premium soft fabric with beautiful design." }
  ];

 // 🧱 Render product grid
  featuredGrid.innerHTML = products
    .map(
      (p) => `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card h-100 border-0 shadow-sm">
          <img src="${p.images[0]}" class="card-img-top product-view" data-id="${p.id}" style="cursor:pointer">
          <div class="card-body text-center">
            <h6 class="fw-bold text-truncate">${p.name}</h6>
            <p class="text-muted small mb-1">${p.category}</p>
            <div class="text-muted small mb-1"><strong>${p.offer}</strong></div>
            <div class="fw-bold text-orange">₹${p.price}</div>
            <button class="btn btn-orange btn-sm w-100 add-to-cart" 
              data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-img="${p.images[0]}">
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>`
    )
    .join("");

// ✅ Handle both Image Click (open modal) and Button Click (add to cart)
featuredGrid.addEventListener("click", (e) => {
  const img = e.target.closest(".product-view");
  const btn = e.target.closest(".add-to-cart");

  // 🖼️ IMAGE CLICK → open modal
  if (img) {
    const product = products.find((p) => p.id == img.dataset.id);
    if (!product) return;

    document.getElementById("modalTitle").textContent = product.name;
    document.getElementById("modalCategory").textContent = product.category;
    document.getElementById("modalPrice").textContent = `₹${product.price}`;
    document.getElementById("modalDescription").textContent = product.desc;

    const imageHTML = product.images
      .map(
        (src, i) => `
        <div class="carousel-item ${i === 0 ? "active" : ""}">
          <img src="${src}" class="d-block w-100 rounded" alt="${product.name}">
        </div>`
      )
      .join("");
    document.getElementById("modalImages").innerHTML = imageHTML;

    // update modal button dataset
    const modalAddToCart = document.getElementById("modalAddToCart");
    modalAddToCart.dataset.id = product.id;
    modalAddToCart.dataset.name = product.name;
    modalAddToCart.dataset.price = product.price;
    modalAddToCart.dataset.img = product.images[0];

    new bootstrap.Modal(document.getElementById("productModal")).show();
  }

  // 🛒 BUTTON CLICK → direct add to cart
  if (btn) {
    const product = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: btn.dataset.price,
      image: btn.dataset.img,
      quantity: 1,
    };

    localStorage.setItem("orderProduct", JSON.stringify(product));
    btn.innerHTML = "✔ Added!";
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = "order.html";
    }, 800);
  }
});

});
