import React, { createContext, useContext, useState, ReactNode } from 'react';
import { COLORS } from './colors';

export type ThemeMode = 'kuyov' | 'kelin';

export interface AppThemeColors {
  mode: ThemeMode;
  isKelin: boolean;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryGradient: readonly [string, string, string];
  primaryGradientSubtle: readonly [string, string];
  bgBase: string;
  bgCard: string;
  bgCardElevated: string;
  borderColor: string;
  borderLight: string;
  accentBadge: string;
  glow: string;
  badgeBg: string;
  textGoldOrPurple: string;
}

interface ThemeContextType {
  mode: ThemeMode;
  isKelin: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  colors: AppThemeColors;
}

const kuyovTheme: AppThemeColors = {
  mode: 'kuyov',
  isKelin: false,
  primary: '#C4984F',
  primaryLight: '#E5C383',
  primaryDark: '#997332',
  primaryGradient: ['#E5C383', '#C4984F', '#997332'] as const,
  primaryGradientSubtle: ['rgba(196, 152, 79, 0.22)', 'rgba(196, 152, 79, 0.05)'] as const,
  bgBase: '#FAF7F2',
  bgCard: '#FFFFFF',
  bgCardElevated: '#FDFBF8',
  borderColor: 'rgba(196, 152, 79, 0.22)',
  borderLight: 'rgba(196, 152, 79, 0.12)',
  accentBadge: '#C4984F',
  glow: 'rgba(196, 152, 79, 0.35)',
  badgeBg: 'rgba(196, 152, 79, 0.12)',
  textGoldOrPurple: '#C4984F',
};

const kelinTheme: AppThemeColors = {
  mode: 'kelin',
  isKelin: true,
  primary: COLORS.binafsha[500],
  primaryLight: COLORS.binafsha[400],
  primaryDark: COLORS.binafsha[700],
  primaryGradient: COLORS.binafsha.gradient,
  primaryGradientSubtle: COLORS.binafsha.gradientSubtle,
  bgBase: COLORS.binafsha.bg,
  bgCard: COLORS.binafsha.card,
  bgCardElevated: COLORS.binafsha.cardElevated,
  borderColor: COLORS.binafsha.border,
  borderLight: 'rgba(192, 132, 252, 0.15)',
  accentBadge: '#E879F9',
  glow: COLORS.binafsha.glow,
  badgeBg: 'rgba(192, 132, 252, 0.2)',
  textGoldOrPurple: '#C084FC',
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'kuyov',
  isKelin: false,
  setMode: () => {},
  toggleTheme: () => {},
  colors: kuyovTheme,
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>('kuyov');

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const toggleTheme = () => {
    setModeState((prev) => (prev === 'kuyov' ? 'kelin' : 'kuyov'));
  };

  const currentColors = mode === 'kelin' ? kelinTheme : kuyovTheme;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        isKelin: mode === 'kelin',
        setMode,
        toggleTheme,
        colors: currentColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
