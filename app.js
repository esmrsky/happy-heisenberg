/* ==========================================================================
   METANOIA INTERACTIVE APPLICATION LOGIC (V3 - LOOP CARDS & MATRIX FIX)
   Vanilla ES6 JS: Navigation, Loop Switchers, Habits Tracker, & Matrix Console
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==================== 1. APPLICATION STATE ==================== */
  const state = {
    currentSection: 'section-dashboard',
    tracker: {
      completedHabits: {
        dopamine: false,
        calm: false,
        mind: false,
        stewardship: false,
        fellowship: false
      },
      streak: 0,
      lastCompletedDate: null
    }
  };

  /* ==================== 2. NAVIGATION & TABS ==================== */
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');
  const logoLink = document.getElementById('logo-link');
  const footerLinks = document.querySelectorAll('.footer-nav-link');

  function navigateTo(sectionId) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update Nav Button States
    navButtons.forEach(btn => {
      if (btn.dataset.target === sectionId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Fade and transition tabs
    const currentActive = document.querySelector('.content-section.active');
    if (currentActive) {
      currentActive.style.opacity = '0';
      currentActive.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        currentActive.classList.remove('active');
        currentActive.style.display = 'none';

        const targetSection = document.getElementById(sectionId);
        targetSection.style.display = 'block';
        targetSection.offsetHeight; // Force reflow
        targetSection.classList.add('active');
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateY(0)';
      }, 250);
    } else {
      const targetSection = document.getElementById(sectionId);
      targetSection.style.display = 'block';
      targetSection.classList.add('active');
      targetSection.style.opacity = '1';
      targetSection.style.transform = 'translateY(0)';
    }

    state.currentSection = sectionId;
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.target));
  });

  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.target);
    });
  });

  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('section-dashboard');
  });

  /* ==================== 3. DARK / LIGHT MODE THEME ==================== */
  const themeToggle = document.getElementById('theme-toggle');
  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');

  function setTheme(theme) {
    metaColorScheme.content = theme === 'dark' ? 'dark' : 'light dark';
    localStorage.setItem('color-scheme', theme);
    document.documentElement.setAttribute('content', theme);
  }

  const savedTheme = localStorage.getItem('color-scheme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemTheme);
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('color-scheme') || 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });


  /* ==================== 4. INTERACTIVE DIAGRAM SWITCHERS ==================== */
  
  // A. Dopamine Loop (Cistern vs Spring)
  const btnDopamineCistern = document.getElementById('btn-dopamine-cistern');
  const btnDopamineSpring = document.getElementById('btn-dopamine-spring');
  const dopamineDots = document.getElementById('dopamine-dots');
  const dopamineReceptors = document.getElementById('dopamine-receptors');
  const dopamineStatusText = document.getElementById('dopamine-status-text');
  const dopamineDiagDesc = document.getElementById('dopamine-diag-desc');

  btnDopamineCistern.addEventListener('click', () => {
    btnDopamineCistern.classList.add('active');
    btnDopamineSpring.classList.remove('active');
    
    // Low dopamine state
    dopamineDots.innerHTML = `
      <circle cx="95" cy="55" r="3" fill="oklch(70% 0.28 330)" class="pulse-slow" />
      <circle cx="120" cy="52" r="3" fill="oklch(70% 0.28 330)" class="pulse-slow" />
      <circle cx="110" cy="65" r="3" fill="oklch(70% 0.28 330)" class="pulse-slow" />
    `;
    
    dopamineReceptors.innerHTML = `
      <rect x="90" y="82" width="10" height="4" rx="1" fill="var(--border)" />
      <rect x="115" y="82" width="10" height="4" rx="1" fill="var(--border)" />
      <rect x="140" y="82" width="10" height="4" rx="1" fill="var(--border)" style="opacity:0.2;" />
    `;
    
    dopamineStatusText.textContent = "Receptors Downgraded (50%)";
    dopamineStatusText.setAttribute('fill', 'var(--text-secondary)');
    dopamineDiagDesc.textContent = "Constant hits desensitize reward receptors. You scroll to feel normal, not happy.";
  });

  btnDopamineSpring.addEventListener('click', () => {
    btnDopamineSpring.classList.add('active');
    btnDopamineCistern.classList.remove('active');
    
    // Restored dopamine state
    dopamineDots.innerHTML = `
      <circle cx="95" cy="55" r="3" fill="oklch(70% 0.16 195)" />
      <circle cx="120" cy="52" r="3" fill="oklch(70% 0.16 195)" />
      <circle cx="145" cy="58" r="3" fill="oklch(70% 0.16 195)" />
      <circle cx="110" cy="65" r="3" fill="oklch(70% 0.16 195)" />
      <circle cx="130" cy="70" r="3" fill="oklch(70% 0.16 195)" />
      <circle cx="140" cy="75" r="3" fill="oklch(70% 0.16 195)" />
      <circle cx="100" cy="72" r="3" fill="oklch(70% 0.16 195)" />
    `;
    
    dopamineReceptors.innerHTML = `
      <rect x="90" y="82" width="10" height="4" rx="1" fill="oklch(70% 0.16 195)" />
      <rect x="115" y="82" width="10" height="4" rx="1" fill="oklch(70% 0.16 195)" />
      <rect x="140" y="82" width="10" height="4" rx="1" fill="oklch(70% 0.16 195)" />
    `;
    
    dopamineStatusText.textContent = "Receptors Upgraded (100%)";
    dopamineStatusText.setAttribute('fill', 'oklch(70% 0.16 195)');
    dopamineDiagDesc.textContent = "Denying cheap stims resets receptor sensitivity. Quiet focus becomes naturally rewarding.";
  });


  // B. Focus Loop (Willpower Law vs Grace)
  const btnWillpowerLaw = document.getElementById('btn-willpower-law');
  const btnWillpowerGrace = document.getElementById('btn-willpower-grace');
  const batteryFill1 = document.getElementById('battery-fill-1');
  const batteryFill2 = document.getElementById('battery-fill-2');
  const batteryFill3 = document.getElementById('battery-fill-3');
  const batteryFill4 = document.getElementById('battery-fill-4');
  const batteryStatusText = document.getElementById('battery-status-text');
  const willpowerDiagDesc = document.getElementById('willpower-diag-desc');

  btnWillpowerLaw.addEventListener('click', () => {
    btnWillpowerLaw.classList.add('active');
    btnWillpowerGrace.classList.remove('active');
    
    batteryFill1.style.display = 'block';
    batteryFill1.setAttribute('fill', 'oklch(60% 0.16 20)'); // Red
    batteryFill2.style.display = 'none';
    batteryFill3.style.display = 'none';
    batteryFill4.style.display = 'none';
    
    batteryStatusText.textContent = "Willpower Depleted (25%)";
    batteryStatusText.setAttribute('fill', 'oklch(60% 0.16 20)');
    willpowerDiagDesc.textContent = "Attempting to force focus under stress exhausts prefrontal energy, triggering cortisol spirals.";
  });

  btnWillpowerGrace.addEventListener('click', () => {
    btnWillpowerGrace.classList.add('active');
    btnWillpowerLaw.classList.remove('active');
    
    batteryFill1.style.display = 'block';
    batteryFill1.setAttribute('fill', 'oklch(70% 0.16 140)'); // Emerald
    batteryFill2.style.display = 'block';
    batteryFill2.setAttribute('fill', 'oklch(70% 0.16 140)');
    batteryFill3.style.display = 'block';
    batteryFill3.setAttribute('fill', 'oklch(70% 0.16 140)');
    batteryFill4.style.display = 'block';
    batteryFill4.setAttribute('fill', 'oklch(70% 0.16 140)');
    
    batteryStatusText.textContent = "Prefrontal Energy: High (100%)";
    batteryStatusText.setAttribute('fill', 'oklch(70% 0.16 140)');
    willpowerDiagDesc.textContent = "New Covenant internal alignment: changing desires and reframing lies preserves executive glucose energy.";
  });


  /* ==================== 5. PROTOCOL CHECKLIST TRACKER ==================== */
  const habitCheckboxes = {
    dopamine: document.getElementById('chk-dopamine'),
    calm: document.getElementById('chk-calm'),
    mind: document.getElementById('chk-mind'),
    stewardship: document.getElementById('chk-stewardship'),
    fellowship: document.getElementById('chk-fellowship')
  };

  const trackerProgressCircle = document.getElementById('tracker-progress-circle');
  const trackerPercentText = document.getElementById('tracker-percent-text');
  const trackerStreakText = document.getElementById('tracker-streak-text');
  const trackerQuoteText = document.getElementById('tracker-quote-text');
  const trackerQuoteAuthor = document.getElementById('tracker-quote-author');
  const resetTrackerBtn = document.getElementById('reset-tracker-btn');

  function loadTrackerData() {
    const savedData = localStorage.getItem('metanoia-uncook-v3');
    const todayStr = new Date().toDateString();

    if (savedData) {
      const parsed = JSON.parse(savedData);
      state.tracker.streak = parsed.streak || 0;
      state.tracker.lastCompletedDate = parsed.lastCompletedDate;
      state.tracker.completedHabits = parsed.completedHabits || state.tracker.completedHabits;

      // If opening on a new day, clear checked states but review streak
      if (parsed.lastActiveDate !== todayStr) {
        const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
        // If last completion was not yesterday and not today, streak resets
        if (parsed.lastCompletedDate !== yesterdayStr && parsed.lastCompletedDate !== todayStr) {
          state.tracker.streak = 0;
        }
        state.tracker.completedHabits = {
          dopamine: false,
          calm: false,
          mind: false,
          stewardship: false,
          fellowship: false
        };
      }
    }

    // Sync UI elements
    Object.keys(habitCheckboxes).forEach(key => {
      if (habitCheckboxes[key]) {
        habitCheckboxes[key].checked = state.tracker.completedHabits[key] || false;
      }
    });

    updateProgressUI();
  }

  function saveTrackerData() {
    const todayStr = new Date().toDateString();
    const completedAll = Object.values(state.tracker.completedHabits).every(val => val === true);

    if (completedAll && state.tracker.lastCompletedDate !== todayStr) {
      const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
      if (state.tracker.lastCompletedDate === yesterdayStr || state.tracker.streak === 0) {
        state.tracker.streak++;
      }
      state.tracker.lastCompletedDate = todayStr;
    } else if (!completedAll && state.tracker.lastCompletedDate === todayStr) {
      state.tracker.lastCompletedDate = null;
      if (state.tracker.streak > 0) {
        state.tracker.streak = Math.max(0, state.tracker.streak - 1);
      }
    }

    const dataToSave = {
      completedHabits: state.tracker.completedHabits,
      streak: state.tracker.streak,
      lastCompletedDate: state.tracker.lastCompletedDate,
      lastActiveDate: todayStr
    };

    localStorage.setItem('metanoia-uncook-v3', JSON.stringify(dataToSave));
    updateProgressUI();
  }

  function updateProgressUI() {
    const totalHabits = Object.keys(state.tracker.completedHabits).length;
    const completedCount = Object.values(state.tracker.completedHabits).filter(val => val === true).length;
    const percent = Math.round((completedCount / totalHabits) * 100);

    if (trackerPercentText) {
      trackerPercentText.innerText = `${percent}%`;
    }
    if (trackerStreakText) {
      trackerStreakText.innerText = `${state.tracker.streak} Day${state.tracker.streak === 1 ? '' : 's'}`;
    }

    if (trackerProgressCircle) {
      // SVG dashoffset calculations
      const circumference = 439.8;
      const offset = circumference - (circumference * percent) / 100;
      trackerProgressCircle.style.strokeDashoffset = offset;

      if (percent === 100) {
        trackerProgressCircle.style.stroke = 'var(--accent-spirit)';
        const randQuote = scriptureQuotes[Math.floor(Math.random() * scriptureQuotes.length)];
        if (trackerQuoteText) trackerQuoteText.innerText = `"${randQuote.text}"`;
        if (trackerQuoteAuthor) trackerQuoteAuthor.innerText = `— ${randQuote.ref}`;
      } else {
        trackerProgressCircle.style.stroke = 'var(--accent-science)';
      }
    }
  }

  // Bind checkbox listeners
  Object.keys(habitCheckboxes).forEach(key => {
    if (habitCheckboxes[key]) {
      habitCheckboxes[key].addEventListener('change', (e) => {
        state.tracker.completedHabits[key] = e.target.checked;
        saveTrackerData();
      });
    }
  });

  if (resetTrackerBtn) {
    resetTrackerBtn.addEventListener('click', () => {
      Object.keys(habitCheckboxes).forEach(key => {
        if (habitCheckboxes[key]) {
          habitCheckboxes[key].checked = false;
          state.tracker.completedHabits[key] = false;
        }
      });
      saveTrackerData();
    });
  }

  // Load tracker state on start
  loadTrackerData();


  /* ==================== 6. MIND RENEWAL CONSOLE ENGINE (V3) ==================== */
  const analyzeBtn = document.getElementById('analyze-thought-btn');
  const cookedInput = document.getElementById('cooked-thought-input');
  const consolePlaceholder = document.getElementById('console-placeholder');
  const consoleLoading = document.getElementById('console-loading');
  const consoleResults = document.getElementById('console-results');
  
  const resOriginalThought = document.getElementById('res-original-thought');
  const resDistortionTag = document.getElementById('res-distortion-tag');
  const resScienceExplain = document.getElementById('res-science-explain');
  const resScriptureText = document.getElementById('res-scripture-text');
  const resScriptureRef = document.getElementById('res-scripture-ref');
  const resSpiritualCommentary = document.getElementById('res-spiritual-commentary');
  const resActionStep = document.getElementById('res-action-step');

  const rutTags = document.querySelectorAll('.rut-tag');

  // Deconstruct Database containing Broken Cistern / Willpower Trap updates
  const reframingDB = [
    {
      keywords: ['scroll', 'lazy', 'phone', 'stuck', 'focus', 'distract', 'tiktok', 'paralyze', 'youtube', 'screen', 'instagram', 'time'],
      distortion: "Broken Cistern Dopamine Loop",
      science: "Your brain is attempting to drink from a cracked cistern (digital streams) for quick dopamine. Because these feeds downregulation receptors, your prefrontal glucose drops, creating focus paralysis. Trying to 'white-knuckle' focus here exhausts willpower, triggering deeper scrolling cycles.",
      targetRegion: "Target: Nucleus Accumbens & Willpower Depletion",
      scripture: "My people have committed two sins: They have forsaken me, the spring of living water, and have dug their own cisterns, broken cisterns that cannot hold water.",
      ref: "Jeremiah 2:13",
      commentary: "Your attention was made for a spring, not an algorithm. Stop fighting with raw willpower; instead, change the source of your intake by taking a Sabbath rest block.",
      action: "Put your phone in another room. Do a 5-minute Sabbath quiet block. Repeat: 'My mind rests in the living spring.'"
    },
    {
      keywords: ['fail', 'behind', 'future', 'career', 'job', 'money', 'peer', 'age', 'worthless', 'lost', 'waste'],
      distortion: "Self-Reinforcing Amygdala Threat Spiral",
      science: "Your amygdala interprets peer comparison as a survival threat. It floods your brain with cortisol, which physically disables prefrontal planning. This cortisol spiral forces you to scan for more threats (DMN rumination), reinforcing panic.",
      targetRegion: "Target: Amygdala Hyperactivity & Cortisol Loop",
      scripture: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
      ref: "Jeremiah 29:11",
      commentary: "Willpower cannot quiet a cortisol flood. You must deactivate the amygdala loop using gratitude and trust, shifting from social anxiety to stewardship of your calling.",
      action: "Write down 3 distinct talents God gave you. Designate 1 goal for tomorrow. Close all social media comparison accounts for 24 hours."
    },
    {
      keywords: ['alone', 'lonely', 'nobody', 'single', 'friend', 'empty', 'isolate', 'rejected', 'unloved'],
      distortion: "Cortisol-Isolation Feedback Rut",
      science: "Relational isolation is interpreted by the brain as literal physiological danger. Lacking face-to-face feedback cues deprives you of oxytocin, which elevates baseline cortisol, impairing prefrontal control and locking you in social withdrawal.",
      targetRegion: "Target: Oxytocin Starvation & Hippocampus Stress",
      scripture: "Two are better than one, because they have a good reward for their toil. For if they fall, one will lift up his fellow.",
      ref: "Ecclesiastes 4:9-10",
      commentary: "Isolation is a closed loop: isolation breeds fear, which breeds further isolation. Breaking the cycle requires replacing virtual links with real-world fellowship to release cortisol-regulating oxytocin.",
      action: "Call one friend or family member. Ask to meet face-to-face. Focus entirely on listening and encouraging them."
    },
    {
      keywords: ['addict', 'habit', 'cycle', 'again', 'rut', 'vape', 'porn', 'sugar', 'eat', 'control', 'stop', 'smoke'],
      distortion: "Basal Ganglia Compulsion Loop",
      science: "Your habit routine is hardwired into the basal ganglia. Under willpower depletion (stress/boredom), your prefrontal cortex lose its veto power, making the loop automatic. The Law (rules) alone triggers reactance and failure.",
      targetRegion: "Target: Basal Ganglia & New Covenant Renewal",
      scripture: "No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape...",
      ref: "1 Corinthians 10:13",
      commentary: "Willpower fails because the flesh is weak under stress. True New Covenant transformation rewires desires from the inside out by inserting a 90-second gap of prayer and grace between trigger and action.",
      action: "Next time you feel a craving cue, wait exactly 90 seconds. Walk outside, drink water, and pray: 'Lord, guide me to the escape path.'"
    }
  ];

  rutTags.forEach(tag => {
    tag.addEventListener('click', () => {
      rutTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      cookedInput.value = tag.dataset.thought;
      analyzeThought();
    });
  });

  function analyzeThought() {
    const thought = cookedInput.value.trim();
    if (!thought) return;

    consolePlaceholder.classList.add('hidden');
    consoleResults.classList.add('hidden');
    consoleLoading.classList.remove('hidden');

    setTimeout(() => {
      const lowerThought = thought.toLowerCase();
      let match = null;

      for (let item of reframingDB) {
        const matchesKeyword = item.keywords.some(keyword => lowerThought.includes(keyword));
        if (matchesKeyword) {
          match = item;
          break;
        }
      }

      // Fallback
      if (!match) {
        match = {
          distortion: "Prefrontal Attention Drift & DMN Loop",
          science: "Lacking focused vision, your prefrontal cortex enters attention drift. Your default mode network (DMN) runs self-critical loops. White-knuckling focus drains prefrontal battery, driving you to cheap screen coping cycles.",
          targetRegion: "Target: Prefrontal Fatigue & DMN loop",
          scripture: "Finally, brothers, whatever is true, honorable, just, pure, lovely... think about these things.",
          ref: "Philippians 4:8",
          commentary: "Mind renewal is not willpower; it is redirection of focus. Replace self-worry loops by focusing attention on objective truths and scripture.",
          action: "Close your eyes. Inhale for 4 seconds, hold for 4, exhale for 4. Write down 3 good things in front of you."
        };
      }

      // Render Matrix
      resOriginalThought.innerText = `"${thought}"`;
      resDistortionTag.innerText = match.distortion;
      resScienceExplain.innerText = match.science;
      resScienceExplain.nextElementSibling.innerText = match.targetRegion;
      resScriptureText.innerText = `"${match.scripture}"`;
      resScriptureRef.innerText = match.ref;
      resSpiritualCommentary.innerText = match.commentary;
      resActionStep.innerText = match.action;

      consoleLoading.classList.add('hidden');
      consoleResults.classList.remove('hidden');
    }, 900);
  }

  analyzeBtn.addEventListener('click', analyzeThought);


  /* ==================== 7. INTERACTIVE BRAIN EXPLORER INTEGRATION ==================== */
  const svgHotspots = document.querySelectorAll('.svg-hotspot-group');
  const brainRegionPill = document.getElementById('brain-region-pill');
  const brainRegionTitle = document.getElementById('brain-region-title');
  const brainInfoBody = document.getElementById('brain-info-body');
  const brainInfoFooter = document.getElementById('brain-info-footer');
  const brainRemedyHabit = document.getElementById('brain-remedy-habit');
  const brainActionBtn = document.getElementById('brain-action-btn');

  const brainRegionsData = {
    pfc: {
      title: "Prefrontal Cortex (PFC)",
      pill: "PFC: Executive Center",
      body: `<p>The <strong>Prefrontal Cortex</strong> is the brain's executive commander. It regulates attention, plans for the future, manages self-control, and suppresses impulsive behavior.</p>
             <p><strong>The Cooked State:</strong> Digital stimulation (scrolling, multiple open tabs) starves the PFC of metabolic energy. It enters a state of 'willpower depletion,' rendering you aimless, easily distracted, and unable to veto compulsive cravings.</p>
             <p><strong>Metanoia Synthesis:</strong> The Bible describes this as the core site of <i>renewing the mind</i> (Romans 12:2). Strengthening this region biologically aligns with New Covenant heart renewal, cultivating focused stewardship, and quiet reflection.</p>`,
      habit: "Mind Renewal / Focus Protocols",
      cardId: "card-loop-focus"
    },
    nac: {
      title: "Nucleus Accumbens (NAc)",
      pill: "NAc: Reward Center",
      body: `<p>The <strong>Nucleus Accumbens</strong> is the heart of the brain's mesolimbic dopamine pathway, commonly known as the reward center. It drives anticipation, craving, and habit formation.</p>
             <p><strong>The Cooked State:</strong> Hijacked by immediate notification loops and scrolling. Constant high-dopamine hits desensitize your receptors (digging 'broken cisterns'), making normal, productive activities feel painfully boring.</p>
             <p><strong>Metanoia Synthesis:</strong> Metanoia combats this dopamine loop through <i>Sabbath and Fasting</i> (Isaiah 30:15)—intentionally denying cheap stimulants to reset reward pathways and restore sensitivity.</p>`,
      habit: "Dopamine Fast / Sabbath Block",
      cardId: "card-loop-dopamine"
    },
    amygdala: {
      title: "Amygdala",
      pill: "Amygdala: Stress Center",
      body: `<p>The <strong>Amygdala</strong> is the brain's almond-shaped defense siren. It processes basic emotions like fear, anxiety, anger, and activates the body's fight-or-flight threat system.</p>
             <p><strong>The Cooked State:</strong> Constant exposure to online comparisons, alarmist news feeds, and lack of sleep keeps the Amygdala chronically active. You enter a self-reinforcing stress loop, interpreting minor daily concerns as catastrophic emergencies.</p>
             <p><strong>Metanoia Synthesis:</strong> Scientific studies prove that gratitude journaling and structured prayer biologically soothe a hyperactive amygdala, resetting the nervous system to peace (Philippians 4:6-7).</p>`,
      habit: "Amygdala Calm (Gratitude & Prayer)",
      cardId: "card-loop-anxiety"
    },
    hippocampus: {
      title: "Hippocampus",
      pill: "Hippocampus: Memory & Context",
      body: `<p>The <strong>Hippocampus</strong> is responsible for forming new memories, cataloging spatial navigation, and providing context to emotional events.</p>
             <p><strong>The Cooked State:</strong> Chronic stress (cortisol) and social isolation biologically shrink the Hippocampus, eroding short-term memory and locking you into reactive, habitual behavior patterns. You repeat the same ruts without context.</p>
             <p><strong>Metanoia Synthesis:</strong> A healthy hippocampus supports neuroplasticity. By resting and aligning with deep community relationships (oxytocin buffers cortisol), we enable the brain to escape old cycles and solidify new habits (Galatians 6:2).</p>`,
      habit: "Relational Fellowship Sync",
      cardId: "card-loop-connection"
    }
  };

  function selectBrainRegion(regionKey) {
    const data = brainRegionsData[regionKey];
    if (!data) return;

    // Highlight active hotspot in SVG
    svgHotspots.forEach(group => {
      const region = group.dataset.region;
      const part = group.querySelector('.brain-part');
      const label = group.querySelector('.hotspot-label');
      
      if (region === regionKey) {
        part.classList.add('active');
        if (label) label.classList.add('active');
      } else {
        part.classList.remove('active');
        if (label) label.classList.remove('active');
      }
    });

    // Update Side Panel
    brainRegionPill.innerText = data.pill;
    brainRegionPill.dataset.region = regionKey;
    brainRegionTitle.innerText = data.title;
    brainInfoBody.innerHTML = data.body;
    
    brainRemedyHabit.innerText = data.habit;
    brainActionBtn.dataset.card = data.cardId;
    
    brainInfoFooter.classList.remove('hidden');
  }

  // Bind SVG hotspot clicks
  svgHotspots.forEach(group => {
    group.addEventListener('click', () => {
      selectBrainRegion(group.dataset.region);
    });
  });

  // Jump to specific loop card on Dashboard from explorer
  brainActionBtn.addEventListener('click', () => {
    const cardId = brainActionBtn.dataset.card;
    if (cardId) {
      navigateTo('section-dashboard');
      
      setTimeout(() => {
        const loopCard = document.getElementById(cardId);
        if (loopCard) {
          loopCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          loopCard.style.borderColor = 'var(--accent-spirit)';
          loopCard.style.boxShadow = '0 0 20px var(--accent-spirit-glow)';
          
          setTimeout(() => {
            loopCard.style.borderColor = '';
            loopCard.style.boxShadow = '';
          }, 1500);
        }
      }, 400);
    }
  });

  const btnNavBrain = document.getElementById('btn-nav-brain');
  btnNavBrain.addEventListener('click', () => {
    setTimeout(() => selectBrainRegion('pfc'), 300);
  });

});
