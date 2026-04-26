const services = [
  ["🌐", "Web Design & Development", "Responsive websites built for performance, trust, and conversion."],
  ["🛒", "E-Commerce Solutions", "Online stores designed to improve shopping flow and increase sales."],
  ["📢", "Digital Marketing", "Campaigns and funnels that generate leads and track measurable ROI."],
  ["✏️", "Branding & Design", "Visual identity, social templates, and brand systems people remember."],
  ["⚙️", "Support & Maintenance", "Updates, security checks, content changes, and ongoing improvements."],
  ["📈", "SEO & Local Optimization", "Search improvements that help customers find you faster."],
  ["👥", "Social Media Management", "Content planning and publishing that builds awareness and loyalty."],
  ["✉️", "Email Marketing & Automation", "Automated campaigns that nurture leads and bring customers back."],
  ["📱", "Mobile App Development", "Custom mobile experiences for teams, customers, and operations."],
  ["📊", "CRM & Analytics Dashboards", "Centralized data, lead tracking, and reports for smarter decisions."]
];

const projects = [
  ["Homely Real Estate", "Lead-focused property website with inquiry flows and listings.", "Web Design", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"],
  ["Luxora Store", "Modern online store with product collections and conversion-focused pages.", "E-Commerce", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"],
  ["MarketPro Campaign", "Data-driven launch campaign for stronger lead quality and follow-up.", "Automation", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"],
  ["TaskFlow App", "Productivity app concept for tasks, reminders, and team coordination.", "Automation", "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80"],
  ["Nova Studio", "Brand identity system for a creative studio entering a new market.", "Branding", "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=900&q=80"],
  ["Insight Dashboard", "Business intelligence dashboard for real-time reporting and decisions.", "Web Design", "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=900&q=80"]
];

const posts = [
  ["How to Build a Scalable Digital Strategy", "Learn the core steps behind a digital strategy that can grow with your business.", "Strategy", "2026"],
  ["Data-Driven Marketing That Delivers Results", "Use campaign data to understand what is working and where to improve next.", "Marketing", "2026"],
  ["Why User Experience Matters", "Good UX reduces friction, improves trust, and helps more visitors become customers.", "Web Design", "2026"],
  ["E-Commerce Trends You Should Know", "Practical improvements shaping faster, clearer, and more profitable online stores.", "E-Commerce", "2026"],
  ["How to Build a Strong Brand on Social Media", "Simple habits for consistency, recognition, and better audience connection.", "Social Media", "2026"],
  ["Website Security Best Practices", "Protect your website and users with sensible security and maintenance routines.", "Technology", "2026"]
];

const processSteps = [
  ["01", "Discover", "We listen, learn, and understand your business.", "Goals, audience, competitors, tools, and current pain points."],
  ["02", "Plan", "We create a practical roadmap.", "Scope, features, content, timeline, integrations, and launch priorities."],
  ["03", "Design", "We craft experiences that engage and convert.", "Wireframes, visual direction, responsive layouts, and review rounds."],
  ["04", "Develop", "We build with precision and performance.", "Clean implementation, integrations, automation, and content setup."],
  ["05", "Test", "We verify quality before launch.", "Device testing, browser checks, forms, performance, and accessibility basics."],
  ["06", "Launch", "We go live with a clear handoff.", "Deployment, analytics, training, documentation, and immediate support."],
  ["07", "Support", "We keep improving after launch.", "Maintenance, updates, reporting, and new feature planning."]
];

const menu = document.getElementById("menu");
const menuToggle = document.querySelector(".menu-toggle");

function serviceCard(service) {
  return `<article class="card"><span class="ico">${service[0]}</span><h3>${service[1]}</h3><p>${service[2]}</p><a class="navlink" href="#contact" data-page="contact">Learn More</a></article>`;
}

function renderServices() {
  document.querySelector(".service-short").innerHTML = services.slice(0, 5).map(serviceCard).join("");
  document.querySelector(".service-full").innerHTML = services.map(serviceCard).join("");
}

function renderProjects(filter = "All") {
  const visible = filter === "All" ? projects : projects.filter(project => project[2] === filter);
  document.getElementById("portfolioGrid").innerHTML = visible.map(project => `
    <article class="project">
      <div class="thumb" style="background-image:url('${project[3]}')"></div>
      <div class="project-body">
        <span class="tag">${project[2]}</span>
        <h3>${project[0]}</h3>
        <p>${project[1]}</p>
        <a class="navlink" href="#contact" data-page="contact">Start a similar project</a>
      </div>
    </article>
  `).join("");
}

function renderPosts(query = "") {
  const normalized = query.trim().toLowerCase();
  const visible = posts.filter(post => post.join(" ").toLowerCase().includes(normalized));
  document.getElementById("blogGrid").innerHTML = visible.map(post => `
    <article class="article">
      <div class="article-body">
        <span class="tag">${post[2]}</span>
        <h3>${post[0]}</h3>
        <p>${post[1]}</p>
        <small>${post[3]} • 5 min read</small>
      </div>
    </article>
  `).join("");
  document.getElementById("blogEmpty").hidden = visible.length > 0;
}

function renderProcess() {
  document.getElementById("processList").innerHTML = processSteps.map(step => `
    <article class="step">
      <div class="num">${step[0]}</div>
      <div><h3>${step[1]}</h3><p>${step[2]}</p></div>
      <p>${step[3]}</p>
    </article>
  `).join("");
}

function showPage(id, shouldPush = true) {
  const target = document.getElementById(id) ? id : "home";
  document.querySelectorAll(".page").forEach(page => page.classList.toggle("active", page.id === target));
  document.querySelectorAll(".menu a").forEach(link => link.classList.toggle("active", link.dataset.page === target));
  menu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  const page = document.getElementById(target);
  document.title = page.dataset.title || "GET Digital Services";
  if (shouldPush) history.pushState({ page: target }, "", `#${target}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", event => {
  const link = event.target.closest(".navlink");
  if (!link || !link.dataset.page) return;
  event.preventDefault();
  showPage(link.dataset.page);
});

menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

document.getElementById("blogSearch").addEventListener("input", event => renderPosts(event.target.value));

document.getElementById("contactForm").addEventListener("submit", async event => {
  event.preventDefault();
  const form  = event.currentTarget;
  const note  = document.getElementById("formNote");
  const btn   = form.querySelector("button.send");

  btn.disabled    = true;
  btn.textContent = "Sending…";
  note.textContent = "";

  const payload = {
    name:      form.querySelector("[name='name']").value.trim(),
    email:     form.querySelector("[name='email']").value.trim(),
    phone:     form.querySelector("[name='phone']").value.trim(),
    subject:   form.querySelector("[name='subject']").value.trim(),
    message:   form.querySelector("[name='message']").value.trim(),
    botcheck:  form.querySelector("[name='botcheck']").checked,
  };

  try {
    const res  = await fetch("/api/contact", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });

    const json = await res.json();

    if (res.ok && json.success) {
      note.textContent = "✅ Message sent! We'll be in touch within 24 hours.";
      note.style.color = "#22c55e";
      form.reset();
    } else {
      throw new Error(json.message || "Server error");
    }
  } catch (err) {
    note.textContent = "❌ Something went wrong. Please email us at get.corp.je@gmail.com";
    note.style.color = "#ef4444";
    console.error("Form error:", err);
  } finally {
    btn.disabled    = false;
    btn.textContent = "Send Message";
  }
});

window.addEventListener("popstate", () => showPage(location.hash.replace("#", "") || "home", false));

renderServices();
renderProjects();
renderPosts();
renderProcess();
document.getElementById("year").textContent = new Date().getFullYear();
showPage(location.hash.replace("#", "") || "home", false);
