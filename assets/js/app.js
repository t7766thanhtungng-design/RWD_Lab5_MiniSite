document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Toggle (Bài 1)
    const darkModeToggle = document.getElementById('darkModeToggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            let theme = document.body.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }

    // 2. Mobile Menu Hamburger (Bài 2)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 3. Back-to-Top Button (Bài 2)
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Render & Filter Sản Phẩm (Bài 3 - Tối thiểu 8 sản phẩm)
    const products = [
        { id: 1, title: 'Laptop Pro 14', category: 'tech', image: '../assets/img/optimized/prod1.webp' },
        { id: 2, title: 'Tai nghe Bluetooth', category: 'tech', image: '../assets/img/optimized/prod2.webp' },
        { id: 3, title: 'Áo Khoác Nam', category: 'fashion', image: '../assets/img/optimized/prod3.webp' },
        { id: 4, title: 'Giày Sneaker Sport', category: 'fashion', image: '../assets/img/optimized/prod4.webp' },
        { id: 5, title: 'Đồng Hồ Thông Minh', category: 'tech', image: '../assets/img/optimized/prod5.webp' },
        { id: 6, title: 'Bình Giữ Nhiệt 1L', category: 'lifestyle', image: '../assets/img/optimized/prod6.webp' },
        { id: 7, title: 'Bàn Phím Cơ Wireless', category: 'tech', image: '../assets/img/optimized/prod7.webp' },
        { id: 8, title: 'Balo Du Lịch', category: 'lifestyle', image: '../assets/img/optimized/prod8.webp' }
    ];

    // Điều chỉnh đường dẫn ảnh nếu ở trang chủ
    const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    if (isRoot) {
        products.forEach(p => p.image = p.image.replace('../', ''));
    }

    const productContainer = document.getElementById('productContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    function renderProducts(list) {
        if (!productContainer) return;
        if (list.length === 0) {
            productContainer.innerHTML = '<p>Không tìm thấy sản phẩm nào.</p>';
            return;
        }
        productContainer.innerHTML = list.map(item => `
            <div class="card">
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>Danh mục: <strong>${item.category}</strong></p>
            </div>
        `).join('');
    }

    if (productContainer) {
        renderProducts(products);

        function filterData() {
            const keyword = searchInput.value.toLowerCase().trim();
            const category = categoryFilter.value;

            const filtered = products.filter(item => {
                const matchKeyword = item.title.toLowerCase().includes(keyword);
                const matchCategory = category === 'all' || item.category === category;
                return matchKeyword && matchCategory;
            });

            renderProducts(filtered);
        }

        searchInput.addEventListener('input', filterData);
        categoryFilter.addEventListener('change', filterData);
    }

    // 5. Form Validate & Storage (Bài 4)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const errorMsg = document.getElementById('errorMsg');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                errorMsg.style.color = 'red';
                errorMsg.innerText = 'Vui lòng không để trống bất kỳ mục nào!';
                return;
            }

            if (!emailRegex.test(email)) {
                errorMsg.style.color = 'red';
                errorMsg.innerText = 'Email không hợp lệ!';
                return;
            }

            if (message.length < 20) {
                errorMsg.style.color = 'red';
                errorMsg.innerText = 'Nội dung liên hệ phải chứa ít nhất 20 ký tự!';
                return;
            }

            errorMsg.style.color = 'green';
            errorMsg.innerText = 'Gửi thành công!';

            const contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
            contactMessages.push({ name, email, message, timestamp: new Date().toLocaleString() });
            localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

            console.log('Dữ liệu lưu trong LocalStorage:', JSON.parse(localStorage.getItem('contactMessages')));
            contactForm.reset();
        });
    }
});
