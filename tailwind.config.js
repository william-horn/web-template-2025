/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        // Dividing lines
        "0-line": "var(--bg-color-0-line)",
        "0-inset-line": "var(--bg-color-0-inset-line)",
        "1-line": "var(--bg-color-1-line)",
        "1-inset-line": "var(--bg-color-1-inset-line)",
      },

      backgroundColor: {
        // General background colors
        "0": "var(--bg-color-0)",
        "0-inset": "var(--bg-color-0-inset)",
        "1": "var(--bg-color-1)",
        "1-inset": "var(--bg-color-1-inset)",
        "2": "var(--bg-color-2)",

        // Dividing lines
        "0-line": "var(--bg-color-0-line)",
        "0-inset-line": "var(--bg-color-0-inset-line)",
        "1-line": "var(--bg-color-1-line)",
        "1-inset-line": "var(--bg-color-1-inset-line)",

        // Scrollbar
        "0-scrollbar": "var(--bg-color-0-scroll-bar)",
        "0-scrollbar-hover": "var(--bg-color-0-scroll-bar-hover)",
      },

      textColor: {
        "0": "var(--text-color-0)",
        "1": "var(--text-color-1)",
        "2": "var(--text-color-2)",
        "3": "var(--text-color-3)",
        "4": "var(--text-color-4)",
        "5": "var(--text-color-5)",
        "6": "var(--text-color-6)",
        "0-muted": "var(--text-color-0-muted)",
        "0-error": "var(--text-color-0-error)",
        "0-hyperlink": "var(--text-color-0-hyperlink)",
        "0-hyperlink-hover": "var(--text-color-0-hyperlink-hover)",
      },

      fontFamily: {
        "0": "var(--text-font-0)",
        "1": "var(--text-font-1)",
        "2": "var(--text-font-2)",
        "3": "var(--text-font-3)",
        "4": "var(--text-font-4)",
      },
    },
  },
  plugins: [],
};
