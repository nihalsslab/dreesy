document.addEventListener("DOMContentLoaded", async () => {
  const productGrid = document.getElementById("product-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  async function loadProducts() {
    try {
      const res = await fetch("assets/data/products.json");
      const data = await res.json();
      displayProducts(data);
      setupFilter(data);
    } catch (err) {
      productGrid.innerHTML = `<p class="text-danger text-center">⚠️ Unable to load products.</p>`;
      console.error(err);
    }
  }

  function displayProducts(products) {
    productGrid.innerHTML = products.map(p => `
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card product-card shadow-sm h-100">
          <div id="carousel-${p.id}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              ${p.images.map((img, idx) => `
                <div class="carousel-item ${idx === 0 ? "active" : ""}">
                  <img src="${img}" class="d-block w-100" alt="${p.title}">
                </div>`).join("")}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${p.id}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel-${p.id}" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
            </button>
          </div>
          <div class="card-body text-center">
            <h6 class="fw-bold">${p.title}</h6>
            <p class="small text-muted">${p.category}</p>
            <div class="price mb-2">₹${p.price}</div>
            <p class="small text-success">${p.offer} OFF</p>
            <button class="btn btn-outline-orange btn-sm w-100 mt-2">View Details</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  function setupFilter(products) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        const filtered = filter === "all" ? products : products.filter(p => p.category === filter);
        displayProducts(filtered);
      });
    });
  }

  loadProducts();
});
