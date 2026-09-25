import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  ActivityIndicator,
  Share,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';

const { width } = Dimensions.get('window');

interface Venue3DItem {
  id: string;
  name: string;
  city: string;
  capacity: string;
  pricePerDay: string;
  rating: number;
  reviews: number;
  glbModelUrl?: string;
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
    features: ['Kristal Lyustra', '3D LED Ekran', 'Og\'ir Tutun', 'VIP Prezidium', '120 Mashina Parking'],
    description: 'Neoklassik qirollik uslubidagi hashamatli zal. 12 metr balandlikdagi gumbaz va oltin qoplama dekoratsiya.',
    decorStyle: 'Oltin & Oq Marmar',
  },
  {
    id: 'yakkasaroy',
    name: 'Yakkasaroy Palace Luxury',
    city: 'Toshkent, Mirzo Ulug\'bek',
    capacity: '600 - 850 kishi',
    pricePerDay: "65,000,000 so'm",
    rating: 4.98,
    reviews: 340,
    features: ['Fransuz Arxitekturasi', 'Alohida Kelin Xonasi', 'Lazer Shousi', '200 Mashina Parking', 'Akustik Zallar'],
    description: 'Oliy darajadagi xalqaro standartdagi to\'yxona majmuasi. Mehmonlar uchun qulay akustika va panoramali derazalar.',
    decorStyle: 'Imperial Royal Gold',
  },
  {
    id: 'mumtoz',
    name: 'Mumtoz Shaxona Zal',
    city: 'Toshkent, Chilonzor',
    capacity: '400 - 550 kishi',
    pricePerDay: "38,000,000 so'm",
    rating: 4.88,
    reviews: 145,
    features: ['Milliy Ganchkorlik', 'Jonli Orkestr Maydoni', 'Favvoralar Bog\'i', 'Maxsus Oshpazlik Oshxonasi'],
    description: 'Sharqona nozik naqshlar va zamonaviy yorug\'lik texnologiyasi uyg\'unlashgan muhtasham saroy.',
    decorStyle: 'Sharqona Mumtoz',
  },
  {
    id: 'oftob',
    name: 'Oftob Shaxona: Ochiq Osmon & Sharshara',
    city: 'Toshkent, Qibray / Tabiat qo\'ynida',
    capacity: '700 - 1000 kishi',
    pricePerDay: "55,000,000 so'm",
    rating: 4.99,
    reviews: 420,
    features: ['Oqib Turuvchi Sharshara', 'Yulduzli Ochiq Osmon', 'Suv ustidagi Sahna', 'Lazer & Chiroq Shousi', '250 Mashina Parking'],
    description: 'Yashil tabiat bog\'ida, oqshomgi ochiq osmon ostida joylashgan to\'yxona. Tabiiy sharshara, yorug\'lik favvoralari va toza havo.',
    decorStyle: 'Ochiq Osmon & Sharshara',
  }
];

