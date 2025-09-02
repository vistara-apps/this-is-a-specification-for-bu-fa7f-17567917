module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210 40% 96%)',
        text: 'hsl(210 40% 18%)',
        accent: 'hsl(262 71% 63%)',
        primary: 'hsl(210 40% 96%)',
        surface: 'hsl(210 40% 100%)',
        muted: 'hsl(210 15% 65%)',
        success: 'hsl(120 60% 50%)',
        warning: 'hsl(45 100% 55%)',
        danger: 'hsl(0 70% 60%)',
      },
      spacing: {
        xs: '8px',
        sm: '8px', 
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px', 
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(210, 40%, 18%, 0.1)',
        glow: '0 0 20px hsla(262, 71%, 63%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      typography: {
        body: 'text-base leading-7',
        display: 'text-3xl font-bold',
        heading: 'text-xl font-semibold',
      },
    },
  },
  plugins: [],
}
