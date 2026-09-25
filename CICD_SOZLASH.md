# 🚀 TuyBox GitHub CI/CD — Sozlash Qo'llanmasi

## Muammo nima edi?
APK fayli **31 bayt** edi — haqiqiy ilova emas, bo'sh placeholder.
Haqiqiy APK uchun Expo/React Native build qilish kerak.

## Yechim: GitHub Actions + EAS (Expo Application Services)
---

## 📋 Qadamlar (1 marta bajarish kifoya!)

### 1-qadam: Expo akkaunt yaratish
expo.dev ga kiring va bepul ro'yxatdan o'ting.

### 2-qadam: Expo Token olish
1. expo.dev → Settings → Access Tokens
2. "Create Token" bosing → nomini "github-actions" qo'ying
3. Tokenni nusxalab oling

### 3-qadam: GitHub Secrets sozlash
https://github.com/ASILBEKasilbek/marosimlar
→ Settings → Secrets and variables → Actions → New repository secret

| Secret Nomi  | Qiymati                    |
|---|---|
| EXPO_TOKEN   | (expo.dev dan olgan token) |
| SERVER_SSH_KEY | (quyidagi private key)   |

SERVER_SSH_KEY:
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACBAcpJ09Ofey7eXEuIa/EtshrqtGxcyZihKoOU1O38EFAAAAJixfkDCsX5A
wgAAAAtzc2gtZWQyNTUxOQAAACBAcpJ09Ofey7eXEuIa/EtshrqtGxcyZihKoOU1O38EFA
AAAECoaCJ2Synp254G9i8cfcMct01T66fa4WTTyJTJKvFwdUByknT0597Lt5cS4hr8S2yG
uq0bFzJmKEqg5TU7fwQUAAAAFWdpdGh1Yi1hY3Rpb25zQHR1eWJveA==
-----END OPENSSH PRIVATE KEY-----

### 4-qadam: EAS Loyihani ulash (1 marta terminal da)
cd /Users/apple/Desktop/Tuyxona/mobile
eas login
eas init

### 5-qadam: Push qiling — hammasi avtomatik bo'ladi!
cd /Users/apple/Desktop/Tuyxona
git add .
git commit -m "feat: TuyBox CI/CD qoshildi"
git push origin main
