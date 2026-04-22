# VirtuCare - Medical Appointment Booking System

VirtuCare is a modern web application built to streamline the process of finding medical professionals and booking healthcare appointments. The platform features a responsive landing page, a comprehensive user dashboard, and a seamless appointment scheduling flow.

## 🚀 Tech Stack

* **Framework:** [Next.js (App Router)]
* **Language:** [TypeScript]
* **UI Components:** [Material UI (MUI)]
* **Styling:** [Tailwind CSS]
* **State & Storage:** React Hooks (`useState`, `useEffect`) & Browser `localStorage`
* **Icons:** Material UI Icons

---

## 🏗️ Our Approach

The development of VirtuCare was approached with a focus on component reusability, modern routing, and a clean, user-friendly interface. 

1.  **Architecture:** We utilized the Next.js App Router to structure the application. The public-facing landing page sits at the root, while the authenticated/user view is nested within a `(dashboard)` layout group, providing a persistent Sidebar and Topbar across all internal pages.
2.  **Data Management:** To create a fully functional prototype without a backend database, we implemented a custom storage utility (`utils/storage.ts`) that wraps the browser's `localStorage` API. This handles CRUD operations for appointments and checks for scheduling conflicts.
3.  **Dynamic Routing:** The booking process utilizes Next.js dynamic routes (`/dashboard/appointments/book/[id]`) to dynamically render the booking form based on the selected doctor's profile data.
4.  **UI/UX Design:** We aimed for a clean, modern "medical" aesthetic using plenty of white space, subtle gray borders, and blue/green accent colors to establish trust and clarity.

---

## 🔑 Key Decisions Made

* **Hybrid Styling Strategy (Tailwind + MUI):** We chose to use Tailwind CSS for macro-layouts (grids, flexbox, spacing, responsive behavior) and Material UI for micro-components (Cards, Buttons, Inputs, Tables). This provided the rapid layout capabilities of Tailwind alongside the accessible, highly-polished form controls of MUI.
* **"Flat" UI Design:** We decided to strip away MUI's default heavy drop-shadows by setting `elevation={0}` on Cards and Papers. Instead, we used subtle borders and hover-state shadows to create a more contemporary, flat design that matches modern SaaS standards.
* **Client-Side Rendering (`use client`):** Because the application relies heavily on `localStorage` for data persistence and MUI components for interactivity (like Drawer menus and Select dropdowns), we heavily utilized Next.js Client Components.
* **Separation of Concerns:** Doctor mock data (`data/doctors.ts`) and storage logic (`utils/storage.ts`) were abstracted away from the UI components. This ensures that if we decide to plug in a real backend (like Supabase, Firebase, or a Node API) later, the UI components will require minimal refactoring.

---

## 🚧 Challenges Faced

1.  **Next.js Hydration Mismatches with LocalStorage:**
    * *Challenge:* Because Next.js pre-renders pages on the server, attempting to read `localStorage` directly during the initial render causes a "hydration mismatch" error (since the server does not have a `window` object).
    * *Solution:* We solved this by initializing states with empty arrays and using `useEffect` to fetch the `localStorage` data only after the component has safely mounted on the client.
2.  **MUI and Tailwind CSS Conflicts:**
    * *Challenge:* Mixing a CSS-in-JS library (MUI) with utility classes (Tailwind) can sometimes lead to CSS specificity clashes, particularly with typography and base styles.
    * *Solution:* We carefully used the `<Box>` component and applied Tailwind classes via `className`, reserving MUI's `sx` prop specifically for dynamic styles or overriding deep MUI component internals.
3.  **Handling Time Slot Conflicts:**
    * *Challenge:* Ensuring a user couldn't double-book a doctor for the exact same time slot on the same day.
    * *Solution:* We created a dedicated `isSlotBooked` utility function that cross-references the selected doctor ID, date, and time against the existing array of appointments in `localStorage` before allowing the form submission to proceed.
4.  **Routing Transitions:**
    * *Challenge:* Migrating legacy React Router (`react-router-dom`) code into the Next.js ecosystem.
    * *Solution:* We refactored `<Link to="...">` components to Next.js `<Link href="...">` and replaced `useNavigate` with the App Router's `useRouter` hook from `next/navigation`.

---

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install