export interface WeddingService {
  id: number;
  title: string;
  category: "To'yxona" | "San'atkor" | "Foto & Video" | "Dekoratsiya" | "Kortej";
  catId: "venues" | "music" | "photo" | "decor" | "auto";
  businessName: string;
  city: string;
  address: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  distanceKm: number;
  has3D: boolean;
  model3DId?: 'versal' | 'yakkasaroy' | 'mumtoz' | 'oftob';
  description: string;
  features: string[];
  phone: string;
  packages: { name: string; price: number; desc: string }[];
  reviews: { id: number; author: string; rating: number; date: string; comment: string }[];
}

export const WEDDING_SERVICES: WeddingService[] = [
  // ─────────────────────────────────────────────
  // 1. TO'YXONALAR (VENUES)
  // ─────────────────────────────────────────────
  {
    id: 1,
    title: 'Versal Grand Ballroom (500 kishi)',
    category: "To'yxona",
    catId: 'venues',
    businessName: 'Versal Grand Palace',
    city: 'Toshkent, Yakkasaroy',
    address: "Toshkent sh., Yakkasaroy t., Shota Rustaveli ko'chasi, 45",
    price: 48000000,
    rating: 4.96,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    ],
    distanceKm: 2.4,
    has3D: true,
    model3DId: 'versal',
    phone: '+998901234567',
    description: "Toshkent markazidagi eng hashamatli to'yxonalardan biri. Kristal qandillar, eng so'nggi rusumdagi panoramali akustika, professional to'y yoritgichlari va 500 nafargacha mehmonni bag'riga sig'diruvchi viqorli zal.",
    features: ['Kristal Lyustra', '3D LED Ekran', "Og'ir Tutun", 'VIP Prezidium', '120 Mashina Parking'],
    packages: [
      { name: 'Standart Paket', price: 48000000, desc: 'Zal ijarasi + bazaviy akustika va chiroq' },
      { name: 'VIP Oltin Paket', price: 68000000, desc: "To'liq LED ekranlar + VIP to'y dasturxoni + xizmat" },
    ],
    reviews: [
      { id: 1, author: 'Jasurbek Qodirov', rating: 5, date: '12-Avgust', comment: "To'yimiz ajoyib o'tdi! Qandillar va xizmat ko'rsatish oliy darajada!" },
      { id: 2, author: 'Madina Usmonova', rating: 5, date: '28-Iyul', comment: "Kelin-kuyov xonasi juda shinam, fotosessiya uchun burchaklari juda chiroyli." },
    ],
  },
  {
    id: 3,
    title: 'Yakkasaroy Palace Luxury (850 kishi)',
    category: "To'yxona",
    catId: 'venues',
    businessName: 'Yakkasaroy Palace Group',
    city: "Toshkent, Mirzo Ulug'bek",
    address: "Toshkent sh., Mirzo Ulug'bek t., Mustaqillik shoh ko'chasi, 88",
    price: 65000000,
    rating: 4.98,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800',
    ],
    distanceKm: 3.8,
    has3D: true,
    model3DId: 'yakkasaroy',
    phone: '+998971112233',
    description: "Oliy toifadagi xalqaro standartdagi to'yxona majmuasi. 850 kishilik keng zal, spiral marmar zinapoyalar, binafsha va oltin yoritish hamda ulug'vor akustika.",
    features: ['Fransuz Arxitekturasi', 'Alohida Kelin Xonasi', 'Lazer Shousi', '200 Mashina Parking', 'Akustik Zallar'],
    packages: [
      { name: 'Imperial Paket', price: 65000000, desc: 'Katta zal + litsenziyali yoruglik va sound system' },
      { name: 'Royal Diamond Paket', price: 90000000, desc: "Lazer shou, erkin bar, og'ir tutun va qandillar jilosi" },
    ],
    reviews: [
      { id: 1, author: 'Bekzod Aliyev', rating: 5, date: '3-Sentyabr', comment: "Toshkentdagi eng nufuzli to'yxona! Mehmonlarimiz hayratda qolishdi." },
    ],
  },
  {
    id: 4,
    title: 'Mumtoz Shaxona Zal (550 kishi)',
    category: "To'yxona",
    catId: 'venues',
    businessName: 'Mumtoz Saroy',
    city: 'Toshkent, Chilonzor',
    address: 'Toshkent sh., Chilonzor t., Bunyodkor shoh ko\'chasi, 21',
    price: 38000000,
    rating: 4.88,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200'],
    distanceKm: 5.1,
    has3D: true,
    model3DId: 'mumtoz',
    phone: '+998935554433',
    description: "Sharqona nafis ganchkorlik va zamonaviy yorug'lik texnologiyasi uyg'unlashgan muhtasham saroy. Markaziy favvora va milliy bezaklar.",
    features: ['Milliy Ganchkorlik', 'Jonli Orkestr Maydoni', "Favvoralar Bog'i", 'Maxsus Oshpazlik Oshxonasi'],
    packages: [
      { name: 'Sharqona Standart', price: 38000000, desc: 'Zal ijarasi va milliy dasturxon xizmati' },
    ],
    reviews: [
      { id: 1, author: 'Dilorom Rahimova', rating: 5, date: '19-Avgust', comment: 'Sharqona muhit va milliy kuy-qo\'shiqlar juda mos tushdi.' },
    ],
  },
  {
    id: 5,
    title: 'Oftob Shaxona: Ochiq Osmon & Sharshara',
    category: "To'yxona",
    catId: 'venues',
    businessName: 'Oftob Garden Resort',
    city: 'Toshkent, Qibray',
    address: "Toshkent vil., Qibray t., Tabiat qo'ynida, Bo'zsuv sohili",
    price: 55000000,
    rating: 4.99,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200'],
    distanceKm: 7.2,
    has3D: true,
    model3DId: 'oftob',
    phone: '+998909998877',
    description: "Yashil tabiat bog'ida, oqshomgi ochiq osmon ostida joylashgan to'yxona. Tabiiy sharshara shovqini, yulduzli osmon va suv ustidagi viqorli sahna.",
    features: ['Oqib Turuvchi Sharshara', 'Yulduzli Ochiq Osmon', 'Suv ustidagi Sahna', 'Lazer & Chiroq Shousi', '250 Mashina Parking'],
    packages: [
      { name: 'Ochiq Osmon VIP', price: 55000000, desc: 'Sharshara atrofida 700 kishilik bayramona to\'y' },
    ],
    reviews: [
      { id: 1, author: 'Farrux Toirov', rating: 5, date: '5-Sentyabr', comment: 'Ochiq osmon va sharshara — to\'yimiz ertaknamo bo\'ldi!' },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. SAN'ATKORLAR (MUSIC & LIVE BANDS)
  // ─────────────────────────────────────────────
  {
    id: 2,
    title: 'Jonli Ijro Ansambli va Xonandalar Guruhi',
    category: "San'atkor",
    catId: 'music',
    businessName: 'TuyBox VIP Music Band',
    city: 'Toshkent',
    address: "Toshkent sh., Navoiy ko'chasi 14",
    price: 15000000,
    rating: 4.90,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200'],
    distanceKm: 4.1,
    has3D: false,
    phone: '+998912223344',
    description: "Xalq sevgan xonandalar, professional sozandalar va jonli ovoz ansambli. Repertuarda o'zbek milliy klassikasi, estrada va jahon xitlari!",
    features: ['8 Kishi Jonli Tarkib', 'Professional Ovoz Rejissyori', 'Kelin Salom Maxsus Qo\'shig\'i', 'Interaktiv Shou'],
    packages: [
      { name: "To'liq Oqshom (4 soat)", price: 15000000, desc: 'Jonli ijro, sozandalar va maxsus kelin-kuyov valsi' },
      { name: "VIP Katta Ansambl (6 soat)", price: 24000000, desc: 'Xonandalar + estrada orkestri + raqqosalar' },
    ],
    reviews: [
      { id: 1, author: 'Shaxzod Mirzayev', rating: 5, date: '1-Sentyabr', comment: "Mehmonlar bir daqiqa ham o'tirishmadi, raqsga tushishdi!" },
    ],
  },
  {
    id: 6,
    title: 'Xurshid Rasulov & Live Pop Band',
    category: "San'atkor",
    catId: 'music',
    businessName: 'Xurshid Rasulov Ijodiy Guruhi',
    city: 'Toshkent & Butun O\'zbekiston',
    address: 'Toshkent sh., Chilonzor 9',
    price: 22000000,
    rating: 4.97,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200'],
    distanceKm: 3.2,
    has3D: false,
    phone: '+998933332211',
    description: "Millionlab muxlislarga ega xalq xushovoz xonandasi va jonli guruhi. O'zbek to'ylarining haqiqiy bezagi!",
    features: ['Jonli Ijro', 'Eksklyuziv Hit Taronalar', 'To\'yboylar Bilan Muloqot', 'Maxsus Duetlar'],
    packages: [
      { name: "1 Blok (5-6 ta qo'shiq)", price: 12000000, desc: 'Eng sara xit qo\'shiqlar bloki' },
      { name: "To'liq To'y Dasturi", price: 22000000, desc: 'Butun to\'y davomida xizmat va fotossessiya' },
    ],
    reviews: [
      { id: 1, author: 'Nodirbek Karimov', rating: 5, date: '15-Avgust', comment: 'Haqiqiy to\'yona kayfiyat! Rahmat ijodiy jamoaga!' },
    ],
  },
  {
    id: 7,
    title: 'Rayhon & Milliy Raqslar Ansambli',
    category: "San'atkor",
    catId: 'music',
    businessName: 'Shodiyona Raqs va Shou Teatri',
    city: 'Toshkent',
    address: "Toshkent sh., Mirobod t., Oybek ko'chasi 20",
    price: 18000000,
    rating: 4.94,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200'],
    distanceKm: 2.8,
    has3D: false,
    phone: '+998901114477',
    description: "Kelin-kuyovni tantanali kutib olish, jozibali milliy va zamonaviy raqslar shousi, rang-barang atlas liboslar.",
    features: ['12 Nafardan Iborat Raqqosalar', 'Farishtalar Raqsi', 'Lazgi va Andijon Polka', 'Chiroyli Kelin Salom'],
    packages: [
      { name: "5 Ta Raqs Shousi", price: 12000000, desc: 'Kelin kirib kelishi, ota-ona sharafiga va shodiyona raqslar' },
      { name: "Grand VIP Dastur", price: 18000000, desc: 'To\'liq oqshomgi raqslar, farishtalar qanotlari va kiyim almashishlar' },
    ],
    reviews: [
      { id: 1, author: 'Feruza Ergasheva', rating: 5, date: '20-Avgust', comment: 'Kelin kirib kelishida ko\'zlarimga yosh keldi, juda chiroyli!' },
    ],
  },
  {
    id: 8,
    title: 'Professional Boshlovchi va Qiziqchilar Shousi',
    category: "San'atkor",
    catId: 'music',
    businessName: 'VIP Suhandonlar Uyushmasi',
    city: 'Toshkent',
    address: 'Toshkent sh., Yunusobod t.',
    price: 8000000,
    rating: 4.93,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200'],
    distanceKm: 3.5,
    has3D: false,
    phone: '+998907776655',
    description: "To'yni yuksak madaniyat, samimiy kulgu va tartib bilan olib boruvchi taniqli suhandonlar va stendap qiziqchilar.",
    features: ['O\'zbek va Rus Tillarida', 'Madaniy Tanlovlar', 'Kelin-Kuyov Sevgi Tarixi', 'Hech Qanday Noo\'rin Hazillarsiz'],
    packages: [
      { name: 'Standart Boshlovchi', price: 8000000, desc: 'Butun to\'yni olib borish va qiziqarli o\'yinlar' },
    ],
    reviews: [
      { id: 1, author: 'Umidjon Qosimov', rating: 5, date: '10-Sentyabr', comment: 'Barcha yoshdagi mehmonlar uchun maroqli o\'tdi!' },
    ],
  },
  {
    id: 9,
    title: 'Karnay-Surnay & Doirachilar VIP Guruhi',
    category: "San'atkor",
    catId: 'music',
    businessName: 'Zarb Milliy Sadolari',
    city: 'Toshkent',
    address: "Toshkent sh., Shayxontohur t., Chorsu",
    price: 3500000,
    rating: 4.98,
    reviewsCount: 155,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200'],
    distanceKm: 4.8,
    has3D: false,
    phone: '+998946665544',
    description: "Eshik oldida mehmonlarni kutib olish, kelin-kuyovning tantanali kirib kelishi va milliy jarangdor kuylar.",
    features: ['4 Karnay, 2 Surnay, 4 Doira', 'Milliy Chapan va Sarpolar', 'Fayzli Sadolar', 'Osh va Kechki To\'y'],
    packages: [
      { name: "Kechki Bazm (2 soat)", price: 3500000, desc: 'Mehmonlar va kelin-kuyovni kutib olish' },
      { name: "Osh + Kechki To'y", price: 6000000, desc: 'Tonggi nahor oshi va oqshom to\'yi uchun to\'liq xizmat' },
    ],
    reviews: [
      { id: 1, author: 'Sanjarbek', rating: 5, date: '14-Avgust', comment: 'Karnay sadolari butun mahallani larzaga keltirdi!' },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. FOTO & VIDEO (PHOTO & CINEMA)
  // ─────────────────────────────────────────────
  {
    id: 10,
    title: 'Dream Film: 4K Cinema & Drone Wedding Studio',
    category: "Foto & Video",
    catId: 'photo',
    businessName: 'Dream Film Media',
    city: 'Toshkent',
    address: "Toshkent sh., Yakkasaroy t., Babur ko'chasi 33",
    price: 12000000,
    rating: 4.97,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200'],
    distanceKm: 2.1,
    has3D: false,
    phone: '+998903337788',
    description: "Kino darajasidagi to'y videofilmlari, DJI 4K dron parvozlari, to'y kunining o'zida tayyorlanuvchi SDE-klip va fotosessiyalar.",
    features: ['3 Ta 4K Kino Kamera', 'DJI Mavic 3 Pro Dron', 'SDE (Same Day Edit) Klip', 'Hashamatli Charm Fotokitob'],
    packages: [
      { name: '4K Cinema Paket', price: 12000000, desc: 'To\'liq kunlik syomka, to\'y klipi va to\'liq film' },
      { name: 'Hollywood VIP Paket', price: 18000000, desc: '4 kamera, dron, kran va 2 ta katta fotokitob' },
    ],
    reviews: [
      { id: 1, author: 'Shahnoza Karimova', rating: 5, date: '25-Avgust', comment: 'Klipimiz kino kabi chiqdi, har ko\'rganda yig\'laymiz!' },
    ],
  },
  {
    id: 11,
    title: 'Luxe Vision: Love Story & SDE Klip Studiyasi',
    category: "Foto & Video",
    catId: 'photo',
    businessName: 'Luxe Vision Photography',
    city: 'Toshkent',
    address: 'Toshkent sh., Mirzo Ulug\'bek t.',
    price: 7000000,
    rating: 4.91,
    reviewsCount: 75,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200'],
    distanceKm: 3.9,
    has3D: false,
    phone: '+998905551122',
    description: "Samimiy his-tuyg'ularni aks ettiruvchi professional fotosessiyalar. Studiya va tabiat qo'ynidagi eksklyuziv Love Story syomkasi.",
    features: ['500+ Retush Qilingan Surat', 'Love Story Syomkasi', 'Flash-karta va Bulutli Havola'],
    packages: [
      { name: 'Love Story & To\'y', price: 7000000, desc: 'To\'ydan oldingi syomka va to\'y kuni fotosessiyasi' },
    ],
    reviews: [
      { id: 1, author: 'Rustam & Nilufar', rating: 5, date: '18-Avgust', comment: 'Suratlar shunchaki aqlbovar qilmas go\'zal!' },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. DEKORATSIYA (FLORAL & DECOR)
  // ─────────────────────────────────────────────
  {
    id: 12,
    title: 'Royal Floral: Jonli Gullar & VIP Prezidium',
    category: "Dekoratsiya",
    catId: 'decor',
    businessName: 'Royal Floral Studio',
    city: 'Toshkent',
    address: "Toshkent sh., Shayxontohur t., Labzak ko'chasi 50",
    price: 16000000,
    rating: 4.99,
    reviewsCount: 205,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200'],
    distanceKm: 3.0,
    has3D: false,
    phone: '+998908889900',
    description: "Gollandiyadan keltirilgan tabiiy atirgullar, orxideyalar va peonlar bilan kelin-kuyov sahnasi, arka va mehmonlar stollarini bezatish.",
    features: ['Tabiiy Jonli Gullar', 'VIP Prezidium Bezatish', '30 Ta Stol Kompozitsiyasi', 'Fotoburchak & Arka'],
    packages: [
      { name: 'Grand Rose Paket', price: 16000000, desc: 'Prezidium, kirish arkasi va barcha mehmonlar stoli' },
      { name: 'Qirollik Ertagi', price: 28000000, desc: 'Shift osma qandillari bilan to\'liq floral installyatsiya' },
    ],
    reviews: [
      { id: 1, author: 'Zuhra Alimova', rating: 5, date: '30-Avgust', comment: 'Zalga kirganimizda gullar ifori butun to\'yxonani egallab olgan edi!' },
    ],
  },
  {
    id: 13,
    title: 'Kristall & Og\'ir Tutun Lazer Shousi',
    category: "Dekoratsiya",
    catId: 'decor',
    businessName: 'Special Effects Tashkent',
    city: 'Toshkent',
    address: 'Toshkent sh., Sergeli t.',
    price: 4500000,
    rating: 4.95,
    reviewsCount: 130,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200'],
    distanceKm: 6.2,
    has3D: false,
    phone: '+998934445566',
    description: "Kelin-kuyovning birinchi raqsi uchun og'ir tutun (bulut effekti), sovuq salyut favvoralari va lazer nur shousi.",
    features: ['Quruq Muz Og\'ir Tutuni', '8 Ta Sovuq Favvora', 'Yuraklar Lazer Proyeksiyasi', 'Konfetti Shousi'],
    packages: [
      { name: 'Vals Paketi', price: 4500000, desc: 'Birinchi raqs uchun og\'ir tutun + 6 ta sovuq favvora' },
    ],
    reviews: [
      { id: 1, author: 'Javohir & Lola', rating: 5, date: '7-Sentyabr', comment: 'Raqsimiz xuddi bulutlar ustida uchgandek o\'tdi!' },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. KORTEJ (VIP CARS & FLEET)
  // ─────────────────────────────────────────────
  {
    id: 14,
    title: 'Mercedes-Maybach S-Class W223 Oq Kortej',
    category: "Kortej",
    catId: 'auto',
    businessName: 'Maybach VIP Motors',
    city: 'Toshkent',
    address: 'Toshkent sh., Mirobod t., Amir Temur shoh ko\'chasi',
    price: 4000000,
    rating: 4.98,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200'],
    distanceKm: 2.7,
    has3D: false,
    phone: '+998901237890',
    description: "Yangi avlod Mercedes-Maybach S-Class W223 avtomobili. Oq rang, hashamatli bej charm salon, shaxsiy kostyumli haydovchi va to'y gullari bilan bezatish.",
    features: ['Maybach W223 Yangi Model', 'Kostyum-Shimli Haydovchi', 'Konditsioner & Ichimliklar', 'To\'liq Kunlik Xizmat'],
    packages: [
      { name: "Kelin-Kuyov Korteji (8 soat)", price: 4000000, desc: 'Fotosessiya, FHDYo va to\'yxonaga eltib qo\'yish' },
    ],
    reviews: [
      { id: 1, author: 'Ulug\'bek Tursunov', rating: 5, date: '21-Avgust', comment: 'Mashina toza, haydovchi juda madaniyatli. Tavsiya qilaman!' },
    ],
  },
  {
    id: 15,
    title: 'Rolls-Royce Ghost VIP Qirollik Korteji',
    category: "Kortej",
    catId: 'auto',
    businessName: 'Royal Limousine Club',
    city: 'Toshkent',
    address: 'Toshkent sh., Yunusobod t.',
    price: 8500000,
    rating: 5.0,
    reviewsCount: 60,
    image: 'https://images.unsplash.com/photo-1631295868223-63265840d001?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1631295868223-63265840d001?q=80&w=1200'],
    distanceKm: 4.0,
    has3D: false,
    phone: '+998977778899',
    description: "Haqiqiy qirollik to'yi uchun Rolls-Royce Ghost. Yulduzli shift, mutlaq sokinlik va tengsiz viqor.",
    features: ['Rolls-Royce Ghost', 'Yulduzli Shift (Starlight Headliner)', 'Shaxsiy Tansoqchi-Haydovchi', 'VIP Bezaklar'],
    packages: [
      { name: 'Royal VIP Day', price: 8500000, desc: 'Kelin-kuyov uchun 8 soatlik unutilmas safar' },
    ],
    reviews: [
      { id: 1, author: 'Mansurxon', rating: 5, date: '1-Sentyabr', comment: 'Shaharda hamma qarab qoldi, juda ulug\'vor mashina!' },
    ],
  },
];
