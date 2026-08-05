# Product Requirements Document  
## Jupiter — Artist Portfolio Website

**Version:** 1.0  
**Date:** August 6, 2026  
**Platform:** Responsive web application  
**Page structure:** Single-page horizontal-scrolling portfolio

---

## 1. Product Overview

Jupiter’s Artist Portfolio is a one-page website designed to showcase the artist’s work, creative process, and visual identity.

On desktop, the website behaves like a continuous horizontal exhibition. The user scrolls with their mouse wheel, but the website moves sideways through a series of connected visual panels.

On mobile devices, the website switches to conventional vertical scrolling for easier navigation.

The portfolio will use a vintage celestial aesthetic combining:

- Art Deco geometry
- Mystical and occult-inspired imagery
- Decorative celestial lines
- Stars, moons, constellations, and orbit motifs
- Warm off-white backgrounds
- Dark ink-like typography and details
- Subtle gold or muted brown accents

The website should feel artistic and memorable without making the artwork difficult to view.

---

## 2. Product Goals

### Primary Goal

Help Jupiter present a polished and distinctive art portfolio when applying for:

- Artist internships
- Game artist internships
- Illustration-related opportunities
- Creative industry positions

### Secondary Goal

Allow followers and visitors to explore Jupiter’s artwork and creative process in an engaging format.

### Success Indicators

The website succeeds when visitors can:

1. Understand who Jupiter is within the opening section.
2. View the strongest artwork without searching through multiple pages.
3. Recognize the artist’s creative process and artistic range.
4. Distinguish between character art, illustrations, and commissioned work.
5. Reach Jupiter’s Linktree easily.
6. Navigate the portfolio comfortably on desktop and mobile.

---

## 3. Target Audience

### Primary Audience

- Recruiters
- Internship coordinators
- Art directors
- Game development studios
- Creative employers

### Secondary Audience

- Existing followers
- Potential followers
- Fellow artists
- General portfolio visitors

The experience should prioritize quick visual evaluation because employers may only spend a short amount of time reviewing the portfolio.

---

## 4. Creative Direction

### Visual Theme

**Vintage Celestial Art Deco**

The interface should resemble a curated celestial archive, antique observatory, mystical manuscript, or decorative tarot-inspired exhibition.

The occult influence should remain elegant and atmospheric rather than dark, frightening, or overly theatrical.

### Color Direction

Suggested palette:

- Warm off-white or aged ivory background
- Deep charcoal or near-black text
- Muted antique gold accents
- Warm brown linework
- Optional faded burgundy or dusty blue details

Pure white should be avoided as the primary background.

### Typography

The website should use two main type styles:

1. **Decorative display font**  
   Used for the Jupiter wordmark, major headings, and large category titles.

2. **Readable serif or clean sans-serif font**  
   Used for the biography, process descriptions, captions, and interface controls.

The logo will be a text-based wordmark rather than an illustrated logo.

### Decorative Elements

Possible recurring elements include:

- Art Deco borders
- Thin framing lines
- Star maps
- Crescent moons
- Sunbursts
- Small constellation patterns
- Orbital circles
- Corner ornaments
- Numbered exhibition labels
- Subtle paper or print texture

Decorations must frame the artwork rather than overlap or compete with it.

---

## 5. Information Architecture

The website will contain five connected visual chapters.

### Chapter 01 — Opening

Purpose: Introduce the artist and establish the visual identity.

Content:

- Animated Jupiter wordmark
- Short title such as “Digital Artist and Illustrator”
- Small visual prompt indicating that the user should scroll
- Decorative celestial composition
- Optional background music control

The opening should fill the viewport and immediately establish the portfolio’s atmosphere.

### Chapter 02 — About

Purpose: Briefly introduce Jupiter without becoming a full résumé page.

Content:

- Artist name: Jupiter
- Short artist biography
- Optional portrait illustration, mascot, symbol, or signature artwork
- One concise statement about artistic interests or specialization

The section should remain brief and visually led.

### Chapter 03 — Process

Purpose: Show employers how Jupiter develops artwork.

The process should be presented as a visual sequence rather than a large paragraph.

Suggested stages:

1. Concept or reference gathering
2. Sketch
3. Base colors
4. Rendering
5. Final artwork

Each stage may include:

- One process image
- A short title
- One or two lines of explanation
- Animated connecting lines or progress markers

The process section may resemble a constellation, celestial timeline, or unfolding manuscript.

### Chapter 04 — Art Archive

Purpose: Display the main portfolio.

The archive will be divided into three clearly labeled collections:

#### Character Art

Original character designs, character-focused drawings, expression work, outfits, or character sheets.

#### Illustrations

Finished illustrations with stronger composition, storytelling, environments, or detailed rendering.

