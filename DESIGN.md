---
name: The Editorial Forge
colors:
  surface: '#fef9f0'
  surface-dim: '#ded9d1'
  surface-bright: '#fef9f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3ea'
  surface-container: '#f2ede4'
  surface-container-high: '#ece8df'
  surface-container-highest: '#e7e2d9'
  on-surface: '#1d1c16'
  on-surface-variant: '#444748'
  inverse-surface: '#32302b'
  inverse-on-surface: '#f5f0e7'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#8a4d4c'
  on-secondary: '#ffffff'
  secondary-container: '#fdb0ae'
  on-secondary-container: '#79403f'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#01210c'
  on-tertiary-container: '#6a8c6f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b1'
  on-secondary-fixed: '#380c0e'
  on-secondary-fixed-variant: '#6e3636'
  tertiary-fixed: '#c6ecca'
  tertiary-fixed-dim: '#abd0af'
  on-tertiary-fixed: '#01210c'
  on-tertiary-fixed-variant: '#2e4e35'
  background: '#fef9f0'
  on-background: '#1d1c16'
  surface-variant: '#e7e2d9'
typography:
  masthead:
    fontFamily: playfairDisplay
    fontSize: 120px
    fontWeight: '900'
    lineHeight: 110px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: playfairDisplay
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 68px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: playfairDisplay
    fontSize: 42px
    fontWeight: '700'
    lineHeight: 46px
  headline-md:
    fontFamily: ebGaramond
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 42px
  headline-sm:
    fontFamily: ebGaramond
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  body-lg:
    fontFamily: newsreader
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: newsreader
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
  label-caps:
    fontFamily: spaceMono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  caption:
    fontFamily: spaceMono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
spacing:
  unit: 4px
  gutter: 24px
  margin-edge: 40px
  column-gap: 32px
  rule-weight: 1px
---

## Brand & Style

The design system is rooted in the golden age of print journalism, blended with the precision of early mid-century computing. It targets a sophisticated audience of developers and creators, evoking a sense of "intellectual craftsmanship." The UI should feel like a premium, physical broadsheet newspaper that has been typeset by hand, yet contains the structured data of a technical terminal.

The aesthetic follows a **High-Contrast / Bold** and **Minimalist** hybrid. It rejects modern digital trends like gradients, blurs, and shadows in favor of "ink-on-paper" authenticity. Every element is governed by the logic of the printing press: heavy rules, clear columns, and a focus on hierarchical density. The emotional response is one of authority, legacy, and tactile permanence.

## Colors

The palette is anchored by a warm, aged paper stock (`#F6F1E8`) which serves as the canvas. Interaction is driven by high-contrast "ink" blacks and deep, historic pigments. 

- **Primary Canvas:** Use the primary paper color for the main background. Use the secondary paper for sidebar containers or meta-information blocks.
- **Ink & Typography:** Use the ink colors for all text and structural lines. The distinction between text and heading ink is subtle, providing a slight shift in visual weight rather than just color.
- **Accents:** Deep Burgundy and Forest Green are reserved strictly for Call to Action (CTA) elements and success states. They should never be used for decorative backgrounds or non-interactive elements.
- **Rules & Borders:** All separators use the border color, mimicking the thin brass rules used in traditional letterpress.

## Typography

Typography is the architecture of this design system. It utilizes three distinct families to manage the intersection of "News" and "Code."

1.  **Display (Playfair Display):** Used for the brand masthead and major section headlines. It should be set with tight leading and slight negative tracking to mimic historical front-page impact.
2.  **Editorial (ebGaramond & Newsreader):** Newsreader provides the legibility required for long-form reading, while ebGaramond handles sub-headlines with a more graceful, literary flair.
3.  **Terminal (SpaceMono):** Injected for technical metadata, labels, and timestamps. This provides the "IBM Terminal" influence, signaling that this is a tech-focused event despite its vintage exterior.

**Note:** Always use "smart quotes" and proper em-dashes to maintain the editorial standard.

## Layout & Spacing

The layout utilizes a **Fixed Grid** system inspired by newspaper broadsheets. Content is organized into a 12-column grid on desktop, which reflows into a single column on mobile.

- **Vertical Rhythm:** A strict baseline grid must be maintained. Space between paragraphs and sections should be multiples of 8px.
- **The "Rule":** Horizontal and vertical lines (Rules) are used to separate content. Use a 1px weight for standard separators and a 2px weight for the main masthead or primary section breaks.
- **Margins:** Generous outer margins (`40px+`) create a "framed" effect, making the screen feel like a page floating in space.
- **Columnar Layouts:** Long-form body text should ideally be constrained to a 6 or 8 column span to maintain an optimal line length (50-75 characters).

## Elevation & Depth

This design system is strictly **Flat**. Depth is communicated through stacking and containment rather than shadows or light effects.

- **Tonal Layers:** Use the transition from `#F6F1E8` (Primary) to `#EEE7D7` (Secondary) to indicate hierarchy or inset content (e.g., a "Correction" box or a "Side Bar").
- **Ink Outlines:** Elements are defined by 1px solid ink borders. There are no ambient shadows or blurs. 
- **Z-Indexing:** When an element must appear "above" another (like a dropdown or modal), it should have a solid 2px ink border and a non-transparent background to physically occlude the content behind it.

## Shapes

The shape language is **Sharp** and geometric. 

- **Corners:** All UI components—buttons, inputs, cards, and images—must have 0px border radius. This reinforces the "cut paper" and "terminal" aesthetic.
- **Images:** Photography should be treated with a subtle grain or a monochrome/duotone filter using the Ink and Paper colors. Images must always be rectangular, often framed with a 1px ink border and a small inner margin (padding) to resemble a mounted photograph.

## Components

### Buttons
Buttons are rectangular with a 1px or 2px solid border. 
- **Primary:** Solid `#161616` background with `#F6F1E8` text. 
- **CTA:** Solid `#5E2A2A` or `#24442C` background.
- **Secondary:** Transparent background with an ink border.
- **Interaction:** On hover, the colors should invert (Background becomes Ink, Text becomes Paper).

### Inputs & Forms
Text inputs are simple bottom-border lines or fully enclosed rectangles with no rounding. Labels must be set in `label-caps` (Space Mono) above the input field. Error states use the Burgundy accent color for both text and border.

### Chips & Tags
Tags are styled to look like "Slug" lines in journalism. Use `label-caps` typography, enclosed in a thin 1px border. No background fill unless the tag is being used as a high-priority category marker.

### Cards & Sections
Cards are not used in the traditional "shadowed box" sense. Instead, use "Editorial Blocks" defined by a top and bottom 1px horizontal rule. If a container is necessary, use a solid background of `#EEE7D7` with no shadow.

### Newspaper Rules
A decorative but functional component: a double horizontal line (one thick, one thin) used to denote the start of a major new section or the footer.