/* ===================================================
   GABRIEL MARTELINHO DE OURO — script.js
   =================================================== */

// ===== CONFIGURAÇÃO — EDITE AQUI =====
const CONFIG = {
  whatsapp: "5547999999999", // ← Coloque seu número aqui (com DDI + DDD, sem espaços)
  mensagemPadrao: "Olá! Vi seu site e gostaria de solicitar um orçamento para o meu veículo.",
};

// ===== WHATSAPP =====
function abrirWhatsApp(mensagem) {
  const texto = mensagem || CONFIG.mensagemPadrao;
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
}

// ===== FORMULÁRIO → WHATSAPP =====
function enviarFormulario() {
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const servico = document.getElementById("servico").value;
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome) { alert("Por favor, informe seu nome."); document.getElementById("nome").focus(); return; }
  if (!telefone) { alert("Por favor, informe seu WhatsApp."); document.getElementById("telefone").focus(); return; }
  if (!servico) { alert("Por favor, selecione o serviço desejado."); document.getElementById("servico").focus(); return; }

  const texto = `Olá! Me chamo *${nome}*.
📱 Meu WhatsApp: ${telefone}
🔧 Serviço: *${servico}*
📝 Detalhes: ${mensagem || "Não informado"}

Gostaria de solicitar um orçamento!`;

  abrirWhatsApp(texto);
}

// ===== HEADER SCROLL =====
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}, { passive: true });

// ===== MENU HAMBÚRGUER =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
});

function fecharMenu() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
}

// Fechar ao clicar fora
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) fecharMenu();
});

// ===== REVEAL SCROLL =====
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== SMOOTH SCROLL para links âncora =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== CONTADOR ANIMADO (stats) =====
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const startTime = performance.now();
  const isPercent = el.dataset.suffix === "%";
  const suffix = el.dataset.suffix || "";

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Observar as stats do hero para animar
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll("[data-count]");
        counters.forEach((el) => {
          animateCounter(el, parseInt(el.dataset.count), 1800);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector(".hero-stats");
if (heroStats) statsObserver.observe(heroStats);

// ===== EFEITO PARALLAX SUAVE no hero =====
const heroGrains = document.querySelector(".hero-grain");
window.addEventListener("scroll", () => {
  if (!heroGrains) return;
  const scroll = window.scrollY;
  if (scroll < window.innerHeight) {
    const stripes = document.querySelectorAll(".hero-stripe");
    stripes.forEach((s, i) => {
      s.style.transform = `translateY(${scroll * (0.1 + i * 0.05)}px)`;
    });
  }
}, { passive: true });

// ===== HIGHLIGHT nav link ativo =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));

// ===== MÁSCARA DE TELEFONE =====
const telefoneInput = document.getElementById("telefone");
if (telefoneInput) {
  telefoneInput.addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length >= 7) {
      v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    } else if (v.length >= 3) {
      v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    }
    this.value = v;
  });
}

// ===== LOGS DE INICIALIZAÇÃO =====
console.log(
  "%c🔨 Gabriel Martelinho de Ouro",
  "font-size:18px; font-weight:bold; color:#D4A017;"
);
console.log(
  "%cSite carregado com sucesso!",
  "color:#888; font-size:12px;"
);
