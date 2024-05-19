/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        safari: {
          1: "#185717",
          2: "#092f08",
          3: "rgba(9, 47, 8, 0.57)",
          4: "rgba(9, 47, 8, 0.87)",
          5: "#220000e0",
          6: "rgba(0, 0, 0, 0.57)",
        },
        success: {
          1: "#a57638",
          2: "#f7f6f5",
        },
        banner: {
          DEFAULT: "rgba(165, 118, 56, 0.57)",
          foreground: "rgba(165, 118, 56, 0.57)",
        },
        bankGradient: "#0179FE",
      },
      backgroundImage: {
        "wild-banner": "linear-gradient(0deg, rgba(28,235,237,1) 0%, rgba(244,183,26,0.7791491596638656) 70%)",
        "safari-gradient": "linear-gradient(90deg, #0179FE 0%, #4893FF 100%)",
      },
      boxShadow: {
        form: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        pinyon: "var(--font-pinyon-script)",
        lobster: "var(--font-lobster)",
        lucian: ["Lucian", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.25,0.1,0.25,1.0)',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}