export const COLORS = {
  // Hashamatli Oltin (Champagne & Imperial Gold)
  gold: {
    50: '#FDFCF7',
    100: '#FBF5E6',
    200: '#F7E7BE',
    300: '#F0D48B',
    400: '#FFDF73', // Yorqin aksent oltin
    500: '#D4AF37', // Asosiy qirollik oltini
    600: '#B89726',
    700: '#8C6D1F',
    800: '#684E14',
    900: '#42300B',
    gradient: ['#FFDF73', '#D4AF37', '#A17A16'] as const,
    gradientSubtle: ['rgba(212, 175, 55, 0.25)', 'rgba(212, 175, 55, 0.05)'] as const,
    gold500: '#D4AF37',
  },

  // Qirollik Binafshasi (Royal Amethyst & Violet for Kelin Rejimi)
  binafsha: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC', // Yorqin binafsha aksent
    500: '#A855F7', // Asosiy qirollik binafshasi
    600: '#9333EA',
    700: '#7E22CE',
    800: '#6B21A8',
    900: '#581C87',
    gradient: ['#F0ABFC', '#C084FC', '#9333EA'] as const,
    gradientSubtle: ['rgba(192, 132, 252, 0.28)', 'rgba(168, 85, 247, 0.06)'] as const,
    bg: '#0B0714',
    card: '#140D24',
    cardElevated: '#1E1235',
    border: 'rgba(192, 132, 252, 0.26)',
    glow: 'rgba(192, 132, 252, 0.45)',
  },

  // Tungi Obsidian & Midnight (Dark Luxury Surface)
  obsidian: {
    base: '#070B14',      // Asosiy ilova foni
    card: '#0F1626',      // Ko'tarilgan kartochkalar
    cardElevated: '#172036',
    border: 'rgba(212, 175, 55, 0.18)',
    borderLight: 'rgba(255, 255, 255, 0.08)',
    glass: 'rgba(15, 22, 38, 0.85)',
    glassActive: 'rgba(212, 175, 55, 0.12)',
    // Backward compatibility
    900: '#070B14',
    800: '#0F1626',
    700: '#172036',
  },

  // Ipak Chini (Silk Porcelain)
  porcelain: {
    bg: '#070B14',
    card: '#0F1626',
    border: 'rgba(212, 175, 55, 0.25)',
  },

  // Emotsional & Status Ranglar
  rose: '#F43F5E',
  emerald: '#10B981',
  crimson: '#EF4444',
  sapphire: '#38BDF8',
  graySlot: '#64748B',

  // Matn ranglari (High-contrast typography)
  text: {
    primary: '#FFFFFF',
    secondary: '#94A3B8',
    muted: '#64748B',
    gold: '#FFDF73',
    inverse: '#070B14',
  },

  // Status va kategoriya ranglari
  status: {
    verified: '#10B981',  // Tasdiqlangan / Erkin
    booked: '#EF4444',    // Band qilingan
    favorite: '#F43F5E',  // Yurak / Sevimli
    info: '#38BDF8',      // 3D / Info
    warning: '#F59E0B',   // AI Byudjet ogohlantirish
  }
};
