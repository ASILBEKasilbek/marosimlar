import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Share,
  Platform,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

interface Venue3DItem {
  id: string;
  name: string;
  city: string;
  capacity: string;
  pricePerDay: string;
  rating: number;
  reviews: number;
  features: string[];
  description: string;
  decorStyle: string;
}

const VENUES_3D: Venue3DItem[] = [
  {
    id: 'versal',
    name: 'Versal Grand Ballroom',
    city: 'Toshkent, Yakkasaroy',
    capacity: '500 - 700 kishi',
    pricePerDay: "48,000,000 so'm",
    rating: 4.96,
    reviews: 210,
    features: ['Kristal Lyustra', '3D LED Ekran', "Og'ir Tutun", 'VIP Prezidium', '120 Mashina Parking'],
    description: 'Neoklassik qirollik uslubidagi hashamatli zal. 12 metr balandlikdagi gumbaz va oltin qoplama dekoratsiya.',
    decorStyle: 'Oltin & Oq Marmar',
  },
  {
    id: 'yakkasaroy',
    name: 'Yakkasaroy Palace Luxury',
    city: "Toshkent, Mirzo Ulug'bek",
    capacity: '600 - 850 kishi',
    pricePerDay: "65,000,000 so'm",
    rating: 4.98,
    reviews: 340,
    features: ['Marmar Zinapoyalar', '4 Ta Rim Ustunlari', '2 Ta Kristal Qandil', '200 Mashina Parking', 'Akustik Zallar'],
    description: "Fransuz imperatorlik saroyi uslubidagi hashamatli to'yxona majmuasi. Ikkita aylanma marmar zinapoya, Rim ustunlari va binafsha yorug'lik.",
    decorStyle: 'Imperial Royal & Binafsha',
  },
  {
    id: 'mumtoz',
    name: 'Mumtoz Shaxona Zal',
    city: 'Toshkent, Chilonzor',
    capacity: '400 - 550 kishi',
    pricePerDay: "38,000,000 so'm",
    rating: 4.88,
    reviews: 145,
    features: ['Milliy Ganchkorlik', 'Markaziy Favvora', 'Sharqona Fonuslar', "Bog' Manzarasi"],
    description: "Sharqona nozik ganchkorlik naqshlari, firuza gumbazli arka, markaziy marmar favvora va qadimiy jilodor fonuslar uyg'unligi.",
    decorStyle: 'Sharqona Mumtoz & Firuza',
  },
  {
    id: 'oftob',
    name: 'Oftob Shaxona: Ochiq Osmon & Sharshara',
    city: 'Toshkent, Qibray / Tabiat',
    capacity: '700 - 1000 kishi',
    pricePerDay: "55,000,000 so'm",
    rating: 4.99,
    reviews: 420,
    features: ['Oqib Turuvchi Sharshara', 'Yulduzli Ochiq Osmon', 'Suv ustidagi Sahna', 'Lazer & Chiroq Shousi', '250 Mashina Parking'],
    description: "Tabiat qo'ynida, oqshomgi ochiq osmon ostidagi to'yxona. 300 ta yulduz jilosi, tog' sharsharasi va suv ustidagi suzuvchi sahna.",
    decorStyle: 'Ochiq Osmon & Sharshara',
  }
];

