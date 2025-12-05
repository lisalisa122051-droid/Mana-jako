document.addEventListener('DOMContentLoaded', () => {
    
    // --- KONFIGURASI WHATSAPP ADMIN ---
    const ADMIN_NUMBERS = {
        '1': '6287710238940', // Admin 1
        '2': '6283130830451'  // Admin 2
    };

    // --- ELEMEN MODAL ADMIN ---
    const adminModal = document.getElementById('admin-modal');
    const closeModal = adminModal.querySelector('.close-button');
    // Mengambil elemen <strong> di dalam modal untuk menampilkan detail produk
    const purchaseMessageStrong = document.getElementById('purchase-message'); 
    const adminSelectButtons = adminModal.querySelectorAll('.admin-select-btn');

    // Variabel untuk menyimpan pesan pembelian yang akan dikirim
    let currentPurchaseMessage = '';

    // --- FUNGSI EFEK SHINE CAHAYA SAAT KLIK PRODUK ---
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mousedown', (e) => triggerShine(e, card));
        card.addEventListener('touchstart', (e) => triggerShine(e, card), {passive: true});
    });

    const triggerShine = (e, card) => {
        e.preventDefault();
        card.classList.add('shining');
        setTimeout(() => {
            card.classList.remove('shining');
        }, 500); // Sesuai dengan durasi animasi CSS
    };

    // --- FUNGSI MEMBUKA MODAL ADMIN (Dipanggil dari HTML onclick) ---
    window.openAdminModal = (message) => {
        currentPurchaseMessage = message;
        // Tampilkan pesan di dalam tag <strong>
        purchaseMessageStrong.textContent = message;
        adminModal.style.display = 'block';
    };

    // --- LOGIKA PENGARAHAN WHATSAPP SAAT TOMBOL ADMIN DIKLIK ---
    adminSelectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const adminId = button.getAttribute('data-admin');
            const phoneNumber = ADMIN_NUMBERS[adminId];
            
            // Pesan dikirim dari produk yang dipilih + permintaan transaksi
            // Pesan WA: "Saya ingin membeli [Nama Produk]. Mohon diproses transaksinya."
            const encodedMessage = encodeURIComponent(`Saya ingin membeli ${currentPurchaseMessage}. Mohon diproses transaksinya.`);
            
            // Buat link WhatsApp
            const waLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Tutup modal dan redirect ke WhatsApp
            adminModal.style.display = 'none';
            window.open(waLink, '_blank');
        });
    });


    // --- LOGIKA PENUTUP MODAL ---
    closeModal.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });

    // Tutup Modal saat klik di luar modal
    window.addEventListener('click', (event) => {
        if (event.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });

    // --- PLACEHOLDER FITUR ADMIN (Admin Panel) ---
    document.querySelector('.admin-link').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Admin Panel: Memerlukan sistem backend (Login & Dashboard). Ini hanya link placeholder.');
    });
});
