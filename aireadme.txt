================================================================================
LOOPDEV HUB V2.2 - AI DOCUMENTATION (AIREADME.TXT)
================================================================================

PROJECT GOAL: 
Complete transformation of the LoopDev Hub into a premium, single-page 
"Obsidian Sanctum" portfolio. Focused on high-fidelity aesthetics, 
personal branding for Balram, and hardened cybersecurity-inspired design.

--------------------------------------------------------------------------------
FILE MANIFEST & PURPOSE
--------------------------------------------------------------------------------

[FRONTEND CORE]
- src/main.jsx           : Application entry point.
- src/App.jsx            : Main router and layout management.
- src/index.css          : THE DESIGN SYSTEM. Contains global tokens for OLED 
                           blacks, neon cyan, noise grain texturing, and 
                           scroll-snap utilities.

[PAGES]
- src/pages/Portfolio.jsx: The central hub. A single-page container using CSS 
                           Scroll Snapping to orchestrate the vertical journey.

[COMPONENTS - CORE]
- src/components/Navbar.jsx      : Glassmorphic navigation bar with reactive 
                                   Blue Neon hover glow and smooth-scroll links.
- src/components/Hero.jsx        : Personal splash screen featuring the 
                                   "Neural Core" (rotating 3D entity) and 
                                   identity rebranding.
- src/components/IntroScreen.jsx : The "Hello World" boot sequence. Handles 
                                   the premium digital reveal on initial visit.
- src/components/ProjectCard.jsx : High-contrast interactive cards for 
                                   showcasing technical incursions.

[COMPONENTS - SECTIONS]
- src/components/sections/About.jsx    : Bio section with a physics-based 3D 
                                         "Corner-Tilt" profile interaction.
- src/components/sections/Timeline.jsx : "Trajectory" path. A vertical learned 
                                         milestone tracker with a technical 
                                         "Show More" expansion logic.
- src/components/sections/Contact.jsx  : Minimalist social portal for 
                                         establishing a direct link.

--------------------------------------------------------------------------------
WHAT WAS DONE (THE REFINEMENT LOG)
--------------------------------------------------------------------------------

1. ARCHITECTURE: Refactored the entire project from a fragmented multi-page 
   site into a single-page scrolling "Deck" experience.
   
2. SCROLL LOGIC: Implemented native CSS Scroll Snapping (snap-y mandatory). 
   Each section now snaps perfectly to the viewport for a polished, intentional 
   feel.

3. BRANDING: 
   - Shifted focus from generic "LoopDev Hub" text to "Hello World. I am Balram."
   - Standardized colors: White for narrative text, Cyan for identity branding.

4. ANTI-AI STYLING: Purged all "AI-generated" boilerplate patterns:
   - Removed the "Step 01 // Identity" monospace labels.
   - Replaced with handcrafted "Numeric Background Markers" (01, 02, 03...).
   - Added a subtle noise grain overlay to break digital flatness.

5. POLISH & PHYSICS:
   - Added a rotating "Neural Core" geometric animation to the background.
   - Enhanced the "Hello World" reveal with weighted Power4 easing.
   - Implemented reactive Neon Glows on the Navbar and interactive Link elements.
   - Removed all generic cybersecurity placeholder stats (Active Nodes, etc.).

6. BUG FIXES:
   - Resolved Lucide-React icon export crashes (switched to safe exports).
   - Fixed missing React hooks (useEffect) in navigation components.
   - Corrected nested DIV syntax errors in the Timeline section.

================================================================================
REFINED BY: ANTIGRAVITY AI
================================================================================
