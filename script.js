(function () {
  "use strict";

  /* =========================================================
     DATA
     Every video below uses an exact watch URL:
     https://www.youtube.com/watch?v=<ID>
     ========================================================= */
  var BLOCKS = [
    { k: "watch",  label: "Watch & read", min: 45, key: "1" },
    { k: "build",  label: "Build",        min: 60, key: "2" },
    { k: "review", label: "Review",       min: 15, key: "3" }
  ];

  var WEEKS = [
    { n: 1, from: 1,  to: 7,  name: "Think in mobile, not DOM" },
    { n: 2, from: 8,  to: 14, name: "Navigation & forms" },
    { n: 3, from: 15, to: 21, name: "Data & device APIs" },
    { n: 4, from: 22, to: 30, name: "Polish & ship" }
  ];

  var BUFFER_NOTE = "No new material today. Re-watch the one video you understood least this week, or re-read the docs for it.";

  // v: [youtubeId, title, channel?]   d: [label, url]
  var DAYS = [
    { t: "Set up, then unlearn the DOM",
      v: [["XCifkDC0yXA", "React Native Crash Course 2026 – Build a Complete Mobile App", "Traversy Media"]],
      d: [["RN docs: Core components", "https://reactnative.dev/docs/intro-react-native-components"],
          ["Expo: Create a project", "https://docs.expo.dev/get-started/create-a-project/"],
          ["Expo Go (install on your phone)", "https://expo.dev/go"]],
      b: "Run npx create-expo-app@latest and open it in Expo Go on your phone. Build a profile card with View, Text, Image and StyleSheet. No div, no CSS files.",
      q: "List 5 things that behave differently from web React." },

    { t: "Core components",
      v: [["BUXnASp_WyQ", "React Native for Dummies 2026 – Full Beginner Crash Course", "Code with Beto"],
          ["0ce9d2XhEsY", "React Native Fundamentals: View, Text & Image Components Explained (Beginner Guide)"]],
      d: [["RN docs: Components and APIs", "https://reactnative.dev/docs/components-and-apis"]],
      b: "Turn the profile card into a settings screen with TextInput, Pressable and a ScrollView inside a SafeAreaView.",
      q: "What replaces onClick, <img> and <input> here?" },

    { t: "Flexbox is the only layout system",
      v: [["Al-f0mkKEsM", "Master React Native Layouts in 5 Minutes – Flexbox Guide 2025"],
          ["ak-NFDpEiW0", "React Native Flexbox Mastery for Beginners (2025)"]],
      d: [["RN docs: Layout with Flexbox", "https://reactnative.dev/docs/flexbox"]],
      b: "Rebuild a header / content / footer layout and a two-column card grid using only Flexbox. No absolute positioning.",
      q: "Name the 3 biggest default differences from web Flexbox (hint: flexDirection)." },

    { t: "Styling with NativeWind",
      v: [["UlYjRWbJogw", "How to use TailwindCSS in React Native | Nativewind | Expo"],
          ["k3CmmU5jm4Q", "NativeWind v5 Setup: Use Tailwind CSS in React Native | 2026 Guide | Part 2"]],
      d: [["NativeWind docs", "https://www.nativewind.dev/"]],
      b: "Install NativeWind and restyle Days 1–3 with Tailwind classes. Use the first video if you want the stable setup; the second is the v5 setup (it is Part 2 of a series).",
      q: "Where did className just work, and where did you fall back to style?" },

    { t: "Lists: FlatList and FlashList",
      v: [["514Gds-jLMY", "Creating Performant Lists in Your Expo React Native Apps using Shopify Flash List"],
          ["1YhCVDNicWA", "Optimizing Large Lists in React Native with List Components"]],
      d: [["RN docs: FlatList", "https://reactnative.dev/docs/flatlist"],
          ["FlashList docs", "https://shopify.github.io/flash-list/"]],
      b: "Render 50+ mock rows with FlatList, then swap in FlashList and compare how scrolling feels.",
      q: "Why can't you .map() a long array into a ScrollView?" },

    { t: "Mini project: three screens, no router",
      v: [["J50gwzwLvAk", "React Native Full Course 2025 | Become a React Native Pro in 4 Hours", "PedroTech · optional build-along if you get stuck"]],
      d: [],
      b: "Build Home / Detail / Settings and switch between them with plain state. Pick your capstone idea today (habit tracker, notes with photos, small social feed, or a shop with a cart).",
      q: "What already feels awkward about switching screens by hand?" },

    { t: "Buffer day",
      v: [], d: [],
      b: "Finish anything that is behind. If you're caught up, polish the three-screen app.",
      q: "Which idea from this week do you still not trust yourself on?" },

    { t: "Expo Router: Next.js in your pocket",
      v: [["Yh6Qlg2CYwQ", "Introduction to Expo Router Layout Files"],
          ["ZG6GngLP3qo", "Introduction To Expo Router with Stack & Tab Navigator"]],
      d: [["Expo Router: Introduction", "https://docs.expo.dev/router/introduction/"],
          ["Expo Router: Core concepts", "https://docs.expo.dev/router/basics/core-concepts/"]],
      b: "Convert the Day 6 app to file-based routing: app/index.tsx, app/detail.tsx and app/_layout.tsx.",
      q: "Map layout.tsx and page.tsx from the Next.js App Router to their Expo Router equivalents." },

    { t: "Tabs and stacks",
      v: [["BElPB4Ai3j0", "Using a Tab Navigator with Expo Router"],
          ["izZv6a99Roo", "Using a Stack Navigator with Expo Router"],
          ["4qVLgaRHPaw", "File Based Routing | Expo Router Tutorial", "Code with Beto"]],
      d: [["Expo Router: Core concepts", "https://docs.expo.dev/router/basics/core-concepts/"]],
      b: "Add a (tabs) group with Home / Profile / Settings, plus a stack screen pushed on top of the tabs.",
      q: "What do the parentheses in (tabs) actually do?" },

    { t: "Dynamic routes and params",
      v: [["FUpvQQzBJmU", "Dynamic File-based Routing in React Native with Expo Router"],
          ["T8x5Lr5Sd_s", "React Native Navigation with expo-router // Tabs / Stack / useRouter / params / naming conventions"]],
      d: [["Expo Router: Introduction", "https://docs.expo.dev/router/introduction/"]],
      b: "Create app/product/[id].tsx, navigate to it with a param and read that param in the screen.",
      q: "Compare with Next.js [id].tsx: what's identical, what's different (useLocalSearchParams)?" },

    { t: "Forms and the keyboard",
      v: [["uL4lPYzhNK0", "React Native KeyboardAvoidingView Tutorial"],
          ["JmThlYvLYhQ", "How to Build a Keyboard-Avoiding View in React Native + Expo"]],
      d: [["RN docs: TextInput", "https://reactnative.dev/docs/textinput"],
          ["RN docs: KeyboardAvoidingView", "https://reactnative.dev/docs/keyboardavoidingview"]],
      b: "Build a login / signup form with validation. Stop the keyboard covering inputs and dismiss it on tap outside. Test on your real phone.",
      q: "Which keyboard bug bit you today?" },

    { t: "Modals and swipe gestures",
      v: [["gNzuJVRmyDk", "Using Modals with Expo Router"],
          ["BRitzE50Dy0", "Swipe to Delete in React Native Expo in 3 Minutes (Using Swipeable)"]],
      d: [["Expo Router: Modals", "https://docs.expo.dev/router/advanced/modals/"]],
      b: "Add an \"Add item\" modal route and swipe-to-delete on a list row.",
      q: "When is a modal route better than a normal pushed screen?" },

    { t: "Mini project: full navigation flow",
      v: [], d: [],
      b: "Combine tabs, a dynamic detail screen, a modal and a form in one small app (notes, shop, or your capstone).",
      q: "What felt exactly like Next.js, and what felt new?" },

    { t: "Buffer day",
      v: [], d: [],
      b: "Catch up on any navigation work still open.",
      q: "Which navigation concept is still fuzzy?" },

    { t: "Fetching data",
      v: [["bpHq_-bPkGo", "Data Fetching in React Native with TanStack Query (tutorial for beginners)"]],
      d: [["RN docs: Networking", "https://reactnative.dev/docs/network"]],
      b: "Fetch from a public REST API into your FlashList with loading and error states. Try TanStack Query for caching.",
      q: "What's identical to web fetching, and what's different on a device?" },

    { t: "Auth with Supabase",
      v: [["ZEka9HtOOC8", "Expo Router And Supabase Authentication"],
          ["EZIrpRVGlfU", "Supabase React Native Auth Tutorial"],
          ["rIYzLhkG9TA", "React Native Full 8 Hours Course (Expo, Expo Router, Supabase)", "notJust.dev · full build; use YouTube's chapter list and watch only the auth part"]],
      d: [["Expo: Using Supabase", "https://docs.expo.dev/guides/using-supabase/"]],
      b: "Create a Supabase project and wire up email / password sign-in. Guard the tabs behind a session.",
      q: "How does session persistence differ from a browser cookie?" },

    { t: "Storing data on the device",
      v: [["s_tBTjQzlSg", "Don't Use AsyncStorage! Secure Your React Native App with Expo SecureStore"],
          ["46nAccLWas0", "React Native Expo Tutorial: Offline Data Storage with AsyncStorage"]],
      d: [["Expo SecureStore", "https://docs.expo.dev/versions/latest/sdk/securestore/"],
          ["AsyncStorage docs", "https://react-native-async-storage.github.io/async-storage/docs/install/"]],
      b: "Keep the auth token in SecureStore and app preferences in AsyncStorage.",
      q: "When do you pick SecureStore, AsyncStorage, or Zustand persist?" },

    { t: "Global state with Zustand",
      v: [["U2Hg-MAAz_M", "Zustand – Complete Tutorial for Beginners in React Native"],
          ["6siYLO4wokE", "Zustand Persist Middleware Tutorial: Save State to Device"]],
      d: [["Zustand on GitHub", "https://github.com/pmndrs/zustand"]],
      b: "Replace prop drilling or Context with a Zustand store (cart, session or theme).",
      q: "Why is Zustand a better default for React Native than Redux?" },

    { t: "Camera roll and permissions",
      v: [["wLF-2RagaDE", "React Native Expo Image Picker Tutorial 2026"],
          ["OVuRWEMeLGA", "React Native Tutorial: Image Picker & Sharing with Expo"]],
      d: [["Expo ImagePicker", "https://docs.expo.dev/versions/latest/sdk/imagepicker/"]],
      b: "Add a \"change profile photo\" flow with expo-image-picker and a graceful permission request.",
      q: "Write down your reusable pattern: check, request, handle denial." },

    { t: "Push notifications",
      v: [["p4KP-hXuDyI", "React Native Expo Push Notifications Tutorial (2025) – iOS & Android Setup"],
          ["NI_nv5lTGaY", "React Native Local Push Notifications Tutorial (2026)"]],
      d: [["Expo: Push notifications setup", "https://docs.expo.dev/push-notifications/push-notifications-setup/"]],
      b: "Schedule a local notification, then register for a push token on a real device.",
      q: "Why do remote push notifications need a development build instead of Expo Go?" },

    { t: "Buffer and backend wrap-up",
      v: [], d: [],
      b: "Finish any backend or device-API work still open.",
      q: "Which backend concept needs more practice?" },

    { t: "Animation, just enough",
      v: [["OfKVpG8KLhY", "Building Beautiful Animations with React Native Reanimated 3"],
          ["rnK_03dyY0o", "React Native Reanimated Basics"],
          ["eLjzIM_4zlg", "YouTube Transitions – \"Can it be done in React Native?\"", "William Candillon · advanced inspiration, 2019"]],
      d: [["Reanimated: Getting started", "https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/"]],
      b: "Add one real animation: a fade-in, a press-scale or a basic swipe. Don't go down the rabbit hole.",
      q: "Why does running on the UI thread matter for smoothness?" },

    { t: "Performance pass",
      v: [["rSym-q9soFk", "7 Tips to Make Your React Native App Blazing Fast!"],
          ["M5k3i_CBonU", "Most Developers Get React Native Re-renders Wrong"]],
      d: [["RN docs: Performance", "https://reactnative.dev/docs/performance"],
          ["FlashList docs", "https://shopify.github.io/flash-list/"]],
      b: "Audit the capstone: remove extra re-renders, size images properly and check scrolling on a mid-range phone.",
      q: "List 3 performance habits you'll now apply by default." },

    { t: "Development builds",
      v: [["Th8uRHWOv-Q", "React Native Development Build tutorial with EAS"],
          ["nErlD5GiWvI", "Expo Development Client vs Expo Go"]],
      d: [["Expo: Development builds", "https://docs.expo.dev/develop/development-builds/introduction/"]],
      b: "Run eas build --profile development, install it on your phone and use a library Expo Go can't run.",
      q: "Explain Expo Go vs development build vs production build." },

    { t: "Your first production build",
      v: [["3RCahcMlsBY", "EAS Build Android Walkthrough"],
          ["K3-QNKLPGKI", "React Native Expo EAS Builds – Cloud & Local Builds in Android & iOS"]],
      d: [["EAS Build introduction", "https://docs.expo.dev/build/introduction/"],
          ["Android production build", "https://docs.expo.dev/tutorial/eas/android-production-build/"]],
      b: "Run your first production EAS build for Android (iOS too if you have a Mac and an Apple Developer account).",
      q: "Which app.json fields end up in the store listing?" },

    { t: "Submit to a store",
      v: [["-KZjr576tuE", "Async Office Hours: How to quickly publish to the App Store & Play Store with EAS Submit"],
          ["qxO_8GFAliE", "Publish APP To Google PLAY Store: Internal Testing Setup [2026]"]],
      d: [["Submit to app stores", "https://docs.expo.dev/deploy/submit-to-app-stores/"]],
      b: "Submit to the Google Play internal testing track ($25 one-time; Apple is $99 a year), or walk through every step without paying.",
      q: "What do you still need before a public launch? Screenshots, privacy policy, content rating." },

    { t: "Polish day",
      v: [["77mVhKiBCsE", "[2025] Expo App Icon and Splash Screen Tutorial"],
          ["MqLteLe-Fow", "Expo Splash Screen & App Icons Setup"]],
      d: [],
      b: "Fix bugs, add empty / loading / error states, a real icon and a splash screen.",
      q: "If you had one more day, what's the first thing you'd fix?" },

    { t: "Over-the-air updates",
      v: [["DWpcD6bvTRA", "Sending Over-the-Air (OTA) Updates with EAS Update"],
          ["TsLFMxNNlBg", "What OTA Updates are, how they work, and how to use them"]],
      d: [["EAS Update introduction", "https://docs.expo.dev/eas-update/introduction/"]],
      b: "Push a JavaScript-only update to your development build with EAS Update.",
      q: "What can ship over the air, and what needs a new build?" },

    { t: "Ship day: finish the capstone",
      v: [], d: [],
      b: "Finish the capstone app and write a short README.",
      q: "What are you proudest of from this month?" },

    { t: "Ship day: demo and what's next",
      v: [], d: [],
      b: "Record a 60-second demo of the app running on your phone and decide what month two looks like.",
      q: "What's the first thing on your month-two list?" }
  ];
  DAYS.forEach(function (d, i) { d.id = i + 1; });
  var TOTAL = DAYS.length;

  /* =========================================================
     STATE (localStorage)
     ========================================================= */
  var KEY = "daybreak-rn30-v2";
  var OLD_KEY = "rn30-tracker-v1";
  var storageOK = true;

  function blank() { return { v: 2, days: {}, last: 1 }; }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { var s = JSON.parse(raw); if (s && s.days) return s; }
    } catch (e) { storageOK = false; }
    try {
      var old = localStorage.getItem(OLD_KEY);
      if (old) {
        var o = JSON.parse(old), s2 = blank();
        Object.keys(o.entries || {}).forEach(function (id) {
          var e = o.entries[id], dt = e.done ? (e.date || todayKey()) : null;
          s2.days[id] = { b: { watch: dt, build: dt, review: dt }, note: e.note || "" };
        });
        return s2;
      }
    } catch (e) { /* ignore */ }
    return blank();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageOK = true; }
    catch (e) { storageOK = false; }
  }

  var state = load();
  var cur = 1;
  var popId = null;

  function dayState(id) {
    if (!state.days[id]) state.days[id] = { b: { watch: null, build: null, review: null }, note: "" };
    var s = state.days[id];
    if (!s.b) s.b = { watch: null, build: null, review: null };
    return s;
  }
  function blocksDone(id) {
    var b = dayState(id).b, n = 0;
    BLOCKS.forEach(function (x) { if (b[x.k]) n++; });
    return n;
  }
  function isDone(id) { return blocksDone(id) === 3; }
  function nextUnfinished() {
    for (var i = 1; i <= TOTAL; i++) if (!isDone(i)) return i;
    return null;
  }

  /* ---------- dates ---------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function keyOf(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function todayKey() { return keyOf(new Date()); }
  function dayNum(key) { var p = key.split("-"); return Math.round(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000); }

  /* ---------- stats ---------- */
  function computeStats() {
    var done = 0, minutes = 0, dates = {}, counts = {};
    DAYS.forEach(function (d) {
      var b = dayState(d.id).b, n = 0;
      BLOCKS.forEach(function (x) {
        if (b[x.k]) { n++; minutes += x.min; dates[b[x.k]] = true; counts[b[x.k]] = (counts[b[x.k]] || 0) + 1; }
      });
      if (n === 3) done++;
    });

    var cur = 0, probe = new Date(); probe.setHours(0, 0, 0, 0);
    if (!dates[keyOf(probe)]) probe.setDate(probe.getDate() - 1);
    while (dates[keyOf(probe)]) { cur++; probe.setDate(probe.getDate() - 1); }

    var sorted = Object.keys(dates).sort(), best = 0, run = 0, prev = null;
    sorted.forEach(function (k) {
      run = (prev !== null && dayNum(k) - prev === 1) ? run + 1 : 1;
      if (run > best) best = run;
      prev = dayNum(k);
    });

    return { done: done, minutes: minutes, streak: cur, best: best, counts: counts };
  }

  /* =========================================================
     HELPERS
     ========================================================= */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ytUrl(id) { return "https://www.youtube.com/watch?v=" + id; }
  function ytThumb(id) { return "https://i.ytimg.com/vi/" + id + "/mqdefault.jpg"; }
  function weekOf(id) { for (var i = 0; i < WEEKS.length; i++) if (id >= WEEKS[i].from && id <= WEEKS[i].to) return WEEKS[i]; return WEEKS[0]; }
  function lvl(n) { return n === 3 ? 3 : n === 2 ? 2 : n === 1 ? 1 : 0; }
  function hours(min) { var h = Math.round(min / 6) / 10; return (h % 1 === 0 ? h.toFixed(0) : h.toFixed(1)) + "h"; }

  var ICON = {
    check: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.2 6.4 4.9 9 9.9 3.2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    play: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2.5v9l7.5-4.5z" fill="currentColor"/></svg>',
    ext: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5.5 3H3v8h8V8.5M8 3h3v3M11 3 6.5 7.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    left: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    close: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="m3 3 8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };

  function sunSvg(p) {
    var o = (0.55 + 0.45 * p).toFixed(2);
    return '<svg width="38" height="38" viewBox="0 0 38 38" aria-hidden="true">' +
      '<defs><linearGradient id="sg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f26b4f"/><stop offset="1" stop-color="#ffc24b"/></linearGradient>' +
      '<clipPath id="sc"><rect x="0" y="0" width="38" height="25"/></clipPath></defs>' +
      '<g opacity="' + o + '"><circle cx="19" cy="25" r="11" fill="url(#sg)" clip-path="url(#sc)"/>' +
      '<path d="M19 6v4M7.5 11.5l2.8 2.8M30.5 11.5l-2.8 2.8M3 25h4M31 25h4" stroke="#ffc24b" stroke-width="2" stroke-linecap="round"/></g>' +
      '<path d="M3 29h32" stroke="#a79fd4" stroke-width="2" stroke-linecap="round"/></svg>';
  }

  /* =========================================================
     RENDER
     ========================================================= */
  var $side = document.getElementById("sideInner");
  var $sidebar = document.getElementById("sidebar");
  var $scrim = document.getElementById("scrim");
  var $top = document.getElementById("topbar");
  var $day = document.getElementById("dayView");
  var $act = document.getElementById("activity");

  function renderSidebar(st) {
    var next = nextUnfinished();
    var pct = st.done / TOTAL;

    var cells = "";
    for (var i = 0; i < 35; i++) {
      var id = i + 1;
      if (id > TOTAL) { cells += '<span class="pcell pad"></span>'; continue; }
      var n = blocksDone(id);
      cells += '<a class="pcell l' + lvl(n) + (id === cur ? " here" : "") + (id === next && id !== cur ? " next" : "") +
        '" href="#day-' + id + '" title="Day ' + id + ' · ' + esc(DAYS[i].t) + ' — ' + n + '/3 sessions" aria-label="Day ' + id + ', ' + n + ' of 3 sessions done">' + id + '</a>';
    }

    var cta = next
      ? '<a class="cta" href="#day-' + next + '"><span>' + (st.done === 0 && blocksDone(1) === 0 ? "Start Day 1" : "Continue with Day " + next) +
        '<small>' + esc(DAYS[next - 1].t) + '</small></span>' + ICON.right + '</a>'
      : '<span class="cta" aria-disabled="true"><span>All 30 days complete<small>Nice work.</small></span></span>';

    var list = WEEKS.map(function (w) {
      var wd = 0, rows = "";
      for (var id = w.from; id <= w.to; id++) {
        var done = isDone(id); if (done) wd++;
        var b = dayState(id).b;
        rows += '<a class="row' + (id === cur ? " active" : "") + (done ? " complete" : "") + '" href="#day-' + id + '"' + (id === cur ? ' aria-current="page"' : "") + '>' +
          '<span class="pips">' + BLOCKS.map(function (x) { return '<i class="' + (b[x.k] ? "on" : "") + '"></i>'; }).join("") + '</span>' +
          '<span class="row-n">' + id + '</span><span class="row-t">' + esc(DAYS[id - 1].t) + '</span></a>';
      }
      return '<div class="wk"><strong>Week ' + w.n + '</strong><em>' + esc(w.name) + '</em><span>' + wd + '/' + (w.to - w.from + 1) + '</span></div>' + rows;
    }).join("");

    $side.innerHTML =
      '<div class="brand">' + sunSvg(pct) +
        '<div><div class="brand-name">Daybreak</div><div class="brand-sub">React Native in 30 days</div></div>' +
        '<button class="drawer-close" id="drawerClose" aria-label="Close menu">' + ICON.close + '</button></div>' +
      '<div class="overview"><div class="plan-grid" role="navigation" aria-label="30-day map">' + cells + '</div>' +
        '<div class="stat-col">' +
          '<div class="stat"><b>' + st.done + '<span style="font-size:.9rem;color:var(--haze)">/' + TOTAL + '</span></b><span>Days done</span></div>' +
          '<div class="stat"><b>' + st.streak + '</b><span>Day streak</span></div>' +
          '<div class="stat"><b>' + st.best + '</b><span>Best streak</span></div>' +
          '<div class="stat"><b>' + hours(st.minutes) + '</b><span>Learned</span></div>' +
        '</div></div>' +
      '<div class="legend">Sessions done <i style="background:var(--cell)"></i>0 <i style="background:var(--ember-1)"></i>1 <i style="background:var(--ember-3)"></i>2 <i style="background:var(--gold)"></i>3</div>' +
      cta + list +
      '<div class="side-foot"><button class="ghost" data-act="export">Export backup</button><button class="ghost" data-act="import">Import</button><button class="ghost danger" data-act="reset">Reset all</button></div>' +
      (storageOK ? "" : '<p class="warn">Your browser is blocking localStorage, so progress won\'t be saved after you close this tab.</p>');
  }

  function renderTopbar(st) {
    var chips = DAYS.map(function (d) {
      return '<a class="chip l' + lvl(blocksDone(d.id)) + (d.id === cur ? " here" : "") + '" href="#day-' + d.id + '" aria-label="Day ' + d.id + '">' + d.id + '</a>';
    }).join("");
    $top.innerHTML = '<button class="menu-btn" id="menuBtn" aria-label="Open menu">' + ICON.menu + '<span>' + st.done + '/' + TOTAL + '</span></button><div class="chips" id="chips">' + chips + '</div>';
  }

  function sessionHTML(b, day, ds) {
    var done = !!ds.b[b.k];
    var body = "";

    if (b.k === "watch") {
      if (!day.v.length && !day.d.length) {
        body = '<p class="empty-note">' + BUFFER_NOTE + '</p>';
      } else {
        body = '<div class="stack">';
        day.v.forEach(function (v) {
          body += '<a class="vid" href="' + ytUrl(v[0]) + '" target="_blank" rel="noopener noreferrer">' +
            '<div class="thumb"><img src="' + ytThumb(v[0]) + '" alt="" loading="lazy"><div class="play"><span>' + ICON.play + '</span></div></div>' +
            '<div><div class="vid-title">' + esc(v[1]) + '</div>' +
            (v[2] ? '<div class="vid-meta">' + esc(v[2]) + '</div>' : "") +
            '<div class="vid-url"><span class="host">youtube.com/</span>watch?v=' + esc(v[0]) + '</div></div></a>';
        });
        day.d.forEach(function (d) {
          body += '<a class="doc" href="' + esc(d[1]) + '" target="_blank" rel="noopener noreferrer">' + ICON.ext + '<span>' + esc(d[0]) + '</span><span class="dm">docs</span></a>';
        });
        body += '</div>';
      }
    } else if (b.k === "build") {
      body = '<p class="s-text">' + esc(day.b) + '</p>';
    } else {
      body = '<ol class="qs"><li>' + esc(day.q) + '</li>' +
        '<li>What\'s the closest web or Next.js equivalent, and where does the analogy break?</li>' +
        '<li>Commit your work. Write down what\'s still fuzzy, but don\'t fix it now.</li></ol>' +
        '<label class="sr" for="note">Your notes for Day ' + day.id + '</label>' +
        '<textarea class="note" id="note" placeholder="Notes for future you (optional). Saved on this device.">' + esc(ds.note) + '</textarea>';
    }

    return '<section class="session ' + b.k + (done ? " done" : "") + '">' +
      '<div class="s-head"><span class="s-kind">' + b.label + '</span><span class="s-time">' + b.min + ' min</span><span class="spacer"></span>' +
      '<button class="toggle" data-toggle="' + b.k + '" aria-pressed="' + done + '"><span class="box">' + ICON.check + '</span>' +
      '<span>' + (done ? "Done" : "Mark done") + '</span><kbd>' + b.key + '</kbd></button></div>' + body + '</section>';
  }

  function renderDay() {
    var day = DAYS[cur - 1], ds = dayState(cur), n = blocksDone(cur), full = n === 3;
    var wk = weekOf(cur);
    var prev = cur > 1 ? DAYS[cur - 2] : null, nxt = cur < TOTAL ? DAYS[cur] : null;
    var upNext = nextUnfinished();

    var banner = '<div class="banner' + (full ? " show" : "") + '"><span>Day ' + cur + ' complete.</span><span class="sp"></span>' +
      (upNext ? '<a href="#day-' + upNext + '">Next up: Day ' + upNext + '</a>' : '<span>That\'s all 30 days.</span>') + '</div>';

    $day.innerHTML =
      '<div class="crumbs"><span>Week ' + wk.n + ' · ' + esc(wk.name) + '</span><span class="sp"></span>' +
        '<a class="navbtn" href="#day-' + (cur - 1) + '" aria-label="Previous day"' + (prev ? "" : ' aria-disabled="true" tabindex="-1"') + '>' + ICON.left + '</a>' +
        '<a class="navbtn" href="#day-' + (cur + 1) + '" aria-label="Next day"' + (nxt ? "" : ' aria-disabled="true" tabindex="-1"') + '>' + ICON.right + '</a></div>' +
      '<div class="hero"><div class="numeral' + (full ? " full" : "") + (popId === cur ? " pop" : "") + '" style="--fill:' + Math.round(n / 3 * 100) + '%" aria-hidden="true">' + cur + '</div>' +
        '<div><h1><span class="sr">Day ' + cur + ': </span>' + esc(day.t) + '</h1><p>2 hours · 45 watch &nbsp;+&nbsp; 60 build &nbsp;+&nbsp; 15 review</p></div></div>' +
      '<div class="segbar" aria-hidden="true">' + BLOCKS.map(function (x) { return '<i class="' + (ds.b[x.k] ? "on" : "") + '"></i>'; }).join("") + '</div>' +
      '<div class="timeline">' + BLOCKS.map(function (b) { return sessionHTML(b, day, ds); }).join("") + '</div>' +
      banner +
      '<div class="pager">' +
        (prev ? '<a class="pg" href="#day-' + prev.id + '"><small>← Day ' + prev.id + '</small><b>' + esc(prev.t) + '</b></a>' : '<span class="pg" aria-disabled="true"></span>') +
        (nxt ? '<a class="pg next-pg" href="#day-' + nxt.id + '"><small>Day ' + nxt.id + ' →</small><b>' + esc(nxt.t) + '</b></a>' : '<span class="pg" aria-disabled="true"></span>') +
      '</div>' +
      '<p class="hint"><kbd>←</kbd><kbd>→</kbd> switch day &nbsp; <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> toggle sessions &nbsp; <kbd>N</kbd> next unfinished</p>';
  }

  function renderActivity(st) {
    var WEEKS_N = 30;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var end = new Date(today); end.setDate(end.getDate() + (6 - end.getDay()));
    var start = new Date(end); start.setDate(start.getDate() - (WEEKS_N * 7 - 1));
    var tk = keyOf(today), cells = "", names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var labels = [], c = new Date(start), prevM = -1;
    for (var w0 = 0; w0 < WEEKS_N; w0++) {
      var m0 = c.getMonth();
      labels.push(m0 !== prevM ? names[m0] : "");
      prevM = m0;
      c.setDate(c.getDate() + 7);
    }
    // Drop a first-column label that would collide with the next month's label
    if (labels[0]) { for (var j = 1; j < 3; j++) if (labels[j]) { labels[0] = ""; break; } }
    var months = labels.map(function (l) { return "<span>" + l + "</span>"; }).join("");

    c = new Date(start);
    for (var w = 0; w < WEEKS_N; w++) {
      for (var d = 0; d < 7; d++) {
        var k = keyOf(c), n = st.counts[k] || 0;
        if (c > today) cells += '<div class="hc fut"></div>';
        else cells += '<div class="hc' + (n ? " h" + Math.min(n, 4) : "") + (k === tk ? " today" : "") + '" title="' + k + ' · ' + n + (n === 1 ? " session" : " sessions") + '"></div>';
        c.setDate(c.getDate() + 1);
      }
    }
    $act.innerHTML = '<section class="activity"><h2>Activity</h2><p>Every session you tick lights up the day you did it. Darker means more sessions that day.</p>' +
      '<div class="heat-scroll"><div class="heat"><div class="heat-days"><span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span></div>' +
      '<div><div class="heat-months">' + months + '</div><div class="heat-cells">' + cells + '</div></div></div></div>' +
      '<div class="heat-legend">Less <span class="hc"></span><span class="hc h1"></span><span class="hc h2"></span><span class="hc h3"></span><span class="hc h4"></span> More</div></section>';
    var sc = $act.querySelector(".heat-scroll");
    if (sc) sc.scrollLeft = sc.scrollWidth; // show the most recent weeks first on narrow screens
  }

  function render() {
    var ae = document.activeElement, tog = ae && ae.getAttribute ? ae.getAttribute("data-toggle") : null;
    var st = computeStats();
    var p = st.done / TOTAL;
    document.documentElement.style.setProperty("--glow", (0.12 + 0.3 * p).toFixed(3));
    document.title = "Day " + cur + " · Daybreak";
    renderSidebar(st);
    renderTopbar(st);
    renderDay();
    renderActivity(st);
    if (tog) { var el = document.querySelector('[data-toggle="' + tog + '"]'); if (el) el.focus({ preventScroll: true }); }
    popId = null;
  }

  /* =========================================================
     NAVIGATION
     ========================================================= */
  function clamp(n) { return Math.max(1, Math.min(TOTAL, n)); }

  function parseHash() {
    var m = /^#day-(\d+)$/.exec(location.hash);
    return m ? clamp(parseInt(m[1], 10)) : null;
  }

  // Switch days directly. The URL hash is a nice-to-have (deep links, back button);
  // sandboxed previews (e.g. inside Claude) forbid history changes, so it must never be required.
  function go(id) {
    id = clamp(id);
    if (id === cur) { closeDrawer(); window.scrollTo(0, 0); return; }
    try { history.pushState(null, "", "#day-" + id); } catch (e) { /* no URL updates in sandboxed previews */ }
    show(id);
  }

  function sync() {
    var id = parseHash();
    if (id && id !== cur) show(id);
  }

  function show(id) {
    cur = id;
    state.last = id;
    save();
    render();
    closeDrawer();
    window.scrollTo(0, 0);
    var row = $side.querySelector(".row.active");
    if (row) row.scrollIntoView({ block: "nearest" });
    var chip = document.querySelector(".chip.here");
    if (chip && chip.scrollIntoView) chip.scrollIntoView({ inline: "center", block: "nearest" });
  }

  function openDrawer() { $sidebar.classList.add("open"); $scrim.classList.add("show"); }
  function closeDrawer() { $sidebar.classList.remove("open"); $scrim.classList.remove("show"); }

  window.addEventListener("hashchange", sync);
  window.addEventListener("popstate", sync);

  /* =========================================================
     ACTIONS
     ========================================================= */
  function toggle(k) {
    var ds = dayState(cur), was = isDone(cur);
    ds.b[k] = ds.b[k] ? null : todayKey();
    save();
    popId = (!was && isDone(cur)) ? cur : null;
    render();
  }

  document.addEventListener("click", function (e) {
    // Day links: handle in JS so they work even where fragment navigation is blocked or rewritten.
    var nav = e.target.closest('a[href^="#day-"]');
    if (nav) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let "open in new tab" work
      e.preventDefault();
      go(parseInt(nav.getAttribute("href").slice(5), 10));
      return;
    }

    var t = e.target.closest("[data-toggle]");
    if (t) { toggle(t.getAttribute("data-toggle")); return; }

    if (e.target.closest("#menuBtn")) { openDrawer(); return; }
    if (e.target.closest("#drawerClose") || e.target === $scrim) { closeDrawer(); return; }

    var a = e.target.closest("[data-act]");
    if (!a) return;
    var act = a.getAttribute("data-act");
    if (act === "export") {
      var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "daybreak-progress-" + todayKey() + ".json";
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(function () { URL.revokeObjectURL(link.href); }, 2000);
    } else if (act === "import") {
      document.getElementById("importFile").click();
    } else if (act === "reset") {
      if (confirm("Reset all progress and notes? This can't be undone. Tip: use Export backup first.")) {
        state = blank(); save(); render();
      }
    }
  });

  document.getElementById("importFile").addEventListener("change", function (e) {
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var obj = JSON.parse(r.result);
        if (!obj || typeof obj.days !== "object") throw new Error("bad file");
        state = obj; save(); render();
      } catch (err) { alert("That file isn't a Daybreak backup, so nothing was changed."); }
    };
    r.readAsText(f);
    e.target.value = "";
  });

  document.addEventListener("input", function (e) {
    if (e.target && e.target.id === "note") { dayState(cur).note = e.target.value; save(); }
  });

  // Thumbnails that fail to load fall back to the gradient tile.
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (img && img.tagName === "IMG" && img.closest(".thumb")) img.closest(".thumb").classList.add("broken");
  }, true);

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === "TEXTAREA" || t.tagName === "INPUT" || t.isContentEditable)) return;
    var k = e.key;
    if (k === "ArrowLeft") { go(cur - 1); e.preventDefault(); }
    else if (k === "ArrowRight") { go(cur + 1); e.preventDefault(); }
    else if (k === "1" || k === "2" || k === "3") { toggle(BLOCKS[+k - 1].k); }
    else if (k === "n" || k === "N") { var nx = nextUnfinished(); if (nx) go(nx); }
    else if (k === "Escape") { closeDrawer(); }
  });

  /* =========================================================
     BOOT
     ========================================================= */
  (function boot() {
    var fromHash = parseHash();
    var start = fromHash || nextUnfinished() || clamp(state.last || 1);
    if (!fromHash) { try { history.replaceState(null, "", "#day-" + start); } catch (e) { /* sandboxed preview */ } }
    show(start);
  })();
})();

