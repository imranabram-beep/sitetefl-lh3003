# Course Page Gamification Audit & Enhancement Plan
**Date:** April 20, 2026  
**Reference:** 3001 Polished Design vs 3003 Current Implementation  
**Status:** Analysis Complete

---

## Executive Summary

The TEFL SEA Academy course page (3003) has the **functional foundation** for course progression and gamification, but lacks the **visual polish and gamification styling** present in the reference design (3001). The core components exist but need significant CSS enhancement, new styling layers, and visual indicator improvements.

**Key Insight:** 80% of the infrastructure is in place. We need to layer in:
- Professional card styling with colored headers
- Visual progress indicators and badges
- Lesson type icons and duration displays
- Certificate tracking visualization
- Teal gradient theme consistency

---

## CURRENT IMPLEMENTATION ANALYSIS

### ✅ What's Already Built (3003)

#### 1. **Course Structure Components**
```
CourseDetailPage
├── Hero Section (with course metadata)
├── Stats Strip (study time, units, modules, rating)
├── Main Content Grid (2-column: left + sidebar)
│   ├── LEFT COLUMN
│   │   ├── What You'll Learn (grid of items)
│   │   ├── Who This Course Is For (list)
│   │   ├── CourseProgressSummary ✓
│   │   │   ├── Overall progress percentage
│   │   │   ├── Overall progress bar
│   │   │   └── Unit-by-unit progress rows
│   │   ├── CourseCertificateCard
│   │   └── CourseUnitsList ✓
│   │       ├── Unit headers (expandable)
│   │       ├── Module listing (collapsed/expanded)
│   │       └── Module actions (Preview, Enrol, Open, Review, Locked)
│   │
│   └── RIGHT SIDEBAR
│       ├── Enrol Card (sticky)
│       ├── What's Included
│       └── Where Can I Teach?
```

#### 2. **Progress Tracking System** ✓
- **Location:** `src/lib/use-progress.ts`, `src/hooks/useProgress.ts`
- **Features:**
  - Tracks completed modules via localStorage keys
  - Calculates overall course progress percentage
  - Tracks unit-by-unit progress
  - Stores completion state as: `{courseSlug}:{unitSlug}:{moduleSlug}`

#### 3. **Enrolment State Management** ✓
- **Location:** `src/hooks/useEnrolment.ts`
- **Features:**
  - Checks if user is enrolled in course
  - Controls access to locked modules
  - Works with Tester Mode for preview access

#### 4. **Module Status System** ✓
- **Status States:** `locked`, `enrol`, `free`, `current`, `completed`
- **Logic Flow:**
  ```
  Enrolled + Completed → "completed" (Review button)
  Enrolled + Next → "current" (Open Lesson button)
  Enrolled + Locked → "locked" (🔒 Locked)
  Not Enrolled + Free → "free" (🎁 Preview)
  Not Enrolled + Paid → "enrol" (Enrol to unlock)
  ```

#### 5. **CSS Classes Defined** (Partial)
- `.course-progress-card` - Progress summary container
- `.progress-bar` - Progress bar element
- `.unit-progress-list` - Unit progress list
- `.unit-progress-item` - Individual unit progress row
- `.course-unit-card` - Unit card container
- `.course-module-list` - Module list container
- `.course-module-row` - Individual module row
- `.course-module-index` - Module status icon
- `.course-module-copy` - Module title/meta
- `.course-module-action` - Module action button
- `.button` - Standard button (teal gradient)
- `.button.ghost` - Ghost button (white outline)

#### 6. **Button States** ✓
- Primary buttons: Teal gradient (`#17a697` → `#0f766e`)
- Ghost buttons: White with teal outline
- Responsive sizing (adjusts for mobile)

---

## GAPS vs 3001 POLISHED DESIGN

### ❌ GAP #1: Unit Card Visual Styling
**Current State:**
- Plain white cards with minimal styling
- No colored headers
- Text-only "Unit 1", "Unit 2" labels

**3001 Reference Shows:**
- Colored header bars at top of unit cards (orange/teal gradients)
- Professional header with white text
- "Unit 1 of 5" labeling
- Module count badge ("8 modules")
- Prominent visual hierarchy

