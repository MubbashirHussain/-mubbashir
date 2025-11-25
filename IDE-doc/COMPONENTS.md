# Component Documentation

This document provides an overview of the reusable components created for the portfolio website.

## Components Overview

### 1. Header Component

**Location:** `/components/layout/header.tsx`

A configurable navigation header built on top of the SideTab component.

**Props:**

```tsx
interface HeaderProps {
  links?: NavLink[]; // Array of navigation links
  backgroundColor?: string; // Background color (default: "#1f1f1f")
  textColor?: string; // Text color for links (default: "white")
  width?: string; // Width of header (default: "30%")
  height?: string; // Height of header (default: "7%")
  radius?: string; // Border radius (default: "40px")
  cornerSize?: number; // Size of inverted corners (default: 40)
  className?: string; // Additional CSS classes
  navGap?: string; // Gap between nav items (default: "gap-8")
}

interface NavLink {
  label: string; // Display text
  href: string; // Link URL
  target?: string; // Link target attribute
  rel?: string; // Link rel attribute
}
```

**Example Usage:**

```tsx
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

<Header links={navLinks} backgroundColor="#1f1f1f" textColor="white" />;
```

---

### 2. HeroSection Component

**Location:** `/components/sections/hero-section.tsx`

A hero section with customizable content, decorative side tabs, and CTA button.

**Props:**

```tsx
interface HeroSectionProps {
  name?: string; // Name to display (default: "Mubbashir")
  description?: string; // Bio/description text
  ctaText?: string; // CTA button text (default: "Get in touch")
  onCtaClick?: () => void; // CTA button click handler
  showOpenToWork?: boolean; // Show "Open to Work" badge (default: true)
  openToWorkText?: string; // Badge text (default: "Open to work")
  accentColor?: string; // Accent color (default: "#BBFF00")
  className?: string; // Additional CSS classes
}
```

**Example Usage:**

```tsx
<HeroSection
  name="John Doe"
  description="I'm a developer creating amazing experiences..."
  ctaText="Hire me"
  onCtaClick={() => (window.location.href = "/contact")}
  accentColor="#00FF00"
/>
```

---

### 3. ProfileImage Component

**Location:** `/components/ui/profile-image.tsx`

An interactive profile image with 3D tilt effect and floating icons.

**Props:**

```tsx
interface ProfileImageProps {
  imageSrc?: string; // Image path (default: "/hero-person.png")
  imageAlt?: string; // Alt text (default: "Portrait")
  frameColor?: string; // Frame color (default: "#b3ff00")
  grayscale?: boolean; // Apply grayscale filter (default: true)
  floatingIcons?: FloatingIcon[]; // Array of floating icons
  className?: string; // Additional CSS classes
}

interface FloatingIcon {
  icon: LucideIcon; // Icon component from lucide-react
  backgroundColor: string; // Icon container background
  position: string; // Position className (e.g., "-right-8 top-20")
  size?: number; // Icon size (default: 24)
}
```

**Example Usage:**

```tsx
import { Github, Linkedin } from "lucide-react";

const floatingIcons = [
  {
    icon: Github,
    backgroundColor: "#1f1f1f",
    position: "-right-8 top-20",
    size: 24,
  },
  {
    icon: Linkedin,
    backgroundColor: "#0077b5",
    position: "-left-6 bottom-32",
    size: 24,
  },
];

<ProfileImage
  imageSrc="/profile.jpg"
  frameColor="#BBFF00"
  floatingIcons={floatingIcons}
/>;
```

---

### 4. ImageGallery Component

**Location:** `/components/ui/image-gallery.tsx`

A configurable image gallery with placeholder boxes.

**Props:**

```tsx
interface ImageGalleryProps {
  imageCount?: number; // Number of images (default: 3)
  backgroundColor?: string; // Background color (default: "#BBFF00")
  borderRadius?: string; // Border radius (default: "60px")
  width?: string; // Container width (default: "50%")
  height?: string; // Container height (default: "30%")
  position?: {
    // Position object
    bottom?: string;
    left?: string;
    top?: string;
    right?: string;
  };
  gap?: string; // Gap between images (default: "gap-6")
  padding?: string; // Container padding
  className?: string; // Additional CSS classes
  imageBoxClassName?: string; // Custom image box classes
}
```

**Example Usage:**

```tsx
<ImageGallery
  imageCount={4}
  backgroundColor="#BBFF00"
  borderRadius="60px"
  position={{ bottom: "0", left: "0" }}
/>
```

---

### 5. SideTab Component

**Location:** `/components/ui/side-tab.tsx`

A decorative tab component with inverted corners (already existing, now supports children).

**New Feature:** Now supports `children` prop to render content inside the tab.

**Example Usage:**

```tsx
<SideTab side="top" color="#1f1f1f" width="30%" height="7%">
  <nav>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </nav>
</SideTab>
```

---

### 6. InvertedCorner Component

**Location:** `/components/ui/inverted-corner.tsx`

Creates smooth inverted corners (already existing, now supports custom viewBox).

**New Feature:** Now supports `viewBox` prop for custom SVG viewBox values.

---

## Usage in Main Page

See `/app/page.tsx` for a complete example of how these components work together:

```tsx
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { ProfileImage } from "@/components/ui/profile-image";
import { ImageGallery } from "@/components/ui/image-gallery";

export default function Home() {
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#services" },
    // ... more links
  ];

  return (
    <main>
      <Header links={navLinks} />

      <Container>
        <HeroSection name="Your Name" />
        <ProfileImage imageSrc="/your-image.jpg" />
        <ImageGallery imageCount={3} />
      </Container>
    </main>
  );
}
```

## Benefits of This Architecture

1. **Reusability**: All components can be used anywhere in the application
2. **Configurability**: Props allow easy customization without code changes
3. **Maintainability**: Changes to a component affect all instances
4. **Type Safety**: Full TypeScript support with documented interfaces
5. **Separation of Concerns**: Each component has a single, clear responsibility

## Color Constants

Defined in `/app/page.tsx`:

```tsx
const LIME_COLOR = "#b3ff00";
const BG_DARK = "#1f1f1f";
```

Consider moving these to a shared constants file for project-wide use.
