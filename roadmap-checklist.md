# ✅ ROADMAP CHECKLIST: VC-grade Workflow Animation

## General Context

This roadmap outlines the development of a professional-grade workflow animation for venture capital presentations. The animation shows a step-by-step process flow with animated nodes, connecting lines, and a companion chat feed that explains each step as it completes. The implementation focuses on smooth animations, maintainability, and iframe compatibility for embedding.

## Developer Notes

- **Package Manager**: Using Yarn for dependency management (`yarn add` instead of `npm install`)
- **SVG Handling**: Using vite-plugin-svgr for SVG imports with `?react` query parameter
- **CSS**: TailwindCSS with @tailwindcss/postcss plugin (v4+)
- **TypeScript**: Strict mode enabled
- **Animation**: Framer Motion for all animations

## 1. Project Setup
- [x] Initialize React project (Vite preferred for speed)
- [x] Add TailwindCSS for styling
- [x] Add Framer Motion
- [x] Add SVG support or use inline SVG
- [x] Set up hosting on Vercel with iframe support
- [x] Enable fast refresh (hot reload) and test with dummy component

**✅ Verify**: Modify any text → auto-refresh without full reload → no animation glitch.

## 2. File & Structure
- [x] components/AnimationRunner.tsx — main animation logic
- [x] components/WorkflowNode.tsx — node with animation states
- [x] components/ConnectorLine.tsx — animated SVG line
- [x] components/ChatFeed.tsx — side text stream (chat style)
- [x] data/timelineConfig.ts — declare full timeline steps and content
- [x] hooks/useTimeline.ts — central animation controller
- [x] utils/typewriter.ts — typing effect helper
- [x] public/tasks.json — external task list for future CMS extension

### Implementation Guidance for Timeline Engine

Before implementing Phase 3, here are key integration details:

1. **Component Integration Flow**:
   - AnimationRunner acts as the container for the workflow visualization
   - WorkflowNode components should be rendered in sequence vertically
   - ConnectorLine components connect each WorkflowNode
   - ChatFeed displays alongside the workflow nodes

2. **Timeline State Management**:
   - The useTimeline hook provides a central timeline state (taskIndex, stepIndex)
   - Each component subscribes to this state to determine its animation state
   - The workflow follows the following state sequence:
     1. New task header appears
     2. Node appears (fade in)
     3. Line connects to previous node
     4. Node enters loading state (blue pulse)
     5. Node completes (green with checkmark)
     6. Chat message appears for the completed node

3. **Animation Coordinating Tips**:
   - Use the getNodeState helper to determine WorkflowNode state based on step index
   - ConnectorLine isDrawing should be true when connecting to a new node
   - ChatFeed messages should appear when a node enters 'done' state
   - When a task completes, all nodes/lines should reset before new task begins

4. **Testing Implementation**:
   - Start with a single basic flow to test the timeline progression
   - Verify each component animates in the correct sequence without glitches
   - Test that the loop between tasks works correctly with proper delays

## 3. Timeline Engine
- [ ] Build a timelineIndex global state to control what step we're on
- [ ] Define timeline config (e.g., task, step, chat message, delay)
- [ ] Use useAnimationControls() or useEffect+interval based on timelineIndex
- [ ] All animated components subscribe to timelineIndex or specific time windows

**✅ Verify**: Every animation (header, node, line, chat) triggered by shared timeline state.

## 4. Node Animation States

Each node goes through 4 states:
- [ ] Appear (fade-in with stagger)
- [ ] Line Connects (draw line to previous node)
- [ ] Loading (blue bg, pulsing loader)
- [ ] Done (green bg, checkmark icon)

**✅ Verify**: Correct order and consistent duration; smooth transitions with Framer Motion.

## 5. Companion Chat Feed
- [ ] Side component (ChatFeed.tsx) floats right
- [ ] As each node enters "done" state → trigger message with typing effect
- [ ] Use vertical scroll and scrollIntoView() for last message
- [ ] Sync with node index
- [ ] Message format: Agent success statement (e.g., "Matched to PO successfully.")

**✅ Verify**: Messages appear exactly as each node completes.

## 6. Header / Task Loop
- [ ] Animate task header fade-in
- [ ] Reset all children (nodes, lines, chat) before new task starts
- [ ] Loop between tasks (5–6)

**✅ Verify**: Clean transitions, no leftover UI artifacts.

## 7. Visual Design / Polish
- [ ] Pulse effect on current node
- [ ] Color-coded node states: gray → blue → green
- [ ] Clean, light theme with Tailwind
- [ ] Minimal motion blur, no bounce, soft ease transitions
- [ ] Responsive for small iframe embeds

**✅ Verify**: Fits Carrd embed iframe, no layout overflow, looks good on mobile and desktop.

## 8. Performance & Deployment
- [ ] Tree-shake unused code (use Vite or ESBuild)
- [ ] Code-split if needed
- [x] Deploy to Vercel
- [ ] Provide iframe URL

**✅ Verify**: Total bundle size < 300kb, loads in <1s, no flicker on iframe load.

## 9. README & Maintainability
- [ ] Clear README with:
  - [ ] How to add/edit tasks
  - [ ] How to change colors, timing
  - [ ] Folder structure explanation
- [ ] Comment key animation logic
- [ ] Add tasks.json or TS object format for data-driven updates

**✅ Verify**: A dev with basic React/JS knowledge can update tasks without touching code logic.

## Optional Nice-to-Haves
- [ ] Pause/Resume button (debug mode)
- [ ] Dark mode toggle
- [ ] JSON input (future CMS compatibility)

## Common Commands

```bash
# Install dependencies
yarn

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Deploy to Vercel
vercel --prod
``` 