**Required Implementation:**
```css
.course-unit-card {
  /* Header bar styling */
  header/button needs:
  - Gradient background (course-specific color)
  - White text with shadow
  - Padding adjustment for header spacing
  - Module count displayed as badge

  /* Card styling */
  - 2px teal border (like other components)
  - Rounded corners (var(--radius))
  - Box shadow for elevation
  - Smooth expand/collapse animations
}
```

**Impact:** HIGH - This is the primary visual element users interact with

---

### ❌ GAP #2: Module Type Icons & Styling
**Current State:**
```
"Lesson", "Activity", "Quiz" - displayed as plain text
Duration: "5 min" - inline text
Type: Shows as text label
```

**3001 Reference Shows:**
- 📚 **Lesson** - Book icon
- ⚡ **Activity** - Lightning/practice icon
- ✓ **Quiz** - Checkmark/test icon
- Duration displayed prominently: "5 min", "7 min"
- Icons + text together in a badge/pill

**Required Implementation:**
```tsx
// In CourseUnitsList module rendering:
const iconMap = {
  lesson: "📚",    // or SVG
  activity: "⚡",  // or SVG
  quiz: "✓"        // or SVG icon
};

// Display as badge:
<span className="module-type-badge">
  {iconMap[mod.kind]} {kindLabel}
</span>

// Duration:
<span className="module-duration">
  ⏱ {mod.duration}
</span>
```

**CSS Needed:**
```css
.module-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  background: rgba(34, 201, 154, 0.1);
  color: var(--primary-teal-dark);
  border-radius: var(--radius-xs);
}

.module-duration {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}
```

**Impact:** MEDIUM-HIGH - Improves scannability and professional appearance

---

### ❌ GAP #3: Visual Progress Indicators
**Current State:**
```
"3 of 8 modules complete" - plain text
Progress bar: Functional but minimal styling
```

**3001 Reference Shows:**
- Large percentage display (e.g., "37%")
- Prominent progress bar with gradient
- Unit completion badges
- Visual "milestone" indicators

**Required Implementation:**

**A. Progress Bar Enhancement:**
```css
.progress-bar {
  height: 8px;
  background: rgba(34, 201, 154, 0.15);
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, 
    #17a697 0%, 
    #22c99a 100%);
  border-radius: 999px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**B. Percentage Display:**
```css
.course-progress-percent {
  font-size: 2rem;
  font-weight: 900;
  color: var(--primary-teal);
  line-height: 1;
}
```

**C. Unit Progress Item:**
```css
.unit-progress-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(34, 201, 154, 0.1);
}

.unit-progress-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
}
```

**Impact:** HIGH - Makes progress feel tangible and motivating

---

### ❌ GAP #4: Lesson Status Styling
**Current State:**
- Locked: 🔒 icon, reduced opacity
- Completed: ✓ checkmark, "Review" button
- Current: Number indicator, "Open Lesson" button
- Free: Default, "Preview" button

**3001 Reference Shows:**
- Distinct visual treatments for each state
- Checkmarks in circles for completed
- Lock icons for locked lessons
- Highlighting for current/next lesson
- Professional badge styling on buttons

**Required Implementation:**

```css
.course-module-row {
  display: grid;
  grid-template-columns: 48px 1fr auto;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(34, 201, 154, 0.05);
  transition: all var(--transition-base);
  align-items: center;
}

.course-module-row:hover {
  background: rgba(34, 201, 154, 0.02);
}

/* Status Icons */
.course-module-index {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.9rem;
}

/* Completed state */
.course-module-row.completed .course-module-index {
  background: var(--success);
  color: white;
}

/* Locked state */
.course-module-row.locked .course-module-index {
  background: rgba(34, 201, 154, 0.1);
  color: var(--text-muted);
}

