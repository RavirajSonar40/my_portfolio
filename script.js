document.body.classList.add('js-enabled');
const glow = document.querySelector('.cursor-glow');
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.setAttribute('aria-hidden', 'true');
document.body.append(cursor);
let cursorX = 0, cursorY = 0, targetX = 0, targetY = 0;
window.addEventListener('pointermove', (event) => {
  targetX = event.clientX; targetY = event.clientY;
  if (glow) { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; }
});
function animateCursor() {
  cursorX += (targetX - cursorX) * 0.18;
  cursorY += (targetY - cursorY) * 0.18;
  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
  requestAnimationFrame(animateCursor);
}
if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) animateCursor();
document.querySelectorAll('a,button,.project-visual').forEach((el) => {
  el.addEventListener('pointerenter', () => cursor.classList.add('cursor-active'));
  el.addEventListener('pointerleave', () => cursor.classList.remove('cursor-active'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 280)}ms`;
  observer.observe(element);
});

document.querySelectorAll('.magnetic').forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    const rect = button.getBoundingClientRect();
    button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .12}px, ${(event.clientY - rect.top - rect.height / 2) * .12}px)`;
  });
  button.addEventListener('pointerleave', () => { button.style.transform = ''; });
});

const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.desktop-nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('mobile-open', !open);
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menu?.setAttribute('aria-expanded', 'false'); nav.classList.remove('mobile-open'); }));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

document.querySelector('.stat-line div:nth-child(2) strong')?.classList.add('stat-emphasis');

const projectsTarget = document.querySelector('#projects');
document.querySelectorAll('a[href="#projects"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (projectsTarget) { event.preventDefault(); projectsTarget.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', '#projects'); }
  });
});

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  document.querySelector('.site-header')?.classList.toggle('header-scrolled', window.scrollY > 30);
});

document.querySelectorAll('.project-visual').forEach((visual) => {
  visual.addEventListener('pointermove', (event) => {
    const rect = visual.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    visual.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
  });
  visual.addEventListener('pointerleave', () => { visual.style.transform = ''; });
});

const projectsSection = document.querySelector('#projects');
const skillsSection = document.querySelector('#skills');
if (projectsSection && skillsSection) {
  projectsSection.insertAdjacentHTML('beforeend', `<article class="project project-split reveal"><div class="project-copy"><div class="project-meta"><span>04</span><span>Crime analytics platform</span><span>Jul—Sep 2025</span></div><h3>Crime<br /><em>Track</em></h3><p>A focused analytics platform for organizing crime records, exploring patterns, and turning complex PostgreSQL queries into clearer operational decisions across police zones.</p><div class="tag-row"><span>PostgreSQL</span><span>React.js</span><span>Node.js</span><span>Analytics</span></div><div class="project-detail"><span>What it solves</span><p>Normalized data models, optimized reporting queries, real-time dashboards, and heatmaps designed to make investigation context easier to find.</p></div></div><div class="project-visual visual-migrate"><div class="migration-lanes"><div class="lane lane-accent"><span>RECORDS</span><i></i><i></i><i></i><b>●</b></div><div class="lane"><span>ANALYTICS</span><i></i><i></i><i></i><b>●</b></div><div class="lane lane-muted"><span>MAP VIEW</span><i></i><i></i><i></i><b>●</b></div></div><div class="migration-status"><span>3 POLICE ZONES</span><strong>LIVE VIEW</strong></div></div></article><article class="project project-split project-reverse reveal"><div class="project-visual visual-traffic"><div class="map-lines"><i></i><i></i><i></i><i></i><i></i></div><div class="map-node node-one">FIR</div><div class="map-node node-two">RBAC</div><div class="map-node node-three">FLOW</div><div class="map-panel"><span>REPORT BUDDY</span><strong>FIR WORKFLOW</strong><small>role-aware processing</small></div></div><div class="project-copy"><div class="project-meta"><span>05</span><span>FIR workflow automation</span><span>Oct 2025—Present</span></div><h3>Report<br /><em>Buddy</em></h3><p>A role-aware reporting workflow that gives citizens, officers, and administrators a shared path from first report to structured follow-up.</p><div class="tag-row"><span>PostgreSQL</span><span>React.js</span><span>Node.js</span><span>Role-based auth</span></div><div class="recognition"><span>Built around clarity</span><strong>Secure access, strong relational integrity, and less manual handoff between roles.</strong><small>The interface keeps each step of the FIR process visible without overwhelming the person using it.</small></div></div></article><article class="project project-feature reveal"><div class="project-visual visual-sentinel"><div class="visual-top"><span>KNOWLEDGE / ACTION</span><span>2026</span></div><div class="signal-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="incident-card"><span class="mini-dot"></span><span>AGENT RUN #018</span><strong>Evidence verified</strong><small>human approval requested</small></div><div class="visual-bottom"><span>SEARCH → REASON → ACT</span><span>RAG / AGENTS</span></div></div><div class="project-copy"><div class="project-meta"><span>06</span><span>RAG & agentic AI platform</span><span>2026</span></div><h3>Knowledge<br /><em>& Action</em></h3><p>An AI-powered knowledge and action platform designed to move beyond question answering: it searches trusted context, decomposes tasks, gathers evidence, verifies its work, and asks for human approval before consequential actions.</p><div class="tag-row"><span>FastAPI</span><span>LangGraph</span><span>PostgreSQL</span><span>pgvector</span><span>Ragas</span><span>Angular</span></div><div class="project-detail"><span>Measured intelligence</span><p>Includes semantic search, document recommendations, multi-provider LLM support, and observability for faithfulness, context precision, recall, latency, and token consumption.</p></div></div></article>`);
  const skillList = skillsSection.querySelector('.skill-list');
  if (skillList) skillList.innerHTML = `<div class="skill-group"><span>01</span><div><h3>CS fundamentals</h3><p>DSA · OOP · Operating Systems · Computer Networks · DBMS · System Design · Distributed Systems</p></div></div><div class="skill-group"><span>02</span><div><h3>Languages</h3><p>Java · JavaScript · TypeScript</p></div></div><div class="skill-group"><span>03</span><div><h3>Frameworks</h3><p>Next.js · React.js · Node.js · Express.js · Tailwind CSS</p></div></div><div class="skill-group"><span>04</span><div><h3>Databases & ORMs</h3><p>PostgreSQL · MongoDB · MySQL · Redis · Pinecone · Prisma ORM · Mongoose ORM</p></div></div><div class="skill-group"><span>05</span><div><h3>Distributed systems</h3><p>Kafka · RabbitMQ · BullMQ · Socket.IO · REST API · GraphQL · gRPC · SSE · WebSockets</p></div></div><div class="skill-group"><span>06</span><div><h3>AI / ML</h3><p>Multi-provider LLM integration · Vector search · RAG-based retrieval</p></div></div><div class="skill-group"><span>07</span><div><h3>DevOps & infrastructure</h3><p>Docker · Kubernetes · Nginx · AWS · Cloudflare R2</p></div></div><div class="skill-group"><span>08</span><div><h3>Tools & security</h3><p>Git · GitHub · Postman · Figma · JWT · RBAC</p></div></div><div class="skill-group"><span>09</span><div><h3>AI coding assistants / IDEs</h3><p>Cursor · Antigravity · OpenCode · Hermes</p></div></div>`;
  document.querySelectorAll('.reveal').forEach((element, index) => { if (!element.dataset.observed) { element.dataset.observed = 'true'; element.style.transitionDelay = `${Math.min(index * 45, 280)}ms`; observer.observe(element); } });
}
