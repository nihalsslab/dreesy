document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");

  async function loadProducts() {
    try {
      const res = await fetch("assets/data/products.json");
      const products = await res.json();
      renderProducts(products);
    } catch (error) {
      console.error("Error loading products:", error);
      productGrid.innerHTML = `<p class="text-danger text-center">⚠️ Failed to load products.</p>`;
    }
  }

  function renderProducts(products) {
    productGrid.innerHTML = products
      .map(
        (p) => `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <img src="${p.thumbnail}" class="card-img-top" alt="${p.title}">
            <div class="card-body text-center">
              <h6 class="fw-bold">${p.title}</h6>
              <p class="small text-muted">${p.category}</p>
              <div class="fw-semibold text-orange mb-2">₹${p.price}</div>
              <button class="btn btn-outline-orange btn-sm w-100">Add to Cart</button>
            </div>
          </div>
        </div>`
      )
      .join("");
  }

  loadProducts();
});
