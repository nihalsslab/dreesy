// assets/js/app.js

document.addEventListener("DOMContentLoaded", function () {
  const productGrid = document.getElementById("product-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // ✅ Product Data (12 products total)
  const products = [
    // 🦸 Superhero
    {
      name: "Spider Hero Suit",
      category: "Superhero",
      price: "₹2,499",
      offer: "15%",
      gender: "Men",
      sizes: ["S", "M", "L", "XL"],
      stock: 20,
      image: "assets/images/products/p1.png",
      description: "Stretchable spandex superhero suit inspired by Spider-Man. Perfect for comic cons and theme parties.",
    },
    {
      name: "Iron Warrior Armor",
      category: "Superhero",
      price: "₹3,299",
      offer: "20%",
      gender: "Men",
      sizes: ["M", "L"],
      stock: 12,
      image: "assets/images/products/p2.png",
      description: "Metallic red-gold armor set with LED chest light — a fan-favorite inspired by Iron Man.",
    },
    {
      name: "Bat Vigilante Costume",
      category: "Superhero",
      price: "₹2,999",
      offer: "10%",
      gender: "Men",
      sizes: ["S", "M", "L"],
      stock: 8,
      image: "assets/images/products/p3.png",
      description: "Dark tactical superhero outfit featuring a molded mask and detachable cape.",
    },

    // 🎃 Halloween
    {
      name: "Wicked Witch Dress",
      category: "Halloween",
      price: "₹1,899",
      offer: "10%",
      gender: "Women",
      sizes: ["S", "M", "L"],
      stock: 25,
      image: "assets/images/products/p4.png",
      description: "Classic witch outfit with pointed hat and black velvet cloak, ideal for Halloween nights.",
    },
    {
      name: "Skeleton Glow Suit",
      category: "Halloween",
      price: "₹1,499",
      offer: "5%",
      gender: "Unisex",
      sizes: ["S", "M", "L", "XL"],
      stock: 30,
      image: "assets/images/products/p5.png",
      description: "Glow-in-the-dark skeleton costume made of breathable fabric — spooky and fun!",
    },
    {
      name: "Pumpkin Horror Outfit",
      category: "Halloween",
      price: "₹1,799",
      offer: "18%",
      gender: "Unisex",
      sizes: ["M", "L"],
      stock: 15,
      image: "assets/images/products/p6.png",
      description: "Orange pumpkin suit with horror detailing, perfect for parties and haunted events.",
    },

    // 🎭 Cultural (Indian)
    {
      name: "Traditional Kurta Costume",
      category: "Cultural",
      price: "₹1,299",
      offer: "10%",
      gender: "Men",
      sizes: ["S", "M", "L", "XL"],
      stock: 22,
      image: "assets/images/products/p7.png",
      description: "Elegant Indian kurta made with premium cotton — perfect for festivals and themed occasions.",
    },
    {
      name: "Bharatanatyam Dance Outfit",
      category: "Cultural",
      price: "₹2,499",
      offer: "12%",
      gender: "Women",
      sizes: ["S", "M", "L"],
      stock: 10,
      image: "assets/images/products/p8.png",
      description: "Traditional Bharatanatyam costume crafted with silk and gold borders — ideal for stage performances.",
    },
    {
      name: "Royal Maharaja Costume",
      category: "Cultural",
      price: "₹3,499",
      offer: "15%",
      gender: "Men",
      sizes: ["L", "XL"],
      stock: 5,
      image: "assets/images/products/p9.png",
      description: "Luxurious Indian royal outfit with turban and accessories — perfect for royal-themed events.",
    },

    // 👶 Kids
    {
      name: "Little Fairy Dress",
      category: "Kids",
      price: "₹999",
      offer: "5%",
      gender: "Girls",
      sizes: ["XS", "S", "M"],
      stock: 18,
      image: "assets/images/products/p10.png",
      description: "Sparkling fairy costume with soft wings and glittery tutu — your little one’s dream outfit.",
    },
    {
      name: "Mini Police Uniform",
      category: "Kids",
      price: "₹1,299",
      offer: "10%",
      gender: "Boys",
      sizes: ["XS", "S", "M", "L"],
      stock: 20,
      image: "assets/images/products/p11.png",
      description: "Miniature police uniform set complete with cap and badges — realistic and adorable!",
    },
    {
      name: "Tiny Chef Outfit",
      category: "Kids",
      price: "₹1,099",
      offer: "8%",
      gender: "Unisex",
      sizes: ["XS", "S", "M"],
      stock: 14,
      image: "assets/images/products/p12.png",
      description: "Cute chef uniform set with apron and hat — perfect for role play or school events.",
    },
    
  ];

 function displayProducts(list) {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = list
    .map(
      (p) => `
      <div class="col-lg-3 col-md-4 col-sm-6 col-12 product-card-wrapper anim-fade-up" data-category="${p.category}">
        <div class="card product-card h-100">
          <img src="${p.image}" loading="lazy" alt="${p.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${p.name}</h5>
            <p class="text-muted small mb-1">${p.category} | ${p.gender}</p>
            <h6 class="text-orange fw-bold">${p.price} 
              <small class="text-success">(${p.offer} OFF)</small>
            </h6>
            <p class="small text-muted mb-1">Sizes: ${p.sizes.join(", ")}</p>
            <p class="small ${p.stock > 0 ? 'text-secondary' : 'text-danger'}">
              ${p.stock > 0 ? p.stock + ' left' : 'Out of Stock'}
            </p>
            <button class="btn btn-orange btn-sm mt-2">View Details</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}


  // ✅ Initial display
  displayProducts(products);

  // ✅ Filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      displayProducts(filter === "all" ? products : products.filter((p) => p.category === filter));
    });
  });
});
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.toggle("d-flex");
});

