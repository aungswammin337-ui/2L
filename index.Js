// Product Data စာရင်း (ပစ္စည်းအသစ်များ ထပ်ထည့်လိုပါက ဤနေရာတွင် ဆက်လက်ရေးသားနိုင်ပါသည်)
const productsData = [
    {
        id: 1,
        title: "FTTH Outdoor Drop Cable (1/2/4 Core)",
        category: "cable",
        isMain: true, // All Products မျက်နှာပြင်တွင် ပထမဆုံး ပေါ်စေရန်
        image: "Test.jpg", // သင့်ပုံဖိုင်နာမည် (Test.jpg)
        desc: "G.657A1/A2 bend-insensitive single-mode fiber with FRP strength members.",
        status: "In Stock"
    },
    {
        id: 2,
        title: "96C Armored Fiber Cable",
        category: "cable",
        isMain: false, // Fiber Cables ခလုတ်ကို နှိပ်မှ ပေါ်လာမည်
        image: "jc.jpg", // သင့်ပုံဖိုင်နာမည် (jc.jpg)
        desc: "Heavy-duty underground direct burial cable with corrugated steel tape armor.",
        status: "In Stock"
    },
    {
        id: 3,
        title: "Dome / Inline Fiber Splice Closure",
        category: "closure",
        isMain: true,
        image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Fiber+Splice+Closure",
        desc: "IP68 waterproof outdoor enclosure available in 12, 24, 48, and 96 core capacities.",
        status: "In Stock"
    },
    {
        id: 4,
        title: "16-Port Fiber Access Terminal (NAP Box)",
        category: "closure",
        isMain: false,
        image: "https://placehold.co/600x400/e2e8f0/1e293b?text=FAT+NAP+Box+16+Core",
        desc: "UV-resistant PC+ABS pole/wall mount distribution box compatible with 1:16 splitters.",
        status: "In Stock"
    },
    {
        id: 5,
        title: "19\" Rack Mount ODF Patch Panel (24/48 Port)",
        category: "odf",
        isMain: true,
        image: "https://placehold.co/600x400/e2e8f0/1e293b?text=19-Inch+Rack+ODF",
        desc: "Cold-rolled steel sliding Optical Distribution Frame loaded with SC adapters.",
        status: "In Stock"
    },
    {
        id: 6,
        title: "Fiber Patch Cords & PLC Splitters",
        category: "accessories",
        isMain: true,
        image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Fiber+Patch+Cord",
        desc: "Low insertion loss SC/UPC, SC/APC patch cords and steel tube PLC splitters.",
        status: "In Stock"
    }
];

// Product Card များကို HTML သို့ အလိုအလျောက် ထည့်သွင်းပေးသည့် Function
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';

    productsData.forEach(product => {
        const card = document.createElement('div');
        card.className = "product-card bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col cursor-pointer";
        card.setAttribute('data-category', product.category);
        if (product.isMain) {
            card.setAttribute('data-main', 'true');
        }

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-full h-52 object-cover border-b border-slate-100" onclick="goToCategory('${product.category}')">
            <div class="p-6 flex-1 flex flex-col border-t border-slate-100">
                <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider" onclick="goToCategory('${product.category}')">${product.category.toUpperCase()}</span>
                <h3 class="text-lg font-bold text-slate-900 mt-1 hover:text-blue-600 transition" onclick="goToCategory('${product.category}')">${product.title}</h3>
                <p class="text-slate-600 text-sm mt-2 flex-1">${product.desc}</p>
                <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span class="text-xs text-slate-500">Status: <strong class="text-emerald-600">${product.status}</strong></span>
                    <a href="#contact" onclick="selectProduct('${product.title}')" class="text-sm font-semibold text-blue-600 hover:text-blue-800">Inquire <i class="fa-solid fa-arrow-right ml-1"></i></a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Category Filter လုပ်ပေးသော Function
function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(category)) {
            btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');
            btn.classList.add('bg-blue-600', 'text-white');
        } else {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
        }
    });

    cards.forEach(card => {
        if (category === 'all') {
            if (card.getAttribute('data-main') === 'true') {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        } else {
            if (card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Product တစ်ခုခုကို နှိပ်ပါက သက်ဆိုင်ရာ Category ထဲသို့ တန်းဝင်ရောက်စေရန်
function goToCategory(categoryName) {
    filterProducts(categoryName);
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Inquire နှိပ်ပါက Inquiry Form ထဲသို့ Product နာမည် အလိုအလျောက် ဝင်ရန်
function selectProduct(productName) {
    document.getElementById('productSubject').value = productName;
}

// Email ပို့ရန် Form Logic
function sendEmail(event) {
    event.preventDefault();
    
    const companyEmail = "sales@2lindustrial.com"; 
    
    const name = document.getElementById('senderName').value;
    const contact = document.getElementById('senderContact').value;
    const product = document.getElementById('productSubject').value || "General Product Inquiry";
    const message = document.getElementById('messageBody').value;

    const subject = encodeURIComponent(`Product Inquiry: ${product} - from ${name}`);
    const body = encodeURIComponent(
        `Customer Name: ${name}\n` +
        `Contact Info: ${contact}\n` +
        `Product: ${product}\n\n` +
        `Message:\n${message}`
    );

    window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
}

// Webpage စတင် Load လုပ်ချိန်တွင် အလုပ်လုပ်ရန်
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    filterProducts('all');
});
