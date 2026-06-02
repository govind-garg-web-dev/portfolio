export interface Project {
  id: string;
  title: string;
  img: string;
  href: string;
  span: "md:col-span-7" | "md:col-span-5";
  aspect: "aspect-[16/10]" | "aspect-[4/5]";
}

export interface ExplorationItem {
  id: string;
  img: string;
  label: string;
  col: 0 | 1;
  rotation: number;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface HeroSettings {
  eyebrow: string;
  name: string;
  city: string;
  roles: string[];
  description: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}

export interface FooterSettings {
  marqueeText: string;
  headline: string;
  email: string;
  availableText: string;
}

export interface NavSettings {
  logoText: string;
  links: { label: string; sectionId: string }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImg: string;
  date: string;
  readTime: string;
  tags: string[];
  published: boolean;
}

export interface SiteData {
  hero: HeroSettings;
  nav: NavSettings;
  projects: Project[];
  explorations: ExplorationItem[];
  stats: Stat[];
  socials: SocialLink[];
  footer: FooterSettings;
  blog: BlogPost[];
}

const b1content = [
  "## Introduction",
  "",
  "Negative space -- also known as white space -- is the area *around* and *between* the subjects of an image. Far from being wasted space, it is one of the most powerful tools in a designer's toolkit.",
  "",
  "## Why It Works",
  "",
  "Our brains are wired to find patterns and fill in gaps. Negative space exploits this tendency to create **balance**, **hierarchy**, and **focus**.",
  "",
  "> \"Design is not just what it looks like and feels like. Design is how it works.\" -- Steve Jobs",
  "",
  "## Practical Applications",
  "",
  "1. **Logo design** -- The FedEx arrow hidden between the E and X",
  "2. **Typography** -- Leading and tracking that lets text breathe",
  "3. **UI layouts** -- Padding that guides the eye through a flow",
  "",
  "## Conclusion",
  "",
  "Mastering negative space is mastering restraint. The next time you reach to fill a gap, pause and ask: what if the space *is* the design?",
].join("\n");

const b2content = [
  "## What is a Design System?",
  "",
  "A design system is a **single source of truth** -- a collection of reusable components, patterns, and guidelines that teams use to build consistent products.",
  "",
  "## Core Pillars",
  "",
  "### 1. Tokens",
  "Design tokens are the atomic values of your system -- colors, spacing, typography, shadows. Store them as variables and reference them everywhere.",
  "",
  "```css",
  ":root {",
  "  --color-brand: #4E85BF;",
  "  --space-4: 1rem;",
  "  --radius-md: 0.5rem;",
  "}",
  "```",
  "",
  "### 2. Components",
  "Build components in isolation. Each component should do one thing well and accept props that cover all real use cases.",
  "",
  "### 3. Documentation",
  "A system nobody understands is a system nobody uses. Write examples, not just API docs.",
  "",
  "## Scaling Tips",
  "",
  "- **Version your system** like a package -- semver keeps teams in sync",
  "- **Audit regularly** -- remove components that have no consumers",
  "- **Invite contribution** -- the best systems are shaped by the people who use them",
  "",
  "## Final Thought",
  "",
  "A design system is never finished. It evolves as your product does. Embrace the iteration.",
].join("\n");

const b3content = [
  "## The Fear Is Understandable",
  "",
  "Every time a new technology arrives, designers worry. Desktop publishing was going to kill graphic designers. The internet was going to make agencies obsolete. Apps were going to replace web designers.",
  "",
  "None of that happened. The role *evolved*.",
  "",
  "AI is the same story -- except it's moving faster than anything before it.",
  "",
  "## What AI Actually Does in a Design Workflow",
  "",
  "Let me be specific, because \"AI\" is thrown around so loosely it's lost meaning.",
  "",
  "### Ideation & Moodboarding",
  "Tools like **Midjourney** and **Adobe Firefly** collapse the time between \"I have a vague idea\" and \"here's a visual direction\" from days to minutes. You can explore 20 visual territories in an afternoon.",
  "",
  "### Copy & Microcopy",
  "**ChatGPT** and **Claude** can draft button labels, error messages, onboarding flows, and marketing copy in seconds. Not always perfectly -- but as a starting point that you refine, it's a 10x multiplier.",
  "",
  "### Component Generation",
  "**Figma AI** and tools like **v0 by Vercel** can take a rough description and produce a working UI component. The output often needs cleanup, but the scaffolding is done.",
  "",
  "### User Research Synthesis",
  "Feeding interview transcripts into an LLM and getting back a structured affinity map in minutes -- that used to take a researcher a full day.",
  "",
  "## What AI Can't Do",
  "",
  "> AI can generate. It cannot *understand*.",
  "",
  "AI doesn't know that your client's brand voice is \"warm but authoritative.\" It doesn't know that the modal you're designing will be seen by elderly users with low vision. It doesn't know the political dynamics between the product team and the stakeholders.",
  "",
  "**Context is the designer's superpower.** AI has none of it without you.",
  "",
  "## The New Role: Director, Not Executor",
  "",
  "The shift is from *making* things to *directing* things. You're not less valuable -- you're operating at a higher altitude.",
  "",
  "```",
  "Before AI: Idea -> Research -> Wireframe -> Design -> Prototype -> Test",
  "After AI:  Idea -> [AI: 20 directions in 10 min] -> Curate -> Refine -> Test",
  "```",
  "",
  "The curation and refinement steps require taste, judgment, and domain expertise. Those are human. AI is the brushwork; you're still the artist.",
  "",
  "## Practical Steps to Adopt AI Now",
  "",
  "1. **Integrate one tool at a time.** Start with Firefly for image generation or ChatGPT for copy.",
  "2. **Document your prompts.** A well-crafted prompt is a reusable asset. Treat it like a design token.",
  "3. **Stay in the loop on outputs.** AI hallucinates, misses accessibility needs, and reproduces biases. Review everything.",
  "4. **Invest in taste.** AI raises the floor; it doesn't raise the ceiling. Your ceiling is still your judgment.",
  "",
  "## Conclusion",
  "",
  "The designers who will thrive are not the ones who ignore AI, and not the ones who outsource their thinking to it. They're the ones who use it as a force multiplier for what they were already good at.",
  "",
  "That's always been the story of tools and craft.",
].join("\n");

const b4content = [
  "## You Will Be Humbled",
  "",
  "I've been building with large language models for two years. In that time I've shipped three LLM-powered features, watched one fail in production, and learned more from the failure than from anything else.",
  "",
  "This is what I wish someone had told me at the start.",
  "",
  "## Lesson 1: Latency Is a UX Problem First",
  "",
  "The first thing users notice about your AI feature isn't the quality -- it's the wait. A brilliant response that takes 8 seconds feels worse than a pretty-good response that streams in over 1.5 seconds.",
  "",
  "**Streaming is non-negotiable.** Use the **stream: true** option in your API calls and render tokens as they arrive. The perceived speed improvement is dramatic.",
  "",
  "```typescript",
  "const stream = await openai.chat.completions.create({",
  "  model: 'gpt-4o',",
  "  messages,",
  "  stream: true,",
  "});",
  "",
  "for await (const chunk of stream) {",
  "  const delta = chunk.choices[0]?.delta?.content ?? '';",
  "  onToken(delta); // render to UI immediately",
  "}",
  "```",
  "",
  "## Lesson 2: Prompts Are Code -- Treat Them That Way",
  "",
  "Your system prompt is the most important piece of code in your LLM feature. Version it. Test it. Review changes to it as seriously as you'd review a database migration.",
  "",
  "**Prompt hygiene checklist:**",
  "- Store prompts in version control, not in env files or database rows",
  "- Write unit tests that assert on output characteristics",
  "- Define explicit failure modes and test for them",
  "- Document *why* each instruction exists, not just what it does",
  "",
  "## Lesson 3: The Context Window Is Your Budget",
  "",
  "Every token you send costs money and adds latency. Treat the context window like memory -- precious and finite.",
  "",
  "| Mistake | Fix |",
  "|---|---|",
  "| Sending entire conversation history | Summarize older turns |",
  "| Including raw database dumps | Extract only relevant fields |",
  "| Repeating the system prompt in each turn | Put it once, at the top |",
  "| No truncation strategy | Implement sliding window or summary |",
  "",
  "## Lesson 4: Evals Before Features",
  "",
  "Before you ship a new prompt or model change, you need a way to measure whether it's better or worse than what came before.",
  "",
  "Build a simple eval harness:",
  "1. **Golden dataset** -- 50-100 representative inputs with expected outputs",
  "2. **Scoring function** -- automated where possible, human-reviewed for nuanced cases",
  "3. **Regression gate** -- don't deploy if eval score drops by more than X%",
  "",
  "## Lesson 5: Ground Truth Over Hallucination",
  "",
  "LLMs confabulate. They'll state incorrect facts with total confidence. If your product depends on factual accuracy -- legal, medical, financial, technical -- you need Retrieval-Augmented Generation (RAG).",
  "",
  "The pattern:",
  "```",
  "User query -> Vector search your knowledge base -> Inject relevant chunks -> LLM answers from evidence",
  "```",
  "",
  "This isn't a silver bullet -- you can still get hallucinations -- but it gives the model ground truth to reason from.",
  "",
  "## Graceful Degradation",
  "",
  "What happens when the API is down? When rate limits are hit? When the model returns garbage? Plan for it from day one.",
  "",
  "Every LLM-powered feature needs:",
  "- A timeout + fallback UI",
  "- Error states that don't expose internal prompts to users",
  "- Logging of every input/output pair (with appropriate privacy considerations)",
  "",
  "## Closing Thought",
  "",
  "Building with LLMs is genuinely exciting. The capabilities are real. But they come with a new class of problems that don't have established playbooks yet.",
  "",
  "The teams that will win are the ones who treat LLM integration with the same engineering rigor they'd apply to a database or payments system.",
].join("\n");

const b5content = [
  "## Deterministic vs. Probabilistic",
  "",
  "Every UX principle you learned was built for deterministic interfaces. Click a button, get a result. Fill a form, see a confirmation. The same input always produces the same output.",
  "",
  "AI shatters this assumption.",
  "",
  "The same prompt, submitted twice, can produce meaningfully different results. The model can be confident and wrong. It can misunderstand intent in ways a traditional form never could.",
  "",
  "Designing for this is a genuinely new problem.",
  "",
  "## Principle 1: Set Expectations Before the Interaction",
  "",
  "Users arrive at AI features with one of two broken mental models:",
  "- **Omniscient oracle** -- they expect it to know everything and be always right",
  "- **Dumb chatbot** -- they expect it to be useless and won't engage seriously",
  "",
  "Both are wrong, and both lead to frustration. Your job is to calibrate expectations *before* the first interaction.",
  "",
  "Good patterns:",
  "- **Capability statements** -- \"I can help you draft emails, summarize documents, and answer questions about your account.\"",
  "- **Explicit limitations** -- \"I don't have access to real-time information.\"",
  "- **Example prompts** -- Show users what good inputs look like.",
  "",
  "## Principle 2: Make the AI's Confidence Visible",
  "",
  "When a doctor isn't sure about a diagnosis, they say so. Your AI should too.",
  "",
  "Design for uncertainty signals:",
  "- **Hedging language** in generated text (\"Based on the information provided...\", \"You may want to verify...\")",
  "- **Confidence indicators** where you can compute them",
  "- **Citation or sourcing** when the AI draws on specific knowledge",
  "",
  "Overconfident AI erodes trust the moment it's wrong. Appropriately uncertain AI builds trust because it matches reality.",
  "",
  "## Principle 3: Always Provide an Escape Hatch",
  "",
  "No AI feature should be a dead end. Every generated output needs at least one of:",
  "",
  "- **Edit** -- let the user modify the output directly",
  "- **Regenerate** -- try again with the same input",
  "- **Refine** -- adjust the prompt and try again",
  "- **Reject & fallback** -- dismiss the AI output and do it manually",
  "",
  "## Principle 4: Feedback Loops Close the Loop",
  "",
  "Thumbs up / thumbs down feels trivial. But over thousands of interactions, it's gold.",
  "",
  "Design feedback mechanisms that are:",
  "- **Low friction** -- inline, one-tap, not a separate modal",
  "- **Contextual** -- tied to the specific output, not the feature in general",
  "- **Actionable** -- routed to a system that actually uses the signal",
  "",
  "## Principle 5: Transparency Builds Trust",
  "",
  "Users are increasingly aware that they're interacting with AI. Hiding it backfires.",
  "",
  "Be explicit:",
  "- Label AI-generated content",
  "- Explain how the AI reached its output when it matters",
  "- Let users know their inputs may be used to improve the model (and honor opt-outs)",
  "",
  "## A New Design Primitive: The Prompt",
  "",
  "Prompt interfaces need their own design vocabulary:",
  "- **Placeholder text** that models good prompts, not just \"Ask me anything...\"",
  "- **Prompt history** so users can build on what worked",
  "- **Template library** for common use cases",
  "- **Character / token guidance** so users understand scope",
  "",
  "## Conclusion",
  "",
  "Designing for AI isn't harder than traditional UX -- it's *different*. The core questions remain the same: What does the user need? How do we reduce friction and build trust?",
  "",
  "The difference is that your interface is now a collaborator, not a tool. That changes the conversation.",
].join("\n");

const b6content = [
  "## An Unexpected Parallel",
  "",
  "I've been a designer for eight years. When prompt engineering started becoming a thing people talked about seriously, I assumed it was a developer skill -- something about tokens and temperature and API parameters.",
  "",
  "Then I tried it seriously, and I realized: **this is design**.",
  "",
  "Not in a metaphorical sense. The cognitive skills, the iterative process, the vocabulary of constraints -- it maps almost 1:1 onto what designers do every day.",
  "",
  "## What Prompt Engineering Actually Is",
  "",
  "Strip away the jargon and prompt engineering is this: **communicating intent to a system that needs to understand context, constraints, and goals to produce a useful output.**",
  "",
  "Sound familiar? That's also what a design brief is. What a user story is. What a creative brief is.",
  "",
  "## The Parallels Are Exact",
  "",
  "### Clarity of Intent",
  "In design: a vague brief produces vague work.",
  "In prompting: a vague prompt produces vague output.",
  "",
  "Both disciplines reward people who can articulate *exactly* what they want, why they want it, and what success looks like.",
  "",
  "### Constraints as Creativity",
  "Good designers know that constraints produce better work than blank canvases.",
  "",
  "> Bad: \"Write me a tagline.\"",
  "> Good: \"Write 5 taglines for a B2B SaaS product that helps HR teams reduce onboarding time. Tone: professional but warm. No more than 8 words each.\"",
  "",
  "### Iteration Is the Method",
  "Designers don't get it right on the first try. Neither do prompts. The process is:",
  "",
  "```",
  "Draft -> Evaluate -> Identify gap -> Refine -> Repeat",
  "```",
  "",
  "The difference is cycle time. With AI, you iterate in seconds instead of days.",
  "",
  "### Understanding the Medium",
  "A designer who doesn't understand how screens render, how users scroll, how touch targets work -- makes bad design decisions.",
  "",
  "A prompt engineer who doesn't understand how LLMs process context, what they're trained on, where they hallucinate -- makes bad prompts.",
  "",
  "## Prompting Patterns Every Designer Should Know",
  "",
  "**Role prompting** -- Give the model a persona:",
  "> \"You are a senior UX writer at a fintech company with a focus on plain language and accessibility.\"",
  "",
  "**Chain of thought** -- Ask it to reason before concluding:",
  "> \"First, identify the core user need. Then, consider three possible approaches. Finally, recommend one with your reasoning.\"",
  "",
  "**Few-shot examples** -- Show it what good looks like:",
  "> \"Here are three examples of microcopy in our brand voice: [examples]. Now write button labels for the checkout flow.\"",
  "",
  "**Negative constraints** -- Tell it what to avoid:",
  "> \"Do not use jargon. Do not use exclamation marks. Do not start with 'I'.\"",
  "",
  "## The Meta-Skill: Evaluating Output",
  "",
  "The hardest part of both design and prompting isn't producing output -- it's evaluating it.",
  "",
  "Is this *actually* good, or does it just look good? Does it solve the real problem, or the stated problem?",
  "",
  "Developing taste is a lifelong project in both disciplines. AI doesn't shortcut it. If anything, it makes taste more valuable -- because output volume increases, but the ability to distinguish good from bad stays human.",
  "",
  "## Conclusion",
  "",
  "The tools will keep improving. Models will get better at understanding nuanced intent. Prompt interfaces will become more visual, more multimodal, more embedded in existing workflows.",
  "",
  "But the underlying skill -- communicating intent clearly, iterating toward quality, evaluating outputs with taste -- that's not going away.",
  "",
  "Designers who develop this skill now will have a meaningful advantage for the next decade.",
].join("\n");

export const DEFAULT_DATA: SiteData = {
  hero: {
    eyebrow: "COLLECTION '26",
    name: "Michael Smith",
    city: "Chicago",
    roles: ["Creative", "Fullstack", "Founder", "Scholar"],
    description:
      "Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.",
    ctaPrimaryLabel: "See Works",
    ctaPrimaryHref: "#works",
    ctaSecondaryLabel: "Reach out...",
    ctaSecondaryHref: "mailto:hello@michaelsmith.com",
  },
  nav: {
    logoText: "JA",
    links: [
      { label: "Home", sectionId: "hero" },
      { label: "Work", sectionId: "works" },
      { label: "Resume", sectionId: "stats" },
    ],
  },
  projects: [
    { id: "p1", title: "Automotive Motion", span: "md:col-span-7", aspect: "aspect-[16/10]", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80", href: "#" },
    { id: "p2", title: "Urban Architecture", span: "md:col-span-5", aspect: "aspect-[4/5]", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80", href: "#" },
    { id: "p3", title: "Human Perspective", span: "md:col-span-5", aspect: "aspect-[4/5]", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", href: "#" },
    { id: "p4", title: "Brand Identity", span: "md:col-span-7", aspect: "aspect-[16/10]", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", href: "#" },
  ],
  explorations: [
    { id: "e1", img: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&q=80", label: "Geometry", col: 0, rotation: -3 },
    { id: "e2", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", label: "Portrait", col: 1, rotation: 2 },
    { id: "e3", img: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?w=600&q=80", label: "Abstract", col: 0, rotation: 1 },
    { id: "e4", img: "https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?w=600&q=80", label: "Landscape", col: 1, rotation: -2 },
    { id: "e5", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", label: "Texture", col: 0, rotation: 2 },
    { id: "e6", img: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=600&q=80", label: "Light", col: 1, rotation: -1 },
  ],
  stats: [
    { id: "s1", value: "20+", label: "Years Experience" },
    { id: "s2", value: "95+", label: "Projects Done" },
    { id: "s3", value: "200%", label: "Satisfied Clients" },
  ],
  socials: [
    { id: "so1", label: "Twitter", href: "#" },
    { id: "so2", label: "LinkedIn", href: "#" },
    { id: "so3", label: "Dribbble", href: "#" },
    { id: "so4", label: "GitHub", href: "#" },
  ],
  footer: {
    marqueeText: "BUILDING THE FUTURE • ",
    headline: "Let's build something\nremarkable",
    email: "hello@michaelsmith.com",
    availableText: "Available for projects",
  },
  blog: [
    {
      id: "b1",
      slug: "the-art-of-negative-space",
      title: "The Art of Negative Space in Modern Design",
      excerpt: "How the absence of elements can be the most powerful tool in a designer's arsenal.",
      content: b1content,
      coverImg: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&q=80",
      date: "Mar 2026",
      readTime: "5 min read",
      tags: ["Design", "Theory"],
      published: true,
    },
    {
      id: "b2",
      slug: "building-design-systems-that-scale",
      title: "Building Design Systems That Scale",
      excerpt: "A practical guide to creating component libraries that grow with your product.",
      content: b2content,
      coverImg: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80",
      date: "Feb 2026",
      readTime: "8 min read",
      tags: ["Design Systems", "Frontend"],
      published: true,
    },
    {
      id: "b3",
      slug: "ai-is-reshaping-the-design-workflow",
      title: "AI Is Reshaping the Design Workflow",
      excerpt: "How tools like Midjourney, Figma AI, and ChatGPT are shifting the designer's role from executor to director.",
      content: b3content,
      coverImg: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
      date: "Apr 2026",
      readTime: "7 min read",
      tags: ["AI", "Design", "Workflow"],
      published: true,
    },
    {
      id: "b4",
      slug: "building-with-llms-lessons-from-the-trenches",
      title: "Building with LLMs: Lessons from the Trenches",
      excerpt: "A practical guide to integrating large language models into real products -- what works, what doesn't, and what will surprise you.",
      content: b4content,
      coverImg: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
      date: "Mar 2026",
      readTime: "9 min read",
      tags: ["AI", "Engineering", "LLMs"],
      published: true,
    },
    {
      id: "b5",
      slug: "the-ux-of-ai-designing-for-unpredictability",
      title: "The UX of AI: Designing for Unpredictability",
      excerpt: "Traditional UX assumes deterministic interfaces. AI breaks that assumption entirely -- here's how to design around it.",
      content: b5content,
      coverImg: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1200&q=80",
      date: "Feb 2026",
      readTime: "8 min read",
      tags: ["AI", "UX", "Design"],
      published: true,
    },
    {
      id: "b6",
      slug: "prompt-engineering-is-a-design-discipline",
      title: "Prompt Engineering Is a Design Discipline",
      excerpt: "The skills that make a great prompt engineer overlap almost entirely with the skills that make a great UX designer.",
      content: b6content,
      coverImg: "https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=1200&q=80",
      date: "Jan 2026",
      readTime: "6 min read",
      tags: ["AI", "Design", "Prompt Engineering"],
      published: true,
    },
  ],
};

const STORAGE_KEY = "portfolio_data";

export function loadData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_DATA;
}

export function saveData(data: SiteData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetData(): SiteData {
  localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_DATA;
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
