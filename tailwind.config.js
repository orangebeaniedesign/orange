/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Mantém compatibilidade com `font-serif` existente no projeto
        serif: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],

        // Opcional (se quiseres usar classes mais explícitas depois)
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },

      borderRadius: {
        // deixa tudo menos “pill” e mais moderno/sharp
        xs: "6px",
        sm: "8px",
        md: "10px",
        lg: "14px",
      },

      fontSize: {
        hero: ["clamp(3rem, 8vw, 7.5rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-2xl": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "display-sm": ["1.125rem", { lineHeight: "1.4" }],
        "body-xl": ["1.25rem", { lineHeight: "1.7" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "body-xs": ["0.8125rem", { lineHeight: "1.5" }],
        caption: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
        overline: ["0.625rem", { lineHeight: "1.3", letterSpacing: "0.15em" }],
      },

      colors: {
        cream: {
          DEFAULT: "#F6F4EF",
          50: "#FDFCFA",
          100: "#F6F4EF",
          200: "#EDEAD3",
          300: "#E2DDD5",
        },
        charcoal: {
          DEFAULT: "#1A1A18",
          light: "#2A2520",
          medium: "#4A4238",
        },
        stone: {
          50: "#FAF8F5",
          100: "#F0EDE7",
          200: "#E2DDD5",
          300: "#D4CBC0",
          400: "#C4BAA9",
          500: "#A89A8A",
          600: "#8B7D6B",
          700: "#6B5F50",
          800: "#4A4238",
          900: "#2A2520",
          950: "#1A1A18",
        },
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        gutter: "clamp(1.5rem, 5vw, 5rem)",
        section: "clamp(5rem, 10vw, 10rem)",
        "section-lg": "clamp(7rem, 14vw, 14rem)",
      },

      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in": "cubic-bezier(0.7, 0, 0.84, 0)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
        1000: "1000ms",
        1200: "1200ms",
      },

      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "slide-up": { from: { transform: "translateY(100%)" }, to: { transform: "translateY(0)" } },
        "line-grow": { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
      },

      animation: {
        "fade-in": "fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-grow": "line-grow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
