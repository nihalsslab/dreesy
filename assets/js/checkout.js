document.addEventListener("DOMContentLoaded", () => {
  const phone = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");
  const continueBtn = document.getElementById("continueBtn");

  const addressSection = document.getElementById("addressSection");
  const summarySection = document.getElementById("summarySection");
  const paymentSection = document.getElementById("paymentSection");

  // Validate phone number
  continueBtn.addEventListener("click", () => {
    const valid = /^[6-9]\d{9}$/.test(phone.value);
    if (!valid) {
      phoneError.classList.remove("d-none");
      return;
    }
    phoneError.classList.add("d-none");
    addressSection.classList.remove("d-none");
    window.scrollTo({ top: addressSection.offsetTop, behavior: "smooth" });
  });

  // Save Address
  document.getElementById("addressForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      name: document.getElementById("name").value,
      phone: phone.value,
      address: document.getElementById("address").value,
    };
    localStorage.setItem("checkoutUser", JSON.stringify(user));
    summarySection.classList.remove("d-none");
    const order = JSON.parse(localStorage.getItem("orderProduct")) || {};
    document.getElementById("summaryDetails").innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${order.image}" width="80" class="rounded me-3">
        <div>
          <h6>${order.title || "Selected Product"}</h6>
          <p class="text-muted mb-0">₹${order.price || "999"}</p>
        </div>
      </div>
      <hr>
      <p><strong>Deliver To:</strong><br>${user.name}<br>${user.address}<br>📞 ${user.phone}</p>
    `;
    window.scrollTo({ top: summarySection.offsetTop, behavior: "smooth" });
  });

  // Proceed to Payment
  document.getElementById("goPayment").addEventListener("click", () => {
    paymentSection.classList.remove("d-none");
    window.scrollTo({ top: paymentSection.offsetTop, behavior: "smooth" });
  });

  // Payment selection
  const payOptions = document.querySelectorAll(".pay-option");
  let selected = null;
  payOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      payOptions.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selected = btn.dataset.method;
    });
  });

  // Confirm Payment
  document.getElementById("confirmPay").addEventListener("click", () => {
    if (!selected) return alert("Select a payment method!");
    document.getElementById("confirmPay").textContent = "Processing...";
    setTimeout(() => {
      document.getElementById("paymentFail").style.display = "flex";
    }, 2000);
  });

  // Go Home
  document.getElementById("goHome").addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});
