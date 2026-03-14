# **ProsperPals Product Requirements Document v1.0**

| Date | Version | Description | Author |
| :---- | :---- | :---- | :---- |
| Aug 17, 2025 | 1.0 | Initial PRD creation based on Project Brief v2.2 and course correction pivots. | John, PM |

Export to Sheets

### **Section 1: Goals and Background Context**

**Goals**

* **Business Goal:** Achieve a 25% free-to-paid user conversion rate, reaching $5M ARR with 100,000 users in the first year by monetizing through a multi-tiered freemium subscription model.  
* **Product Goal:** Deliver an engaging "Hybrid Conversational-Navigational Model" that makes financial management fun, accessible, and rewarding.  
* **User Goal:** Empower users to achieve financial wellness through a gamified journey, risk-free education, and a supportive community.  
* **Technical Goal:** Build a scalable, AI-first platform leveraging a modern stack (Next.js, Supabase, n8n, Base L2) to support a real-time, conversational experience.

**Background Context** ProsperPals has pivoted to an AI-first financial wellness platform designed to transform personal finance from a chore into an engaging adventure. The core of the application is a "Hybrid Conversational-Navigational Model," where users interact primarily through dialogue with AI companions, Goldie and Fin. This conversational interface is supported by a clear, persistent navigation system and rich visual dashboards. The entire user journey is wrapped in a deep, narrative-driven gamification system called "The Prosperity Keys," which uses a blockchain-based economy (ProsperCoins and NFTs on Base L2) to reward users with true digital ownership for their positive financial habits. This PRD will define the Minimum Viable Product (MVP) required to launch this vision.

### **Section 2: Requirements**

**Functional Requirements (FR)**

1. **FR1: Conversational Account Management:** The system shall allow users to add and track all their financial accounts (checking, savings, credit, loans) through a guided conversation with an AI agent. The AI must be able to prompt for, extract, and record account details (e.g., account type, balance, inflows, outflows) from natural language to populate the user's profile and dashboards.  
2. **FR2: Conversational Transaction Logging:** Users must be able to log expenses and income through a natural language conversational interface (both text and voice), with the AI correctly identifying and categorizing the transaction details.  
3. **FR3: Gamified Progression System:** The platform will implement the "Prosperity Keys" narrative, a multi-tiered achievement system where users unlock rewards by completing real-world financial milestones. For the MVP, **`ProsperCoins` will be managed as an off-chain point system within the application's database**, and earned **NFTs will be non-transferable Soulbound Tokens (SBTs)** representing permanent achievements.  
4. **FR4: Risk-Free Investment Simulation:** The system shall provide a virtual portfolio where users can practice investing with virtual currency (`ProsperCoins`) using real-world market data to build their financial literacy without risk.  
5. **FR5: AI-Powered Coaching:** The AI companions, Goldie and Finn, must provide personalized, contextual financial coaching, motivation, and education based on the user's data and progress within the app.  
6. **FR6: Hybrid Navigational Model:** The application shall feature a primary conversational interface supplemented by a persistent, standard navigation bar (sidebar/bottom bar) that provides direct access to core visual dashboards (Wallet, Transactions, etc.).

**Non-Functional Requirements (NFR)**

1. **NFR1: Security:** All user data must be protected using bank-level security standards, including encryption at rest (AES-256) and in transit, with strict data access enforced by Supabase Row Level Security (RLS) policies.  
2. **NFR2: Performance:** The system must be highly responsive. API responses shall be \< 200ms (p95), and voice interactions must have a perceived latency of \< 500ms to feel natural and conversational.  
3. **NFR3: Usability:** The user experience must be intuitive and engaging, successfully blending the conversational interface with visual dashboards to be accessible for financially anxious beginners.  
4. **NFR4: Scalability:** The architecture must be built on scalable cloud infrastructure (Vercel, Supabase) capable of handling a target of 500,000 active users by Year 1 without degradation in performance.  
5. **NFR5: Compliance:** The platform must be GDPR compliant and clearly positioned as an educational tool, not a financial advisory service, to manage regulatory risk.

### **Section 3: User Interface Design Goals**

**Overall UX Vision** The user experience will be a seamless blend of natural conversation and clear, compelling data visualization. The app should feel less like a traditional tool and more like an engaging, gamified adventure. The core principle is **"Conversation-First, Visual-Second,"** where dialogue drives action, and the UI presents the results in a beautiful, intuitive format.

**Key Interaction Paradigms**

1. **Conversational Commands:** The primary method for data entry, queries, and actions will be through natural language conversations with Goldie and Fin.  
2. **Persistent Navigation:** A standard, always-visible navigation bar provides reliable, one-tap access to core visual dashboards, serving as a user-friendly "escape hatch."  
3. **In-Chat Generated Visuals:** For specific, ad-hoc queries, the AI will generate and display rich content (charts, summaries, progress bars) directly within the chat interface. Crucially, this includes the visual presentation of earned NFT achievements, which will be rendered as a special content block to celebrate a user's milestone.

**Core Screens and Views**

* **Login/Authentication Screen:** The entry point for users to sign in or register.  
* **Chat (Home):** The primary conversational interface.  
* **The Keys:** A view to track progress on the main gamification quest.  
* **Leaderboard:** The view for the "First to a Million" race.  
* **Wallet:** A detailed visual dashboard with two distinct subsections: one for the user's real-world **Budget and Cash Flow**, and a second for their **Virtual Assets** (ProsperCoins, ProsperGold balances, and earned NFTs).  
* **Transactions:** A filterable log of all transactions.  
* **Portfolio:** The risk-free investment simulator.  
* **Clans:** The social hub for team-based challenges.  
* **Settings:** A view for users to manage their profile, preferences, and subscription.