export const Venue3DScreen: React.FC = () => {
  const { colors, isKelin } = useAppTheme();
  const [selectedVenue, setSelectedVenue] = useState<Venue3DItem>(VENUES_3D[0]);
  const [lightMode, setLightMode] = useState<'evening' | 'spotlight' | 'disco' | 'kelin'>('evening');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeCameraView, setActiveCameraView] = useState<'full' | 'stage' | 'table'>('full');
  const [isWebviewLoading, setIsWebviewLoading] = useState<boolean>(true);
  const webViewRef = useRef<WebView>(null);

  // Send control command to 3D WebView
  const sendTo3D = (action: string, payload: any) => {
    const js = `window.handleAppEvent && window.handleAppEvent('${action}', ${JSON.stringify(payload)}); true;`;
    webViewRef.current?.injectJavaScript(js);
  };

  const handleLightChange = (mode: 'evening' | 'spotlight' | 'disco' | 'kelin') => {
    setLightMode(mode);
    sendTo3D('setLight', mode);
  };

  const handleCameraChange = (view: 'full' | 'stage' | 'table') => {
    setActiveCameraView(view);
    sendTo3D('setCamera', view);
  };

  const toggleRotate = () => {
    const next = !autoRotate;
    setAutoRotate(next);
    sendTo3D('setRotate', next);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `TuyBox 3D Zallar orqali "${selectedVenue.name}"ni ko'ring! 360° interaktiv model: https://tuybox.asilbek.tech`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleBook = () => {
    Alert.alert(
      "3D Zal Bo'yicha Bron 📅",
      `"${selectedVenue.name}" zali bo'yicha ma'muriyatga bron so'rovingiz yuborildi. Ular to'y sanasi bo'yicha siz bilan bog'lanishadi!`
    );
  };

  // Switch to Kelin lighting when in Kelin mode
  useEffect(() => {
    if (isKelin) {
      handleLightChange('kelin');
    } else if (lightMode === 'kelin') {
      handleLightChange('evening');
    }
  }, [isKelin]);

  // Ultra-realistic 3D WebGL Three.js Scene with 4 distinct wedding environments
  const threeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html { width: 100%; height: 100%; overflow: hidden; background: #070B14; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
          #canvas-container { width: 100%; height: 100%; position: relative; }
          #loader {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            background: #070B14; z-index: 10; color: #FFDF73; font-size: 14px;
            transition: opacity 0.5s ease;
          }
          .spinner {
            width: 44px; height: 44px; border: 3px solid rgba(212,175,55,0.2);
            border-top: 3px solid #D4AF37; border-radius: 50%;
            animation: spin 1s linear infinite; margin-bottom: 12px;
          }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .badge-3d {
            position: absolute; top: 12px; left: 14px; background: rgba(7, 11, 20, 0.75);
            border: 1px solid rgba(212, 175, 55, 0.4); padding: 4px 10px; border-radius: 20px;
            color: #FFDF73; font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
            backdrop-filter: blur(8px); pointer-events: none;
          }
          .touch-hint {
            position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
            background: rgba(7, 11, 20, 0.65); border: 1px solid rgba(255,255,255,0.1);
            color: #94A3B8; font-size: 11px; padding: 4px 12px; border-radius: 12px;
            pointer-events: none; backdrop-filter: blur(6px); white-space: nowrap;
          }
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
      </head>
      <body>
        <div id="canvas-container">
          <div id="loader">
            <div class="spinner"></div>
            <div>3D Zal yuklanmoqda...</div>
          </div>
          <div class="badge-3d">✦ TuyBox 3D Realtime 60FPS</div>
          <div class="touch-hint">👆 Aylantirish uchun suring | 🔍 Masshtab</div>
        </div>

        <script>
          const container = document.getElementById('canvas-container');
          const loader = document.getElementById('loader');

          // Scene & Camera
          const scene = new THREE.Scene();
          scene.background = new THREE.Color(0x070B14);
          scene.fog = new THREE.FogExp2(0x070B14, 0.025);

          const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 120);
          camera.position.set(0, 10, 22);

          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.15;
          container.appendChild(renderer.domElement);

          // Orbit Controls
          const controls = new THREE.OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          controls.maxPolarAngle = Math.PI / 2 - 0.02;
          controls.minDistance = 4;
          controls.maxDistance = 40;
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.6;
          controls.target.set(0, 2.5, 0);

          // Shared Materials
          const goldMaterial = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.22 });
          const whiteSilk = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.4 });
          const marbleWhite = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.18, metalness: 0.2 });
          const royalPurple = new THREE.MeshStandardMaterial({ color: 0x6b21a8, roughness: 0.6 });
          const turquoiseMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.25, metalness: 0.6 });
          const darkFloorMat = new THREE.MeshStandardMaterial({ color: 0x111624, roughness: 0.15, metalness: 0.35 });

          // Lights
          const ambientLight = new THREE.AmbientLight(0xffeedd, 0.45);
          scene.add(ambientLight);

          const chandelierLight = new THREE.PointLight(0xffdf73, 2.2, 30);
          chandelierLight.position.set(0, 8, 0);
          chandelierLight.castShadow = true;
          scene.add(chandelierLight);

          const stageSpot = new THREE.SpotLight(0xfff5e6, 3.5);
          stageSpot.position.set(0, 12, 6);
          stageSpot.target.position.set(0, 2.5, -8);
          stageSpot.angle = Math.PI / 5;
          stageSpot.penumbra = 0.4;
          stageSpot.castShadow = true;
          scene.add(stageSpot);
          scene.add(stageSpot.target);

          const discoLight = new THREE.PointLight(0xec4899, 0, 25);
          discoLight.position.set(0, 6, 0);
          scene.add(discoLight);

          // ─────────────────────────────────────────────
          // 1. VERSAL GRAND BALLROOM (Group)
          // ─────────────────────────────────────────────
          const versalGroup = new THREE.Group();

          // Floor
          const versalFloor = new THREE.Mesh(new THREE.PlaneGeometry(32, 32), darkFloorMat);
          versalFloor.rotation.x = -Math.PI / 2;
          versalFloor.receiveShadow = true;
          versalGroup.add(versalFloor);

          // Dance Floor (Round)
          const versalDance = new THREE.Mesh(new THREE.CircleGeometry(6, 48), new THREE.MeshStandardMaterial({ color: 0x1a233a, roughness: 0.1, metalness: 0.5 }));
          versalDance.rotation.x = -Math.PI / 2;
          versalDance.position.y = 0.02;
          versalDance.receiveShadow = true;
          versalGroup.add(versalDance);

          // Gold border
          const versalRing = new THREE.Mesh(new THREE.RingGeometry(5.9, 6.1, 48), goldMaterial);
          versalRing.rotation.x = -Math.PI / 2;
          versalRing.position.y = 0.03;
          versalGroup.add(versalRing);

          // Red Aisle Carpet
          const versalCarpet = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 16), new THREE.MeshStandardMaterial({ color: 0x6b1d2f, roughness: 0.9 }));
          versalCarpet.rotation.x = -Math.PI / 2;
          versalCarpet.position.set(0, 0.025, 0);
          versalGroup.add(versalCarpet);

          // Stage & Arch
          const vStage = new THREE.Mesh(new THREE.BoxGeometry(14, 0.8, 6), new THREE.MeshStandardMaterial({ color: 0x1e2738, roughness: 0.3 }));
          vStage.position.set(0, 0.4, -8);
          versalGroup.add(vStage);

          const vArch = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.12, 16, 64, Math.PI), goldMaterial);
          vArch.position.set(0, 3.8, -9.8);
          versalGroup.add(vArch);

          // Presidium Table & Chairs
          const vTable = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.0, 1.2), whiteSilk);
          vTable.position.set(0, 1.3, -8.6);
          versalGroup.add(vTable);

          for (let x of [-0.7, 0.7]) {
            const chair = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 1.2, 16), goldMaterial);
            chair.position.set(x, 1.8, -9.2);
            versalGroup.add(chair);
          }

          // Versal Tables
          const vTablePositions = [[-7, 3], [-8, -2], [-6, -6], [7, 3], [8, -2], [6, -6], [-3, 7], [3, 7]];
          vTablePositions.forEach(pos => {
            const t = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.8, 24), whiteSilk);
            t.position.set(pos[0], 0.4, pos[1]);
            versalGroup.add(t);
            const cp = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.7, 12), goldMaterial);
            cp.position.set(pos[0], 1.15, pos[1]);
            versalGroup.add(cp);
          });

          // Versal Grand Chandelier
          const vChandelier = new THREE.Group();
          vChandelier.position.set(0, 8, 0);
          for (let r of [2.2, 1.5, 0.8]) {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.06, 12, 32), goldMaterial);
            ring.rotation.x = Math.PI / 2;
            ring.position.y = -(2.5 - r);
            vChandelier.add(ring);
          }
          versalGroup.add(vChandelier);
          scene.add(versalGroup);

          // ─────────────────────────────────────────────
          // 2. YAKKASAROY PALACE LUXURY (Group)
          // ─────────────────────────────────────────────
          const yakkasaroyGroup = new THREE.Group();
          yakkasaroyGroup.visible = false;

          // White Carrara Marble Floor
          const yFloor = new THREE.Mesh(new THREE.PlaneGeometry(34, 34), marbleWhite);
          yFloor.rotation.x = -Math.PI / 2;
          yFloor.receiveShadow = true;
          yakkasaroyGroup.add(yFloor);

          // Grand French Stage
          const yStage = new THREE.Mesh(new THREE.BoxGeometry(16, 1.0, 7), new THREE.MeshStandardMaterial({ color: 0x24143a, roughness: 0.2 }));
          yStage.position.set(0, 0.5, -8);
          yakkasaroyGroup.add(yStage);

          // Twin Winding Spiral Grand Staircases (Left and Right)
          for (let side of [-1, 1]) {
            const stairGroup = new THREE.Group();
            for (let step = 0; step < 8; step++) {
              const sMesh = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.14, 0.8), goldMaterial);
              sMesh.position.set(side * (7.5 + step * 0.4), step * 0.12, -7.5 + step * 0.5);
              sMesh.rotation.y = side * (step * 0.1);
              stairGroup.add(sMesh);
            }
            yakkasaroyGroup.add(stairGroup);
          }

          // 4 Roman Columns
          for (let x of [-6, -2, 2, 6]) {
            const col = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.45, 9, 24), marbleWhite);
            col.position.set(x, 4.5, -11.5);
            yakkasaroyGroup.add(col);

            const colCap = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.4, 1.1), goldMaterial);
            colCap.position.set(x, 8.8, -11.5);
            yakkasaroyGroup.add(colCap);
          }

          // 3D LED Digital Wall Backdrop
          const ledWall = new THREE.Mesh(
            new THREE.BoxGeometry(12, 6, 0.3),
            new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.1, emissive: 0x4c1d95, emissiveIntensity: 0.6 })
          );
          ledWall.position.set(0, 4.0, -11.2);
          yakkasaroyGroup.add(ledWall);

          // Couple Presidium with Royal Violet Velvet
          const yPresidium = new THREE.Mesh(new THREE.BoxGeometry(4.0, 1.1, 1.4), whiteSilk);
          yPresidium.position.set(0, 1.5, -7.5);
          yakkasaroyGroup.add(yPresidium);

          // Twin Crystal Chandeliers
          for (let cx of [-4, 4]) {
            const dChan = new THREE.Group();
            dChan.position.set(cx, 8, 0);
            for (let r of [1.6, 1.0]) {
              const rMesh = new THREE.Mesh(new THREE.TorusGeometry(r, 0.05, 12, 32), goldMaterial);
              rMesh.rotation.x = Math.PI / 2;
              rMesh.position.y = -(2 - r);
              dChan.add(rMesh);
            }
            yakkasaroyGroup.add(dChan);
          }
          scene.add(yakkasaroyGroup);

          // ─────────────────────────────────────────────
          // 3. MUMTOZ SHAXONA ZAL (Group - Eastern Palace)
          // ─────────────────────────────────────────────
          const mumtozGroup = new THREE.Group();
          mumtozGroup.visible = false;

          // Persian Silk Carpet Floor
          const mFloor = new THREE.Mesh(
            new THREE.PlaneGeometry(32, 32),
            new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 })
          );
          mFloor.rotation.x = -Math.PI / 2;
          mumtozGroup.add(mFloor);

          // Center Persian Rug
          const mRug = new THREE.Mesh(
            new THREE.PlaneGeometry(14, 18),
            new THREE.MeshStandardMaterial({ color: 0x831843, roughness: 0.8 })
          );
          mRug.rotation.x = -Math.PI / 2;
          mRug.position.set(0, 0.02, 0);
          mumtozGroup.add(mRug);

          // Central Working Marble Water Fountain
          const fBasin = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.8, 0.6, 32), marbleWhite);
          fBasin.position.set(0, 0.3, 0);
          mumtozGroup.add(fBasin);

          const fPool = new THREE.Mesh(
            new THREE.CircleGeometry(2.3, 32),
            new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.05, metalness: 0.8 })
          );
          fPool.rotation.x = -Math.PI / 2;
          fPool.position.set(0, 0.55, 0);
          mumtozGroup.add(fPool);

          const fPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 2.0, 16), goldMaterial);
          fPillar.position.set(0, 1.2, 0);
          mumtozGroup.add(fPillar);

          // Eastern Islamic Pointed Portal (Iwan / Ganchkorlik)
          const archFrame = new THREE.Mesh(new THREE.BoxGeometry(12, 8, 0.6), turquoiseMat);
          archFrame.position.set(0, 4.5, -9);
          mumtozGroup.add(archFrame);

          const archDome = new THREE.Mesh(new THREE.ConeGeometry(3.5, 4, 16), goldMaterial);
          archDome.position.set(0, 9.5, -9);
          mumtozGroup.add(archDome);

          // Moroccan Hanging Brass Lanterns
          for (let lx of [-6, -2, 2, 6]) {
            const lant = new THREE.Mesh(new THREE.OctahedronGeometry(0.5), goldMaterial);
            lant.position.set(lx, 6.5, -3);
            mumtozGroup.add(lant);
          }
          scene.add(mumtozGroup);

          // ─────────────────────────────────────────────
          // 4. OFTOB SHAXONA (Group - Outdoor Waterfall & Sky)
          // ─────────────────────────────────────────────
          const oftobGroup = new THREE.Group();
          oftobGroup.visible = false;

          // 300 Twinkling Night Stars
          const starGeo = new THREE.BufferGeometry();
          const starCount = 300;
          const starPos = new Float32Array(starCount * 3);
          for (let i = 0; i < starCount * 3; i += 3) {
            starPos[i] = (Math.random() - 0.5) * 80;
            starPos[i + 1] = Math.random() * 30 + 8;
            starPos[i + 2] = (Math.random() - 0.5) * 80;
          }
          starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
          const starField = new THREE.Points(
            starGeo,
            new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, transparent: true, opacity: 0.9 })
          );
          oftobGroup.add(starField);

          // Giant Rocky Cliff behind stage
          const cliff = new THREE.Mesh(
            new THREE.BoxGeometry(22, 16, 4),
            new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.95 })
          );
          cliff.position.set(0, 7, -14);
          oftobGroup.add(cliff);

          // Cascading Waterfall
          const waterfall = new THREE.Mesh(
            new THREE.PlaneGeometry(12, 14, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.05, metalness: 0.8, transparent: true, opacity: 0.85 })
          );
          waterfall.position.set(0, 7, -11.9);
          oftobGroup.add(waterfall);

          // Reflective Water Pool around stage
          const pool = new THREE.Mesh(
            new THREE.RingGeometry(6, 16, 32),
            new THREE.MeshStandardMaterial({ color: 0x0c4a6e, roughness: 0.05, metalness: 0.9 })
          );
          pool.rotation.x = -Math.PI / 2;
          pool.position.y = 0.03;
          oftobGroup.add(pool);

          // Floating Wooden Stage Deck
          const deck = new THREE.Mesh(
            new THREE.CylinderGeometry(5.5, 5.5, 0.6, 32),
            new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 })
          );
          deck.position.set(0, 0.35, -5);
          oftobGroup.add(deck);

          // Fairy Lights Arc
          const fairyArc = new THREE.Mesh(
            new THREE.TorusGeometry(3.6, 0.06, 12, 32, Math.PI),
            new THREE.MeshBasicMaterial({ color: 0xfef08a })
          );
          fairyArc.position.set(0, 3.8, -5);
          oftobGroup.add(fairyArc);
          scene.add(oftobGroup);

          // Animation Loop
          let clock = new THREE.Clock();
          function animate() {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();
            controls.update();

            // Chandelier animation
            vChandelier.rotation.y = time * 0.08;

            // Water animation for waterfall
            if (oftobGroup.visible) {
              waterfall.position.y = 7 + Math.sin(time * 3) * 0.1;
            }

            // Disco light effects
            if (discoLight.intensity > 0) {
              discoLight.position.x = Math.sin(time * 2) * 6;
              discoLight.position.z = Math.cos(time * 2) * 6;
            }

            renderer.render(scene, camera);
          }
          animate();

          // Hide Loader
          setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 400);
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'LOADED' }));
            }
          }, 500);

          // App Events Bridge
          window.handleAppEvent = function(action, payload) {
            if (action === 'setLight') {
              if (payload === 'evening') {
                chandelierLight.intensity = 2.2;
                chandelierLight.color.setHex(0xffdf73);
                stageSpot.intensity = 3.5;
                stageSpot.color.setHex(0xfff5e6);
                discoLight.intensity = 0;
                ambientLight.color.setHex(0xffeedd);
              } else if (payload === 'spotlight') {
                chandelierLight.intensity = 0.5;
                stageSpot.intensity = 6.0;
                stageSpot.color.setHex(0xffffff);
                discoLight.intensity = 0;
                ambientLight.color.setHex(0x334466);
              } else if (payload === 'disco') {
                chandelierLight.intensity = 0.8;
                stageSpot.intensity = 1.8;
                discoLight.intensity = 4.5;
                discoLight.color.setHex(0xec4899);
                ambientLight.color.setHex(0x111122);
              } else if (payload === 'kelin') {
                // Binafsha / Kelin Rejimi
                chandelierLight.intensity = 2.0;
                chandelierLight.color.setHex(0xd8b4fe);
                stageSpot.intensity = 4.8;
                stageSpot.color.setHex(0xf0abfc);
                discoLight.intensity = 2.5;
                discoLight.color.setHex(0xa855f7);
                ambientLight.color.setHex(0x3b0764);
              }
            } else if (action === 'setRotate') {
              controls.autoRotate = !!payload;
            } else if (action === 'setCamera') {
              if (payload === 'full') gsapFly(0, 10, 22, 0, 2.5, 0);
              else if (payload === 'stage') gsapFly(0, 3.5, -1, 0, 2.8, -8);
              else if (payload === 'table') gsapFly(-5, 2.5, 6, -7, 1.2, 3);
            } else if (action === 'setVenue') {
              versalGroup.visible = (payload === 'versal');
              yakkasaroyGroup.visible = (payload === 'yakkasaroy');
              mumtozGroup.visible = (payload === 'mumtoz');
              oftobGroup.visible = (payload === 'oftob');

              if (payload === 'oftob') {
                scene.background.setHex(0x040816);
                ambientLight.color.setHex(0x93c5fd);
                stageSpot.color.setHex(0xffffff);
              } else if (payload === 'yakkasaroy') {
                scene.background.setHex(0x0a0614);
                ambientLight.color.setHex(0xd8b4fe);
                stageSpot.color.setHex(0xf3e8ff);
              } else if (payload === 'mumtoz') {
                scene.background.setHex(0x060b14);
                ambientLight.color.setHex(0xfef08a);
                stageSpot.color.setHex(0x38bdf8);
              } else {
                scene.background.setHex(0x070B14);
                ambientLight.color.setHex(0xffeedd);
                stageSpot.color.setHex(0xfff5e6);
              }
            }
          };

          function gsapFly(px, py, pz, tx, ty, tz) {
            const startPos = camera.position.clone();
            const endPos = new THREE.Vector3(px, py, pz);
            const startTar = controls.target.clone();
            const endTar = new THREE.Vector3(tx, ty, tz);
            let t = 0;
            const interval = setInterval(() => {
              t += 0.05;
              if (t >= 1) {
                camera.position.copy(endPos);
                controls.target.copy(endTar);
                clearInterval(interval);
              } else {
                camera.position.lerpVectors(startPos, endPos, t);
                controls.target.lerpVectors(startTar, endTar, t);
              }
            }, 16);
          }

          window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={[styles.container, { backgroundColor: colors.bgBase }]}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View>
          <View style={styles.brandRow}>
            <Text style={[styles.badgeGold, { color: colors.primaryLight, borderColor: colors.borderColor }]}>
              {isKelin ? '🌸 3D KELIN ZALLARI' : '3D VIRTUAL TOUR'}
            </Text>
            <View style={[styles.liveIndicator, { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}>
              <View style={[styles.liveDot, { backgroundColor: colors.primaryLight }]} />
              <Text style={[styles.liveText, { color: colors.primaryLight }]}>INTERAKTIV</Text>
            </View>
          </View>
          <Text style={[styles.headerTitle, { color: colors.primaryLight }]}>
            {selectedVenue.name.split(' (')[0]}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.iconCircleBtn, { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}
          onPress={handleShare}
        >
          <Ionicons name="share-social-outline" size={19} color={colors.primaryLight} />
        </TouchableOpacity>
      </View>

      {/* Venues Selector Carousel */}
      <View style={styles.venuePickerWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venuePickerScroll}>
          {VENUES_3D.map((item) => {
            const isSelected = item.id === selectedVenue.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.venuePill,
                  { borderColor: colors.borderColor, backgroundColor: colors.bgCard },
                  isSelected && [
                    styles.venuePillActive,
                    { borderColor: colors.primaryLight, backgroundColor: colors.badgeBg },
                  ],
                ]}
                onPress={() => {
                  setSelectedVenue(item);
                  sendTo3D('setVenue', item.id);
                }}
              >
                <Ionicons
                  name={isSelected ? "business" : "business-outline"}
                  size={14}
                  color={isSelected ? colors.primaryLight : '#94A3B8'}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.venuePillText,
                    isSelected && { color: colors.primaryLight, fontWeight: '800' },
                  ]}
                >
                  {item.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 3D WebGL Canvas Area */}
      <View style={styles.canvasContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: threeHtml }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="always"
          onMessage={(e) => {
            try {
              const data = JSON.parse(e.nativeEvent.data);
              if (data.type === 'LOADED') {
                setIsWebviewLoading(false);
                sendTo3D('setVenue', selectedVenue.id);
                if (isKelin) sendTo3D('setLight', 'kelin');
              }
            } catch (err) {}
          }}
        />

        {/* 3D Floating Overlays Controls */}
        <View style={styles.controlsOverlay}>
          {/* Camera View Switcher */}
          <View style={[styles.camControls, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}>
            <TouchableOpacity
              style={[styles.camBtn, activeCameraView === 'full' && [styles.camBtnActive, { backgroundColor: colors.primaryLight }]]}
              onPress={() => handleCameraChange('full')}
            >
              <Ionicons name="scan-outline" size={13} color={activeCameraView === 'full' ? (isKelin ? '#FFF' : '#070B14') : '#FFF'} />
              <Text style={[styles.camBtnText, activeCameraView === 'full' && { color: isKelin ? '#FFF' : '#070B14' }]}>Umumiy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.camBtn, activeCameraView === 'stage' && [styles.camBtnActive, { backgroundColor: colors.primaryLight }]]}
              onPress={() => handleCameraChange('stage')}
            >
              <Ionicons name="sparkles-outline" size={13} color={activeCameraView === 'stage' ? (isKelin ? '#FFF' : '#070B14') : '#FFF'} />
              <Text style={[styles.camBtnText, activeCameraView === 'stage' && { color: isKelin ? '#FFF' : '#070B14' }]}>Sahna</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.camBtn, activeCameraView === 'table' && [styles.camBtnActive, { backgroundColor: colors.primaryLight }]]}
              onPress={() => handleCameraChange('table')}
            >
              <Ionicons name="restaurant-outline" size={13} color={activeCameraView === 'table' ? (isKelin ? '#FFF' : '#070B14') : '#FFF'} />
              <Text style={[styles.camBtnText, activeCameraView === 'table' && { color: isKelin ? '#FFF' : '#070B14' }]}>VIP Stol</Text>
            </TouchableOpacity>
          </View>

          {/* Right Action Icons (Rotate + Light Mode) */}
          <View style={styles.rightFloatingTools}>
            <TouchableOpacity
              style={[styles.toolIconBtn, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}
              onPress={toggleRotate}
            >
              <MaterialCommunityIcons
                name={autoRotate ? "axis-z-rotate-clockwise" : "axis-arrow"}
                size={20}
                color={autoRotate ? colors.primaryLight : '#94A3B8'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toolIconBtn, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}
              onPress={() => {
                const modes: ('evening' | 'spotlight' | 'disco' | 'kelin')[] = ['evening', 'spotlight', 'disco', 'kelin'];
                const nextIdx = (modes.indexOf(lightMode) + 1) % modes.length;
                handleLightChange(modes[nextIdx]);
              }}
            >
              <Ionicons
                name={
                  lightMode === 'evening'
                    ? "bulb-outline"
                    : lightMode === 'spotlight'
                    ? "flashlight-outline"
                    : lightMode === 'disco'
                    ? "color-wand-outline"
                    : "heart-outline"
                }
                size={19}
                color={lightMode === 'kelin' ? '#C084FC' : colors.primaryLight}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Details & Booking Bottom Section */}
      <ScrollView style={styles.detailsScroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.detailsCard, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}>
          <View style={styles.venueTitleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.venueName}>{selectedVenue.name}</Text>
              <Text style={styles.venueLocation}>📍 {selectedVenue.city}</Text>
            </View>
            <View style={[styles.ratingBadge, { backgroundColor: colors.badgeBg }]}>
              <Ionicons name="star" size={13} color="#FFD700" />
              <Text style={[styles.ratingText, { color: colors.primaryLight }]}>{selectedVenue.rating}</Text>
              <Text style={styles.reviewsText}>({selectedVenue.reviews})</Text>
            </View>
          </View>

          {/* Quick Specs Badges */}
          <View style={styles.specsRow}>
            <View style={styles.specBox}>
              <Text style={styles.specLabel}>Sig'imi</Text>
              <Text style={styles.specValue}>{selectedVenue.capacity}</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specBox}>
              <Text style={styles.specLabel}>Kunlik Ijara</Text>
              <Text style={[styles.specValueGold, { color: colors.primaryLight }]}>{selectedVenue.pricePerDay}</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specBox}>
              <Text style={styles.specLabel}>Dizayn Uslubi</Text>
              <Text style={styles.specValue}>{selectedVenue.decorStyle}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.descriptionText}>{selectedVenue.description}</Text>

          {/* Features Chips */}
          <View style={styles.featuresRow}>
            {selectedVenue.features.map((feat, idx) => (
              <View key={idx} style={[styles.featureChip, { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}>
                <Ionicons name="checkmark-circle" size={13} color={colors.primaryLight} style={{ marginRight: 4 }} />
                <Text style={[styles.featureText, { color: colors.primaryLight }]}>{feat}</Text>
              </View>
            ))}
          </View>

          {/* Action Booking Button */}
          <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
            <LinearGradient
              colors={colors.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.bookBtnGradient}
            >
              <Ionicons name="calendar-outline" size={17} color={isKelin ? '#FFFFFF' : '#070B14'} style={{ marginRight: 6 }} />
              <Text style={[styles.bookBtnText, { color: isKelin ? '#FFFFFF' : '#070B14' }]}>
                Zalni Bron Qilish & Shartnoma
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  badgeGold: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 0.5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '800',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  iconCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  venuePickerWrapper: {
    marginBottom: 6,
  },
  venuePickerScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  venuePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  venuePillActive: {
    borderWidth: 1.5,
  },
  venuePillText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  canvasContainer: {
    width: '100%',
    height: 290,
    position: 'relative',
    backgroundColor: '#070B14',
  },
  webView: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  controlsOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  camControls: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 3,
    borderWidth: 1,
  },
  camBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  camBtnActive: {
    borderRadius: 10,
  },
  camBtnText: {
    fontSize: 11,
    color: '#94A3B8',
    marginLeft: 3,
    fontWeight: '600',
  },
  rightFloatingTools: {
    flexDirection: 'row',
    gap: 8,
  },
  toolIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  detailsScroll: {
    flex: 1,
  },
  detailsCard: {
    margin: 14,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 40,
  },
  venueTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  venueName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  venueLocation: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 3,
  },
  reviewsText: {
    color: '#94A3B8',
    fontSize: 10,
    marginLeft: 2,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
  },
  specBox: {
    flex: 1,
    alignItems: 'center',
  },
  specDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  specLabel: {
    color: '#64748B',
    fontSize: 10,
    marginBottom: 2,
  },
  specValue: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  specValueGold: {
    fontSize: 11,
    fontWeight: '800',
  },
  descriptionText: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 18,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  featureText: {
    fontSize: 11,
    fontWeight: '600',
  },
  bookBtn: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  bookBtnGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  bookBtnText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
});
