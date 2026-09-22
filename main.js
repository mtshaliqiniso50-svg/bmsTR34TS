/* =========================================================
   BMS TREATS — shared behaviour
   Edit WHATSAPP_NUMBER once here and it updates every link.
   ========================================================= */
const WHATSAPP_NUMBER = "27691796632"; // 069 179 6632 in international format, no +

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ---- Mobile nav toggle ---- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // Wire up every element with data-wa-message to a live WhatsApp link
  document.querySelectorAll("[data-wa-message]").forEach((el) => {
    el.href = waLink(el.getAttribute("data-wa-message"));
    el.target = "_blank";
    el.rel = "noopener";
  });
});

/* =========================================================
   Product catalogue
   Edit this list to add, remove or update products —
   every card and detail view is generated from here.
   ========================================================= */
const PRODUCTS = [
  {
    id: "cup-chocolate",
    group: "cups",
    name: "Chocolate Cup",
    tag: "Dessert Cup",
    short: "Rich chocolate dessert layered in a single-serve cup.",
    flavour: "Chocolate",
    packaging: "Sealed dessert cup with lid",
    storage: "Keep refrigerated. Best served chilled.",
    photoLabel: "Photo: Chocolate Cup"
  },
  {
    id: "cup-red-velvet",
    group: "cups",
    name: "Red Velvet Cup",
    tag: "Dessert Cup",
    short: "Classic red velvet layered with a smooth cream finish.",
    flavour: "Red Velvet",
    packaging: "Sealed dessert cup with lid",
    storage: "Keep refrigerated. Best served chilled.",
    photoLabel: "Photo: Red Velvet Cup"
  },
  {
    id: "cup-cookies-cream",
    group: "cups",
    name: "Cookies & Cream Cup",
    tag: "Dessert Cup",
    short: "Cookies & cream flavour with a creamy, layered texture.",
    flavour: "Cookies & Cream",
    packaging: "Sealed dessert cup with lid",
    storage: "Keep refrigerated. Best served chilled.",
    photoLabel: "Photo: Cookies & Cream Cup"
  },
  {
    id: "cup-caramel",
    group: "cups",
    name: "Caramel Cup",
    tag: "Dessert Cup",
    short: "Smooth caramel dessert cup with a warm, sweet finish.",
    flavour: "Caramel",
    packaging: "Sealed dessert cup with lid",
    storage: "Keep refrigerated. Best served chilled.",
    photoLabel: "Photo: Caramel Cup"
  },
  {
    id: "tray-vanilla",
    group: "trays",
    name: "Vanilla Tray",
    tag: "Dessert Tray",
    short: "A shareable vanilla dessert tray, freshly prepared.",
    flavour: "Vanilla",
    packaging: "Sealed dessert tray, ideal for sharing or events",
    storage: "Keep refrigerated. Best served chilled.",
    photoLabel: "Photo: Vanilla Tray"
  },
  {
    id: "tray-chocolate",
    group: "trays",
    name: "Chocolate Tray",
    tag: "Dessert Tray",
    short: "A shareable chocolate dessert tray, freshly prepared.",
    flavour: "Chocolate",
    packaging: "Sealed dessert tray, ideal for sharing or events",
    storage: "Keep refrigerated. Best served chilled.",
    photoLabel: "Photo: Chocolate Tray"
  }
];

function renderProductGrids() {
  const cupsGrid = document.querySelector('[data-group="cups"]');
  const traysGrid = document.querySelector('[data-group="trays"]');
  if (!cupsGrid && !traysGrid) return;

  const cardHTML = (p) => `
    <article class="product-card" data-id="${p.id}">
      <div class="photo-frame">${p.photoLabel}</div>
      <div class="product-card-body">
        <span class="tag">${p.tag}</span>
        <h3>${p.name}</h3>
        <p>${p.short}</p>
        <div class="product-card-actions">
          <button class="card-btn view-detail" data-id="${p.id}">View Details</button>
          <a class="card-btn whatsapp" data-wa-message="Hi BMS Treats! I'd like to order the ${p.name}.">Order</a>
        </div>
      </div>
    </article>
  `;

  if (cupsGrid) {
    cupsGrid.innerHTML = PRODUCTS.filter((p) => p.group === "cups").map(cardHTML).join("");
  }
  if (traysGrid) {
    traysGrid.innerHTML = PRODUCTS.filter((p) => p.group === "trays").map(cardHTML).join("");
  }

  document.querySelectorAll("[data-wa-message]").forEach((el) => {
    el.href = waLink(el.getAttribute("data-wa-message"));
    el.target = "_blank";
    el.rel = "noopener";
  });

  document.querySelectorAll(".view-detail").forEach((btn) => {
    btn.addEventListener("click", () => openProductModal(btn.getAttribute("data-id")));
  });
}

function openProductModal(id) {
  const p = PRODUCTS.find((item) => item.id === id);
  if (!p) return;
  const overlay = document.getElementById("product-modal");
  const content = document.getElementById("product-modal-content");
  content.innerHTML = `
    <button class="modal-close" aria-label="Close">&times;</button>
    <div class="photo-frame">${p.photoLabel}</div>
    <span class="tag">${p.tag}</span>
    <h2 class="mt-0">${p.name}</h2>
    <p>${p.short}</p>
    <dl class="modal-meta">
      <div><dt>Flavour</dt><dd>${p.flavour}</dd></div>
      <div><dt>Packaging</dt><dd>${p.packaging}</dd></div>
      <div style="grid-column: 1 / -1;"><dt>Storage</dt><dd>${p.storage}</dd></div>
    </dl>
    <a class="btn btn-whatsapp btn-block" data-wa-message="Hi BMS Treats! I'd like to enquire about the ${p.name}.">
      Enquire on WhatsApp
    </a>
  `;
  content.querySelectorAll("[data-wa-message]").forEach((el) => {
    el.href = waLink(el.getAttribute("data-wa-message"));
    el.target = "_blank";
    el.rel = "noopener";
  });
  content.querySelector(".modal-close").addEventListener("click", closeProductModal);
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const overlay = document.getElementById("product-modal");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductGrids();
  const overlay = document.getElementById("product-modal");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeProductModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeProductModal();
    });
  }

  // Product tab filter (cups / trays / all) on treats page
  const tabs = document.querySelectorAll(".tab-btn");
  if (tabs.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
        tab.setAttribute("aria-selected", "true");
        const target = tab.getAttribute("data-target");
        document.querySelectorAll(".product-section").forEach((sec) => {
          sec.style.display = target === "all" || sec.getAttribute("data-section") === target ? "" : "none";
        });
      });
    });
  }
});

/* =========================================================
   Retail partnership form — builds a pre-filled WhatsApp
   message from the form fields (no backend required for MVP).
   To collect these as email/CRM leads later, swap this
   submit handler for a POST to a form service (e.g. Formspree,
   Netlify Forms) — see README.
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("retail-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const message = [
      "Retail Partnership Enquiry — BMS Treats",
      `Name: ${data.name}`,
      `Business/Store: ${data.business}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Location: ${data.location}`,
      `Message: ${data.message || "-"}`
    ].join("\n");
    window.open(waLink(message), "_blank", "noopener");
    form.reset();
    const confirmEl = document.getElementById("form-confirm");
    if (confirmEl) confirmEl.hidden = false;
  });
});
