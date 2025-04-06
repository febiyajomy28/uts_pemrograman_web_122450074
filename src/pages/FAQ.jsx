import React, { useState } from "react";
import "../style/FAQ.css";

const faqs = [
  {
    question: "Bagaimana cara melakukan pembelian di website ini?",
    answer:
      "Anda bisa memilih produk yang diinginkan, menambahkannya ke keranjang, dan melanjutkan ke proses pembayaran. Pilih metode pembayaran yang tersedia dan selesaikan pesanan Anda.",
  },
  {
    question: "Apakah ada garansi untuk produk yang dibeli?",
    answer:
      "Ya, setiap produk memiliki garansi yang berbeda-beda. Silakan cek detail garansi pada halaman produk sebelum melakukan pembelian.",
  },
  {
    question: "Berapa lama waktu pengiriman produk?",
    answer:
      "Waktu pengiriman bervariasi tergantung pada produk dan lokasi Anda. Detail estimasi pengiriman bisa ditemukan di halaman produk atau saat checkout.",
  },
  {
    question: "Apakah bisa mengembalikan produk jika tidak sesuai?",
    answer:
      "Ya, kami menyediakan kebijakan pengembalian dalam 30-60 hari tergantung pada produk. Pastikan produk masih dalam kondisi baik dan sesuai dengan syarat pengembalian.",
  },
  {
    question: "Bagaimana cara melacak pesanan saya?",
    answer:
      "Setelah pembayaran berhasil, Anda akan menerima nomor resi yang bisa digunakan untuk melacak pesanan melalui halaman “Lacak Pesanan” di website kami.",
  },
  {
    question: "Apakah ada diskon atau promo khusus?",
    answer:
      "Kami sering mengadakan promo dan diskon. Anda bisa melihat daftar promo di halaman utama atau berlangganan newsletter kami untuk mendapatkan informasi terbaru.",
  },
  {
    question: "Bagaimana cara menghubungi customer service?",
    answer:
      "Anda bisa menghubungi tim customer service melalui live chat di website, email, atau WhatsApp yang tertera di halaman “Kontak Kami”.",
  },
  {
    question: "Apakah ada sistem poin atau reward bagi pelanggan setia?",
    answer:
      "Ya, kami memiliki sistem reward di mana Anda bisa mendapatkan poin dari setiap pembelian yang bisa ditukar dengan diskon atau hadiah menarik.",
  },
  {
    question: "Apakah produk yang dijual di sini asli?",
    answer:
      "Ya, semua produk yang kami jual adalah 100% asli dan berasal dari brand resmi atau distributor terpercaya.",
  },
  {
    question: "Bagaimana cara membatalkan pesanan?",
    answer:
      "Pesanan bisa dibatalkan sebelum statusnya berubah menjadi “Sedang Diproses”. Jika pesanan sudah dikirim, silakan ajukan pengembalian setelah barang diterima.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions (FAQ)</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
            </button>
            {activeIndex === index && (
              <p className="faq-answer">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