#### Commissions

Selected commissioned pieces that demonstrate the ability to work from client directions and references.

The categories should be presented as connected sections within the horizontal journey rather than separate website pages.

Each category should begin with:

- Large category title
- Short optional description
- Selected artwork grid or editorial arrangement

Quality should be prioritized over quantity. The strongest work should appear first.

### Chapter 05 — Contact

Purpose: Provide one clear final action.

Content:

- Closing statement
- Linktree button
- Optional small social icons only when they link through Linktree
- Animated Jupiter wordmark or signature
- Music control
- Back-to-start control

Commission prices and commission terms will not appear because they are already hosted on a separate website.

---

## 6. Desktop Scrolling Experience

### Horizontal Scrolling

The portfolio will use horizontal scrolling on desktop.

Expected behavior:

- The user moves the mouse wheel vertically.
- Vertical wheel movement is translated into horizontal page movement.
- Trackpad horizontal gestures should also work naturally.
- Scrolling should feel smooth but remain under the user’s control.
- The user must be able to reverse direction immediately.
- The website should not automatically drag the user between sections.

Optional subtle section snapping may be used, but it should not feel restrictive.

### Progress Indicator

A small celestial progress indicator should show the visitor’s current position.

Possible presentation:

- A constellation line that gradually completes
- Roman numerals representing each chapter
- Small stars lighting up as sections are reached
- A thin decorative progress bar

---

## 7. Mobile Experience

On mobile and narrow screens:

- Horizontal scrolling is disabled.
- Sections stack vertically.
- Artwork grids adapt to one or two columns.
- The custom cursor is disabled.
- Decorative elements are simplified.
- Text remains readable without zooming.
- Music and gallery controls remain accessible.
- Hover-only interactions receive tap equivalents.

The mobile version should preserve the celestial visual identity without attempting to imitate the entire desktop interaction.

---

## 8. Gallery Requirements

### Default Display

Artwork should appear in a simple curated gallery with varied but organized image sizing.

Possible layouts include:

- Editorial grid
- Structured masonry layout
- Framed exhibition arrangement

The layout should not crop important parts of the artwork unless separate thumbnails are created.

### Artwork Pop-Out

Selecting an artwork opens it in an animated overlay.

The overlay includes:

- Larger version of the artwork
- Artwork title
- Category
- Optional year
- Optional short description
- Previous and next controls
- Close control

### Animation

The selected image should appear to expand from its original gallery position.

The overlay background may use:

- Soft off-white
- Light translucent paper effect
- Subtle decorative border
- Darkened page with warm tint

Users should be able to close the overlay by:

- Selecting the close button
- Pressing the Escape key
- Clicking outside the artwork

---

## 9. Animation Requirements

Animations should make the website feel alive but should not delay access to the artwork.

### Logo Animation

The Jupiter text logo should react on hover.

Possible effects:

- Letters separate slightly
- Decorative stars appear around the word
- A light passes across the lettering
- The word transitions from outline to filled lettering
- Small orbiting elements rotate around the text

### Section Transitions

As users move through the portfolio:

- Decorative lines draw themselves
- Stars fade or scale into view
- Artwork gently rises or reveals itself
- Section numbers appear
- Background ornaments shift at different speeds

### Gallery Interaction

- Images lift slightly on hover.
- Decorative frames expand or brighten.
- Artwork transitions smoothly into the pop-out viewer.

### Reduced Motion

Visitors who enable reduced-motion settings should receive a simplified version with fades and minimal movement.

Animations must never prevent users from viewing or navigating the content.

---

## 10. Custom Cursor

Desktop users will see a custom cursor inspired by the celestial theme.

Possible design:

- Small four-point star
- Crescent and dot combination
- Thin circular orbit
- Art Deco pointer

Cursor behavior:

- Expands over clickable artwork
- Changes appearance over links
- Displays a small “View” label over gallery pieces
- Remains precise enough to use comfortably

The native cursor should be restored if the custom cursor fails to load. The custom cursor will not be used on touch devices.

---

## 11. Loading Screen

A short loading screen will introduce the visual identity while essential portfolio assets load.

Content may include:

- Jupiter wordmark
- Rotating celestial symbol
- Decorative loading line
- Percentage or simple progress indicator

Requirements:

- The loader must disappear as soon as essential content is ready.
- It should not intentionally delay the visitor.
- It should appear only briefly on repeat visits.
- Visitors should not be forced to watch a long opening animation.

---

## 12. Music

The website may include optional atmospheric background music.

Requirements:

- Music is off by default.
- The visitor manually starts it using a clearly visible control.
- The control supports play, pause, and mute.
- The current state remains consistent while moving between sections.
- The audio loops smoothly.
- The music should not restart when an artwork is opened.
- Music controls must remain visible and accessible.

