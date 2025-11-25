# Color System Documentation

## Overview

This project uses a comprehensive color system that supports both light and dark modes. The system is built on 5 main color categories, each with multiple shades for flexibility.

## Color Categories

### 1. **Text Colors**

Used for all text content in the application.

- `text` - Main text color
- `text-secondary` - Secondary text (less prominent)
- `text-muted` - Muted text (even less prominent)
- `text-inverse` - Text on dark/light backgrounds (opposite of main)

**Usage:**

```tsx
<p className="text">Main text</p>
<p className="text-secondary">Secondary text</p>
<p className="text-muted">Muted text</p>
<div className="bg-secondary">
  <p className="text-inverse">Text on dark background</p>
</div>
```

### 2. **Background Colors**

Used for backgrounds and surfaces.

- `background` - Main background color
- `background-secondary` - Secondary background
- `background-tertiary` - Tertiary background
- `background-inverse` - Inverse background

**Usage:**

```tsx
<div className="bg-background">Main background</div>
<div className="bg-background-secondary">Secondary background</div>
```

### 3. **Primary Colors** (Lime Green - Brand Color)

The main brand color with shades from 50 (lightest) to 900 (darkest).

- `primary` - Main brand color (#BBFF00)
- `primary-50` through `primary-900` - Shades

**Usage:**

```tsx
<button className="bg-primary">Primary Button</button>
<div className="bg-primary-100">Light primary background</div>
<div className="border-primary-500">Primary border</div>
```

### 4. **Secondary Colors** (Gray/Dark)

Secondary colors for UI elements.

- `secondary` - Main secondary color
- `secondary-50` through `secondary-900` - Shades

**Usage:**

```tsx
<div className="bg-secondary">Dark background</div>
<p className="text-secondary-600">Gray text</p>
```

### 5. **Accent Colors** (Blue)

Accent colors for highlights and interactive elements.

- `accent` - Main accent color
- `accent-50` through `accent-900` - Shades

**Usage:**

```tsx
<button className="bg-accent">Accent Button</button>
<div className="border-accent-500">Accent border</div>
```

## Using Colors in Components

### Method 1: Tailwind Classes (Recommended)

```tsx
<div className="bg-primary text-text">
  Content with primary background and main text color
</div>
```

### Method 2: Props (For Component APIs)

All custom components accept color names as props:

```tsx
<Header backgroundColor="secondary" textColor="text-inverse" />
<SideTab color="primary" />
<ProfileImage frameColor="primary" />
<ImageGallery backgroundColor="primary" />
```

### Method 3: Hex Colors (Fallback)

You can still use hex colors if needed:

```tsx
<Header backgroundColor="#1f1f1f" textColor="#ffffff" />
```

## Dark Mode

Dark mode is enabled using the `class` strategy. Add the `dark` class to the root element to enable dark mode:

```tsx
<html className="dark">{/* Your app */}</html>
```

### Color Behavior in Dark Mode

- **Text colors**: Automatically invert (dark text becomes light)
- **Background colors**: Automatically invert (light backgrounds become dark)
- **Primary colors**: Shades are inverted (50 becomes darker, 900 becomes lighter)
- **Secondary colors**: Shades are inverted
- **Accent colors**: Uses brighter shades for better visibility

## Color Configuration Files

### 1. `/config/colors.ts`

Contains the complete color palette with light and dark mode values.

### 2. `/app/globals.css`

Defines CSS variables that Tailwind uses. These variables automatically switch based on light/dark mode.

### 3. `/tailwind.config.ts`

Configures Tailwind to use the CSS variables.

### 4. `/lib/color-utils.ts`

Utility functions to handle both Tailwind color names and hex colors.

## Examples

### Complete Component Example

```tsx
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";

export default function Page() {
  return (
    <div className="bg-background min-h-screen">
      <Header backgroundColor="secondary" textColor="text-inverse" />

      <main className="container mx-auto">
        <HeroSection name="John Doe" accentColor="primary" />
      </main>
    </div>
  );
}
```

### Mixing Tailwind Classes and Props

```tsx
<div className="bg-background-secondary p-8">
  <SideTab color="primary" className="shadow-lg" />
</div>
```

## Color Palette Reference

### Light Mode

| Category   | Default | Hex Value |
| ---------- | ------- | --------- |
| text       | DEFAULT | #1f1f1f   |
| background | DEFAULT | #ffffff   |
| primary    | DEFAULT | #bbff00   |
| secondary  | DEFAULT | #1f1f1f   |
| accent     | DEFAULT | #3b82f6   |

### Dark Mode

| Category   | Default | Hex Value |
| ---------- | ------- | --------- |
| text       | DEFAULT | #f9fafb   |
| background | DEFAULT | #0f0f0f   |
| primary    | DEFAULT | #bbff00   |
| secondary  | DEFAULT | #f9fafb   |
| accent     | DEFAULT | #60a5fa   |

## Best Practices

1. **Use semantic color names** instead of hex codes for better theme support
2. **Use the appropriate category** (text for text, background for backgrounds, etc.)
3. **Test in both light and dark modes** to ensure readability
4. **Use shades consistently** (e.g., always use 500 for main elements, 100 for subtle backgrounds)
5. **Avoid hardcoding colors** - use the color system for consistency

## Migration from Hex Colors

If you have existing hex colors, replace them as follows:

- `#BBFF00` or `#b3ff00` → `primary`
- `#1f1f1f` → `secondary`
- `#ffffff` → `background`
- `#000000` or dark colors → `text`
- Blue colors → `accent`

## Troubleshooting

### Colors not changing in dark mode?

- Ensure `darkMode: "class"` is set in `tailwind.config.ts`
- Check that the `dark` class is applied to the root element

### Custom color not working?

- Make sure you're using the correct prefix (`bg-`, `text-`, `border-`)
- Check that the color is defined in `globals.css` and `tailwind.config.ts`

### Component prop not accepting color name?

- Ensure the component is using the `getColorStyle` utility from `/lib/color-utils.ts`
- Check that the prop documentation specifies it accepts Tailwind color names
