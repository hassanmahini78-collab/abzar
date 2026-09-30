// ================================
// محصولات فروشگاه
// ================================

const products = [

  {
    id: 1,
    name: "دریل برقی حرفه‌ای",
    category: "ابزار برقی",
    price: 2850000,
    icon: "🔩"
  },

  {
    id: 2,
    name: "مجموعه آچار 24 پارچه",
    category: "ابزار دستی",
    price: 1750000,
    icon: "🔧"
  },

  {
    id: 3,
    name: "متر 5 متری",
    category: "اندازه گیری",
    price: 320000,
    icon: "📏"
  },

  {
    id: 4,
    name: "پیچ گوشتی دوسو و چهارسو",
    category: "ابزار دستی",
    price: 450000,
    icon: "🪛"
  },

  {
    id: 5,
    name: "دستگاه فرز برقی",
    category: "ابزار برقی",
    price: 3250000,
    icon: "⚙️"
  },

  {
    id: 6,
    name: "انبردست صنعتی",
    category: "ابزار دستی",
    price: 580000,
    icon: "🔨"
  },

  {
    id: 7,
    name: "جعبه ابزار کامل",
    category: "تجهیزات",
    price: 2850000,
    icon: "🧰"
  },

  {
    id: 8,
    name: "تراز دستی",
    category: "اندازه گیری",
    price: 390000,
    icon: "📐"
  },

  {
    id: 9,
    name: "آچار فرانسه",
    category: "ابزار دستی",
    price: 490000,
    icon: "🔧"
  },

  {
    id: 10,
    name: "مینی فرز",
    category: "ابزار برقی",
    price: 2100000,
    icon: "⚡"
  },

  {
    id: 11,
    name: "چراغ کارگاهی",
    category: "تجهیزات",
    price: 750000,
    icon: "🔦"
  },

  {
    id: 12,
    name: "کولیس دیجیتال",
    category: "اندازه گیری",
    price: 920000,
    icon: "📏"
  }

];


// ================================
// سبد خرید
// ================================

let cart = JSON.parse(localStorage.getItem("abzarBندرCart")) || [];


// ================================
// نمایش محصولات
// ================================

