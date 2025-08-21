document.addEventListener('DOMContentLoaded', () => {
    // --- عناصر الواجهة الرئيسية ---
    const loginScreen = document.getElementById('login-screen');
    const loginForm = document.getElementById('login-form');
    const appContainer = document.getElementById('app-container');
    const welcomeModal = document.getElementById('welcome-modal');
    const modalClose = document.querySelector('.modal-close');
    
    // --- عناصر التنقل ---
    const pagesWrapper = document.querySelector('.pages-wrapper');
    const navItems = document.querySelectorAll('.nav-item');
    const headerActions = document.querySelectorAll('.header-actions .btn');

    // --- محتوى الصفحات ---
    const pagesContent = [
        generateHomePage(),
        generateVipPage(),
        generateInvitePage(),
        generateTasksPage(),
        generateMePage()
    ];
    
    // --- تهيئة التطبيق ---
    function init() {
        // 1. التعامل مع تسجيل الدخول
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loginScreen.classList.add('hidden');
            appContainer.classList.remove('hidden');
            setTimeout(() => welcomeModal.style.display = 'flex', 500);
        });

        // 2. إغلاق الرسالة الترحيبية
        modalClose.addEventListener('click', () => welcomeModal.style.display = 'none');

        // 3. بناء الصفحات
        pagesWrapper.innerHTML = pagesContent.map(content => `<div class="page">${content}</div>`).join('');

        // 4. تفعيل التنقل
        navItems.forEach(item => {
            item.addEventListener('click', () => navigateTo(parseInt(item.dataset.index)));
        });

        // 5. تفعيل أزرار الهيدر
        headerActions.forEach(button => {
            button.addEventListener('click', () => {
                const pageName = button.dataset.page;
                if(pageName === 'deposit') showDynamicPage(generateDepositPage());
                if(pageName === 'withdraw') showDynamicPage(generateWithdrawPage());
            });
        });
        
        // 6. تشغيل Ticker
        startWithdrawalTicker();
    }

    // --- دوال التنقل ---
    function navigateTo(index) {
        pagesWrapper.style.transform = `translateX(-${index * 100}%)`;
        navItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }
    
    function showDynamicPage(content) {
        const dynamicPage = document.createElement('div');
        dynamicPage.className = 'page dynamic-page';
        dynamicPage.innerHTML = content;
        // ... (هنا يتم إظهار الصفحة كـ Modal أو صفحة مؤقتة)
        // للتبسيط، سنعرضها في alert مؤقتاً
        alert("سيتم توجيهك إلى صفحة الإيداع/السحب");
        console.log("محتوى الصفحة الديناميكية:", content);
    }
    
    // --- دوال توليد المحتوى ---
    function generateHomePage() {
        return `
            <div class="withdrawal-ticker">
                <span class="ticker-content"></span>
            </div>
            <h2>الخطط الأكثر شيوعًا</h2>
            <!-- هنا بانر الخطط المنزلق -->
            <p>محتوى الصفحة الرئيسية...</p>
        `;
    }

    function generateVipPage() {
        let cards = '';
        for (let i = 1; i <= 20; i++) {
            cards += `
                <div class="vip-card">
                    <h3>🎖️ VIP ${i}</h3>
                    <p>السعر: $${(5 * Math.pow(1.15, i-1)).toFixed(2)}</p>
                    <ul>
                        <li>خصم ${i}% على الخدمات</li>
                        <li>دعم فني متميز</li>
                    </ul>
                    <button class="btn btn-primary">اشترك الآن</button>
                </div>`;
        }
        return `<div class="vip-grid">${cards}</div>`;
    }
    
    function generateDepositPage() {
        const methods = [
            { name: 'USDT (TRC20)', address: 'TLsGeELYfexmuhK6g3TVQ44AAt5kxZN3gb', logo: 'usdt.png' },
            { name: 'Bitcoin (SegWit)', address: 'bc1qlvx4tzwzvm66p0ukfykkv4zsqq7ywug65282u2', logo: 'btc.png' },
            { name: 'BNB (BEP20)', address: '0x83c317eab7f9d70cf1f98ca8cd30fce09d7fe18e', logo: 'bnb.png' },
            { name: 'Ethereum (ERC20)', address: '0x83c317eab7f9d70cf1f98ca8cd30fce09d7fe18e', logo: 'eth.png' }
        ];
        
        let methodsHtml = methods.map(m => `
            <div class="deposit-method">
                <img src="assets/logos/${m.logo}" alt="${m.name}">
                <div class="deposit-info">
                    <strong>${m.name}</strong>
                    <small>${m.address}</small>
                </div>
                <div id="qrcode-${m.name.split(' ')[0]}"></div>
                <button class="btn btn-secondary">نسخ</button>
            </div>
        `).join('');

        // You'll need to call new QRCode(...) for each element after it's in the DOM
        
        return `<h2>اختر طريقة الإيداع</h2>${methodsHtml}`;
    }

    // ... (أضف باقي دوال توليد الصفحات هنا)
    function generateInvitePage() { return `<h2>صفحة الدعوات</h2>`; }
    function generateTasksPage() { return `<h2>صفحة المهام</h2>`; }
    function generateMePage() { return `<h2>ملفي الشخصي</h2>`; }
    function generateWithdrawPage() { return `<h2>صفحة السحب</h2>`; }

    // --- دوال مساعدة ---
    function startWithdrawalTicker() {
        const ticker = document.querySelector('.ticker-content');
        if (!ticker) return;
        
        function updateTicker() {
            const amount = (Math.random() * 90 + 10).toFixed(2);
            ticker.textContent = `تم سحب ${amount}$ بنجاح 🎉`;
        }
        
        updateTicker();
        setInterval(updateTicker, 5000);
    }
    
    // --- بدء تشغيل التطبيق ---
    init();
});
