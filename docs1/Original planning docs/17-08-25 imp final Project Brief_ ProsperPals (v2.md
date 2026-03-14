# **Project Brief: ProsperPals (v2.2 \- Gamified Hybrid Model)**

**Project Name:** ProsperPals **Date:** August 17, 2025 **Document Version:** 2.2 **Author:** Mary, Business Analyst (BMAD)

### **1\. Project Overview & Vision**

ProsperPals is an AI-first financial wellness platform designed to revolutionize how Gen Z manages their money. The project has pivoted to a **"Hybrid Conversational-Navigational Model"**. The primary user interface will be a natural language chat with two distinct AI personalities, Goldie and Fin, making financial management accessible and engaging . This conversational core is supported by a persistent navigation system that provides reliable access to clear, visual dashboards for detailed data review and complex tasks.

**Vision Statement:** To become the global leader in gamified financial education, empowering 10 million users to achieve financial wellness by 2027 by turning their financial journey into an epic adventure.

### **2\. Project Objectives & Goals**

The primary objective is to build a revolutionary financial app that merges a seamless conversational UI with a compelling, blockchain-powered gamification narrative to drive unprecedented user engagement, retention, and positive financial outcomes.

**Business Goals:**

* **Viral User Acquisition:** Acquire 100,000 users by Month 6, driven by the "Who Wants to Be a ProsperPals Millionaire?" viral campaign .  
* **Hybrid Funding Model:** Secure a $500K Angel Round within 2 months,   
* **Rapid Path to Profitability:** Achieve break-even status by Month 12 and profitability by Year 2\.

### **3\. Target Audience**

The platform is designed for digital-native young professionals and financial beginners seeking an engaging and supportive way to manage their money.

* **Primary Persona ("The Ambitious Millennial"):** Aged 25-35, values financial independence, is influenced by social media, and is motivated by achievements and progress tracking .  
* **Secondary Persona ("The Late Starter"):** Aged 35-50, regrets not investing earlier, values security, and prefers guided, simplified financial experiences .  
* **Tertiary Persona ("The Financial Educator"):** Parents, teachers, and mentors who can use the platform as a safe and engaging tool to teach financial literacy .

### **4\. Product Strategy & Scope**

The strategy is to deliver a "Conversation-First" experience within a stable, navigable UI, all wrapped in a long-term gamified quest.

#### **Core Features (In Scope for MVP):**

* **Hybrid User Interface:**  
  * **Conversational Core:** The primary "home" screen is a chat interface with the AI agent, Goldie .  
  * **Persistent Navigation & Dashboards:** A standard navigation bar provides constant access to core visual dashboards like `Home`, `Transactions`, `Wallet`, `Calendar`, and `Portfolio`.  
  * **In-Chat Visuals:** For specific queries, n8n workflows will generate dynamic visuals (e.g., charts, data cards) and deliver them directly within the chat.  
* **"The Prosperity Keys" Gamification Loop:**  
  * A three-tiered achievement system structures the user's journey: The Copper Key (Foundation), The Silver Key (Growth), and The Gold Key (Prosperity) .  
  * Unlocking keys requires completing real-world financial tasks like building an emergency fund or making a first profitable virtual investment .  
* **Blockchain-Powered Token Economy (MVP Scope):**  
  * **ProsperCoins (PC):** An off-chain, internal point system with a fixed supply of 8 billion, recorded in the Supabase database .  
  * **NFT Achievements:** Major milestones grant users unique, AI-generated, non-transferable Soulbound Tokens (SBTs) to provide true digital ownership of their accomplishments .  
* **AI Financial Assistants (Goldie & Finn):**  
  * Two distinct AI personalities provide 24/7 guidance. Goldie is the enthusiastic motivator for daily finances, while Finn is the wise educator for investment strategy .

### **5\. Technical Stack**

* **Frontend:** Next.js 14, TypeScript, Tailwind CSS .  
* **Backend & Database:** Supabase (PostgreSQL) with Row Level Security .  
* **Conversational AI:** Vercel AI SDK with OpenAI (GPT-4) .  
* **Voice Technology:** ElevenLabs.  
* **Automation & Workflows:** n8n .  
* **Blockchain:** Base (Coinbase's L2) for SBTs.

### **6\. Actionable Next Steps**

1. **Finalize Core Navigation & Views:** Implement the persistent navigation bar that links to the core dashboard screens.  
2. **Define In-Chat Visualizations:** Identify and design the initial set of dynamically generated in-chat visuals and game events that n8n will produce.  
3. **Update Full PRD:** Update the Product Requirements Document to formalize the hybrid model, detailing the mechanics of "The Prosperity Keys" and the tokenomics.  
4. **Conduct User Testing:** Validate the hybrid UI flow with target personas, focusing on scenarios involving urgency, privacy, and complex data requests.

