/* ============================================
   script.js - FINAL (Tabs + Modals + Sections)
============================================ */
/* ============================================
   script.js - CLEAN FIX (Tabs + Modals + Sections)
   - FIXED: duplicate click handlers
   - FIXED: scope errors (webProjects/openPgModal used outside DOMContentLoaded)
   - FIXED: web cards + mobile card open correct modals
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // SECTION SWITCHING
  // ---------------------------
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(
    'a.nav-link, a[href="#projects"], a[href="#home"], a[href="#about"], a[href="#contact"]'
  );

  function showSection(id) {
    sections.forEach((sec) => {
      if (sec.id === id) {
        sec.classList.remove("hidden-section");
        sec.classList.add("visible");
      } else {
        sec.classList.add("hidden-section");
        sec.classList.remove("visible");
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const initial = (location.hash || "#home").replace("#", "");
  if (document.getElementById(initial)) showSection(initial);

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.replace("#", "");
      if (!document.getElementById(id)) return;

      e.preventDefault();
      history.pushState(null, "", `#${id}`);
      showSection(id);
    });
  });

  window.addEventListener("popstate", () => {
    const id = (location.hash || "#home").replace("#", "");
    if (document.getElementById(id)) showSection(id);
  });

  // ---------------------------
  // PROJECT TABS FILTER
  // ---------------------------
  const tabButtons = document.querySelectorAll(".project-tab-pill");
  const projectCards = document.querySelectorAll(".project-card-item");

  function applyFilter(filter) {
    projectCards.forEach((card) => {
      const cat = card.dataset.category;
      card.classList.toggle("hidden", cat !== filter);
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.filter);
    });
  });

  applyFilter("website");

  // ---------------------------
  // WEBSITE PROJECT DATA
  // ---------------------------
  const webProjects = {
    web1: {
      title: "FloodTrack Admin Dashboard",
      sub: "WEB APPLICATION",
      image: "src/web-proj-1.png",
      link: "https://floodtrack-94cc3.web.app/",
      category: "Admin Dashboard",
      status: "Completed",
      desc:
        "FloodTrack Web Dashboard is an administrative platform designed for barangay and municipal authorities to monitor, manage, and analyze flood reports submitted by users. It provides real-time map visualization, report validation tools, and data insights to support informed decision-making and disaster response.",
      features: [
        "Role-based authentication (Admin/Staff)",
        "Map-based flood report monitoring",
        "Analytics dashboard and data filtering",
        "Community reports management",
      ],
      tools: ["React.js + Vite", "HTML", "CSS", "JavaScript", "Firebase", "Python", "Cloud Functions"],
      credentials: [
        {
          role: "Municipality Admin",
          email: "cebu.municipalityadmin@gmail.com",
          pass: "Test1234!",
        },
        {
          role: "Barangay Admin",
          email: "cebu.barangayadmin2@gmail.com",
          pass: "Test1234!",
        },
      ],
    },

    web2: {
      title: "LibraTrack: Smart Library Management System",
      sub: "WEB APPLICATION",
      image: "src/web-proj-2.png",
      link: "https://libratrack-zh92.onrender.com/",
      category: "Web Application",
      status: "Completed",
      desc:
        "LibraTrack is a web-based library system using PHP/MySQL to manage books, borrowing/returning, and user accounts with multiple roles.",
      features: [
        "Multi-role login (Admin/Librarian/Student)",
        "Book inventory and categorization",
        "Borrowing and returning transactions",
        "Member registration and management",
      ],
      tools: ["PHP 8", "MySQL", "Bootstrap", "JavaScript", "Laravel", "Apache"],
      credentials: [
  {
    role: "System Admin",
    email: "admin2@libratrack.com",
    pass: "Admin123!"
  }
]
    },

    web3: {
      title: "Portfolio Website",
      sub: "WEB APPLICATION",
      image: "src/web-proj-3.png",
      link: "#",
      category: "Website",
      status: "Completed",
      desc:
        "A personal portfolio showcasing projects, skills, and contact information with clean UI and responsive layout.",
      features: [
        "Responsive sections (Home/About/Projects/Contact)",
        "Project tab filtering",
        "Modal previews",
        "Dark mode ready layout",
      ],
      tools: ["Tailwind", "CSS", "JavaScript"],
      credentials: [],
    },
  };

  // ---------------------------
  // WEBSITE MODAL OPEN/CLOSE
  // ---------------------------
  const pgModal = document.getElementById("projectGallery");
  const pgTitle = document.getElementById("pgTitle");
  const pgSub = document.getElementById("pgSub");
  const pgPreviewImg = document.getElementById("pgPreviewImg");
  const pgLink = document.getElementById("pgLink");
  const pgMiniCategory = document.getElementById("pgMiniCategory");
  const pgStatus = document.getElementById("pgStatus");
  const pgDesc = document.getElementById("pgDesc");
  const pgFeatures = document.getElementById("pgFeatures");
  const pgTools = document.getElementById("pgTools");
  const pgCredCard = document.getElementById("pgCredCard");
  const pgCredBody = document.getElementById("pgCredBody");

  function openPgModal(data) {
    pgTitle.textContent = data.title || "";
    pgSub.textContent = data.sub || "";
    pgPreviewImg.src = data.image || "";
    pgLink.href = data.link || "#";
    pgMiniCategory.textContent = data.category || "Web Application";
    pgStatus.textContent = data.status || "Completed";
    pgDesc.textContent = data.desc || "";

    // features
    pgFeatures.innerHTML = "";
    (data.features || []).forEach((f) => {
      const div = document.createElement("div");
      div.className = "pg-feature";
      div.innerHTML = `<span class="pg-check">✓</span><span>${f}</span>`;
      pgFeatures.appendChild(div);
    });

    // tools
    pgTools.innerHTML = "";
    (data.tools || []).forEach((t) => {
      const tag = document.createElement("span");
      tag.className = "pg-tag";
      tag.textContent = t;
      pgTools.appendChild(tag);
    });

    // credentials
    if (!data.credentials || data.credentials.length === 0) {
      pgCredCard.style.display = "none";
    } else {
      pgCredCard.style.display = "block";
      pgCredBody.innerHTML = "";
      data.credentials.forEach((c) => {
        const block = document.createElement("div");
        block.className = "pg-cred-block";
        block.innerHTML = `
          <p class="pg-cred-role">${c.role}</p>
          <p class="pg-cred-line"><strong>Email:</strong> ${c.email}</p>
          <p class="pg-cred-line"><strong>Pass:</strong> ${c.pass}</p>
        `;
        pgCredBody.appendChild(block);
      });
    }

    pgModal.classList.remove("hidden");
    pgModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closePgModal() {
    pgModal.classList.add("hidden");
    pgModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  pgModal.addEventListener("click", (e) => {
    if (e.target.dataset.close === "true") closePgModal();
  });

  // ---------------------------
  // MOBILE MODAL (YOUR mpp HTML IDS)
  // ---------------------------
  const mobileModal = document.getElementById("mobileDemoModal");
  const mppVideo = document.getElementById("mppVideo");
  const mppPlayBtn = document.getElementById("mppPlayBtn");
  const mppOpenControls = document.getElementById("mppOpenControls");
  const mppFeatures = document.getElementById("mppFeatures");
  const mppTools = document.getElementById("mppTools");

  function openMobileModal() {
    mobileModal.classList.remove("hidden");
    mobileModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // reset video on open
    try {
      mppVideo.pause();
      mppVideo.currentTime = 0;
      mppVideo.load();
    } catch (e) {}

    if (mppPlayBtn) mppPlayBtn.style.display = "grid";

    // render features
    mppFeatures.innerHTML = [
      "Login & Registration",
      "Flood Reporting",
      "Interactive Map Dashboard",
      "Alerts & Notifications",
      "User Profile Management",
    ]
      .map(
        (f) => `
      <div class="pg-feature">
        <div class="pg-check">✓</div>
        <div>${f}</div>
      </div>
    `
      )
      .join("");

    // render tools/tags
    mppTools.innerHTML = ["Kotlin", "Android Studio", "Firebase", "REST API"]
      .map((t) => `<span class="pg-tag">${t}</span>`)
      .join("");
  }

  function closeMobileModal() {
    mobileModal.classList.add("hidden");
    mobileModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    try {
      mppVideo.pause();
      mppVideo.currentTime = 0;
    } catch (e) {}

    if (mppPlayBtn) mppPlayBtn.style.display = "grid";
  }

  async function playMobileVideo() {
    try {
      await mppVideo.play();
      if (mppPlayBtn) mppPlayBtn.style.display = "none";
    } catch (err) {
      console.error("Video play failed:", err);
      mppVideo.setAttribute("controls", "controls");
      if (mppPlayBtn) mppPlayBtn.style.display = "grid";
      alert("Video can't play. Check MP4 codec (H.264/AAC) and file path.");
    }
  }

  // play buttons
  mppPlayBtn?.addEventListener("click", playMobileVideo);
  mppOpenControls?.addEventListener("click", playMobileVideo);

  // close on overlay/x (data-mapp-close)
  mobileModal.addEventListener("click", (e) => {
    if (e.target && e.target.dataset.mappClose === "true") closeMobileModal();
  });

  // show play again when ended
  mppVideo?.addEventListener("ended", () => {
    if (mppPlayBtn) mppPlayBtn.style.display = "grid";
  });

  // ---------------------------
  // ESC CLOSES BOTH MODALS
  // ---------------------------
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!pgModal.classList.contains("hidden")) closePgModal();
    if (!mobileModal.classList.contains("hidden")) closeMobileModal();
  });

  // ---------------------------
  // CLICK CARDS -> OPEN RIGHT MODAL
  // ---------------------------
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const key = card.dataset.project;
      const cat = card.dataset.category;

      if (cat === "website" && webProjects[key]) {
        openPgModal(webProjects[key]);
        return;
      }

      if (cat === "mobile") {
        openMobileModal();
        return;
      }
    });
  });

  // ---------------------------
  // HERO IMAGE SLIDER
  // ---------------------------
  const heroImage = document.getElementById("heroImage");
  const prevImg = document.getElementById("prevImg");
  const nextImg = document.getElementById("nextImg");

 const heroImages = [
  "src/my-pic-1.png",
  "src/my-pic-2.jpg",
  "src/my-pic-3.jpg",
  "src/my-pic-4.png"
];
  let idx = 0;

  function setHeroImage(i) {
    if (!heroImage) return;
    heroImage.style.opacity = "0";
    setTimeout(() => {
      heroImage.src = heroImages[i];
      heroImage.style.opacity = "1";
    }, 150);
  }

  prevImg?.addEventListener("click", () => {
    idx = (idx - 1 + heroImages.length) % heroImages.length;
    setHeroImage(idx);
  });

  nextImg?.addEventListener("click", () => {
    idx = (idx + 1) % heroImages.length;
    setHeroImage(idx);
  });

  // ---------------------------
  // TYPING EFFECT
  // ---------------------------
  const typingEl = document.getElementById("typingTitle");
  if (typingEl) {
    const text = typingEl.dataset.text || "Full-Stack Developer";
    let i = 0;
    typingEl.textContent = "";
    const timer = setInterval(() => {
      typingEl.textContent = text.slice(0, i++);
      if (i > text.length) clearInterval(timer);
    }, 70);
  }
});

// ===============================
// MOBILE MODAL (pg-style) + VIDEO
// ===============================
const mobileModal = document.getElementById("mobileDemoModal");
const mppVideo = document.getElementById("mppVideo");
const mppPlayBtn = document.getElementById("mppPlayBtn");
const mppOpenControls = document.getElementById("mppOpenControls");
const mppFeatures = document.getElementById("mppFeatures");
const mppTools = document.getElementById("mppTools");

function openMobileModal() {
  mobileModal.classList.remove("hidden");
  mobileModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // reset video on open
  try {
    mppVideo.pause();
    mppVideo.currentTime = 0;
    mppVideo.load();               // important (ensures it re-reads the file)
  } catch (e) {}

  mppPlayBtn.style.display = "grid";

  // render features (example)
  mppFeatures.innerHTML = [
    "Login & Registration",
    "Flood Reporting",
    "Interactive Map Dashboard",
    "Alerts & Notifications",
    "User Profile Management"
  ].map(f => `
    <div class="pg-feature">
      <div class="pg-check">✓</div>
      <div>${f}</div>
    </div>
  `).join("");

  // render tools/tags (example)
  mppTools.innerHTML = [
    "Kotlin", "Android Studio", "Firebase", "REST API"
  ].map(t => `<span class="pg-tag">${t}</span>`).join("");
}

function closeMobileModal() {
  mobileModal.classList.add("hidden");
  mobileModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  // stop video on close
  try {
    mppVideo.pause();
    mppVideo.currentTime = 0;
  } catch (e) {}

  mppPlayBtn.style.display = "grid";
}

async function playMobileVideo() {
  // user gesture exists (button click), so play should be allowed
  try {
    await mppVideo.play();
    mppPlayBtn.style.display = "none";
  } catch (err) {
    console.error("Video play failed:", err);

    // Common fix: show controls so user can manually start
    mppVideo.setAttribute("controls", "controls");
    mppPlayBtn.style.display = "grid";
    alert("Video can't play. Check the file path or MP4 codec (use H.264/AAC).");
  }
}

// Play button
mppPlayBtn?.addEventListener("click", playMobileVideo);
mppOpenControls?.addEventListener("click", playMobileVideo);

// Close handlers
mobileModal?.addEventListener("click", (e) => {
  if (e.target && e.target.dataset.mappClose === "true") closeMobileModal();
});

// If video ends, show play again
mppVideo?.addEventListener("ended", () => {
  mppPlayBtn.style.display = "grid";
});

// ✅ Hook your mobile project card click to open modal
document.querySelectorAll('.project-card-item[data-category="mobile"]').forEach(card => {
  card.addEventListener("click", openMobileModal);
});
document.querySelectorAll(".project-card-item").forEach(card => {
  card.addEventListener("click", () => {
    const key = card.dataset.project;
    const cat = card.dataset.category;

    if (cat === "website" && webProjects[key]) {
      openPgModal(webProjects[key]);
    }
    if (cat === "mobile") {
      openMobileModal();
    }
  });
});