**Accessibility** The application will target **WCAG 2.1 AA** compliance to ensure it is accessible to the widest possible audience.

**Branding** The brand aesthetic is modern, tech-forward, and trustworthy, with a **dark theme** that uses vibrant, gamified accents (e.g., the gold and purples seen in the prototype) to create an exciting user experience. The "Unlock Your Prosperity" key logo will be a central branding element.

* **Design Motif Note:** A primary data visualization motif throughout the app will be the use of **circular charts and radial progress meters**, as seen in the UI design explorations.

**Target Device and Platforms** The initial launch will be a **Web Application with a responsive design** that works seamlessly on both desktop and mobile browsers. A native mobile app is planned for a future phase.

### **Section 4: Technical Assumptions**

**Repository Structure: Monorepo**

* **Rationale:** This approach is ideal for our full-stack application, as it will simplify code sharing between the frontend (web app), backend services (AI workflows), and any future mobile applications.

**Service Architecture: Serverless**

* **Rationale:** Leveraging Vercel for the frontend, Supabase for the database/backend functions, and n8n for automation aligns with a modern, scalable serverless approach that minimizes infrastructure management.

**Testing Requirements: Full Testing Pyramid**

* **Rationale:** To achieve the 90% code coverage goal and ensure the reliability of a financial application, a multi-layered testing strategy (Unit, Integration, E2E) is non-negotiable.

**Additional Technical Assumptions and Requests**

* **Frontend Framework:** Next.js 14  
* **Primary Language:** TypeScript  
* **Backend & Database:** Supabase (PostgreSQL)  
* **Hosting Platform:** Vercel  
* **Automation Engine:** n8n  
* **Blockchain (MVP Scope):** Base L2 will be used **only for the issuance of non-transferable Soulbound Token (SBT) achievements.**  
* **Gamified Ledger (MVP Scope):** All `ProsperCoin` balances and transactions will be managed in a secure **off-chain ledger within the Supabase PostgreSQL database.**  
* **AI Voice:** ElevenLabs for voice synthesis

### **Section 5: Epic List**

* **Epic 1: Foundation & Core Financial Tracking**  
  * **Goal:** Establish the core application infrastructure, user authentication, and the foundational ability for users to conversationally add accounts and log transactions.  
* **Epic 2: The Off-Chain Gamification Engine & The First Key**  
  * **Goal:** Implement the complete gamification and rewards loop using a secure **off-chain** ledger in Supabase for `ProsperCoins`. Deliver the "Prosperity Keys" framework and all requirements for a user to earn their first non-transferable **Soulbound Token (SBT)** achievement, "The Copper Key."  
* **Epic 3: The Risk-Free Investment Simulator**  
  * **Goal:** Launch the virtual investment portfolio, integrate real-world market data, and enable users to practice trading with their earned **off-chain** `ProsperCoin` points.  
* **Epic 4: Community & "The Prosperity Keys Saga" Campaign**  
  * **Goal:** Build the social features and in-app components necessary to launch the **"The Prosperity Keys Saga"** campaign, including a leaderboard that tracks users' accumulation of **off-chain** `ProsperCoins`.

### **Section 6: Epic Details**

#### **Epic 1: Foundation & Core Financial Tracking**

*(Detailed user stories and acceptance criteria to be drafted by the Scrum Master in the development phase.)*

#### **Epic 2: The Off-Chain Gamification Engine & The First Key**

* **Story 2.1: Create the Off-Chain Points Ledger**  
  * **As a** system administrator, **I want** a secure off-chain ledger in the Supabase database, **so that** all `ProsperCoin` earnings and spending can be reliably and accurately tracked for all users.  
  * **Acceptance Criteria:** A `prosper_coin_transactions` table is created, a `user_stats` table is updated, and a Supabase RPC function (`add_prosper_coins`) is created to atomically add/subtract coins. Row Level Security is enforced.  
* **Story 2.2: Implement Core Reward Mechanisms**  
  * **As a** user, **I want** to earn `ProsperCoins` for performing positive financial actions, **so that** I am motivated to engage with the app daily.  
  * **Acceptance Criteria:** Users are awarded the correct number of `ProsperCoins` for actions like daily login, adding transactions, and creating a budget.  
* **Story 2.3: Display Gamification Progress in the UI**  
  * **As a** user, **I want** to clearly see my `ProsperCoin` balance and Experience Points (XP) throughout the app, **so that** I can track my progress.  
  * **Acceptance Criteria:** The dashboard and navigation elements correctly display the user's current coin balance and XP level. Reward notifications appear on-screen when coins are earned.  
* **Story 2.4: Implement the First Soulbound Token (SBT) Achievement**  
  * **As a** user, **I want** to be awarded a unique, non-transferable Soulbound Token (SBT) for unlocking "The Copper Key," **so that** my significant achievement is permanently and verifiably recorded.  
  * **Acceptance Criteria:** A system checks for the "Copper Key" requirements. When met, an n8n workflow generates artwork, stores it on IPFS, and saves a record in the `user_achievements` table. The earned SBT is presented visually to the user in the chat.

#### **Epic 3: The Risk-Free Investment Simulator**

*(Detailed user stories and acceptance criteria to be drafted by the Scrum Master in the development phase.)*

#### **Epic 4: Community & "The Prosperity Keys Saga" Campaign**

*(Detailed user stories and acceptance criteria to be drafted by the Scrum Master in the development phase.)*

---

This document now serves as our official, updated PRD. The next logical step is to transition to the Scrum Master to begin development, starting with the creation of the first story from Epic 1\.