/* Current state */
.course-module-row.current .course-module-index {
  background: linear-gradient(135deg, #17a697, #0f766e);
  color: white;
  box-shadow: 0 4px 12px rgba(34, 201, 154, 0.3);
}

/* Module copy */
.course-module-copy h3 {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
  color: var(--text-strong);
}

.course-module-kind {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}
```

**Impact:** HIGH - Clarity on lesson status is critical for user progression

---

### ❌ GAP #5: Certificate Tracking
**Current State:**
- `CourseCertificateCard` component exists
- No visible progress toward certificate
- No visual milestone tracking

**3001 Reference Shows:**
- Progress circle/ring showing certificate completion
- "X lessons until certificate" messaging
- Visual representation of progress

**Required Implementation:**

**Component Enhancement:**
```tsx
// In CourseCertificateCard:
export default function CourseCertificateCard({ course }: Props) {
  const { completedKeys } = useProgress();
  const totalModules = course.units.reduce((t, u) => t + u.modules.length, 0);
  const completedModules = allModules.filter(m => 
    completedKeys.includes(makeKey(course.slug, m.unit.slug, m.mod.slug))
  ).length;
  
  const certificateRequirement = Math.ceil(totalModules * 0.8); // 80% required
  const progress = (completedModules / certificateRequirement) * 100;
  
  return (
    <div className="course-certificate-card">
      <div className="cert-progress-ring">
        {/* SVG progress ring showing progress */}
      </div>
      <div className="cert-info">
        <p className="cert-requirement">
          Complete {certificateRequirement - completedModules} more to unlock
        </p>
      </div>
    </div>
  );
}
```

**CSS:**
```css
.course-certificate-card {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, 
    rgba(34, 201, 154, 0.05) 0%, 
    rgba(34, 201, 154, 0.02) 100%);
  border: 2px solid rgba(34, 201, 154, 0.2);
  border-radius: var(--radius);
}

.cert-progress-ring {
  width: 120px;
  height: 120px;
  min-width: 120px;
  position: relative;
}

.cert-progress-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.cert-info {
  flex: 1;
}

.cert-requirement {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-strong);
  margin: 0 0 0.3rem 0;
}
```

**Impact:** MEDIUM - Motivational but not blocking gameplay

---

### ❌ GAP #6: Gamification Elements
**Current State:**
- Progress tracking implemented
- No badge/achievement system
- No milestone celebrations
- No reward visuals

**3001 Reference Shows:**
- Completion badges
- Milestone celebrations
- Achievement indicators
- Visual rewards for progress

**Required Implementation:**

**Badge System:**
```tsx
// New component: AchievementBadge.tsx
const badges = {
  first_lesson: { icon: '🎬', label: 'First Step', color: 'gold' },
  unit_complete: { icon: '🎯', label: 'Unit Master', color: 'teal' },
  halfway: { icon: '⚡', label: 'Halfway There', color: 'orange' },
  course_complete: { icon: '🏆', label: 'Certified', color: 'gold' },
};
```

**CSS:**
```css
.achievement-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 999px;
  animation: slideInUp 0.4s ease-out;
}