function renderProducts(list = products) {

  const grid = document.getElementById("productsGrid");

  grid.innerHTML = "";

  if (list.length === 0) {

    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px">
        محصولی پیدا نشد.
      </div>
    `;

    return;
  }

  list.forEach(product => {

    grid.innerHTML += `

      <div class="product">

        <div class="product-image">
          ${product.icon}
        </div>

        <div class="product-info">

          <div class="product-category">
            ${product.category}
          </div>

          <h3>${product.name}</h3>

          <div class="price">
            ${formatPrice(product.price)}
            <span>تومان</span>
          </div>

          <button
            class="add-btn"
            onclick="addToCart(${product.id})"
          >
            افزودن به سبد خرید
          </button>

        </div>

      </div>

    `;

  });

}


// ================================
// افزودن به سبد
// ================================

function addToCart(id) {

  const product = products.find(p => p.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }

  saveCart();

  updateCartCount();

  showMessage("محصول به سبد خرید اضافه شد ✓");

}


// ================================
// حذف
// ================================

function removeFromCart(id) {

  cart = cart.filter(item => item.id !== id);

  saveCart();

  renderCart();

  updateCartCount();

}


// ================================
// تغییر تعداد
// ================================

function changeQuantity(id, amount) {

  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    removeFromCart(id);

    return;

  }

  saveCart();

  renderCart();

  updateCartCount();

}


// ================================
// نمایش سبد
// ================================

function renderCart() {

  const container = document.getElementById("cartItems");

  if (cart.length === 0) {

    container.innerHTML = `
      <div style="text-align:center;padding:40px">
        🛒
        <br>
        سبد خرید شما خالی است.
      </div>
    `;

    document.getElementById("cartTotal").textContent =
      "0 تومان";

    return;

  }


  container.innerHTML = "";

  cart.forEach(item => {

    container.innerHTML += `

      <div class="cart-item">

        <div class="cart-item-info">

          <strong>${item.name}</strong>

          <div>
            ${formatPrice(item.price)}
            تومان
          </div>

        </div>


        <div class="qty">

          <button onclick="changeQuantity(${item.id},1)">
            +
          </button>

          <span>${item.quantity}</span>

          <button onclick="changeQuantity(${item.id},-1)">
            -
          </button>

        </div>


        <button
          class="remove"
          onclick="removeFromCart(${item.id})"
        >
          حذف
        </button>

      </div>

    `;

  });


  document.getElementById("cartTotal").textContent =
    formatPrice(getCartTotal()) + " تومان";

}


// ================================
// مجموع سبد
// ================================

function getCartTotal() {

  return cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

}


// ================================
// تعداد محصولات
// ================================

function updateCartCount() {

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  document.getElementById("cartCount").textContent = count;

}


// ================================
// باز کردن سبد
// ================================

function openCart() {

  renderCart();

  document.getElementById("cartModal").style.display = "block";

}

function closeCart() {

  document.getElementById("cartModal").style.display = "none";

}


// ================================
// ثبت سفارش
// ================================

function openCheckout() {

  if (cart.length === 0) {

    alert("سبد خرید شما خالی است.");

    return;

  }

  closeCart();

  document.getElementById("checkoutModal").style.display = "block";

  document.getElementById("checkoutForm").style.display = "block";

  document.getElementById("paymentPage").style.display = "none";

  document.getElementById("successPage").style.display = "none";

}


function closeCheckout() {

  document.getElementById("checkoutModal").style.display = "none";

}


// ================================
// رفتن به پرداخت
// ================================

function goToPayment() {

  const name =
    document.getElementById("customerName").value.trim();

  const phone =
    document.getElementById("customerPhone").value.trim();

  const province =
    document.getElementById("customerProvince").value.trim();

  const city =
    document.getElementById("customerCity").value.trim();

  const address =
    document.getElementById("customerAddress").value.trim();

  const postal =
    document.getElementById("customerPostal").value.trim();


  if (
    !name ||
    !phone ||
    !province ||
    !city ||
    !address ||
    !postal
  ) {

    alert("لطفاً تمام اطلاعات ضروری را وارد کنید.");

    return;

  }


  if (!/^09\d{9}$/.test(phone)) {

    alert("شماره موبایل وارد شده صحیح نیست.");

    return;

  }


  if (!/^\d{10}$/.test(postal)) {

    alert("کد پستی باید ۱۰ رقم باشد.");

    return;

  }


  document.getElementById("paymentTotal").textContent =
    formatPrice(getCartTotal()) + " تومان";


  document.getElementById("checkoutForm").style.display = "none";

  document.getElementById("paymentPage").style.display = "block";

}


// ================================
// کپی شماره کارت
// ================================

function copyCard() {

  const card =
    "0000000000000000";

  navigator.clipboard.writeText(card);

  showMessage("شماره کارت کپی شد ✓");

}


// ================================
// تکمیل سفارش
// ================================

function finishOrder() {

  document.getElementById("paymentPage").style.display = "none";

  document.getElementById("successPage").style.display = "block";

  cart = [];

  saveCart();

  updateCartCount();

}


// ================================
// جستجو
// ================================

function searchProducts() {

  const text =
    document.getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();


  const result = products.filter(product =>

    product.name.toLowerCase().includes(text) ||

    product.category.toLowerCase().includes(text)

  );


  renderProducts(result);

}


// ================================
// فیلتر دسته‌بندی
// ================================

function filterCategory(category) {

  if (category === "همه") {

    renderProducts(products);

    return;

  }


  const result = products.filter(
    product => product.category === category
  );

  renderProducts(result);

}


// ================================
// ذخیره سبد
// ================================

function saveCart() {

  localStorage.setItem(
    "abzarBندرCart",
    JSON.stringify(cart)
  );

}


// ================================
// فرمت قیمت
// ================================

function formatPrice(number) {

  return new Intl.NumberFormat("fa-IR").format(number);

}


// ================================
// پیام کوچک
// ================================

function showMessage(message) {

  const box = document.createElement("div");

  box.textContent = message;

  box.style.position = "fixed";
  box.style.bottom = "25px";
  box.style.right = "25px";
  box.style.background = "#111";
  box.style.color = "#fff";
  box.style.padding = "13px 20px";
  box.style.borderRadius = "10px";
  box.style.zIndex = "9999";
  box.style.boxShadow = "0 10px 30px #0003";

  document.body.appendChild(box);

  setTimeout(() => {

    box.remove();

  }, 2500);

}


// ================================
// شروع سایت
// ================================

renderProducts();

updateCartCount();