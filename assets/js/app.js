// CostumeVerse / Indian Fashion Shop – Only Fashion Products (From DummyJSON)
document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // ✅ Fixed Indian Prices Only
  const allowedPrices = [99, 199, 499, 999, 1999, 4999, 9999];

  // ✅ Load products from DummyJSON
  async function loadProducts() {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=194&skip=0");
      const data = await res.json();
      const allProducts = data.products;

      // ✅ Show only clothing, shoes, accessories — fashion-related items
      const fashionCategories = [
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "mens-fashion",
        "womens-dresses",
        "womens-shoes",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "tops"
      ];

      const fashionProducts = allProducts.filter((p) =>
        fashionCategories.includes(p.category)
      );

      // ✅ Replace prices with allowed values randomly
      const mappedProducts = fashionProducts.map((p) => ({
        ...p,
        price: allowedPrices[Math.floor(Math.random() * allowedPrices.length)],
      }));

      renderProducts(mappedProducts);
      setupFilters(mappedProducts);
      setupSearch(mappedProducts);
    } catch (error) {
      console.error("Error loading products:", error);
      productGrid.innerHTML = `<p class="text-danger text-center">⚠️ Unable to load fashion products. Please refresh.</p>`;
    }
  }

  // ✅ Render Product Cards
  function renderProducts(products) {
    if (!products.length) {
      productGrid.innerHTML = `<p class="text-center text-muted">No fashion products found.</p>`;
      return;
    }

    productGrid.innerHTML = products
      .map(
        (p) => `
        <div class="col-sm-6 col-md-4 col-lg-3 product-card" data-category="${p.category}">
          <div class="card shadow-sm h-100 border-0 anim-fade-up">
            <img src="${p.thumbnail}" class="card-img-top" alt="${p.title}">
            <div class="card-body text-center">
              <h6 class="fw-bold text-truncate">${p.title}</h6>
              <p class="small text-muted text-capitalize">${p.category.replace("-", " ")}</p>
              <div class="price mb-2 fw-semibold text-orange">₹${p.price}</div>
              <button class="btn btn-outline-orange btn-sm w-100">Add to Cart</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  // ✅ Category Filter Buttons
  function setupFilters(allProducts) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        let filtered = allProducts;

        if (filter === "Men") {
          filtered = allProducts.filter((p) => p.category.includes("mens"));
        } else if (filter === "Women") {
          filtered = allProducts.filter((p) => p.category.includes("womens"));
        } else if (filter === "Kids") {
          filtered = allProducts.filter(
            (p) =>
              p.title.toLowerCase().includes("kids") ||
              p.category.toLowerCase().includes("kids")
          );
        } else if (filter === "Cultural") {
          filtered = allProducts.filter(
            (p) =>
              p.title.toLowerCase().includes("kurta") ||
              p.title.toLowerCase().includes("blouse") ||
              p.title.toLowerCase().includes("saree") ||
              p.title.toLowerCase().includes("ethnic")
          );
        }

        renderProducts(filtered);
      });
    });
  }

  // ✅ Search Box Setup
  function setupSearch(allProducts) {
    const searchContainer = document.createElement("div");
    searchContainer.className = "text-center my-3";
    searchContainer.innerHTML = `
      <input type="text" id="searchBox" class="form-control w-50 mx-auto" placeholder="Search Indian fashion..." />
    `;
    productGrid.parentNode.insertBefore(searchContainer, productGrid);

    const searchBox = document.getElementById("searchBox");
    searchBox.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
      renderProducts(filtered);
    });
  }

  // ✅ Start App
  loadProducts();
});
