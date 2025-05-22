# Stashly Style Guide

This document outlines the key aesthetic principles and design patterns used in Stashly's frontend components, based on current implementations in the landing page sections.

## Visual Language

### Section Structure
- **Container Pattern**: All major sections use consistent container sizing: `w-full max-w-7xl mx-auto px-4 py-12 md:py-16`.
- **Content Containers**: Main content areas use `border bg-card/50 overflow-hidden shadow-sm rounded-lg`.
- **Responsive Grid**: Features use a responsive grid layout that adapts from 1 column (mobile) → 2 columns (medium) → 3 columns (large).

### Typography
- **Section Headers**:
  - Primary headings: `text-xl md:text-2xl lg:text-3xl font-bold font-heading`
  - Always use `font-heading` for main headings and feature titles
- **Feature Elements**:
  - Feature titles: `text-xl font-semibold font-heading tracking-tight`
  - Categories: `text-primary font-medium`
  - Descriptions: `text-sm text-muted-foreground`
- **Interactive Elements**:
  - Accordion triggers: `text-sm md:text-base font-medium`
  - Accordion content: `text-base text-muted-foreground whitespace-pre-wrap`

### Spacing
- **Vertical Rhythm**: Section header area uses `space-y-4` for internal elements and `mb-8` to separate from content.
- **Content Padding**: Feature items use `p-6` for consistent internal padding.
- **Element Spacing**: Feature items use `mb-3` between header elements and content.

### Colors
- **Primary Palette**:
  - Background: Subtle content backgrounds with `bg-card/50` for depth without heavy contrast.
  - Accents: `bg-primary/10` with `text-primary` for elements requiring emphasis.
  - Muted elements: `text-muted-foreground` for secondary text.
- **Hover States**: 
  - Features: `hover:bg-muted/50` for subtle feedback
  - Accordion: `hover:bg-muted/30` for interactive elements

## Interactive Elements

### Hover Effects
- **Animation**: Feature icons use the `group-hover/item:animate-pulse` pattern with `transition-all duration-150`.
- **Background Changes**: Elements use hover backgrounds like `hover:bg-muted/50` or `hover:bg-muted/30`.

## Component Structure

### Section Headers
- **Icon + Title Pattern**: Sections start with:
  1. A centered icon in a circle: `mx-auto bg-muted/50 w-12 h-12 rounded-full flex items-center justify-center`
  2. A heading with `font-heading` class
  3. A descriptive paragraph with `max-w-md mx-auto`

### Feature Items
- **Structure**: Each feature follows a consistent pattern:
  1. Icon + Category grouped with flex layout
  2. Title with `font-heading`
  3. Description
- **Visual Hierarchy**:
  - Icon in container: `bg-primary/10 p-2 rounded-md`
  - Category label: `text-primary font-medium`
  - Title: `text-xl font-semibold font-heading tracking-tight`
  - Description: `text-sm text-muted-foreground`

### Icon Usage
- **Sizing**: Features use `size-3` for feature icons, `h-6 w-6` for section icons
- **Section Icons**: Use `text-muted-foreground` for section header icons
- **Feature Icons**: Use `text-primary` for all feature icons

## Responsive Design

### Breakpoints
- **Mobile-First**: Components designed for mobile first, then adapt at breakpoints
- **Grid Adaptation**: 
  - Mobile: 1 column (`grid-cols-1`)
  - Medium: 2 columns (`md:grid-cols-2`)
  - Large: 3 columns (`lg:grid-cols-3`)
- **Typography Scaling**: Text sizes increase at breakpoints (`text-xl md:text-2xl lg:text-3xl`)

### Interactive Elements
- **Accordion**: Uses `text-sm md:text-base` to scale text size responsively
- **Padding**: Consistent internal padding with `px-6 py-4` for interactive elements

## Implementation Notes

When implementing new components:

1. Always use `font-heading` for all main headings and feature titles
2. Maintain the section header pattern with centered icon + title + description
3. Follow the responsive grid system with appropriate border logic
4. Use the established color system with primary accents and muted text
5. Keep interactive elements subtle with appropriate hover states
6. Use consistent spacing patterns within and between sections
7. Ensure icons use the correct sizing and colors based on their context
8. Maintain responsive behavior across all breakpoints 