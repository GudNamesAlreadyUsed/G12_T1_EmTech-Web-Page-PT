/**
 * Bantay-Isip - Complete High-Fluidity Interactive Motion & Audio Engine
 * 
 * Features:
 * - GSAP Viewport Reveals & Text Decryption / Scramble Animation
 * - HTML5 Canvas Ambient Particle Dust Motes Network
 * - Magnetic Physics Cursor Attraction on Buttons & Chips
 * - Synthesized Harmonic Web Audio Engine with Animated Audio Equalizer
 * - 4-7-8 Interactive Acute Grounding / Breathing Tool (Tab 3 & G key)
 * - Interactive 3D Card Tilt with Light Reflection Glare & Border Beam
 * - Circular SVG Scroll Progress Ring & Deep Linking
 * - Safe TreeWalker Search Engine with Dynamic Filter Synchronization
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const siteHeader = document.getElementById('siteHeader');
  const tabs = document.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');
  const navTrack = document.getElementById('navSegmentTrack');
  const navGlider = document.getElementById('navGlider');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const cursorSpotlight = document.getElementById('cursorSpotlight');
  const actionButtons = document.querySelectorAll('[data-target-tab]');
  const toast = document.getElementById('copyToast');
  const toastMsg = document.getElementById('toastMsg');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progressRingCircle = document.getElementById('progressRingCircle');
  const tiltCards = document.querySelectorAll('.interactive-tilt-card');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundEqBars = document.getElementById('soundEqBars');

  // Modals
  const shortcutsDialog = document.getElementById('shortcutsDialog');
  const shortcutsToggleBtn = document.getElementById('shortcutsToggleBtn');
  const shortcutsCloseBtn = document.getElementById('shortcutsCloseBtn');
  const groundingDialog = document.getElementById('groundingDialog');
  const groundingCloseBtn = document.getElementById('groundingCloseBtn');
  const inlineGroundingTrigger = document.getElementById('inlineGroundingTrigger');
  const startBreathingBtn = document.getElementById('startBreathingBtn');
  const stopBreathingBtn = document.getElementById('stopBreathingBtn');
  const breathingRing = document.getElementById('breathingRing');
  const breathingActionLabel = document.getElementById('breathingActionLabel');
  const breathingTimerCount = document.getElementById('breathingTimerCount');

  // Tab 02: Case Search Elements & Quick Chips
  const caseSearchInput = document.getElementById('caseSearchInput');
  const caseSearchClear = document.getElementById('caseSearchClear');
  const caseCountBadge = document.getElementById('caseCountBadge');
  const toggleAllCasesBtn = document.getElementById('toggleAllCasesBtn');
  const accordionItems = document.querySelectorAll('.accordion-item');
  const caseUnits = document.querySelectorAll('.searchable-case-unit');
  const caseFilterChips = document.querySelectorAll('.quick-filter-chips .filter-chip[data-filter]');

  // Tab 05: Hotline Search Elements & Quick Chips
  const hotlineSearchInput = document.getElementById('hotlineSearchInput');
  const hotlineSearchClear = document.getElementById('hotlineSearchClear');
  const hotlineCountBadge = document.getElementById('hotlineCountBadge');
  const hotlineItems = document.querySelectorAll('.searchable-hotline-item');
  const hotlineFilterChips = document.querySelectorAll('.quick-filter-chips .filter-chip[data-hotline-filter]');

  let toastTimer = null;
  let isDraggingNav = false;
  let audioEnabled = true;
  let breathingInterval = null;

  // =========================================================================
  // 1. Synthesized Web Audio Harmonic Engine (Zero-Dependency & Crystal Clear)
  // =========================================================================
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Unlock audio immediately upon first interaction anywhere on page
  const unlockAudio = () => {
    initAudio();
    document.removeEventListener('pointerdown', unlockAudio);
    document.removeEventListener('keydown', unlockAudio);
  };
  document.addEventListener('pointerdown', unlockAudio, { passive: true });
  document.addEventListener('keydown', unlockAudio, { passive: true });

  function playUiSound(type = 'click') {
    if (!audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      if (soundToggleBtn) {
        soundToggleBtn.classList.add('playing');
        setTimeout(() => soundToggleBtn.classList.remove('playing'), 350);
      }

      const now = audioCtx.currentTime;

      if (type === 'tab') {
        // Crisp dual-tone chime
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc1.frequency.exponentialRampToValueAtTime(880.00, now + 0.08); // A5
        osc2.frequency.setValueAtTime(880.00, now);
        osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08); // D6

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.09);
        osc2.stop(now + 0.09);
      } else if (type === 'copy') {
        // Higher affirmative success chime
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(783.99, now); // G5
        osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.1); // E6

        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.11);
      } else if (type === 'expand') {
        // Soft warm accordion acoustic pop
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440.00, now); // A4
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.06); // E5

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.07);
      }
    } catch {
      // Graceful fallback
    }
  }

  if (soundToggleBtn && soundIcon) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      audioEnabled = !audioEnabled;
      soundIcon.textContent = audioEnabled ? '🔊' : '🔇';
      soundToggleBtn.title = audioEnabled ? 'Mute Interface Audio' : 'Unmute Interface Audio';
      if (audioEnabled) {
        playUiSound('tab');
        showToast('Interface Audio Enabled 🔊');
      } else {
        showToast('Interface Audio Muted 🔇');
      }
    });
  }

  // =========================================================================
  // 2. Ambient HTML5 Canvas Particle Network
  // =========================================================================
  const canvas = document.getElementById('ambientParticlesCanvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const particles = [];
    const particleCount = Math.min(28, Math.floor(window.innerWidth / 45));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.6,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.35 + 0.15
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${p.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(renderParticles);
    }
    renderParticles();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });
  }

  // =========================================================================
  // 3. Text Decryption / Scramble Matrix Effect
  // =========================================================================
  const glyphs = 'ABCDEF0123456789!@#$%&*<>[]{}';

  function scrambleText(element, finalText) {
    if (!element) return;
    let iteration = 0;
    const maxIterations = finalText.length;
    clearInterval(element._scrambleTimer);

    element._scrambleTimer = setInterval(() => {
      element.innerText = finalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return finalText[index];
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join('');

      if (iteration >= maxIterations) {
        clearInterval(element._scrambleTimer);
        element.innerText = finalText;
      }
      iteration += 1 / 2;
    }, 25);
  }

  // =========================================================================
  // 4. Tab Navigation & Glider Mechanics
  // =========================================================================
  const ringCircumference = 113.097;

  const tabIdList = [
    'tab-home',
    'tab-incidents',
    'tab-mental-health',
    'tab-laws',
    'tab-hotlines'
  ];

  const hashToTabMap = {
    'home': 'tab-home',
    'incidents': 'tab-incidents',
    'cases': 'tab-incidents',
    'mental-health': 'tab-mental-health',
    'factors': 'tab-mental-health',
    'laws': 'tab-laws',
    'rights': 'tab-laws',
    'hotlines': 'tab-hotlines',
    'help': 'tab-hotlines'
  };

  const tabToHashMap = {
    'tab-home': 'home',
    'tab-incidents': 'incidents',
    'tab-mental-health': 'mental-health',
    'tab-laws': 'laws',
    'tab-hotlines': 'hotlines'
  };

  function updateGlider(activeTabBtn, animate = true) {
    if (!activeTabBtn || !navGlider || !navTrack) return;
    const trackRect = navTrack.getBoundingClientRect();
    const btnRect = activeTabBtn.getBoundingClientRect();
    const relativeLeft = (btnRect.left - trackRect.left) + navTrack.scrollLeft;
    const width = btnRect.width;

    if (window.gsap && animate) {
      gsap.to(navGlider, {
        x: relativeLeft,
        width: width,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    } else {
      navGlider.style.transform = `translateX(${relativeLeft}px)`;
      navGlider.style.width = `${width}px`;
    }

    const scrollTarget = activeTabBtn.offsetLeft - (navTrack.clientWidth / 2) + (activeTabBtn.clientWidth / 2);
    navTrack.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  }

  function switchTab(targetPanelId, updateHash = true) {
    const targetPanel = document.getElementById(targetPanelId);
    if (!targetPanel) return;

    let targetBtn = null;
    tabs.forEach(tab => {
      const isMatch = tab.getAttribute('aria-controls') === targetPanelId;
      tab.classList.toggle('active', isMatch);
      tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      tab.setAttribute('tabindex', isMatch ? '0' : '-1');
      if (isMatch) targetBtn = tab;
    });

    tabPanels.forEach(panel => {
      if (panel.id === targetPanelId) {
        panel.removeAttribute('hidden');
        panel.classList.add('active');

        // Scramble title animation
        const scrambleTarget = panel.querySelector('.scramble-target');
        if (scrambleTarget) {
          const original = scrambleTarget.getAttribute('data-scramble-text') || scrambleTarget.innerText;
          scrambleText(scrambleTarget, original);
        }

        // GSAP Entrance
        if (window.gsap) {
          gsap.fromTo(panel, 
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
          );

          const revealItems = panel.querySelectorAll('.factor-narrative-strip, .statute-row-strip, .step-horizontal-item, .contact-ledger-row, .asymmetric-split-hero');
          if (revealItems.length > 0) {
            gsap.fromTo(revealItems,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'power2.out', clearProps: 'all', delay: 0.05 }
            );
          }
        }
      } else {
        panel.setAttribute('hidden', 'true');
        panel.classList.remove('active');
      }
    });

    if (targetBtn) {
      updateGlider(targetBtn, true);
    }

    playUiSound('tab');

    if (updateHash && tabToHashMap[targetPanelId]) {
      history.replaceState(null, '', `#${tabToHashMap[targetPanelId]}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      if (isDraggingNav) return;
      e.preventDefault();
      const targetId = tab.getAttribute('aria-controls');
      switchTab(targetId);
    });
  });

  actionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target-tab');
      switchTab(targetId);
    });
  });

  // Nav drag to scroll
  let isDown = false;
  let startX, scrollLeft, startClientX = 0;

  navTrack.addEventListener('mousedown', (e) => {
    isDown = true;
    isDraggingNav = false;
    startClientX = e.pageX;
    startX = e.pageX - navTrack.offsetLeft;
    scrollLeft = navTrack.scrollLeft;
    navTrack.classList.add('is-dragging');
  });

  navTrack.addEventListener('mouseleave', () => {
    isDown = false;
    navTrack.classList.remove('is-dragging');
  });

  navTrack.addEventListener('mouseup', () => {
    isDown = false;
    navTrack.classList.remove('is-dragging');
  });

  navTrack.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const currentX = e.pageX;
    if (Math.abs(currentX - startClientX) > 5) isDraggingNav = true;
    e.preventDefault();
    const x = e.pageX - navTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    navTrack.scrollLeft = scrollLeft - walk;
  });

  // =========================================================================
  // 5. 3D Card Tilt & Light Glare Coordinate Tracking
  // =========================================================================
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

      if (window.gsap) {
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          duration: 0.25,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      if (window.gsap) {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });
  });

  // =========================================================================
  // 6. GSAP Smooth Accordion Toggle
  // =========================================================================
  function toggleAccordion(item, shouldOpen = null) {
    const isCurrentlyExpanded = item.getAttribute('data-expanded') === 'true';
    const willOpen = shouldOpen !== null ? shouldOpen : !isCurrentlyExpanded;
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    item.setAttribute('data-expanded', willOpen ? 'true' : 'false');
    if (trigger) trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');

    if (panel) {
      if (willOpen) {
        panel.style.display = 'block';
        playUiSound('expand');
        if (window.gsap) {
          gsap.fromTo(panel, 
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
          );
        }
      } else {
        if (window.gsap) {
          gsap.to(panel, {
            height: 0,
            opacity: 0,
            duration: 0.22,
            ease: 'power2.in',
            onComplete: () => {
              panel.style.display = 'none';
            }
          });
        } else {
          panel.style.display = 'none';
        }
      }
    }
  }

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        toggleAccordion(item);
      });
    }
  });

  let allCasesExpanded = false;
  if (toggleAllCasesBtn) {
    toggleAllCasesBtn.addEventListener('click', () => {
      allCasesExpanded = !allCasesExpanded;
      accordionItems.forEach(item => toggleAccordion(item, allCasesExpanded));
      toggleAllCasesBtn.textContent = allCasesExpanded ? 'Collapse All Cases' : 'Expand All Cases';
    });
  }

  // =========================================================================
  // 7. Safe DOM TreeWalker Highlighting
  // =========================================================================
  function removeSearchHighlights(container) {
    if (!container) return;
    const highlights = container.querySelectorAll('.search-highlight');
    highlights.forEach(span => {
      const parent = span.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(span.textContent), span);
        parent.normalize();
      }
    });
  }

  function applySearchHighlight(element, query) {
    if (!element || !query) return;
    removeSearchHighlights(element);

    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeQuery})`, 'gi');

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parentTag = node.parentNode.tagName;
        if (['SCRIPT', 'STYLE', 'BUTTON', 'INPUT', 'KBD'].includes(parentTag)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(node => {
      const match = node.nodeValue.match(regex);
      if (match && node.parentNode) {
        const frag = document.createDocumentFragment();
        let lastIdx = 0;
        node.nodeValue.replace(regex, (m, p1, offset) => {
          if (offset > lastIdx) {
            frag.appendChild(document.createTextNode(node.nodeValue.substring(lastIdx, offset)));
          }
          const span = document.createElement('span');
          span.className = 'search-highlight';
          span.textContent = m;
          frag.appendChild(span);
          lastIdx = offset + m.length;
        });
        if (lastIdx < node.nodeValue.length) {
          frag.appendChild(document.createTextNode(node.nodeValue.substring(lastIdx)));
        }
        node.parentNode.replaceChild(frag, node);
      }
    });
  }

  // Tab 02 Filter Cases
  function filterCases(query = '') {
    const cleanQuery = query.trim().toLowerCase();
    let visibleCount = 0;

    caseUnits.forEach(unit => {
      const keywords = (unit.getAttribute('data-case-keywords') || '').toLowerCase();
      const textContent = unit.textContent.toLowerCase();
      const matches = !cleanQuery || keywords.includes(cleanQuery) || textContent.includes(cleanQuery);

      if (matches) {
        unit.style.display = '';
        visibleCount++;
        if (cleanQuery) {
          applySearchHighlight(unit, cleanQuery);
          if (unit.classList.contains('accordion-item')) {
            toggleAccordion(unit, true);
          }
        } else {
          removeSearchHighlights(unit);
        }
      } else {
        unit.style.display = 'none';
        removeSearchHighlights(unit);
      }
    });

    if (caseCountBadge) {
      caseCountBadge.textContent = cleanQuery ? `${visibleCount} of ${caseUnits.length} cases` : `${visibleCount} cases`;
    }

    if (caseSearchClear) {
      caseSearchClear.hidden = cleanQuery.length === 0;
    }
  }

  if (caseSearchInput) {
    caseSearchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      filterCases(val);
      caseFilterChips.forEach(chip => {
        chip.classList.toggle('active', chip.getAttribute('data-filter').toLowerCase() === val.toLowerCase());
      });
    });
  }

  if (caseSearchClear && caseSearchInput) {
    caseSearchClear.addEventListener('click', () => {
      caseSearchInput.value = '';
      filterCases('');
      caseSearchInput.focus();
      caseFilterChips.forEach(chip => chip.classList.toggle('active', chip.getAttribute('data-filter') === ''));
    });
  }

  caseFilterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filterValue = chip.getAttribute('data-filter') || '';
      caseFilterChips.forEach(c => c.classList.toggle('active', c === chip));
      if (caseSearchInput) caseSearchInput.value = filterValue;
      filterCases(filterValue);
      playUiSound('tab');
    });
  });

  // Tab 05 Filter Hotlines
  function filterHotlines(query = '') {
    const cleanQuery = query.trim().toLowerCase();
    let visibleCount = 0;

    hotlineItems.forEach(item => {
      const keywords = (item.getAttribute('data-hotline-keywords') || '').toLowerCase();
      const textContent = item.textContent.toLowerCase();
      const matches = !cleanQuery || keywords.includes(cleanQuery) || textContent.includes(cleanQuery);

      if (matches) {
        item.style.display = '';
        visibleCount++;
        if (cleanQuery) applySearchHighlight(item, cleanQuery);
        else removeSearchHighlights(item);
      } else {
        item.style.display = 'none';
        removeSearchHighlights(item);
      }
    });

    if (hotlineCountBadge) {
      hotlineCountBadge.textContent = cleanQuery ? `${visibleCount} of ${hotlineItems.length} helplines` : `${visibleCount} helplines`;
    }

    if (hotlineSearchClear) {
      hotlineSearchClear.hidden = cleanQuery.length === 0;
    }
  }

  if (hotlineSearchInput) {
    hotlineSearchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      filterHotlines(val);
      hotlineFilterChips.forEach(chip => {
        chip.classList.toggle('active', chip.getAttribute('data-hotline-filter').toLowerCase() === val.toLowerCase());
      });
    });
  }

  if (hotlineSearchClear && hotlineSearchInput) {
    hotlineSearchClear.addEventListener('click', () => {
      hotlineSearchInput.value = '';
      filterHotlines('');
      hotlineSearchInput.focus();
      hotlineFilterChips.forEach(chip => chip.classList.toggle('active', chip.getAttribute('data-hotline-filter') === ''));
    });
  }

  hotlineFilterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filterValue = chip.getAttribute('data-hotline-filter') || '';
      hotlineFilterChips.forEach(c => c.classList.toggle('active', c === chip));
      if (hotlineSearchInput) hotlineSearchInput.value = filterValue;
      filterHotlines(filterValue);
      playUiSound('tab');
    });
  });

  // =========================================================================
  // 8. Clipboard Copy & Toast Engine
  // =========================================================================
  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('active');
    playUiSound('copy');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 2600);
  }

  document.addEventListener('click', (e) => {
    const copyTarget = e.target.closest('[data-copy]');
    if (!copyTarget) return;

    const copyText = copyTarget.getAttribute('data-copy');
    if (copyText) {
      navigator.clipboard.writeText(copyText).then(() => {
        showToast(`Copied: "${copyText}"`);
        copyTarget.classList.add('copied');
        setTimeout(() => copyTarget.classList.remove('copied'), 2000);
      }).catch(() => {
        showToast(`Copied: "${copyText}"`);
      });
    }
  });

  // =========================================================================
  // 9. 4-7-8 Acute Stress Grounding / Breathing Tool Engine (Tab 3 & G key)
  // =========================================================================
  function startBreathingExercise() {
    if (!breathingRing || !breathingActionLabel || !breathingTimerCount) return;
    if (startBreathingBtn) startBreathingBtn.style.display = 'none';
    if (stopBreathingBtn) stopBreathingBtn.style.display = 'inline-flex';

    let phase = 0; // 0: Inhale (4s), 1: Hold (7s), 2: Exhale (8s)
    let timeLeft = 4;
    breathingActionLabel.textContent = 'Inhale';
    breathingTimerCount.textContent = `${timeLeft}s`;
    breathingRing.style.transform = 'scale(1.35)';
    breathingRing.style.borderColor = 'var(--accent-teal)';

    if (breathingInterval) clearInterval(breathingInterval);

    breathingInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        phase = (phase + 1) % 3;
        if (phase === 0) { // Inhale 4s
          timeLeft = 4;
          breathingActionLabel.textContent = 'Inhale';
          breathingRing.style.transform = 'scale(1.35)';
          breathingRing.style.borderColor = 'var(--accent-teal)';
        } else if (phase === 1) { // Hold 7s
          timeLeft = 7;
          breathingActionLabel.textContent = 'Hold';
          breathingRing.style.transform = 'scale(1.35)';
          breathingRing.style.borderColor = 'var(--accent-crimson)';
        } else { // Exhale 8s
          timeLeft = 8;
          breathingActionLabel.textContent = 'Exhale';
          breathingRing.style.transform = 'scale(1)';
          breathingRing.style.borderColor = 'var(--text-dim)';
        }
      }
      breathingTimerCount.textContent = `${timeLeft}s`;
    }, 1000);
  }

  function stopBreathingExercise() {
    if (breathingInterval) clearInterval(breathingInterval);
    if (startBreathingBtn) startBreathingBtn.style.display = 'inline-flex';
    if (stopBreathingBtn) stopBreathingBtn.style.display = 'none';
    if (breathingRing) {
      breathingRing.style.transform = 'scale(1)';
      breathingRing.style.borderColor = 'var(--accent-teal)';
    }
    if (breathingActionLabel) breathingActionLabel.textContent = 'Ready';
    if (breathingTimerCount) breathingTimerCount.textContent = '4s';
  }

  function openGroundingDialog() {
    if (groundingDialog && typeof groundingDialog.showModal === 'function') {
      groundingDialog.showModal();
      startBreathingExercise();
    }
  }

  function closeGroundingDialog() {
    if (groundingDialog && typeof groundingDialog.close === 'function') {
      groundingDialog.close();
      stopBreathingExercise();
    }
  }

  if (inlineGroundingTrigger) inlineGroundingTrigger.addEventListener('click', openGroundingDialog);
  if (groundingCloseBtn) groundingCloseBtn.addEventListener('click', closeGroundingDialog);
  if (startBreathingBtn) startBreathingBtn.addEventListener('click', startBreathingExercise);
  if (stopBreathingBtn) stopBreathingBtn.addEventListener('click', stopBreathingExercise);
  if (groundingDialog) {
    groundingDialog.addEventListener('click', (e) => {
      if (e.target === groundingDialog) closeGroundingDialog();
    });
  }

  // =========================================================================
  // 10. Scroll Progress & Floating Controls
  // =========================================================================
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress * 100}%`;
    }

    if (progressRingCircle) {
      const offset = ringCircumference - (progress * ringCircumference);
      progressRingCircle.style.strokeDashoffset = offset;
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollTop > 320);
    }

    if (siteHeader) {
      siteHeader.classList.toggle('header-scrolled', scrollTop > 20);
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (cursorSpotlight) {
    window.addEventListener('mousemove', (e) => {
      cursorSpotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });
  }

  // =========================================================================
  // 11. Shortcuts Modal & Global Hotkeys
  // =========================================================================
  function openShortcutsDialog() {
    if (shortcutsDialog && typeof shortcutsDialog.showModal === 'function') shortcutsDialog.showModal();
  }

  function closeShortcutsDialog() {
    if (shortcutsDialog && typeof shortcutsDialog.close === 'function') shortcutsDialog.close();
  }

  if (shortcutsToggleBtn) shortcutsToggleBtn.addEventListener('click', openShortcutsDialog);
  if (shortcutsCloseBtn) shortcutsCloseBtn.addEventListener('click', closeShortcutsDialog);
  if (shortcutsDialog) {
    shortcutsDialog.addEventListener('click', (e) => {
      if (e.target === shortcutsDialog) closeShortcutsDialog();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (e.key === 'Escape') document.activeElement.blur();
      return;
    }

    // Direct tab jumps 1-5
    if (['1', '2', '3', '4', '5'].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      if (idx >= 0 && idx < tabIdList.length) {
        e.preventDefault();
        const kbdBadge = document.getElementById(`kbd-${idx + 1}`);
        if (kbdBadge) {
          kbdBadge.classList.add('key-pressed');
          setTimeout(() => kbdBadge.classList.remove('key-pressed'), 250);
        }
        switchTab(tabIdList[idx]);
      }
      return;
    }

    // Cycle tabs
    if (e.key === ']' || (e.altKey && e.key === 'ArrowRight')) {
      const currentActive = document.querySelector('.editorial-viewport.active');
      const curIdx = tabIdList.indexOf(currentActive ? currentActive.id : '');
      const nextIdx = (curIdx + 1) % tabIdList.length;
      switchTab(tabIdList[nextIdx]);
      return;
    }

    if (e.key === '[' || (e.altKey && e.key === 'ArrowLeft')) {
      const currentActive = document.querySelector('.editorial-viewport.active');
      const curIdx = tabIdList.indexOf(currentActive ? currentActive.id : '');
      const prevIdx = (curIdx - 1 + tabIdList.length) % tabIdList.length;
      switchTab(tabIdList[prevIdx]);
      return;
    }

    // Search focus
    if (e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
      e.preventDefault();
      const currentActive = document.querySelector('.editorial-viewport.active');
      if (currentActive && currentActive.id === 'tab-hotlines') {
        if (hotlineSearchInput) hotlineSearchInput.focus();
      } else {
        if (currentActive && currentActive.id !== 'tab-incidents') switchTab('tab-incidents');
        setTimeout(() => { if (caseSearchInput) caseSearchInput.focus(); }, 100);
      }
      return;
    }

    // Grounding modal shortcut (G)
    if (e.key === 'g' || e.key === 'G') {
      openGroundingDialog();
      return;
    }

    // Shortcuts modal (?)
    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      openShortcutsDialog();
      return;
    }

    if (e.key === 'Escape') {
      closeShortcutsDialog();
      closeGroundingDialog();
    }
  });

  // =========================================================================
  // 12. Initial Deep Link / Hash Routing
  // =========================================================================
  const currentHash = window.location.hash.replace('#', '').toLowerCase();
  if (currentHash && hashToTabMap[currentHash]) {
    switchTab(hashToTabMap[currentHash], false);
  } else {
    const initialTabBtn = document.querySelector('[role="tab"].active') || tabs[0];
    updateGlider(initialTabBtn, false);
  }

  window.addEventListener('resize', () => {
    const activeTab = document.querySelector('[role="tab"].active');
    if (activeTab) updateGlider(activeTab, false);
  }, { passive: true });
});
