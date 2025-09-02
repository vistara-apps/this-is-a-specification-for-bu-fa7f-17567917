module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg))',
        text: 'hsl(var(--text))',
        accent: 'hsl(var(--accent))',
        primary: 'hsl(var(--primary))',
        surface: 'hsl(var(--surface))',
        muted: 'hsl(var(--muted))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        danger: 'hsl(var(--danger))',
        border: 'hsl(var(--border))',
      },
      spacing: {
        xs: '0.5rem',    // 8px
        sm: '0.75rem',   // 12px
        md: '1rem',      // 16px
        lg: '1.5rem',    // 24px
        xl: '2rem',      // 32px
        '2xl': '2.5rem', // 40px
        '3xl': '3rem',   // 48px
      },
      borderRadius: {
        sm: '0.25rem',   // 4px
        md: '0.5rem',    // 8px
        lg: '0.75rem',   // 12px
        xl: '1rem',      // 16px
        '2xl': '1.5rem', // 24px
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        card: '0 4px 12px hsla(210, 40%, 18%, 0.1)',
        glow: '0 0 20px hsla(262, 71%, 63%, 0.3)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-in-out',
        'slide-up': 'slideUp 300ms ease-in-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'hsl(var(--text))',
            a: {
              color: 'hsl(var(--accent))',
              '&:hover': {
                color: 'hsl(var(--accent) / 0.8)',
              },
            },
            strong: {
              color: 'hsl(var(--text))',
            },
            h1: {
              color: 'hsl(var(--text))',
            },
            h2: {
              color: 'hsl(var(--text))',
            },
            h3: {
              color: 'hsl(var(--text))',
            },
            h4: {
              color: 'hsl(var(--text))',
            },
            code: {
              color: 'hsl(var(--accent))',
            },
            blockquote: {
              color: 'hsl(var(--muted))',
              borderLeftColor: 'hsl(var(--border))',
            },
          },
        },
      },
    },
  },
  plugins: [],
}
