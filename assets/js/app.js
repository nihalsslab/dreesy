// CostumeVerse Shop Page – Indian Fashion Version (Local JSON)
document.addEventListener("DOMContentLoaded", async () => {
  const productGrid = document.getElementById("product-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  async function loadProducts() {
    try {
      // Load from your local file
      const res = await fetch("assets/data/products.json");
      const products = await res.json();

      renderProducts(products);
      setupFilters(products);
      setupSearch(products);
    } catch (error) {
      console.error("Error loading products:", error);
      productGrid.innerHTML = `
        <p class="text-danger text-center">⚠️ Unable to load products. Please refresh.</p>
      `;
    }
  }

  // Render products in grid
  function renderProducts(products) {
    if (!products.length) {
      productGrid.innerHTML = `<p class="text-center text-muted">No products found.</p>`;
      return;
    }

    productGrid.innerHTML = `
      ${products
        .map(
          (p) => `
        <div class="col-sm-6 col-md-4 col-lg-3 product-card" data-category="${p.category}">
          <div class="card shadow-sm h-100 border-0">
            <img src="${p.thumbnail}" class="card-img-top" alt="${p.title}">
            <div class="card-body text-center">
              <h6 class="fw-bold">${p.title}</h6>
              <p class="small text-muted text-capitalize">${p.category}</p>
              <div class="price mb-2 fw-semibold text-orange">₹${p.price}</div>
              <div class="rating text-warning mb-2">⭐ ${p.rating || 4.2}</div>
              <button class="btn btn-outline-orange btn-sm w-100">Add to Cart</button>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    `;
  }

  // Filter buttons
  function setupFilters(allProducts) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        let filtered = allProducts;

        if (filter === "Men") {
          filtered = allProducts.filter((p) => p.category.includes("Men"));
        } else if (filter === "Women") {
          filtered = allProducts.filter((p) => p.category.includes("Women"));
        } else if (filter === "Kids") {
          filtered = allProducts.filter((p) => p.category.includes("Kids"));
        } else if (filter === "Cultural") {
          filtered = allProducts.filter((p) => p.category.includes("Cultural"));
        }

        renderProducts(filtered);
      });
    });
  }

  // Search bar
  function setupSearch(allProducts) {
    const searchContainer = document.createElement("div");
    searchContainer.className = "text-center my-3";
    searchContainer.innerHTML = `
      <input type="text" id="searchBox" class="form-control w-50 mx-auto" placeholder="Search products..." />
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

  loadProducts();
});
