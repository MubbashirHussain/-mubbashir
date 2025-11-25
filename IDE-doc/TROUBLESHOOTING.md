# Troubleshooting: Black Screen Issue

## Problem

The website appears all black even though the browser is in light mode.

## Likely Causes

1. **Tailwind not detecting dynamic classes** - When classes are generated dynamically (e.g., `bg-${color}`), Tailwind can't detect them at build time
2. **Dev server cache** - The dev server might be using cached styles
3. **CSS variables not loading** - The CSS variables might not be properly defined

## Solutions to Try

### Solution 1: Hard Refresh (Try this first!)

1. Open your browser
2. Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
3. This clears the cache and reloads everything

### Solution 2: Restart Dev Server

1. Stop the current dev server (Ctrl+C in terminal)
2. Run `npm run dev` again
3. Wait for it to fully compile
4. Refresh your browser

### Solution 3: Clear Next.js Cache

```bash
rm -rf .next
npm run dev
```

### Solution 4: Check Browser Console

1. Open browser DevTools (F12)
2. Check the Console tab for any errors
3. Check the Elements tab and inspect the `<body>` or main container
4. Look at the computed styles to see what's actually being applied

### Solution 5: Temporary Inline Styles

If Tailwind classes aren't working, the components will fall back to inline styles (hex colors still work).

## Debugging Steps

1. **Check if CSS variables are defined:**

   - Open DevTools
   - Go to Elements tab
   - Select the `<html>` or `<body>` element
   - Look at Computed styles
   - Search for `--color-background` - it should be `255 255 255` in light mode

2. **Check if Tailwind classes are applied:**

   - Inspect an element that should have `bg-background`
   - Look at the Classes in the Elements panel
   - See if `bg-background` is there and if it has any styles

3. **Check the generated CSS:**
   - In DevTools, go to Sources or Network tab
   - Find the CSS file
   - Search for `.bg-background` - it should exist

## Current Configuration

The color system uses:

- CSS variables defined in `/app/globals.css`
- Tailwind config in `/tailwind.config.ts`
- Color utilities in `/lib/color-utils.ts`

All components support both:

- Tailwind color names (e.g., `"primary"`)
- Hex colors (e.g., `"#BBFF00"`)

## If Nothing Works

As a last resort, you can temporarily switch back to hex colors:

In `/app/page.tsx`, change:

```tsx
backgroundColor="secondary"  →  backgroundColor="#1f1f1f"
color="primary"  →  color="#BBFF00"
```

This will use inline styles instead of Tailwind classes.
