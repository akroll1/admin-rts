import { extendTheme, theme as chakraTheme} from "@chakra-ui/react";
const config = {
  initialColorMode: localStorage.getItem('chakra-ui-color-mode')||'dark',
  useSystemColorMode: false,
  cssVarPrefix: 'fsl'
};
export const colors = {
  brand: {
    base: '#1A202C'
  },
  white: {
    base: '#fff',
    light: '#f0f0f0',
    grey: '#cecece',
    dark: '#a0afd7',
  },
  black: {
    base: '#333438',
    light: '#4b4e57',
    blue: '#2e3246',
  },
  primary: {
    base: '#3498db',
    light: '#3e5fbc',
    dark: '#284187',
  },
  background: {
    light: '#3e5fbc',
    dark: '#284187',
  },
  image: {
    light: '#c24e4e',
    dark: 'darkred'
  },
  
};

export const shadow = {
  card: '0 20px 30px rgba(0, 0, 0, 0.1)',
  image: '0 15px 25px rgba(0, 0, 0, 0.1)',
  suggestion: '0 -5px 30px rgba(0,0,0,0.2)',
  footer: '0 -3px 26px rgba(0,0,0,0.5)',
  feature: {
    big: {
      default: '0 40px 40px rgba(0, 0, 0, 0.2)',
      hover: '0 50px 50px rgba(0, 0, 0, 0.1)',
    },
    small: {
      default: '0 15px 25px rgba(0, 0, 0, 0.2)',
      hover: '0 40px 45px rgba(0, 0, 0, 0.1)',
    },
  },
  text: {
    small: '0 5px 10px rgba(0, 0, 0, 0.25)',
    big: '0 15px 20px rgba(0, 0, 0, 0.13)',
  },
};

export const gradient = {
  // eslint-disable-next-line
  leftToRight: `linear-gradient(-45deg, ${colors.image.light} 0%, ${colors.image.dark} 100%)`,
  // eslint-disable-next-line
  rightToLeft: `linear-gradient(45deg, ${colors.image.light} 0%, ${colors.image.dark} 100%)`,
};

export const transition = {
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  duration: '0.4s',
};
export const fontFamily = {
  fonts: {
    body: `Lato`,
    heading: `Koulen`
  }
}
// export const typography = {
export const letterSpacings = {

    normal: `0.05em`
  // }
}
export const myTheme = {
  ...colors,
  ...fontFamily,
  letterSpacings,
  ...gradient,
  ...shadow,
  breakpoints: {
    xs: '400px',
    s: '600px',
    m: '900px',
    l: '1200px',
  },

  layout: {
    article: '46rem',
    base: '70rem',
    big: '83.33333rem',
  },
  borderRadius: {
    default: '0.4rem',
    round: '100rem',
  },
  transitions: {
    default: {
      duration: transition.duration,
      timing: transition.easeInOutCubic,
      transition: `all ${transition.duration} ${transition.easeInOutCubic}`,
    },
    boom: {
      duration: transition.duration,
      timing: transition.easeOutBack,
      transition: `all ${transition.duration} ${transition.easeOutBack}`,
    },
    headroom: {
      transition: 'all 0.25s ease-in-out',
    },
  },
  colors: {
    brand: {
      100: '#C01616'
    }
  },
  background: {
    dark: 'blackAlpha.500'
  },
  components: {
    Input: {
      defaultProps: {

        focusBorderColor: '5px solid red'
      },
      baseStyle: {
        field: {
          focusBorderColor: '5px solid red'
        }
      }
    }
  },
  borders: {
    brand: {
      100: '1px solid #C01616'
    }
  }
};
const theme = extendTheme({ config, ...chakraTheme, ...myTheme });
console.log('theme: ', theme)
export default theme;
