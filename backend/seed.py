import asyncio
from app.db.database import AsyncSessionLocal, engine, Base
from app.models.user import User, VendorProfile
from app.models.service import EventType, ServiceCategory, Service, ServicePackage, ServiceMedia
from app.models.calendar import ServiceCalendarDay
from datetime import date, timedelta

async def seed_data():
    print("Bazani tozalash va jadvallarni yaratish...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # 1. Event Types
        nikoh = EventType(name="Nikoh To'yi", slug="nikoh-toyi", icon_url="💍", sort_order=1)
        fotiha = EventType(name="Fotiha To'yi", slug="fotiha-toyi", icon_url="💐", sort_order=2)
        sunnat = EventType(name="Sunnat To'y", slug="sunnat-toy", icon_url="👑", sort_order=3)
        beshik = EventType(name="Beshik To'y", slug="beshik-toy", icon_url="👶", sort_order=4)
        session.add_all([nikoh, fotiha, sunnat, beshik])
        await session.flush()

        # 2. Service Categories
        cat_venue = ServiceCategory(name="To'yxonalar va Restoranlar", slug="toyxonalar", event_type_id=nikoh.id)
        cat_music = ServiceCategory(name="San'atkorlar va Xonandalar", slug="sanatkorlar", event_type_id=nikoh.id)
        cat_host = ServiceCategory(name="Boshlovchi va Tamadalar", slug="boshlovchilar", event_type_id=nikoh.id)
        cat_photo = ServiceCategory(name="Foto va Video Studiyalar", slug="foto-video", event_type_id=nikoh.id)
        cat_decor = ServiceCategory(name="Dekoratsiya va Gullar", slug="dekoratsiya", event_type_id=nikoh.id)
        cat_auto = ServiceCategory(name="Kortej va Avtomobillar", slug="kortej", event_type_id=nikoh.id)
        session.add_all([cat_venue, cat_music, cat_host, cat_photo, cat_decor, cat_auto])
        await session.flush()

        # 3. Vendor User & Profile
        user1 = User(phone="+998901112233", role="vendor", first_name="Versal", last_name="Palace", is_phone_verified=True)
        session.add(user1)
        await session.flush()

        v_profile1 = VendorProfile(
            user_id=user1.id,
            business_name="Versal Grand Palace",
            slug="versal-grand-palace",
            bio="Toshkent markazidagi eng hashamatli to'yxona. 500 kishigacha bo'lgan to'ylar uchun mo'ljallangan.",
            is_verified=True,
            rating_avg=4.95,
            reviews_count=184,
            experience_years=10
        )
        session.add(v_profile1)
        await session.flush()

        # 4. Service 1: To'yxona
        s1 = Service(
            vendor_id=v_profile1.id,
            category_id=cat_venue.id,
            title="Versal Grand Ballroom (500 kishi)",
            slug="versal-grand-ballroom",
            description="Kristal qandillar, panoramali akustika va VIP to'y dasturxoni.",
            base_price=45000000.0,
            city="Toshkent",
            district="Yakkasaroy",
            address_line="Shota Rustaveli ko'chasi 45",
            latitude=41.2858,
            longitude=69.2520,
            rating_avg=4.95,
            reviews_count=184
        )
        session.add(s1)
        await session.flush()

        # Paketlar
        p1 = ServicePackage(service_id=s1.id, name="Standart Paket", price=45000000.0, description="Zal ijarasi + bazaviy chiroq va ovoz")
        p2 = ServicePackage(service_id=s1.id, name="VIP Oltin Paket", price=65000000.0, description="Zal + to'liq LED ekranlar + VIP xizmat")
        session.add_all([p1, p2])

        # Media
        m1 = ServiceMedia(service_id=s1.id, media_url="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200", is_cover=True)
        session.add(m1)

        # Kalendar kunlari (Keyingi 30 kun)
        today = date.today()
        for i in range(30):
            d = today + timedelta(days=i)
            # Ba'zi kunlarni band qilib belgilaymiz
            st = "booked" if i in [3, 7, 14, 21] else "work"
            session.add(ServiceCalendarDay(
                service_id=s1.id,
                calendar_date=d,
                status=st,
                time_slot="evening_party"
            ))

        # 5. Service 2: Xonanda
        s2 = Service(
            vendor_id=v_profile1.id,
            category_id=cat_music.id,
            title="Jonli Ijro Ansambli va Xonandalar Guruhi",
            slug="jonli-ijro-ansambli",
            description="Milliy va zamonaviy xit taronalar, to'y shousi va professional sozandalar.",
            base_price=15000000.0,
            city="Toshkent",
            rating_avg=4.90,
            reviews_count=92
        )
        session.add(s2)
        await session.flush()

        m2 = ServiceMedia(service_id=s2.id, media_url="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200", is_cover=True)
        session.add(m2)

        await session.commit()
        print("✅ Demo ma'lumotlar bazaga muvaffaqiyatli yuklandi!")

if __name__ == "__main__":
    asyncio.run(seed_data())