.achievement-badge.gold {
  background: linear-gradient(135deg, #ffb800, #ffa500);
  color: white;
}

.achievement-badge.teal {
  background: linear-gradient(135deg, #17a697, #0f766e);
  color: white;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Impact:** MEDIUM - Nice-to-have for motivation but secondary priority

---

### ❌ GAP #7: Styling Consistency
**Current State:**
- Uses existing design tokens
- Some components have proper borders/shadows
- Inconsistent spacing in module lists

**3001 Reference Shows:**
- Consistent 2px teal borders throughout
- Proper use of gradients
- Professional spacing
- Elevation through shadows

**Required Implementation:**
- Apply consistent 2px teal borders to all course cards
- Use gradient backgrounds for headers
- Maintain consistent padding/margin system
- Add box-shadow elevation to interactive elements

---

## IMPLEMENTATION ROADMAP

### Phase 1: Visual Foundations (HIGH PRIORITY)
**Estimated Effort:** 4-6 hours  
**Impact:** Immediate visual polish

1. **Create `course-detail.css`** - Master stylesheet for course pages
   - Unit card styling with colored headers
   - Module list layout and spacing
   - Progress bar enhancements
   - Button state styling

2. **Update CourseProgressSummary styling**
   - Large percentage display
   - Enhanced progress bar
   - Unit progress rows

3. **Update CourseUnitsList styling**
   - Colored header buttons
   - Module type badges
   - Duration displays
   - Status icons

### Phase 2: Module Enhancements (MEDIUM PRIORITY)
**Estimated Effort:** 3-4 hours  
**Impact:** Improved clarity and scannability

1. **Module Type Icons**
   - Add icon mapping for lesson/activity/quiz
   - Create badge styling
   - Display duration prominently

2. **Module Status Styling**
   - Distinct visual states (completed, current, locked)
   - Checkmarks, lock icons
   - Highlighting for current lesson

3. **Action Button Styling**
   - "Open Lesson" button prominence
   - "Enrol to unlock" styling
   - "Review" button styling
   - Locked state presentation

### Phase 3: Gamification Features (MEDIUM-LOW PRIORITY)
**Estimated Effort:** 2-3 hours  
**Impact:** Long-term engagement

1. **Certificate Tracking Component**
   - Progress ring visualization
   - Milestone messaging
   - Progress calculation

2. **Achievement Badges**
   - First lesson badge
   - Unit completion badges
   - Course completion badge
   - Animations and displays

3. **Progress Celebrations**
   - Milestone notifications
   - Unlock animations
   - Completion messages

### Phase 4: Polish & Refinement (LOW PRIORITY)
**Estimated Effort:** 2-3 hours  
**Impact:** Premium feel

1. **Responsive Adjustments**
   - Mobile unit card layouts
   - Module list scrolling
   - Sidebar collapsing

2. **Animation Enhancements**
   - Smooth transitions
   - Expand/collapse animations
   - Progress bar animations

3. **Accessibility Improvements**
   - ARIA labels for progress
   - Keyboard navigation
   - Screen reader support

---

## DETAILED SPECIFICATIONS BY COMPONENT

### CourseProgressSummary
**File:** `src/components/course-progress-summary.tsx`  
**CSS Needed:** `src/app/course-detail.css` (new)

**Visual Changes:**
```
BEFORE: "Your progress - 3 of 8 modules complete - [progress bar]"
AFTER:  "Your progress" with "37%" large display + progress bar + 
        unit-by-unit breakdown with mini progress bars
```

**Styling Requirements:**
- Container: White background, teal border, rounded corners, padding 1.5rem
- Title: 1.1rem, font-weight 800, color var(--text-strong)
- Percentage: 2rem font, 900 weight, teal color
- Progress bar: 8px height, teal gradient fill
- Unit rows: Flex layout, 0.75rem padding, light bottom border

---

### CourseUnitsList
**File:** `src/components/course-units-list.tsx`  
**CSS Needed:** `src/app/course-detail.css`

**Visual Changes:**
```
BEFORE: Plain white card with "Unit 1" text header
AFTER:  Orange/teal colored header bar with white text + module count badge
        Expandable to show detailed module list
```

**Unit Card Header Styling:**
- Header: Gradient background (course-specific color from HEADER_COLORS)
- Text: White, 1.1rem, font-weight 700
- Padding: 1.25rem 1.5rem
- Module count badge: Teal background, white text, positioned right

**Module Row Styling:**
- Grid layout: 48px (icon) + 1fr (content) + auto (button)
- Padding: 0.75rem 1rem
- Hover effect: Light teal background
- Border-bottom: Light teal line

**Status Icon Styling:**
- Size: 48px diameter circle
- Completed: Green background, white checkmark
- Current: Teal gradient, white number
- Locked: Light gray, lock icon
- Free: Teal outline, gift icon

---

### Button States
**Files:**  
- Enrol: Primary button, teal gradient  
- Preview: Ghost button with green accent  
- Open Lesson: Primary button, teal gradient  
- Review: Ghost button  
- Locked: Disabled gray state  

**Responsive:** Stack to full-width on mobile

---

## REQUIRED FILES TO CREATE/MODIFY

### New Files:
1. **`src/app/course-detail.css`** (~500 lines)
   - All course page styling
   - Course unit cards
   - Module lists
   - Progress indicators
   - Responsive design

### Modified Files:
1. **`src/components/course-progress-summary.tsx`**
   - Add className references to CSS
   - Improve layout structure

2. **`src/components/course-units-list.tsx`**
   - Add className references to CSS
   - Implement module type icons
   - Add duration display
   - Implement status icon display

3. **`src/app/globals.css`**
   - Import new `course-detail.css`

### Optional Enhancements:
1. **`src/components/achievement-badge.tsx`** (New)
   - Badge display component
   - Animation logic

2. **`src/components/course-certificate-card.tsx`** (Enhancement)
   - Add progress ring visualization
   - Add milestone tracking

---

## COLOR SCHEME & TOKENS

**Course-Specific Header Colors** (already defined):
```javascript
"120-hour-premier-online-tefl-course": {
  from: "#054a3a",    // Dark teal
  to: "#0a2a1e",      // Darker teal
  accent: "#00c8b0"   // Bright teal
},
"168-hour-level-5-tefl-diploma": {
  from: "#0a1828",    // Dark blue
  to: "#060e18",      // Darker blue
  accent: "#4a9fff"   // Bright blue
},
"30-hour-teach-english-online-course": {
  from: "#3a2000",    // Dark orange
  to: "#1a0e00",      // Darker orange
  accent: "#ffaa20"   // Bright orange
}
```

**Standard Tokens:**
- Primary teal: `var(--primary-teal)` (#22c99a)
- Dark teal: `var(--primary-teal-dark)` (#0f766e)
- Success/completed: `var(--success)` (green)
- Text strong: `var(--text-strong)`
- Text muted: `var(--text-muted)`

---

## TESTING CHECKLIST

### Visual Testing:
- [ ] Unit cards display with colored headers
- [ ] Module type icons visible (📚 ⚡ ✓)
- [ ] Duration badges display correctly
- [ ] Progress bars animate smoothly
- [ ] Status icons (✓ 🔒) display correctly
- [ ] Buttons style appropriately for each state
- [ ] Hover effects work on all interactive elements

### Responsive Testing:
- [ ] Layout adapts at 1024px breakpoint
- [ ] Layout adapts at 768px breakpoint  
- [ ] Layout adapts at 480px breakpoint
- [ ] Cards stack properly on mobile
- [ ] Module list scrolls horizontally if needed
- [ ] Buttons scale appropriately

### Functional Testing:
- [ ] Progress calculation is accurate
- [ ] Expand/collapse works smoothly
- [ ] Module buttons navigate correctly
- [ ] Enrolment logic works with styling
- [ ] Tester mode displays correctly
- [ ] Free preview state displays correctly

---

## QUESTIONS FOR CLARIFICATION

1. **Module Type Icons:** Use emoji (📚 ⚡ ✓) or SVG icons?
2. **Achievement Badges:** When should they appear? Immediate or with animation delay?
3. **Certificate Progress:** Should it be a ring/donut chart or linear bar?
4. **Unit Header Colors:** Use the HEADER_COLORS from page.tsx or different palette?
5. **Duration Display:** Show for all modules or only in list view?
6. **Milestone Celebration:** Toast notifications, banner, or in-place animation?

---

## SUCCESS CRITERIA

✅ Course page matches visual polish of 3001 reference  
✅ All gamification elements are visible and functional  
✅ Progress tracking is clear and motivating  
✅ Mobile experience is smooth and responsive  
✅ Accessibility standards are met  
✅ Load time remains fast  
✅ All interactive elements have proper hover/focus states

---

## NEXT STEPS

1. **Await approval** on questions above
2. **Create `course-detail.css`** with comprehensive styling
3. **Update component files** with className references
4. **Test across devices** (desktop, tablet, mobile)
5. **Gather feedback** on visual polish
6. **Iterate** based on testing results
7. **Implement Phase 2 & 3** features if time permits

---

**Document Version:** 1.0  
**Last Updated:** April 20, 2026  
**Created By:** Claude AI  
**For:** TEFL SEA Academy Team
