# 💎 TUYBOX PLATFORMASI: TO'LIQ FUNKSIYALAR KATALOGI (MASTER FEATURE SPEC)

> Ushbu hujjat TuyBox ekotizimining barcha modullari, mobil ilovasi, veb-sahifalari va backend xizmatlaridagi har bir mavjud va ishlaydigan funksiyalarining to'liq tavsifidir.

---

## 📱 1. MOBIL ILOVA: ASOSIY EKRANLAR VA MODULLAR

### 1.1. Bosh Sahifa (HomeScreen) & Katalog
* **Kategoriya bo'yicha saralash:**
  * 🏰 **To'yxonalar** (Zal sig'imi, narxi, manzili, 3D mavjudligi)
  * 🎤 **San'atkorlar & Jonli Ijro** (Ansambllar, yakkaxon xonandalar, boshlovchilar, doirachilar)
  * 📸 **Foto & Video Studiyalar** (4K Cinema, Love Story, Dron xizmatlari)
  * ✨ **Dekoratsiya & Dizayn** (VIP Prezidium, gullar, og'ir tutun va lazer shoulari)
  * 🚘 **Kortej & Premium Avtomobillar** (Mercedes-Maybach, Rolls-Royce, Malibu)
* **Jonli Qidiruv (Live Search):** Xizmat nomi, shahar/tuman yoki ta'rif bo'yicha real vaqtda harflar terilishi bilan bir zumda natijalarni chiqarish.
* **Xizmat Kartochkasi:** HD suratlar, rasmiy `Verified` nishoni, yulduzli reyting (★ 4.9+), narxlar va bitta teginishda profilga o'tish.
* **Tezkor Bo'limlar:** Xarita, Stollar xaritasi, Onlayn To'yona va Byudjet kalkulyatoriga 1-klikda o'tish vidjetlari.

---

### 1.2. 🌸 Qirollik Kelin va 👑 Kuyov Dual Rejimi (Theme Engine)
* **1-Teginishda Rejimni Almashtirish:** Bosh sahifa tepasida va Profil sahifasida qulay tugma (👑 Kuyov ⇄ 🌸 Kelin).
* **Kelin Rejimida Vizual O'zgarishlar:**
  * Butun ilova foni tun binafsha (`#100720` / `#160B2C`) tusga kiradi.
  * Kartochkalar, chegaralar va piktogrammalar ametist-lilac neon nuri bilan porlaydi (`#C084FC`, `#9333EA`).
  * Asosiy harakat tugmalari yorqin binafsha gradientga aylanadi (`['#F0ABFC', '#C084FC', '#9333EA']`).
  * 3D zalda maxsus 4-romantik binafsha yoritish rejimi (`Kelin rejimi`) yoqiladi.
* **Kuyov Rejimida:** Qora obsidian va imperator oltin klassik hashamatli dizayni.

---

### 1.3. 🗺️ Interaktiv Xarita & GPS Navigator (VenueMapScreen)
* **Pastki Menyu (Bottom Tab):** Ilovaning istalgan joyidan 1-bosishda ochiladigan asosiy tab.
* **Jonli Qidiruv & Tuman Filtrlari:**
  * Tumanlar: Yakkasaroy, Mirzo Ulug'bek, Chilonzor, Qibray, Yunusobod, Markaz, Olmazor, Mirobod.
  * Mehmonlar sig'imi: 👥 500+ kishi, 👑 700+ kishi.
  * Xususiyatlar: 🧊 3D Zal mavjud bo'lgan to'yxonalarni ajratish.
* **Narxli Hashamatli Markerlar (Custom Pins):** Har bir to'yxona ustida `🏰 Versal • 48M` ko'rinishidagi oltin/binafsha neon nishon.
* **Yumshoq Uchib Borish (`flyTo`):** Marker bosilganda xarita to'yxonaga ravon yaqinlashadi va pastda to'liq ma'lumot kartochkasi chiqadi.
* **1-Klikda Marshrut Chizish:** "Marshrut" tugmasi orqali Yandex Navigator, Yandex Go yoki Google Maps ochilib, to'yxonagacha bo'lgan yo'nalishni chizib beradi.
* **To'g'ridan-to'g'ri Qo'ng'iroq:** Administrator raqamiga to'g'ridan-to'g'ri telefon qilish (`tel:+998...`).
* **Toshkent Markaziga Qaytish (GPS Recenter):** Xaritani 1 teginishda markazlashtirish.

---

### 1.4. 🏰 4 Ta O'ziga Xos 3D Zallar (Venue3DScreen / Three.js WebGL)
* **1. Versal Grand Ballroom:** Neoklassik Oltin Saroy — 12 metrli gumbaz, 3 qavatli billur qandil, oltin taxt prezidium va qizil baxmal gilam.
* **2. Yakkasaroy Palace Luxury:** Fransuz Imperator Saroyi — ikkita aylanma marmar zina, oltin tutqichlar, 4 ta Korinf ustunlari, 2 ta qandil va sahnadagi 3D LED ekran.
* **3. Mumtoz Shaxona Zal:** Sharqona Islomiy Saroy — moviy firuza va oltin peshtoq (ayvon), markazda favvora, arabcha mis chiroqlar va naqshli sharqona gilam.
* **4. Oftob Shaxona (Sharshara):** Ochiq osmon ostidagi tabiat zali — 300 ta miltillovchi yulduzlar, sharshara qoyasi, suv havzasi va yorug'lik chiroqlari bilan bezatilgan yog'och sahna.
* **4 Xil Yoritish Rejimlari:** Kunduzgi quyosh, Tungi bazm, Oltin shou va Romantik Kelin (Binafsha) nuri.
* **360° Interaktiv Kamera:** Barmoq bilan erkin aylantirish, yaqinlashtirish (Pinch-to-zoom) va sahnani ko'zdan kechirish.

---

### 1.5. 👥 Stollar va Mehmonlar Sxemasi (TablePlannerScreen)
* **Kategoriya Bo'yicha Stollar:**
  * 👑 Prezidium (Kelin-Kuyov sahnasi)
  * 🧓 1-Stol: Bosh Qudalar & Ota-onalar
  * 👨‍👩‍👧‍👦 2-Stol: Tog'alar va qarindoshlar
  * 🕺 3-Stol: Kuyovning VIP jo'ralari
  * 💃 4-Stol: Kelinning dugonalari
  * 💼 5-Stol: Hamkasblar va hamkorlar
  * 🕌 6-Stol: Mahalla oqsoqollari va imom
  * ⚡ 7-Stol: Yoshlar stoli
* **Mehmon Qidiruvi:** Qidiruvga mehmon ismini yozganda u qaysi stolda o'tirganini darhol ko'rsatish.
* **Mehmon Qo'shish & Chiqarish:** Stol sig'imi to'lganini avtomatik nazorat qilish va yangi mehmon kiritish.
* **Umumiy Statistika:** Jami o'rinlar, band bo'lganlar, bo'sh joylar va to'ldirilganlik foizi.

---

### 1.6. 📋 To'y Tayyorgarligi Cheklisti (WeddingChecklistScreen)
* **Bosqichlar Bo'yicha Vazifalar:**
  * 📅 **30 Kun Oldin:** To'yxonani tasdiqlash, ZAGS arizasi, xonandalar shartnomasi, foto-video.
  * 💍 **15 Kun Oldin:** Taklifnomalarni tarqatish, kelin ko'ylak kiyib ko'rish, nikoh uzuklari, kortej.
  * ⏳ **3 Kun Oldin:** To'y torti, nahor oshi masalliqlari, stollarni yakuniy taqsimlash.
  * 🎁 **Sarpo & An'analar:** Kelin sarposi, kuyov to'ni, quda chaqiriq hadyalari.
* **Tebranish (Haptic Feedback) & Tabrik:** Vazifa bajarilganda telefon yoqimli tebranadi va tabrik oynasi chiqadi.
* **Yangi Vazifa Qo'shish:** O'ziga xos harajat va vazifani ro'yxatga kiritish.
* **Tayyorgarlik Foizi:** Real vaqtda to'y tayyorgarligi holatini ko'rsatuvchi progress bar.

---

### 1.7. 💌 Smart Raqamli Taklifnoma (DigitalInvitationScreen)
* **Shaxsiy Havola:** Har bir to'y uchun unikal sahifa: `tuybox.asilbek.tech/invite/jasurbek-madina-2026`.
* **RSVP Telegram Hisoblagichi:**
  * Qancha mehmon "Albatta boramiz" dedi.
  * Qancha mehmon "Bora olmayman" deb javob berdi.
  * Jami tasdiqlangan mehmonlar hisobi.
* **Telegramga 1-Klikda Yuborish:** Telefonning tizim ulashish oynasi orqali Telegramdagi barcha guruh va qarindoshlarga xabar yuborish.
* **Mehmonlar Tilaklari:** Taklifnomani ochgan mehmonlar qoldirgan samimiy tabriklar ro'yxati.

---

### 1.8. 💸 Onlayn To'yona Sovg'a Fondu (ToyonaPaymentScreen)
* **Crowdfunding Jamg'armasi:** Yosh oilaning asal oyi sayohati yoki ro'zg'or jamg'armasi uchun maqsadli summa va to'plangan mablag' ko'rsatkichi.
* **Tezkor Summali Tugmalar:** 100 ming, 200 ming, 500 ming, 1 mln, 2 mln so'm yoki ixtiyoriy summa kiritish.
* **To'lov Provayderlari:** Click Uz va Payme orqali to'g'ridan-to'g'ri to'yona pulini o'tkazish.
* **Tilak va Ism Kiritish:** Pul jo'natuvchi o'z ismi va tabrigini yozib qoldirishi mumkin.

---

### 1.9. 👤 Profil va Xizmatlar Markazi (ProfileScreen)
* **Dual Rejim Boshqaruvi:** Kelin / Kuyov profilini sozlash.
* **Tezkor Havolalar:** Sevimli to'yxonalar, Saqlangan xizmatlar, Xarita, To'yona va Stollar rejasi.
* **Qo'llab-quvvatlash:** Telegram yordamchi botiga to'g'ridan-to'g'ri murojaat qilish.

---

## 🌐 2. VEB-PLATFORMA VA LANDING SAHIFALAR

### 2.1. Bosh Landing Sahifa (`/`)
* Hashamatli 3D tilla uzuklar va olmos animatsiyasi (Three.js WebGL).
* TuyBox ekotizimi imkoniyatlari taqdimoti.
* Android APK ilovasini to'g'ridan-to'g'ri yuklab olish havolasi (`/download`).

### 2.2. Pitch Deck & 6 Oylik Reja Sahifasi (`/pitch`)
* **Jonli Havola:** [https://tuybox.asilbek.tech/pitch](https://tuybox.asilbek.tech/pitch)
* **Bozor Tahlili:** $2.5 Milliardlik to'y bozori, 350,000+ nikohlar, TAM/SAM/SOM diagrammalari.
* **3 Qavatli Tizim Falsafasi:** Avval soddalik, keyin yordamchi, oxirida 3D/Stollar.
* **Interaktiv 6 Oylik Reja:** 1-oydan 6-oygacha bosiladigan tablar, vazifalar va aniq KPI ko'rsatkichlari.
* **5 Ta Daromad Manbai:** VIP Obuna, Bronlash komissiyasi, VIP Taklifnomalar, 3D Skanerlash, FinTech to'yona.

### 2.3. Mehmonlar Uchun Ochiq Taklifnoma Sahifasi (`/invite/{slug}`)
* Telefon va kompyuterda ochiladigan shaxsiy to'y sahifasi.
* Orqa fonda to'y musiqasi, animatsiyali fotosuratlar va to'yxona lokatsiyasi.
* Mehmon javob berish tugmalari ("Boraman" / "Bora olmayman").

---

## ⚙️ 3. BACKEND VA ARXITEKTURA

1. **FastAPI Asinxron Dvigateli:** Yuqori tezlikdagi API so'rovlar, 1 soniyadan kam javob berish vaqti.
2. **Real-Vaqtli WebSocketlar (`/ws`):** Kalendar yangilanishlari, yangi sharhlar va buyurtma holatini jonli tarqatish.
3. **Django Boshqaruv Paneli:** To'yxona xizmatlari, kategoriyalar, narxlar va foydalanuvchilarni qulay tahrirlash.
4. **PostgreSQL & Ma'lumotlar Bazasi:** Bronlar, taklifnomalar, to'lovlar va foydalanuvchilar ma'lumotlari xavfsiz saqlanishi.
5. **CI/CD & Avtomatik Deploy:**
   * GitHub Actions orqali har safar kod o'zgarganda avtomatik Release APK yig'ish (`build-apk.yml`).
   * Serverga asinxron backendni avtomat deploy qilish (`deploy-backend.yml`).