The selected audio should be original, licensed, royalty-free, or otherwise legally usable on the website.

---

## 13. Navigation

Although the portfolio is a continuous experience, visitors should not be forced to scroll through every section.

A compact navigation control should provide direct access to:

- About
- Process
- Character Art
- Illustrations
- Commissions
- Contact

The navigation may be presented as:

- Roman numerals
- Celestial symbols
- A decorative chapter index
- A small expandable menu

Section names should still appear somewhere for clarity.

---

## 14. Recommended Technology

### Core Stack

- **React**
- **TypeScript**
- **Vite**
- **CSS Modules or structured global CSS**
- **Motion for React**

React with TypeScript and Vite is the recommended setup because this is a focused, static one-page experience that does not require server rendering, complex routing, accounts, or a database. Vite provides an official React TypeScript starter and generates optimized static production assets.

Motion for React is recommended for the artwork expansion, logo hover effects, section reveals, scroll-based animation, and loading-screen transitions. Its official tools support hover gestures, enter and exit animation, scroll values, SVG animation, and reduced-motion handling.

### Suggested Project Structure

```text
src/
├── assets/
│   ├── artwork/
│   ├── process/
│   ├── audio/
│   └── decorations/
├── components/
│   ├── ArtworkCard/
│   ├── ArtworkModal/
│   ├── CustomCursor/
│   ├── HorizontalScroll/
│   ├── LoadingScreen/
│   ├── MusicPlayer/
│   ├── Navigation/
│   └── Wordmark/
├── sections/
│   ├── Hero/
│   ├── About/
│   ├── Process/
│   ├── Gallery/
│   └── Contact/
├── data/
│   └── artworks.ts
├── styles/
├── App.tsx
└── main.tsx
```

Artwork information should be stored in a separate data file so pieces can be added or rearranged without rewriting gallery components.

---

## 15. Artwork Data Model

Each artwork entry should support:

```ts
type Artwork = {
  id: string;
  title: string;
  category: "character" | "illustration" | "commission";
  thumbnail: string;
  fullImage: string;
  altText: string;
  year?: number;
  description?: string;
};
```

Fields such as year and description may remain hidden until content is prepared.

---

## 16. Performance Requirements

Because the portfolio will contain many large images:

- Gallery thumbnails should use compressed formats.
- Full-resolution images should load only when needed.
- Images outside the visible area should be lazy-loaded.
- The first section should load before the entire gallery.
- Decorative textures should be compressed.
- Animations should avoid making scrolling laggy.
- Music should not load at the highest priority.
- The loading screen should reflect actual loading rather than functioning as a fixed delay.

The website must remain usable even if animations, audio, or the custom cursor fail.

---

## 17. Accessibility Requirements

- Every artwork must include meaningful alternative text.
- Interactive controls must support keyboard navigation.
- Text must maintain sufficient contrast against the off-white background.
- The gallery overlay must trap focus while open.
- Escape must close the gallery overlay.
- Music controls must have visible labels.
- The website must respect reduced-motion preferences.
- Decorative images should be hidden from screen readers.
- Horizontal scrolling must not prevent keyboard or trackpad navigation.

---

## 18. Out of Scope

The first version will not include:

- Commission pricing
- Commission order forms
- Terms of service
- Client accounts
- E-commerce
- Blog posts
- Multiple website pages
- Dark mode
- Content management system
- Résumé section
- Detailed personal information
- Separate social media buttons outside Linktree

These features may be considered in a future version but are not required for launch.

---

## 19. Initial Content Requirements

The first version requires:

- Jupiter wordmark
- Short artist biography
- One complete process example
- Selected character artwork
- Selected illustrations
- Selected commission pieces
- Linktree URL
- Optional background music file
- Optional celestial loading symbol

Placeholder content may be used during development.

---

## 20. Acceptance Criteria

The first version is complete when:

1. The website displays as one continuous horizontal portfolio on desktop.
2. Mouse-wheel scrolling moves the desktop experience sideways.
3. The website becomes vertically scrollable on mobile.
4. The opening section contains the animated Jupiter wordmark.
5. The About section contains the artist name and short biography.
6. The Process section clearly shows the artwork development stages.
7. Character art, illustrations, and commissions are visibly separated.
8. Selecting an artwork opens an animated larger view.
9. The gallery can be operated with a keyboard.
10. The Linktree contact button is easy to find.
11. Music can be manually played, paused, and muted.
12. The custom cursor only appears on compatible desktop devices.
13. Visitors with reduced-motion preferences receive simplified animations.
14. Large portfolio images are loaded efficiently.
15. The portfolio remains functional if optional effects are unavailable.