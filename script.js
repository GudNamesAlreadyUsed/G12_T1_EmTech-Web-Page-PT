/**
 * Bantay-Isip - Complete High-Fluidity Interactive Motion Engine
 * GSAP Viewport Reveals, Circular SVG Scroll Indicator, 3D Card Tilt,
 * Smooth Accordions, Keyboard Shortcuts Modal, Tactile Sound Effects,
 * Quick Filter Chips, and Safe Text-Node Highlighting.
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

  // Shortcuts Dialog Elements
  const shortcutsDialog = document.getElementById('shortcutsDialog');
  const shortcutsToggleBtn = document.getElementById('shortcutsToggleBtn');
  const shortcutsCloseBtn = document.getElementById('shortcutsCloseBtn');

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
  const localLedgerZone = document.getElementById('localLedgerZone');
  const nationalLedgerZone = document.getElementById('nationalLedgerZone');
  const hotlineFilterChips = document.querySelectorAll('.quick-filter-chips .filter-chip[data-hotline-filter]');

  let toastTimer = null;
  let isDraggingNav = false;
  let audioEnabled = true;

  // Web Audio API Context for Zero-Dependency Tactile Audio
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
  }

  function playUiSound(type = 'click') {
    if (!audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'tab') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.04);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'copy') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(990, now + 0.06);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'expand') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(560, now + 0.04);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // Graceful fallback
    }
  }

  if (soundToggleBtn && soundIcon) {
    soundToggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      soundIcon.textContent = audioEnabled ? '🔊' : '🔇';
      soundToggleBtn.title = audioEnabled ? 'Mute Interface Audio' : 'Unmute Interface Audio';
      if (audioEnabled) playUiSound('tab');
    });
  }

  // Circular SVG Ring Constants (2 * PI * 18 ≈ 113.097)
  const ringCircumference = 113.097;

  // Tab Maps
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

  /**
   * Safe Text-Node Highlighting Engine
   */
  function highlightElementTextNodes(element, query) {
    unhighlightElement(element);
    if (!query || query.length < 2) return;

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.parentElement) return NodeFilter.FILTER_REJECT;
        const tag = node.parentElement.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || node.parentElement.classList.contains('search-highlight')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.textContent.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodesToReplace = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
      const escaped = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'gi');
      if (regex.test(currentNode.textContent)) {
        nodesToReplace.push(currentNode);
      }
    }

    nodesToReplace.forEach((node) => {
      const text = node.textContent;
      const escaped = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'gi');
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        const before = text.slice(lastIndex, match.index);
        if (before) fragment.appendChild(document.createTextNode(before));

        const mark = document.createElement('mark');
        mark.className = 'search-highlight';
        mark.textContent = match[0];
        fragment.appendChild(mark);

        lastIndex = regex.lastIndex;
      }

      const after = text.slice(lastIndex);
      if (after) fragment.appendChild(document.createTextNode(after));

      if (node.parentNode) {
        node.parentNode.replaceChild(fragment, node);
      }
    });
  }

  function unhighlightElement(element) {
    const marks = element.querySelectorAll('mark.search-highlight');
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      }
    });
  }

  /**
   * Update Nav Glider Position
   */
  function updateGlider(activeTab) {
    if (!navGlider || !activeTab) return;
    const parent = activeTab.parentElement;
    if (!parent) return;

    const tabRect = activeTab.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const offsetLeft = tabRect.left - parentRect.left;

    navGlider.style.width = `${tabRect.width}px`;
    navGlider.style.transform = `translateX(${offsetLeft}px)`;
  }

  /**
   * Activate Tab with GSAP Staggered Spring Animation
   */
  function activateTab(targetPanelId, updateHash = true, scrollIntoView = false) {
    const targetPanel = document.getElementById(targetPanelId);
    if (!targetPanel) return;

    let activeTabButton = null;

    tabs.forEach((tab) => {
      const controls = tab.getAttribute('aria-controls');
      const isSelected = controls === targetPanelId;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
      tab.classList.toggle('active', isSelected);

      if (isSelected) {
        activeTabButton = tab;
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    if (activeTabButton) {
      updateGlider(activeTabButton);
    }

    tabPanels.forEach((panel) => {
      if (panel.id === targetPanelId) {
        panel.removeAttribute('hidden');
        panel.classList.add('active');

        if (window.gsap) {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }
          );

          // Stagger direct children for silky editorial reveal
          const animElements = panel.querySelectorAll('.hero-media-wrapper, .display-title, .display-title-sticky, .display-lead, .manifesto-editorial-wrap, .featured-case-block, .accordion-item, .factor-narrative-strip, .statute-row-strip, .step-horizontal-item, .contact-ledger-row');
          if (animElements.length) {
            gsap.fromTo(
              animElements,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.3, stagger: 0.035, ease: 'power1.out', delay: 0.04 }
            );
          }
        }
      } else {
        panel.setAttribute('hidden', '');
        panel.classList.remove('active');
      }
    });

    playUiSound('tab');

    if (updateHash && tabToHashMap[targetPanelId]) {
      history.replaceState(null, '', `#${tabToHashMap[targetPanelId]}`);
    }

    if (scrollIntoView) {
      targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Mouse Drag-to-Scroll & Wheel Scroll for Nav Segment Track
  if (navTrack) {
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    const dragThreshold = 6;

    navTrack.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDown = true;
      isDraggingNav = false;
      startX = e.pageX - navTrack.offsetLeft;
      scrollStart = navTrack.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      navTrack.classList.remove('is-dragging');
      setTimeout(() => {
        isDraggingNav = false;
      }, 50);
    });

    navTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const x = e.pageX - navTrack.offsetLeft;
      const dist = x - startX;
      if (Math.abs(dist) > dragThreshold) {
        if (!isDraggingNav) {
          isDraggingNav = true;
          navTrack.classList.add('is-dragging');
        }
        e.preventDefault();
        navTrack.scrollLeft = scrollStart - dist;
        const currentActive = document.querySelector('[role="tab"].active');
        if (currentActive) updateGlider(currentActive);
      }
    });

    // Horizontal wheel scroll
    navTrack.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0 && navTrack.scrollWidth > navTrack.clientWidth) {
        e.preventDefault();
        navTrack.scrollLeft += e.deltaY;
        const currentActive = document.querySelector('[role="tab"].active');
        if (currentActive) updateGlider(currentActive);
      }
    }, { passive: false });

    navTrack.addEventListener('scroll', () => {
      const currentActive = document.querySelector('[role="tab"].active');
      if (currentActive) updateGlider(currentActive);
    });
  }

  // Bind Tab Click & Hover Events
  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      if (isDraggingNav) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      e.preventDefault();
      const targetPanelId = tab.getAttribute('aria-controls');
      activateTab(targetPanelId, true, false);
    });

    tab.addEventListener('mouseenter', () => {
      if (!isDraggingNav) updateGlider(tab);
    });

    tab.addEventListener('mouseleave', () => {
      const currentActive = document.querySelector('[role="tab"].active');
      if (currentActive) updateGlider(currentActive);
    });

    // Arrow Key Navigation in Tablist
    tab.addEventListener('keydown', (e) => {
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(tab);
      let targetIndex = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        targetIndex = (currentIndex + 1) % tabArray.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        targetIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        targetIndex = tabArray.length - 1;
      }

      if (targetIndex !== null) {
        const nextTab = tabArray[targetIndex];
        nextTab.focus();
        activateTab(nextTab.getAttribute('aria-controls'), true, false);
      }
    });
  });

  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('[role="tab"].active');
    if (currentActive) updateGlider(currentActive);
  });

  // Action Buttons Routing
  actionButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTabId = btn.getAttribute('data-target-tab');
      if (targetTabId) {
        activateTab(targetTabId, true, true);
      }
    });
  });

  // Interactive 3D Card Tilt on Mouse Move
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // Shortcuts Dialog Controls
  if (shortcutsToggleBtn && shortcutsDialog) {
    shortcutsToggleBtn.addEventListener('click', () => {
      shortcutsDialog.showModal();
      playUiSound('tab');
    });
  }

  if (shortcutsCloseBtn && shortcutsDialog) {
    shortcutsCloseBtn.addEventListener('click', () => {
      shortcutsDialog.close();
      playUiSound('tab');
    });
  }

  if (shortcutsDialog) {
    shortcutsDialog.addEventListener('click', (e) => {
      if (e.target === shortcutsDialog) {
        shortcutsDialog.close();
      }
    });
  }

  // Global Keyboard Shortcuts (1-5, [, ], /, ?, Esc)
  document.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

    if (e.key === 'Escape') {
      if (shortcutsDialog && shortcutsDialog.open) {
        shortcutsDialog.close();
        return;
      }
      if (caseSearchInput && caseSearchInput.value) {
        caseSearchInput.value = '';
        caseSearchInput.dispatchEvent(new Event('input'));
        caseSearchInput.blur();
      }
      if (hotlineSearchInput && hotlineSearchInput.value) {
        hotlineSearchInput.value = '';
        hotlineSearchInput.dispatchEvent(new Event('input'));
        hotlineSearchInput.blur();
      }
      return;
    }

    if (isTyping) return;

    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      if (shortcutsDialog) {
        if (shortcutsDialog.open) shortcutsDialog.close();
        else shortcutsDialog.showModal();
        playUiSound('tab');
      }
      return;
    }

    if (e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      const currentActive = document.querySelector('[role="tab"].active');
      if (currentActive && currentActive.id === 'tab-btn-hotlines') {
        if (hotlineSearchInput) hotlineSearchInput.focus();
      } else {
        if (!currentActive || currentActive.id !== 'tab-btn-incidents') {
          activateTab('tab-incidents', true, false);
        }
        if (caseSearchInput) caseSearchInput.focus();
      }
      return;
    }

    // Previous / Next Tab Shortcuts ([ / ] or j / k)
    if (e.key === '[' || e.key === 'j') {
      const activeTab = document.querySelector('[role="tab"].active');
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(activeTab);
      const prevIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
      activateTab(tabArray[prevIndex].getAttribute('aria-controls'), true, false);
      return;
    }

    if (e.key === ']' || e.key === 'k') {
      const activeTab = document.querySelector('[role="tab"].active');
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(activeTab);
      const nextIndex = (currentIndex + 1) % tabArray.length;
      activateTab(tabArray[nextIndex].getAttribute('aria-controls'), true, false);
      return;
    }

    if (e.key >= '1' && e.key <= '5' && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const index = parseInt(e.key, 10) - 1;
      if (index >= 0 && index < tabIdList.length) {
        const kbdBadge = document.getElementById(`kbd-${e.key}`);
        if (kbdBadge) {
          kbdBadge.classList.add('key-pressed');
          setTimeout(() => kbdBadge.classList.remove('key-pressed'), 200);
        }
        activateTab(tabIdList[index], true, false);
      }
    }
  });

  // Case Accordion Toggle with Silky Height Animation
  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isExpanded = item.getAttribute('data-expanded') === 'true';
      const willExpand = !isExpanded;

      item.setAttribute('data-expanded', willExpand);
      trigger.setAttribute('aria-expanded', willExpand);
      playUiSound('expand');

      if (window.gsap) {
        if (willExpand) {
          panel.style.display = 'block';
          gsap.fromTo(
            panel,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
          );
        } else {
          gsap.to(panel, {
            height: 0,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
              panel.style.display = 'none';
              panel.style.height = '';
            }
          });
        }
      }
    });
  });

  // Expand / Collapse All Cases Button
  if (toggleAllCasesBtn) {
    let allExpanded = false;

    toggleAllCasesBtn.addEventListener('click', () => {
      allExpanded = !allExpanded;
      playUiSound('expand');
      accordionItems.forEach((item) => {
        item.setAttribute('data-expanded', allExpanded ? 'true' : 'false');
        const trigger = item.querySelector('.accordion-trigger');
        const panel = item.querySelector('.accordion-panel');
        if (trigger) trigger.setAttribute('aria-expanded', allExpanded ? 'true' : 'false');
        if (panel) {
          panel.style.display = allExpanded ? 'block' : 'none';
          if (allExpanded && window.gsap) {
            gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.25 });
          }
        }
      });
      toggleAllCasesBtn.textContent = allExpanded ? 'Collapse All Cases' : 'Expand All Cases';
    });
  }

  // Live Case Search Filter with Safe Highlighting
  if (caseSearchInput) {
    caseSearchInput.addEventListener('input', () => {
      const query = caseSearchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      if (caseSearchClear) {
        caseSearchClear.hidden = !query;
      }

      // Sync active state of chips
      caseFilterChips.forEach((chip) => {
        const filterVal = (chip.getAttribute('data-filter') || '').toLowerCase();
        chip.classList.toggle('active', query === filterVal || (!query && !filterVal));
      });

      caseUnits.forEach((unit) => {
        const keywords = (unit.getAttribute('data-case-keywords') || '').toLowerCase();
        const textContent = unit.textContent.toLowerCase();
        const matches = !query || keywords.includes(query) || textContent.includes(query);

        if (matches) {
          unit.style.display = '';
          visibleCount++;

          if (query.length > 1 && unit.classList.contains('accordion-item')) {
            unit.setAttribute('data-expanded', 'true');
            const trigger = unit.querySelector('.accordion-trigger');
            const panel = unit.querySelector('.accordion-panel');
            if (trigger) trigger.setAttribute('aria-expanded', 'true');
            if (panel) panel.style.display = 'block';
          }

          highlightElementTextNodes(unit, query);
        } else {
          unit.style.display = 'none';
          unhighlightElement(unit);
        }
      });

      if (caseCountBadge) {
        caseCountBadge.textContent = query ? `${visibleCount} of ${caseUnits.length} cases` : `${caseUnits.length} cases`;
      }
    });

    if (caseSearchClear) {
      caseSearchClear.addEventListener('click', () => {
        caseSearchInput.value = '';
        caseSearchInput.dispatchEvent(new Event('input'));
        caseSearchInput.focus();
        playUiSound('tab');
      });
    }
  }

  // Bind Quick Chips for Cases
  caseFilterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filterVal = chip.getAttribute('data-filter') || '';
      if (caseSearchInput) {
        caseSearchInput.value = filterVal;
        caseSearchInput.dispatchEvent(new Event('input'));
        playUiSound('tab');
      }
    });
  });

  // Live Hotline Search Filter with Safe Highlighting & Smart Zone Visibility
  if (hotlineSearchInput) {
    hotlineSearchInput.addEventListener('input', () => {
      const query = hotlineSearchInput.value.toLowerCase().trim();
      let visibleCount = 0;
      let localVisible = 0;
      let nationalVisible = 0;

      if (hotlineSearchClear) {
        hotlineSearchClear.hidden = !query;
      }

      // Sync active state of chips
      hotlineFilterChips.forEach((chip) => {
        const filterVal = (chip.getAttribute('data-hotline-filter') || '').toLowerCase();
        chip.classList.toggle('active', query === filterVal || (!query && !filterVal));
      });

      hotlineItems.forEach((item) => {
        const keywords = (item.getAttribute('data-hotline-keywords') || '').toLowerCase();
        const textContent = item.textContent.toLowerCase();
        const matches = !query || keywords.includes(query) || textContent.includes(query);

        if (matches) {
          item.style.display = '';
          visibleCount++;
          if (localLedgerZone && localLedgerZone.contains(item)) localVisible++;
          if (nationalLedgerZone && nationalLedgerZone.contains(item)) nationalVisible++;
          highlightElementTextNodes(item, query);
        } else {
          item.style.display = 'none';
          unhighlightElement(item);
        }
      });

      if (localLedgerZone) {
        localLedgerZone.style.display = query && localVisible === 0 ? 'none' : '';
      }
      if (nationalLedgerZone) {
        nationalLedgerZone.style.display = query && nationalVisible === 0 ? 'none' : '';
      }

      if (hotlineCountBadge) {
        hotlineCountBadge.textContent = query ? `${visibleCount} of ${hotlineItems.length} helplines` : `${hotlineItems.length} helplines`;
      }
    });

    if (hotlineSearchClear) {
      hotlineSearchClear.addEventListener('click', () => {
        hotlineSearchInput.value = '';
        hotlineSearchInput.dispatchEvent(new Event('input'));
        hotlineSearchInput.focus();
        playUiSound('tab');
      });
    }
  }

  // Bind Quick Chips for Hotlines
  hotlineFilterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filterVal = chip.getAttribute('data-hotline-filter') || '';
      if (hotlineSearchInput) {
        hotlineSearchInput.value = filterVal;
        hotlineSearchInput.dispatchEvent(new Event('input'));
        playUiSound('tab');
      }
    });
  });

  // Scroll Progress Bar, Circular SVG Ring, Sticky Header Elevation & Back-to-Top
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)) : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    if (progressRingCircle) {
      const offset = ringCircumference - (progress / 100) * ringCircumference;
      progressRingCircle.style.strokeDashoffset = offset;
    }

    if (siteHeader) {
      siteHeader.classList.toggle('header-scrolled', window.scrollY > 20);
    }

    if (backToTopBtn) {
      if (window.scrollY > 280) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playUiSound('tab');
    });
  }

  // Ambient Cursor Spotlight
  if (cursorSpotlight) {
    document.addEventListener('mousemove', (e) => {
      cursorSpotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });
  }

  // Toast System
  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('active');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 2400);
  }

  // Universal Click-to-Copy Handler with Button State Transformation & Audio Feedback
  document.addEventListener('click', (e) => {
    const copyTarget = e.target.closest('[data-copy]');
    if (copyTarget) {
      const textToCopy = copyTarget.getAttribute('data-copy');
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard`);
          playUiSound('copy');

          if (copyTarget.classList.contains('btn-copy-cite')) {
            const originalText = copyTarget.textContent;
            copyTarget.textContent = 'Copied!';
            copyTarget.classList.add('copied');
            setTimeout(() => {
              copyTarget.textContent = originalText;
              copyTarget.classList.remove('copied');
            }, 2000);
          }
        }).catch(() => {
          showToast(`Contact: ${textToCopy}`);
        });
      }
    }
  });

  // URL Hash Sync on Load & Change
  function handleInitialHash() {
    const rawHash = window.location.hash.replace('#', '').trim().toLowerCase();
    if (rawHash) {
      const targetPanelId = hashToTabMap[rawHash] || (tabIdList.includes(rawHash) ? rawHash : null);
      if (targetPanelId && document.getElementById(targetPanelId)) {
        activateTab(targetPanelId, false, false);
        return;
      }
    }
    const activeTab = document.querySelector('[role="tab"].active');
    if (activeTab) updateGlider(activeTab);
  }

  window.addEventListener('hashchange', () => {
    const rawHash = window.location.hash.replace('#', '').trim().toLowerCase();
    if (rawHash && hashToTabMap[rawHash]) {
      activateTab(hashToTabMap[rawHash], false, false);
    }
  });

  handleInitialHash();
});
