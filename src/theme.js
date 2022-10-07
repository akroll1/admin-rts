import { 
  color,
  extendTheme, 
  theme as chakraTheme,
  useColorModeValue as mode,
} from "@chakra-ui/react";
const config = {
  initialColorMode: localStorage.getItem('chakra-ui-color-mode')||'dark',
  useSystemColorMode: false,
  cssVarPrefix: 'fsl'
};
export const colors = {
  brand: {
    50: "#C01616",  
    100: "#C01616", 
    200: "#C01616", 
    300: "#C01616", 
    400: "#C01616", 
    500: "#C01616", 
    600: "#C01616", 
    700: "#C01616", 
    800: "#C01616", 
    900: "#C01616",
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
export const fonts = {
    body: `Lato`,
    heading: `Koulen`
}
export const letterSpacings = {
    normal: `0.05em`
}

export const fslTheme = {
  semanticTokens: { 
    colors: {
      'fsl-body-bg': {
        _dark: '#171717'
      },
      'chakra-body-text': {
        _dark: '#C8C8C8'
      },
      'fsl-sidebar-bg': {
        _dark: '#111111'
      },
      'fsl-nav-footer-bg': {
        _dark: '#171717'
      },
      'fsl-heading-text': {
        _dark: '#FAFAFA'
      },
      'fsl-red': {
        _dark: '#C01616'
      },
      'fsl-text': {
        _dark: '#C8C8C8'
      },
      'fsl-scoring-blue': {
        _dark: '#1d5d90'
      }

    }
  },
  colors,
  fonts,
  letterSpacings,
  ...gradient,
  shadow,
  shadows: {
    outline: '0 0 0 1px #FFF'
  },
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
  styles: {
    global: {
      body: {
        '#socials > a': {
          color: '#C8C8C8'
        },
        '#socials > a:focus': {
          boxShadow: 'none',
          color: 'white'
        },
        '#socials > a:hover': {
          boxShadow: 'none',
          color: 'white',
          background: 'inherit'
        },
        '#socials > a:active': {
          boxShadow: 'none',
          color: 'white',
          background: 'inherit'
        },
        '#scoring_table tr:nth-of-type(odd)': {
          background: '#252525'
        },
        '#scoring_table tr:nth-of-type(even)': {
          background: '#171717'
        },
        '#scoring_table tr': {
          // minHeight: '6rem',
        },
        '.firstTd': {
          padding: '1.4rem',
          paddingTop: 0,
          minWidth: "100%"
        },
        '.username': {
          paddingTop: 0,
        },
        '.scoreTd': {
          padding: '5px',
          margin: 0,
        },
        '.scores': {
          padding: '5px'
        }

      },
    },
  },
}
const Button = {
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: '0 0 0 1px gray',
        borderColor: 'gray',
        border: '1px solid gray'
      },
    }
  },
  variants: {
    solid: {
      color: '#FBFBFB',
      background: '#C01616',
      _hover: {
        boxShadow: 'none',
        color: '#eeeaea',
        borderColor: 'inherit',
        background: '#e62b2b',
        cursor: 'pointer',
        color: 'white'
      },
      _focus: {
        boxShadow: 'none',
        borderColor: 'inherit',
        background: '#e62b2b',
        color: 'white'
      }
    },
    outline: {
      size: 'lg',
      borderColor: 'gray',
      _hover: {
        background: 'inherit',
        boxShadow: '0 0 0 1px gray',
        color: '#C8C8C8',
        borderColor: 'white',
        border: '1px solid lightgray'
      },
    }
  },
  defaultProps: {
    variant: 'solid',
    colorScheme: 'solid',
    size: 'lg'
  }
}

const Input = {
  variants: {
    outline: {
      field: {
        boxShadow: '0 0 0 1px #676767',
        border: '1px solid',
        borderColor: '#393838',
        _focus: {
          boxShadow: 'none',
          borderColor: '#674545',
          
        },
        
      },
    }
  }

}

const Link = {
  baseStyle: {
    _focus: {
      boxShadow: 'none',
      color: 'white'
    }
  }
}

const Table = {
  variants: {
    scoringTable: {
      th: {
        background: '#111111'
      },
    }
  }
}

const Heading = {
  baseStyle: {
    color: '#FAFAFA',
  }
}

const theme = extendTheme({ 
  config, 
  ...chakraTheme, 
  ...fslTheme, 
  components: {
    Button,
    Heading,
    Input,
    Link,
    Table
  }
},
  // withDefaultColorScheme({ 
  //   colorScheme: 'brand',
  //   components: ['Button'] 
  // }),
);
console.log('theme: ', theme)
export default theme;