export const Venue3DScreen: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<Venue3DItem>(VENUES_3D[0]);
  const [lightMode, setLightMode] = useState<'evening' | 'spotlight' | 'disco'>('evening');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeCameraView, setActiveCameraView] = useState<'full' | 'stage' | 'table'>('full');
  const [isWebviewLoading, setIsWebviewLoading] = useState<boolean>(true);
  const webViewRef = useRef<WebView>(null);

  // Send control command to 3D WebView
  const sendTo3D = (action: string, payload: any) => {
    const js = `window.handleAppEvent && window.handleAppEvent('${action}', ${JSON.stringify(payload)}); true;`;
    webViewRef.current?.injectJavaScript(js);
  };

  const handleLightChange = (mode: 'evening' | 'spotlight' | 'disco') => {
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

  // Ultra-realistic 3D WebGL Three.js Wedding Hall Scene (Embedded, Fast, Zero latency, 60 FPS)
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
          <div class="badge-3d">✦ 3D GLB/WebGL Realtime 60FPS</div>
          <div class="touch-hint">👆 Aylantirish uchun suring | 🔍 Masshtab</div>
        </div>

        <script>
          const container = document.getElementById('canvas-container');
          const loader = document.getElementById('loader');

          // Scene & Camera
          const scene = new THREE.Scene();
          scene.background = new THREE.Color(0x070B14);
          scene.fog = new THREE.FogExp2(0x070B14, 0.025);

          const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
          camera.position.set(0, 10, 22);

          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.1;
          container.appendChild(renderer.domElement);

          // Controls
          const controls = new THREE.OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below floor
          controls.minDistance = 4;
          controls.maxDistance = 35;
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.6;
          controls.target.set(0, 2.5, 0);

          // Lights
          const ambientLight = new THREE.AmbientLight(0xffeedd, 0.45);
          scene.add(ambientLight);

          // Main Center Chandelier Warm Glow
          const chandelierLight = new THREE.PointLight(0xffdf73, 2.2, 28);
          chandelierLight.position.set(0, 8, 0);
          chandelierLight.castShadow = true;
          scene.add(chandelierLight);

          // Stage Spotlight
          const stageSpot = new THREE.SpotLight(0xfff5e6, 3.5);
          stageSpot.position.set(0, 12, 6);
          stageSpot.target.position.set(0, 2.5, -8);
          stageSpot.angle = Math.PI / 5;
          stageSpot.penumbra = 0.4;
          stageSpot.castShadow = true;
          scene.add(stageSpot);
          scene.add(stageSpot.target);

          // Subtle Accent Lights
          const leftLight = new THREE.PointLight(0xd4af37, 1.2, 20);
          leftLight.position.set(-10, 5, 2);
          scene.add(leftLight);

          const rightLight = new THREE.PointLight(0xd4af37, 1.2, 20);
          rightLight.position.set(10, 5, 2);
          scene.add(rightLight);

          // Disco / Moving light
          const discoLight = new THREE.PointLight(0xec4899, 0, 25);
          discoLight.position.set(0, 6, 0);
          scene.add(discoLight);

          // Materials
          const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.85,
            roughness: 0.22,
          });

          const whiteSilk = new THREE.MeshStandardMaterial({
            color: 0xfafafa,
            roughness: 0.4,
          });

          const carpetMaterial = new THREE.MeshStandardMaterial({
            color: 0x6b1d2f, // Royal Burgundy Carpet
            roughness: 0.9,
          });

          const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x111624,
            roughness: 0.15,
            metalness: 0.35,
          });

          // 1. Floor (Glossy Dark Marble)
          const floorGeo = new THREE.PlaneGeometry(32, 32);
          const floor = new THREE.Mesh(floorGeo, floorMaterial);
          floor.rotation.x = -Math.PI / 2;
          floor.receiveShadow = true;
          scene.add(floor);

          // Center Dance Floor (Glossy Inlay)
          const danceFloorGeo = new THREE.CircleGeometry(6, 48);
          const danceFloorMat = new THREE.MeshStandardMaterial({
            color: 0x1a233a,
            roughness: 0.1,
            metalness: 0.5,
          });
          const danceFloor = new THREE.Mesh(danceFloorGeo, danceFloorMat);
          danceFloor.rotation.x = -Math.PI / 2;
          danceFloor.position.y = 0.02;
          danceFloor.receiveShadow = true;
          scene.add(danceFloor);

          // Gold border for dance floor
          const ringGeo = new THREE.RingGeometry(5.9, 6.1, 48);
          const ring = new THREE.Mesh(ringGeo, goldMaterial);
          ring.rotation.x = -Math.PI / 2;
          ring.position.y = 0.03;
          scene.add(ring);

          // Red Aisle Carpet to Stage
          const carpetGeo = new THREE.PlaneGeometry(2.4, 16);
          const carpet = new THREE.Mesh(carpetGeo, carpetMaterial);
          carpet.rotation.x = -Math.PI / 2;
          carpet.position.set(0, 0.025, 0);
          scene.add(carpet);

          // 2. STAGE & PREZIDIUM (At position z = -8)
          const stageGroup = new THREE.Group();
          stageGroup.position.set(0, 0, -8);

          // Stage Platform
          const stagePlatformGeo = new THREE.BoxGeometry(14, 0.8, 6);
          const stagePlatformMat = new THREE.MeshStandardMaterial({ color: 0x1e2738, roughness: 0.3 });
          const stagePlatform = new THREE.Mesh(stagePlatformGeo, stagePlatformMat);
          stagePlatform.position.y = 0.4;
          stagePlatform.receiveShadow = true;
          stagePlatform.castShadow = true;
          stageGroup.add(stagePlatform);

          // Stage Gold Trim
          const trimGeo = new THREE.BoxGeometry(14.2, 0.1, 6.2);
          const trim = new THREE.Mesh(trimGeo, goldMaterial);
          trim.position.y = 0.8;
          stageGroup.add(trim);

          // Wedding Arch (Golden Dual Rings)
          const archGeo = new THREE.TorusGeometry(3.2, 0.1, 16, 64, Math.PI);
          const arch = new THREE.Mesh(archGeo, goldMaterial);
          arch.position.set(0, 3.8, -1.8);
          arch.castShadow = true;
          stageGroup.add(arch);

          const archInnerGeo = new THREE.TorusGeometry(2.8, 0.08, 16, 64, Math.PI);
          const archInner = new THREE.Mesh(archInnerGeo, goldMaterial);
          archInner.position.set(0, 3.8, -1.9);
          stageGroup.add(archInner);

          // Floral Wall Backdrop
          const backdropGeo = new THREE.BoxGeometry(10, 4.5, 0.2);
          const backdropMat = new THREE.MeshStandardMaterial({ color: 0xfffcf5, roughness: 0.6 });
          const backdrop = new THREE.Mesh(backdropGeo, backdropMat);
          backdrop.position.set(0, 3.0, -2.1);
          stageGroup.add(backdrop);

          // Bride & Groom Table (Prezidium)
          const presidiumTableGeo = new THREE.BoxGeometry(3.6, 1.0, 1.2);
          const presidiumTable = new THREE.Mesh(presidiumTableGeo, whiteSilk);
          presidiumTable.position.set(0, 1.3, -0.6);
          presidiumTable.castShadow = true;
          stageGroup.add(presidiumTable);

          // Golden chairs for Couple
          for (let x of [-0.7, 0.7]) {
            const chairBackGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 16);
            const chair = new THREE.Mesh(chairBackGeo, goldMaterial);
            chair.position.set(x, 1.8, -1.2);
            stageGroup.add(chair);
          }

          scene.add(stageGroup);

          // 3. BANQUET TABLES (10 Round Tables around Dance Floor)
          const tablesGroup = new THREE.Group();
          const tablePositions = [
            [-7, 3], [-8, -2], [-6, -6],
            [7, 3], [8, -2], [6, -6],
            [-3, 7], [3, 7],
            [-9, 7], [9, 7]
          ];

          tablePositions.forEach(pos => {
            const tGroup = new THREE.Group();
            tGroup.position.set(pos[0], 0, pos[1]);

            // Table top
            const tGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.8, 24);
            const table = new THREE.Mesh(tGeo, whiteSilk);
            table.position.y = 0.4;
            table.castShadow = true;
            table.receiveShadow = true;
            tGroup.add(table);

            // Centerpiece Flower & Candlestick
            const centerGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.7, 12);
            const centerpiece = new THREE.Mesh(centerGeo, goldMaterial);
            centerpiece.position.y = 1.15;
            centerpiece.castShadow = true;
            tGroup.add(centerpiece);

            // Glowing candle tip
            const candleGeo = new THREE.SphereGeometry(0.08, 8, 8);
            const candleMat = new THREE.MeshBasicMaterial({ color: 0xffdf73 });
            const candle = new THREE.Mesh(candleGeo, candleMat);
            candle.position.y = 1.55;
            tGroup.add(candle);

            // 6 Chairs per table
            for (let i = 0; i < 6; i++) {
              const angle = (i / 6) * Math.PI * 2;
              const chairGeo = new THREE.BoxGeometry(0.35, 0.7, 0.35);
              const chair = new THREE.Mesh(chairGeo, goldMaterial);
              chair.position.set(Math.cos(angle) * 1.7, 0.35, Math.sin(angle) * 1.7);
              chair.castShadow = true;
              tGroup.add(chair);
            }

            tablesGroup.add(tGroup);
          });
          scene.add(tablesGroup);

          // 4. CHANDELIER (Hanging Crystal & Gold)
          const chandelierGroup = new THREE.Group();
          chandelierGroup.position.set(0, 8, 0);

          for (let r of [2.2, 1.5, 0.8]) {
            const cRing = new THREE.Mesh(new THREE.TorusGeometry(r, 0.06, 12, 32), goldMaterial);
            cRing.rotation.x = Math.PI / 2;
            cRing.position.y = -(2.5 - r);
            chandelierGroup.add(cRing);

            // Crystal droplets
            for (let i = 0; i < 16; i++) {
              const ang = (i / 16) * Math.PI * 2;
              const dropGeo = new THREE.ConeGeometry(0.06, 0.3, 6);
              const dropMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.9 });
              const drop = new THREE.Mesh(dropGeo, dropMat);
              drop.position.set(Math.cos(ang) * r, -(2.5 - r) - 0.2, Math.sin(ang) * r);
              chandelierGroup.add(drop);
            }
          }
          scene.add(chandelierGroup);

          // 5. OUTDOOR WATERFALL & STARRY SKY (Oftob Shaxona Scene)
          const outdoorGroup = new THREE.Group();
          outdoorGroup.visible = false;

          // Twinkling Star Field (300 Stars)
          const starGeo = new THREE.BufferGeometry();
          const starCount = 300;
          const starPos = new Float32Array(starCount * 3);
          for(let i=0; i<starCount*3; i+=3) {
            starPos[i] = (Math.random() - 0.5) * 70;
            starPos[i+1] = Math.random() * 25 + 8;
            starPos[i+2] = (Math.random() - 0.5) * 70;
          }
          starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
          const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, transparent: true, opacity: 0.85 });
          const starField = new THREE.Points(starGeo, starMat);
          outdoorGroup.add(starField);

          // Waterfall Rock Cliff behind stage
          const cliffGeo = new THREE.BoxGeometry(18, 14, 3);
          const cliffMat = new THREE.MeshStandardMaterial({ color: 0x1a2233, roughness: 0.95 });
          const cliff = new THREE.Mesh(cliffGeo, cliffMat);
          cliff.position.set(0, 6, -14);
          outdoorGroup.add(cliff);

          // Flowing Waterfall Stream
          const waterGeo = new THREE.PlaneGeometry(10, 13, 16, 16);
          const waterMat = new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            roughness: 0.05,
            metalness: 0.7,
            transparent: true,
            opacity: 0.8,
          });
          const waterfall = new THREE.Mesh(waterGeo, waterMat);
          waterfall.position.set(0, 6, -12.4);
          outdoorGroup.add(waterfall);

          // Reflective Water Pool around stage
          const poolGeo = new THREE.RingGeometry(6, 14, 32);
          const poolMat = new THREE.MeshStandardMaterial({ color: 0x08192e, roughness: 0.05, metalness: 0.9 });
          const pool = new THREE.Mesh(poolGeo, poolMat);
          pool.rotation.x = -Math.PI / 2;
          pool.position.y = 0.03;
          outdoorGroup.add(pool);

          scene.add(outdoorGroup);

          // Animation Loop
          let clock = new THREE.Clock();
          function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            controls.update();

            // Subtle chandelier sway
            chandelierGroup.rotation.y = time * 0.1;

            // Disco light effects if active
            if (discoLight.intensity > 0) {
              discoLight.position.x = Math.sin(time * 2) * 5;
              discoLight.position.z = Math.cos(time * 2) * 5;
              discoLight.color.setHSL((time * 0.2) % 1, 0.9, 0.5);
            }

            renderer.render(scene, camera);
          }
          animate();

          // Hide Loader
          setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
            window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'LOADED' }));
          }, 600);

          // Handle External Events from React Native
          window.handleAppEvent = function(action, payload) {
            if (action === 'setLight') {
              if (payload === 'evening') {
                chandelierLight.intensity = 2.2;
                stageSpot.intensity = 3.5;
                discoLight.intensity = 0;
                ambientLight.color.setHex(0xffeedd);
              } else if (payload === 'spotlight') {
                chandelierLight.intensity = 0.6;
                stageSpot.intensity = 6.0;
                discoLight.intensity = 0;
                ambientLight.color.setHex(0x334466);
              } else if (payload === 'disco') {
                chandelierLight.intensity = 0.8;
                stageSpot.intensity = 1.5;
                discoLight.intensity = 4.0;
                ambientLight.color.setHex(0x111122);
              }
            } else if (action === 'setRotate') {
              controls.autoRotate = !!payload;
            } else if (action === 'setCamera') {
              if (payload === 'full') {
                gsapFly(0, 10, 22, 0, 2.5, 0);
              } else if (payload === 'stage') {
                gsapFly(0, 3.5, -1, 0, 2.8, -8);
              } else if (payload === 'table') {
                gsapFly(-5, 2.5, 6, -7, 1.2, 3);
              }
            } else if (action === 'setVenue') {
              if (payload === 'oftob') {
                chandelierGroup.visible = false;
                outdoorGroup.visible = true;
                scene.background.setHex(0x040816);
                ambientLight.color.setHex(0x93c5fd);
                stageSpot.color.setHex(0xffffff);
              } else {
                chandelierGroup.visible = true;
                outdoorGroup.visible = false;
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
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View>
          <View style={styles.brandRow}>
            <Text style={styles.badgeGold}>3D VIRTUAL TOUR</Text>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>INTERAKTIV</Text>
            </View>
          </View>
          <Text style={styles.headerTitle}>To'yxona 3D Zallari</Text>
        </View>

        <TouchableOpacity style={styles.iconCircleBtn} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={20} color={COLORS.gold[400]} />
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
                style={[styles.venuePill, isSelected && styles.venuePillActive]}
                onPress={() => {
                  setSelectedVenue(item);
                  sendTo3D('setVenue', item.id);
                }}
              >
                <Ionicons
                  name={isSelected ? "business" : "business-outline"}
                  size={14}
                  color={isSelected ? COLORS.obsidian.base : COLORS.gold[400]}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.venuePillText, isSelected && styles.venuePillTextActive]}>
                  {item.name}
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
          onMessage={(e) => {
            try {
              const data = JSON.parse(e.nativeEvent.data);
              if (data.type === 'LOADED') {
                setIsWebviewLoading(false);
              }
            } catch (err) {}
          }}
        />

        {/* 3D Floating Overlays Controls */}
        <View style={styles.controlsOverlay}>
          {/* Camera View Switcher */}
          <View style={styles.camControls}>
            <TouchableOpacity
              style={[styles.camBtn, activeCameraView === 'full' && styles.camBtnActive]}
              onPress={() => handleCameraChange('full')}
            >
              <Ionicons name="scan-outline" size={14} color={activeCameraView === 'full' ? '#070B14' : '#FFF'} />
              <Text style={[styles.camBtnText, activeCameraView === 'full' && styles.camBtnTextActive]}>Umumiy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.camBtn, activeCameraView === 'stage' && styles.camBtnActive]}
              onPress={() => handleCameraChange('stage')}
            >
              <Ionicons name="sparkles-outline" size={14} color={activeCameraView === 'stage' ? '#070B14' : '#FFF'} />
              <Text style={[styles.camBtnText, activeCameraView === 'stage' && styles.camBtnTextActive]}>Sahna</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.camBtn, activeCameraView === 'table' && styles.camBtnActive]}
              onPress={() => handleCameraChange('table')}
            >
              <Ionicons name="restaurant-outline" size={14} color={activeCameraView === 'table' ? '#070B14' : '#FFF'} />
              <Text style={[styles.camBtnText, activeCameraView === 'table' && styles.camBtnTextActive]}>VIP Stol</Text>
            </TouchableOpacity>
          </View>

          {/* Right Action Icons (Rotate + Light Mode) */}
          <View style={styles.rightFloatingTools}>
            <TouchableOpacity style={[styles.toolIconBtn, autoRotate && styles.toolIconBtnActive]} onPress={toggleRotate}>
              <MaterialCommunityIcons
                name={autoRotate ? "axis-z-rotate-clockwise" : "axis-arrow"}
                size={20}
                color={autoRotate ? COLORS.gold[400] : '#94A3B8'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toolIconBtn}
              onPress={() => {
                const modes: ('evening' | 'spotlight' | 'disco')[] = ['evening', 'spotlight', 'disco'];
                const nextIdx = (modes.indexOf(lightMode) + 1) % modes.length;
                handleLightChange(modes[nextIdx]);
              }}
            >
              <Ionicons
                name={lightMode === 'evening' ? "bulb-outline" : lightMode === 'spotlight' ? "flashlight-outline" : "color-wand-outline"}
                size={20}
                color={COLORS.gold[400]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Details & Booking Bottom Section */}
      <ScrollView style={styles.detailsScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.detailsCard}>
          <View style={styles.venueTitleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.venueName}>{selectedVenue.name}</Text>
              <Text style={styles.venueLocation}>📍 {selectedVenue.city}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{selectedVenue.rating}</Text>
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
              <Text style={styles.specValueGold}>{selectedVenue.pricePerDay}</Text>
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
              <View key={idx} style={styles.featureChip}>
                <Ionicons name="checkmark-circle" size={13} color={COLORS.gold[400]} style={{ marginRight: 4 }} />
                <Text style={styles.featureText}>{feat}</Text>
              </View>
            ))}
          </View>

          {/* Action Booking Button */}
          <TouchableOpacity style={styles.bookBtn}>
            <LinearGradient
              colors={['#FFDF73', '#D4AF37', '#997519']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.bookGradient}
            >
              <Ionicons name="calendar" size={18} color="#070B14" style={{ marginRight: 8 }} />
              <Text style={styles.bookBtnText}>Sanani Tanlash & Bron Qilish</Text>
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
    backgroundColor: COLORS.obsidian.base,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeGold: {
    color: COLORS.gold[400],
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginRight: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  liveText: {
    color: '#10B981',
    fontSize: 9,
    fontWeight: '700',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  iconCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  venuePickerWrapper: {
    paddingVertical: 10,
  },
  venuePickerScroll: {
    paddingHorizontal: 16,
  },
  venuePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 22, 38, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  venuePillActive: {
    backgroundColor: COLORS.gold[400],
    borderColor: COLORS.gold[400],
  },
  venuePillText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  venuePillTextActive: {
    color: '#070B14',
    fontWeight: '800',
  },
  canvasContainer: {
    width: width,
    height: width * 0.85,
    position: 'relative',
    backgroundColor: '#070B14',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  controlsOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  camControls: {
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 15, 26, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 18,
    padding: 3,
  },
  camBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  camBtnActive: {
    backgroundColor: COLORS.gold[400],
  },
  camBtnText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  camBtnTextActive: {
    color: '#070B14',
    fontWeight: '800',
  },
  rightFloatingTools: {
    flexDirection: 'row',
  },
  toolIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(10, 15, 26, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  toolIconBtnActive: {
    borderColor: COLORS.gold[400],
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
  },
  detailsScroll: {
    flex: 1,
  },
  detailsCard: {
    padding: 20,
  },
  venueTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  venueName: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 4,
  },
  venueLocation: {
    color: '#94A3B8',
    fontSize: 13,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 4,
  },
  reviewsText: {
    color: '#94A3B8',
    fontSize: 11,
    marginLeft: 2,
  },
  specsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 22, 38, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  specBox: {
    flex: 1,
    alignItems: 'center',
  },
  specDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginHorizontal: 4,
  },
  specLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  specValue: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  specValueGold: {
    color: COLORS.gold[400],
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  descriptionText: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  featureText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '500',
  },
  bookBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.gold[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 30,
  },
  bookGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  bookBtnText: {
    color: '#070B14',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
