# BBC-Style SharePoint News Webpart  
**Built collaboratively with ChatGPT-5 + SPFx + PnPjs + Tailwind**

This project explores what happens when an experienced SharePoint developer partners with AI to build a complete, production-ready SPFx component.  
The goal: recreate a **BBC-style news layout** — accessible, dynamic, and editable — entirely through AI-assisted development.

---

## 🧠 Summary

By the final count, the build involved **~63 user prompts** and **~63 assistant replies** — about **130 messages in total**.  
Each iteration refined functionality, accessibility, and maintainability until we had a fully working, installable SPFx webpart.

---

## 🔧 Main areas we covered

### 🧩 SPFx + PnPjs Wiring
- Correct `spfi().using(SPFx(...))` setup  
- Batched list queries via `sp.web.batched()`  
- Filter logic: `PromotedState = 2` (published news)  
- Fixed type errors, `ISPQueryable` mismatches, and `sp.web` injection  

### ⚙️ Build & Runtime Fixes
- Tailwind added via CDN with generated local CSS artifact  
- `domElement` undefined fixes and lifecycle guards  
- Proper module export alignment across components  

### 📰 Card Layout & Styling
- Fixed card heights and non-Tailwind line clamping (2-line title, 3-line summary)  
- Gentle hover animation, image helpers for thumbnails  
- BBC-style hero compositions with row fallbacks  

### 🎨 Visual Hero Polish
- Continuous gradient overlay across hero band  
- BBC-style tint/vignette fade mask  
- Padding, spacing, and alignment tuned to match BBC’s visual rhythm  
- Theme variable integration for dark/light consistency  

### ♿ Accessibility (WCAG 2.2 AA)
- Contrast and focus ring compliance  
- ≥24 px interactive targets  
- Full keyboard navigation  
- Screen reader live regions for updates  
- Reduced-motion mode  
- Accessible per-article slideshow support  

### 🧭 Curation UX (Edit Mode)
- Drag-and-drop ordering of selected articles  
- Add/remove with de-duplication logic  
- Batched title lookups for performance  
- Collapsible sections  
- Max-items cap (20) with visible counter + SR live region  

### 🧰 Toolbar & Settings
- In-webpart “Design Toolbar” (layout picker + open Property Pane)  
- `@pnp/spfx-controls-react` WebPartTitle with inline editing  
- Proper property-pane wiring and persistence  

### 🪶 Adaptive Cards Layout
- AdaptiveCardHost grid layout variant  
- Fixed height, 2-line title + description clamp  
- Dark overlay with white text for accessibility  
- Full-card click action + keyboard activation  

---

## 🧩 What you get

A **ready-to-use SPFx News Webpart** you can drop into your SharePoint tenant.

**In edit mode:**  
Select up to **20 news posts**, reorder them, and preview instantly.  

**In view mode:**  
Renders a **BBC-style accessible newsfeed**:
- 5-item Hero strip  
- 2 rows of 5 compact cards  
- 5-item Hero strip  

Fully responsive, keyboard-navigable, and WCAG 2.2 AA-aligned.

---

## 🚀 Installation

### Option 1 – Non-developers  
1. Download the latest `.sppkg` from [Releases](./releases).  
2. Upload to your SharePoint **App Catalog**.  
3. Add the **BBC News Webpart** to a modern page.  

Done ✅

### Option 2 – Developers  

```bash
git clone https://github.com/YOUR-USERNAME/bbc-sharepoint-news-webpart.git
cd bbc-sharepoint-news-webpart
npm install
gulp serve
