import type { Config } from "tailwindcss";

const config: Config = {
content: [
"./app/**/*.{js,ts,jsx,tsx,mdx}",
"./components/**/*.{js,ts,jsx,tsx,mdx}",
"./pages/**/*.{js,ts,jsx,tsx,mdx}"
],

theme: {
extend: {
colors: {
primary: "var(--primary-color)",
background: "var(--background-color)",
foreground: "var(--foreground-color)"
},

```
  borderRadius: {
    xl: "1rem",
    "2xl": "1.5rem"
  },

  boxShadow: {
    card: "0 4px 20px rgba(0,0,0,0.08)"
  }
}
```

},

plugins: []
};

export default config;
