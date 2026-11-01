(function () {
  "use strict";

  /* =========================================================
     DATA
     Every video below uses an exact watch URL:
     https://www.youtube.com/watch?v=<ID>
     ========================================================= */
  var BLOCKS = [
    { k: "watch", label: "Watch & read", min: 45, key: "1" },
    { k: "build", label: "Build", min: 60, key: "2" },
    { k: "review", label: "Review", min: 15, key: "3" }
  ];

  var WEEKS = [
    { n: 1, from: 1, to: 7, name: "What is mobile development?" },
    { n: 2, from: 8, to: 14, name: "Set up and first screens" },
    { n: 3, from: 15, to: 21, name: "Styling, lists and TypeScript" },
    { n: 4, from: 22, to: 28, name: "Navigation with Expo Router" },
    { n: 5, from: 29, to: 35, name: "Forms, state and gestures" },
    { n: 6, from: 36, to: 42, name: "Data and backend" },
    { n: 7, from: 43, to: 49, name: "Device features" },
    { n: 8, from: 50, to: 56, name: "Quality and capstone" },
    { n: 9, from: 57, to: 60, name: "Ship it" }
  ];

  var BUFFER_NOTE = "No new material today. Use this time to finish what's unfinished, or re-watch the one video you understood least this week.";

  // t: title  s: plain-words summary  w: coming-from-web bridge  k: [term, meaning] pairs
  // v: [youtubeId, title, note?]  d: [label, url]  b: build task  bl: optional label for the build session  q: review question
  var DAYS = [
    /* ===================== WEEK 1: What is mobile development? ===================== */
    {
      t: "What is mobile app development?",
      intro: "Each day is 2 hours: 45 minutes watching and reading, 60 minutes doing, 15 minutes reviewing. Tick each session when it's done. Week 1 has almost no code on purpose. It's the map that makes everything later make sense, so don't skip it.",
      s: "A mobile app is software installed on a phone that can use the phone's screen, sensors and internet connection. Mobile app development is the work of designing, building and publishing those apps for iOS and Android.",
      w: "On the web you deploy a site that a browser opens. On mobile you ship an installable app through a store, and the phone's operating system runs it.",
      k: [["Mobile app", "Software installed on a phone or tablet, rather than opened in a browser tab."],
      ["Operating system (OS)", "The software that runs the phone: iOS on iPhones, Android on most other phones."],
      ["App store", "Where people find and install apps: Apple's App Store and Google Play."]],
      v: [["QIp3JNt1vpU", "Mobile App Development Explained"],
      ["oPNcTN2l21g", "Everything about mobile application development in 2023"]],
      d: [["React Native: Introduction", "https://reactnative.dev/docs/getting-started"]],
      bl: "Write it down",
      b: "No coding today. In a notes file, answer in your own words: What is a mobile app? How is it different from a website? Then name 5 apps on your phone and guess which feel like real apps and which feel like websites.",
      q: "Could you explain mobile app development to a friend in two sentences?"
    },

    {
      t: "iOS and Android: two platforms",
      s: "Almost every phone runs iOS (Apple) or Android (Google). They use different languages, tools, design rules and stores, but users expect the same kinds of apps on both.",
      w: "Picture two browsers with very different engines, except each one also has its own store, its own review process and its own design culture.",
      k: [["Swift", "Apple's language for building native iOS apps."],
      ["Kotlin", "Google's preferred language for native Android apps."],
      ["SDK", "A kit of tools and libraries for building apps on a platform."]],
      v: [["5kQeA8nQiRc", "Every iOS/Android Difference Explained in 9 Minutes"],
      ["g096C487Lws", "Android vs iOS Development: Key Differences"]],
      d: [["Apple Human Interface Guidelines", "https://developer.apple.com/design/human-interface-guidelines/"],
      ["Material Design 3 (Android)", "https://m3.material.io/"]],
      bl: "Write it down",
      b: "Make a two-column comparison of iOS vs Android: language, editor, store, fee to publish, how back navigation works, typical screen sizes. Then open one app you use on both platforms (or look up screenshots) and note two differences.",
      q: "Which difference between iOS and Android will matter most for the app you want to build?"
    },

    {
      t: "Native, cross-platform, hybrid or web?",
      s: "There are four ways to build an app: fully native (separate Swift and Kotlin apps), cross-platform (one codebase, real native UI), hybrid (a web page inside a native wrapper), or a web app / PWA. Each trades off speed, cost, polish and access to phone features.",
      w: "React Native lets you reuse the React skills you already have, but it draws real native views instead of HTML.",
      k: [["Cross-platform", "One codebase that runs on both iOS and Android."],
      ["Hybrid app", "A web app wrapped in a native shell. It runs inside a WebView."],
      ["PWA", "A website that can be installed and work offline, but isn't in the app stores by default."]],
      v: [["l6nmo08rbaI", "The differences between native and cross-platform apps"],
      ["EAj9VaZ91jU", "Native vs. Cross-Platform: What's Better For Mobile App"],
      ["pYV9FicfRgY", "Whats the difference between native, web, and hybrid mobile apps?"]],
      d: [],
      bl: "Write it down",
      b: "Fill a table with the four approaches: how it's built, speed, access to phone features, cost, best for. Then write which approach you'd pick for (a) a banking app, (b) a 3D game, (c) a small business booking app, and why.",
      q: "Why would a web developer choose React Native for a first mobile app?"
    },

    {
      t: "How React Native actually works",
      s: "Your JavaScript runs in an engine on the phone. React Native turns the components you write into real native views, the same buttons and lists a Swift or Kotlin app would use. It is not a web page in disguise.",
      w: "On the web, React builds a DOM. In React Native, React builds a tree of native views. The React part (components, props, state, hooks) is identical.",
      k: [["JavaScript engine (Hermes)", "The program on the phone that runs your JavaScript."],
      ["Native view", "A real iOS or Android UI element, like a text label or a scrolling list."],
      ["New Architecture", "React Native's modern design that lets JavaScript and native code talk to each other directly and quickly."]],
      v: [["qzaK3ke2PE0", "How React Native Works: From the Old Bridge to the New JSI"],
      ["dwFig4LwDhI", "A deep dive into the working of React Native"]],
      d: [["React Native: Architecture overview", "https://reactnative.dev/architecture/overview"]],
      bl: "Write it down",
      b: "Draw the chain from memory: your component, then React, then React Native, then a native view on the screen. Next to it draw the web chain: component, React DOM, browser DOM. Mark what is the same and what is different.",
      q: "What is one thing from your web React knowledge that carries over unchanged, and one thing that doesn't?"
    },

    {
      t: "What good mobile design looks like",
      s: "Phones are used with thumbs, on the move, on small screens. Good mobile apps have big tap targets, clear navigation (tabs, stacks, sheets) and follow each platform's conventions.",
      w: "There's no hover, no mouse precision and no URL bar. Navigation structure and touch size replace links and click targets.",
      k: [["Touch target", "The tappable area of a control. Aim for at least about 44 by 44 points."],
      ["Safe area", "The part of the screen not covered by the notch, status bar or home indicator."],
      ["Gesture", "A touch action such as tap, swipe, long-press or pinch."]],
      v: [["Gfsd8NNuD9g", "Everything you need to know about Mobile App UI's in 8 minutes (beginner friendly)"],
      ["mbj6hx4itkM", "Mobile UI Design Principles and Best Practices: Tappability Affordances"],
      ["rMwAL3n3h5Y", "Material Design vs Human Interface Guidelines"]],
      d: [["Apple Human Interface Guidelines", "https://developer.apple.com/design/human-interface-guidelines/"],
      ["Material Design 3", "https://m3.material.io/"]],
      bl: "Write it down",
      b: "Open 3 apps you love. For each, screenshot the main screen and write down: the main navigation pattern (tabs, stack or drawer), the smallest tap target you can find, and one gesture it uses.",
      q: "What would make your first app feel native instead of like a website?"
    },

    {
      t: "From code to a phone: builds and stores",
      s: "Your code is bundled and compiled into an installable file: an APK or AAB for Android, an IPA for iOS. The file is signed, uploaded to a store, reviewed, and only then can people download it.",
      w: "Deploying a website is a git push. Shipping an app involves builds, signing keys, store accounts and a review queue.",
      k: [["Build", "Turning your source code into an installable app file."],
      ["APK / AAB / IPA", "App file formats. APK and AAB are for Android (Google Play wants AAB), IPA is for iOS."],
      ["Code signing", "Proving an app really came from you, using a certificate or key."]],
      v: [["1o0pEjYGUWM", "How React Native Builds Actually Work (APK, AAB, IPA, APP)"],
      ["Bvti5_1eMj8", "APK vs AAB Explained: What's the Future of Android Apps in 2025"]],
      d: [["Apple App Store Review Guidelines", "https://developer.apple.com/app-store/review/guidelines/"],
      ["Google Play Console Help", "https://support.google.com/googleplay/android-developer/"]],
      bl: "Write it down",
      b: "Make a one-page journey diagram: write code, build, sign, upload, review, release, update. Add the costs: Google Play is a $25 one-time fee, the Apple Developer Program is $99 a year.",
      q: "Which step of that journey is completely new to you as a web developer?"
    },

    {
      t: "Meet the tools: Expo, Metro and EAS",
      s: "Expo is a toolkit built on React Native that handles setup, building and shipping. You'll preview apps on your phone with Expo Go, Metro bundles your code, and EAS builds and submits it.",
      w: "Expo is to React Native what Next.js is to React: a framework that makes the sensible choices for you.",
      k: [["Expo", "A framework and set of tools for building React Native apps, recommended by the React Native team."],
      ["Expo Go", "A phone app that runs your project instantly while you develop."],
      ["Metro", "The bundler that packages your JavaScript for the phone, like Webpack for the web."],
      ["EAS", "Expo Application Services: cloud builds, store submission and updates."]],
      v: [["vFW_TxKLyrE", "Expo in 100 Seconds"],
      ["LqiQWscrTTM", "React Native CLI vs Expo [2025]"],
      ["whXE9h1dwdo", "Expo React Native Concepts & Terms To Master in 2025 & 2026 - Part 1"]],
      d: [["Expo: Introduction", "https://docs.expo.dev/get-started/introduction/"]],
      bl: "Write it down",
      b: "Write your own glossary of the 15 or so terms from this week (Expo, Metro, SDK, APK, AAB, IPA, native view, and so on), one line each, in your own words. Then check yourself against the key-term cards from each day.",
      q: "Can you explain the difference between Expo, Expo Go and EAS without looking?"
    },

    /* ===================== WEEK 2: Set up and first screens ===================== */
    {
      t: "Set up your computer",
      s: "Install the few things every React Native project needs: Node.js, a code editor, Git, and Expo Go on your phone. You don't need Android Studio or Xcode yet.",
      w: "If you've built Next.js apps you already have Node and a code editor. The only new thing is Expo Go on your phone.",
      k: [["Node.js", "The JavaScript runtime that runs your tools, like npm, Metro and the Expo CLI."],
      ["Terminal", "The text window where you run commands such as npx create-expo-app."]],
      v: [["h_4z0TnUVvg", "React Native Expo Setup on Mac and Windows 2026 (Complete Expo Guide)"],
      ["woSDCMxRqts", "Setting up your Development Environment - React Native (Expo) for Beginners #1"]],
      d: [["Expo: Set up your environment", "https://docs.expo.dev/get-started/set-up-your-environment/"],
      ["Expo Go (install on your phone)", "https://expo.dev/go"],
      ["Create a free Expo account", "https://expo.dev/signup"]],
      b: "Install Node (the LTS version), VS Code and Git. Create a free Expo account. Install Expo Go on your phone and sign in. Run node -v and npm -v in a terminal and note the versions.",
      q: "What did you install today, and what does each tool do?"
    },

    {
      t: "Create and run your first app",
      s: "One command creates a working app. You scan a QR code with your phone and the app opens in Expo Go. Edit a file, save, and the phone updates within a second.",
      w: "It's the same dev loop as next dev: save and see the change. The difference is that it happens on a real device.",
      k: [["Fast Refresh", "Your changes appear on the phone instantly, without restarting the app."],
      ["Dev server", "The process started by npx expo start that serves your app to the phone."]],
      v: [["XCifkDC0yXA", "React Native Crash Course 2026 - Build a Complete Mobile App", "Traversy Media"],
      ["J2j1yk-34OY", "Complete React Native Tutorial #1 - Introduction & Setup (Expo)"]],
      d: [["Expo: Create a project", "https://docs.expo.dev/get-started/create-a-project/"]],
      b: "Run npx create-expo-app@latest my-first-app, then npx expo start. Scan the QR code with your phone, then change a line of text and watch the phone update. Your phone and computer need to be on the same Wi-Fi.",
      q: "What happened on your phone when you saved a file?"
    },

    {
      t: "A tour of your project",
      s: "A new Expo project has a handful of important files: app/ holds your screens, package.json lists your packages, app.json holds the app's name and icon settings, and assets/ holds images and fonts. Knowing where things live saves hours.",
      w: "app/ works like the Next.js app directory. app.json is a bit like next.config.js plus a web manifest.",
      k: [["app.json", "Config file with your app's name, icon, splash screen and platform settings."],
      ["Entry point", "The first file that runs when your app starts."]],
      v: [["BUXnASp_WyQ", "React Native for Dummies 2026 - Full Beginner Crash Course", "Code with Beto"],
      ["RdJhqaOIWn0", "React Native Full Course 2026", "watch the intro and project structure"]],
      d: [["Expo Router: Core concepts", "https://docs.expo.dev/router/basics/core-concepts/"],
      ["app.json reference", "https://docs.expo.dev/versions/latest/config/app/"]],
      b: "Open every file and folder in your project and write one line about what it does in a NOTES.md file. Then change the app name in app.json and restart the dev server.",
      q: "Which three files will you touch most often?"
    },

    {
      t: "Emulators, simulators and debugging",
      s: "Real phones are best, but an emulator (Android) or simulator (iOS) lets you test other screen sizes. You'll also learn where errors show up and how to open the React Native DevTools.",
      w: "Think of Chrome DevTools and responsive mode, but for phones.",
      k: [["Emulator", "Software that imitates an Android phone on your computer."],
      ["Simulator", "Apple's version for iPhones. It only runs on a Mac with Xcode."],
      ["console.log", "Prints a value to your terminal while the app is running."]],
      v: [["jE2R60kN1F4", "React Native Tutorial #3: Set Up Android Emulator on Windows + Run Your Expo App"],
      ["n57ij2-i58M", "React Native DevTools - Ultimate Debugging Experience!"]],
      d: [["React Native DevTools", "https://reactnative.dev/docs/react-native-devtools"],
      ["Expo: Set up your environment", "https://docs.expo.dev/get-started/set-up-your-environment/"]],
      b: "Optional but recommended: install Android Studio and run your app on an emulator (Mac users can also try the iOS Simulator). Add a console.log to your app and read it in the terminal. With the dev server running, press j in the terminal to open the DevTools.",
      q: "When something breaks, what do you check first and where do you read the error?"
    },

    {
      t: "Core components: View, Text and Image",
      s: "There are no div, span or img tags. You use View, Text and Image, and all text must live inside a Text component.",
      w: "View is roughly div, Text is p and span, Image is img. Styles are JavaScript objects, not CSS files.",
      k: [["Component", "A reusable piece of UI. The same idea as in React on the web."],
      ["StyleSheet", "React Native's way to define styles as JavaScript objects."]],
      v: [["0ce9d2XhEsY", "React Native Fundamentals: View, Text & Image Components Explained (Beginner Guide)"],
      ["_YydVvnjNFE", "React Native Tutorial #3 - Views, Text & Styles"]],
      d: [["React Native: Core components", "https://reactnative.dev/docs/intro-react-native-components"],
      ["View", "https://reactnative.dev/docs/view"],
      ["Text", "https://reactnative.dev/docs/text"]],
      b: "Build a profile card: an avatar Image, a name, a short bio and a few stats. No div tags and no CSS files. Use StyleSheet.create for the styles.",
      q: "List 5 things that behave differently from web React."
    },

    {
      t: "Touch and input: Pressable, TextInput, ScrollView",
      s: "Mobile has its own interaction components: Pressable for taps, TextInput for typing, ScrollView for anything taller than the screen, and a safe area so content avoids the notch.",
      w: "onClick becomes onPress. An input becomes TextInput with onChangeText. Scrolling needs an explicit ScrollView.",
      k: [["onPress", "The function that runs when the user taps a Pressable."],
      ["SafeAreaView", "Keeps your content out of the notch and home-indicator areas."]],
      v: [["JEYUy5uINGk", "#7 - Exploring React Native State & Props, Button, TouchableOpacity, Pressable, and ScrollView"],
      ["uL1U1EwEstI", "ScrollView Component Made Easy with React Native [In 6 Minutes]"]],
      d: [["Pressable", "https://reactnative.dev/docs/pressable"],
      ["TextInput", "https://reactnative.dev/docs/textinput"],
      ["ScrollView", "https://reactnative.dev/docs/scrollview"]],
      b: "Turn the profile card into a settings screen: a TextInput for the name, a Pressable save button that shows an alert, and the whole screen inside a ScrollView in a safe area.",
      q: "What replaces onClick, img and input in React Native?"
    },

    {
      t: "Flexbox: the only layout system",
      s: "Flexbox is the only layout system in React Native, and every View is already a flex container. Almost all layout problems are solved with a few flex properties.",
      w: "It's CSS flexbox, except flexDirection defaults to column and there is no CSS grid.",
      k: [["flexDirection", "Whether children are laid out in a column (the default) or a row."],
      ["justifyContent / alignItems", "How children are spaced along the main axis and aligned on the cross axis."]],
      v: [["Al-f0mkKEsM", "Master React Native Layouts in 5 Minutes - Flexbox Guide 2025"],
      ["ak-NFDpEiW0", "React Native Flexbox Mastery for Beginners (2025)"]],
      d: [["React Native: Layout with Flexbox", "https://reactnative.dev/docs/flexbox"]],
      b: "Recreate a header / content / footer layout and a two-column card grid using only Flexbox. No absolute positioning.",
      q: "Name the 3 biggest default differences from web Flexbox."
    },

    /* ===================== WEEK 3: Styling, lists and TypeScript ===================== */
    {
      t: "TypeScript for React Native",
      s: "TypeScript adds types to JavaScript so your editor catches mistakes before you run the app. Expo projects use it by default.",
      w: "It's the same TypeScript as in your Next.js apps. Props and hooks are typed the same way.",
      k: [["Type", "A label for what kind of value something is: a string, a number, an object shape."],
      ["Props type", "The shape of the object a component receives."]],
      v: [["H8qOotIAaEA", "TypeScript React Native Expo Tutorial"],
      ["14it9M7yyiA", "React Native & TypeScript for Beginners - Build a Pomodoro App (Day 1)"]],
      d: [["React Native: Using TypeScript", "https://reactnative.dev/docs/typescript"],
      ["Expo: TypeScript guide", "https://docs.expo.dev/guides/typescript/"]],
      b: "Add a typed props interface to your profile card and settings components. Type your useState values and a list-item type. Fix every red squiggle.",
      q: "What mistake did the types catch for you?"
    },

    {
      t: "Two platforms, dark mode, any screen",
      s: "A few styles differ between iOS and Android, like shadows. Good apps also follow the user's light or dark setting and adapt to different screen sizes.",
      w: "prefers-color-scheme becomes useColorScheme(). Media queries become useWindowDimensions(). There is no cascade.",
      k: [["Platform.OS", "Tells your code whether it's running on iOS or Android."],
      ["useColorScheme", "A hook that returns light or dark based on the phone's setting."],
      ["Elevation", "Android's way to draw shadows. iOS uses the shadow properties instead."]],
      v: [["ouuRn-QadP0", "Light & Dark Mode in React Native Expo 54, Switch Color Theme"],
      ["kGElrVghi64", "React Native Shadow Properties in 57 seconds. Make UI Awesome"]],
      d: [["Platform-specific code", "https://reactnative.dev/docs/platform-specific-code"],
      ["Expo: Color schemes", "https://docs.expo.dev/guides/color-schemes/"]],
      b: "Make your settings screen support light and dark mode with a small theme object. Add a card with a shadow that looks right on both iOS and Android.",
      q: "What did you do to keep one codebase looking right on both platforms?"
    },

    {
      t: "Styling with NativeWind (Tailwind)",
      s: "NativeWind lets you write Tailwind class names in React Native, which will feel very familiar if you've used Tailwind in Next.js.",
      w: "If you've used Tailwind on the web, className works almost the same way.",
      k: [["NativeWind", "A library that brings Tailwind CSS class names to React Native."],
      ["className", "The prop where you write Tailwind classes."]],
      v: [["UlYjRWbJogw", "How to use TailwindCSS in React Native | Nativewind | Expo"],
      ["k3CmmU5jm4Q", "NativeWind v5 Setup: Use Tailwind CSS in React Native | 2026 Guide | Part 2", "v5 setup, and Part 2 of a series"]],
      d: [["NativeWind docs", "https://www.nativewind.dev/"]],
      b: "Install NativeWind and restyle your profile card and settings screens with Tailwind classes. Use the first video for the stable setup. The second is the newer v5 setup.",
      q: "Where did className just work, and where did you fall back to style?"
    },

    {
      t: "Images, icons and fonts",
      s: "Apps feel polished through images, icons and type. Expo provides ready-made icon sets, a fast image component and a simple way to load custom fonts.",
      w: "Think next/image, an icon library and next/font, all in one toolkit.",
      k: [["expo-image", "A fast image component with caching and placeholders."],
      ["Vector icons", "Icons drawn as shapes, so they stay sharp on any screen."]],
      v: [["JLVCOV_K-KQ", "How to add expo vector icon in 4mins"],
      ["KoRen9qYhcQ", "How to Add Custom Fonts in React Native (Expo)"]],
      d: [["Expo Image", "https://docs.expo.dev/versions/latest/sdk/image/"],
      ["Expo Font", "https://docs.expo.dev/versions/latest/sdk/font/"],
      ["Icon directory", "https://icons.expo.fyi/"]],
      b: "Add icons to your settings rows, show a remote picture with expo-image, and load one custom Google Font across the app.",
      q: "Which font or icon choice made the screen look noticeably better?"
    },

    {
      t: "Lists I: FlatList",
      s: "Long lists are everywhere on mobile. FlatList only draws the rows that are on screen, so it stays smooth even with thousands of items.",
      w: "Never .map() a long array into a ScrollView. FlatList is a built-in virtualized list.",
      k: [["Virtualization", "Rendering only the items currently visible on screen."],
      ["keyExtractor", "Tells FlatList how to give each row a stable, unique key."]],
      v: [["lDu607AC_V0", "React Native Tutorial #8 FlatList - Fetching Data From API"],
      ["1YhCVDNicWA", "Optimizing Large Lists in React Native with List Components"]],
      d: [["React Native: FlatList", "https://reactnative.dev/docs/flatlist"]],
      b: "Render 50+ mock people with FlatList, each row an avatar, a name and a subtitle. Add a header and a separator between rows.",
      q: "Why shouldn't you .map() a long array into a ScrollView?"
    },

    {
      t: "Lists II: FlashList, refresh, empty states",
      s: "FlashList is a faster drop-in replacement for FlatList. Real lists also need pull-to-refresh and a friendly message when there's nothing to show.",
      w: "Pull-to-refresh is a mobile habit with no real web equivalent.",
      k: [["FlashList", "Shopify's faster list component that recycles rows."],
      ["RefreshControl", "The pull-down-to-refresh spinner for lists."]],
      v: [["514Gds-jLMY", "Creating Performant Lists in Your Expo React Native Apps using Shopify Flash List"],
      ["SitSOHyvBuE", "React Native Tutorial #14 Pull to Refresh with FlatList"]],
      d: [["FlashList docs", "https://shopify.github.io/flash-list/"],
      ["RefreshControl", "https://reactnative.dev/docs/refreshcontrol"],
      ["SectionList", "https://reactnative.dev/docs/sectionlist"]],
      b: "Swap your FlatList for FlashList. Add pull-to-refresh and an empty-state message for when the list has no items.",
      q: "What does an empty list need to tell the user?"
    },

    {
      t: "Mini project: three screens, no router",
      s: "Time to put three weeks together. You'll build a small app with Home, Detail and Settings screens, switching between them with plain state, so next week's router will make sense.",
      k: [["Capstone", "The final project you'll build and ship using everything in this plan."]],
      v: [["J50gwzwLvAk", "React Native Full Course 2025 | Become a React Native Pro in 4 Hours", "PedroTech. Optional build-along if you get stuck"]],
      d: [],
      b: "Build Home / Detail / Settings and switch between them with state. Pick your capstone idea today (habit tracker, notes with photos, small social feed, or a shop with a cart) and write a one-paragraph spec for it.",
      q: "What already feels awkward about switching screens by hand?"
    },

    /* ===================== WEEK 4: Navigation with Expo Router ===================== */
    {
      t: "Expo Router: Next.js in your pocket",
      s: "Expo Router builds your navigation from your file structure: a file in app/ becomes a screen. If you know the Next.js App Router, you already know the idea.",
      w: "layout.tsx becomes _layout.tsx, page.tsx becomes index.tsx, and [id] folders work the same way.",
      k: [["Route", "A screen that can be navigated to, created by adding a file in app/."],
      ["_layout.tsx", "A file that wraps the screens in its folder, setting up a stack or tabs."]],
      v: [["Yh6Qlg2CYwQ", "Introduction to Expo Router Layout Files"],
      ["ZG6GngLP3qo", "Introduction To Expo Router with Stack & Tab Navigator"]],
      d: [["Expo Router: Introduction", "https://docs.expo.dev/router/introduction/"],
      ["Expo Router: Core concepts", "https://docs.expo.dev/router/basics/core-concepts/"]],
      b: "Convert your Day 21 app to file-based routing: app/index.tsx, app/detail.tsx and app/_layout.tsx.",
      q: "Map layout.tsx and page.tsx from the Next.js App Router to their Expo Router equivalents."
    },

    {
      t: "Stack navigation and headers",
      s: "A stack is a pile of screens: pushing adds one on top, going back removes it. It's the most common way to move through an app, and it comes with a header and a back button.",
      w: "It's like the browser's history, but the app manages it and draws the back button for you.",
      k: [["Stack", "A navigation style where new screens are pushed on top and removed on back."],
      ["Screen options", "Settings for a screen such as its title or whether the header is shown."]],
      v: [["izZv6a99Roo", "Using a Stack Navigator with Expo Router"],
      ["4qVLgaRHPaw", "File Based Routing | Expo Router Tutorial", "Code with Beto"]],
      d: [["Expo Router: Stack", "https://docs.expo.dev/router/advanced/stack/"]],
      b: "Make a list screen that pushes a detail screen. Give each screen a title and customize the header. Move between them with Link and with router.push().",
      q: "When would you use Link and when would you use router.push()?"
    },

    {
      t: "Tab navigation",
      s: "Tabs are the main sections of an app along the bottom of the screen. Each tab can hold its own stack of screens.",
      w: "Think of a site's top nav, moved to the bottom where thumbs reach.",
      k: [["Tab bar", "The row of main sections at the bottom of the screen."],
      ["Route group", "A folder named with parentheses, like (tabs), that organizes routes without changing the URL."]],
      v: [["BElPB4Ai3j0", "Using a Tab Navigator with Expo Router"],
      ["_XGlN4jvIaA", "Expo Router iOS 26 Tutorial: Native Tabs, Toolbars, Zoom Transitions (SDK 55)", "newer native tabs"]],
      d: [["Expo Router: Tabs", "https://docs.expo.dev/router/advanced/tabs/"]],
      b: "Add a (tabs) group with Home / Profile / Settings and give each tab an icon. Put a stack screen on top of the tabs.",
      q: "What do the parentheses in (tabs) actually do?"
    },

    {
      t: "Dynamic routes and params",
      s: "A dynamic route is one file that serves many pages, like a product detail screen for any product id. You pass a value in the link and read it in the screen.",
      w: "Same as [id].tsx in Next.js. You read it with useLocalSearchParams instead of useParams.",
      k: [["Dynamic route", "A route with a variable part, written like [id].tsx."],
      ["Params", "The values passed to a screen through its link."]],
      v: [["FUpvQQzBJmU", "Dynamic File-based Routing in React Native with Expo Router"],
      ["T8x5Lr5Sd_s", "React Native Navigation with expo-router // Tabs / Stack / useRouter / params / naming conventions"]],
      d: [["Expo Router: Dynamic routes", "https://docs.expo.dev/router/basics/notation/"]],
      b: "Create app/product/[id].tsx, navigate to it from your list with a param, and show that item's data in the screen.",
      q: "What is identical to Next.js [id].tsx, and what is different?"
    },

    {
      t: "Layouts, route groups and modals",
      s: "Layouts wrap groups of screens, route groups organize them, and modals slide a screen up over the current one. Together they let you structure a real app.",
      w: "Nested layouts work like nested layout.tsx files in Next.js. A modal is a route that presents over the page below.",
      k: [["Modal", "A screen that slides up over the current one, usually for a quick task."],
      ["Nested layout", "A layout inside another layout, for sections that need their own navigation."]],
      v: [["gNzuJVRmyDk", "Using Modals with Expo Router"],
      ["IhzrgITqOWE", "Build EVERY Layout with Expo Router"]],
      d: [["Expo Router: Modals", "https://docs.expo.dev/router/advanced/modals/"]],
      b: "Add an Add item modal route that opens from a button, and make the home tab list update after you add something.",
      q: "When is a modal route better than a normal pushed screen?"
    },

    {
      t: "Protected routes and deep links",
      s: "Some screens should only be visible to signed-in users, and some should open from a link outside the app. Expo Router handles both through redirects and links.",
      w: "Like Next.js middleware for auth, and like normal URLs that open the right page. On mobile they're called deep links.",
      k: [["Protected route", "A screen only shown when a condition (like being signed in) is true."],
      ["Deep link", "A link that opens a specific screen inside your app."]],
      v: [["tAQvsjwnaW8", "Protecting routes in React Native Expo Router"],
      ["LEi6CKHiQA4", "How to Protect Pages in Expo Router (with Auth Guard)"],
      ["fw3mx9V3y64", "Deep Linking"]],
      d: [["Expo Router: Authentication", "https://docs.expo.dev/router/advanced/authentication/"],
      ["Expo: Linking overview", "https://docs.expo.dev/linking/overview/"]],
      b: "Add a fake sign-in screen with a simple isSignedIn flag. Redirect signed-out users to it, and send signed-in users to the tabs.",
      q: "Where in your app does the sign-in check live, and why there?"
    },

    {
      t: "Mini project: a full navigation flow",
      s: "Combine everything from the week: tabs, a stack, a dynamic detail screen, a modal and a protected sign-in flow, in one small app.",
      v: [["HmbBzw0rF6w", "Expo Router: Tabs, Stacks, Deep Linking Fix", "reference if you get stuck"]],
      d: [],
      b: "Build a small app (notes, shop or your capstone) with sign-in, tabs, a list, a dynamic detail screen and an add modal. Keep the data fake for now.",
      q: "What felt exactly like Next.js, and what felt new?"
    },

    /* ===================== WEEK 5: Forms, state and gestures ===================== */
    {
      t: "Forms and the keyboard",
      s: "On mobile the on-screen keyboard covers half the screen. Good forms move out of its way, show the right keyboard type, and let people move from field to field.",
      w: "There's no browser to handle this for you, so you have to design for the keyboard yourself.",
      k: [["KeyboardAvoidingView", "A wrapper that moves content up so the keyboard doesn't cover it."],
      ["keyboardType", "Chooses which keyboard appears, such as email or number."]],
      v: [["uL4lPYzhNK0", "React Native KeyboardAvoidingView Tutorial"],
      ["JmThlYvLYhQ", "How to Build a Keyboard-Avoiding View in React Native + Expo"]],
      d: [["TextInput", "https://reactnative.dev/docs/textinput"],
      ["KeyboardAvoidingView", "https://reactnative.dev/docs/keyboardavoidingview"]],
      b: "Build a signup form with name, email and password. Stop the keyboard covering inputs, set the right keyboard types, and dismiss the keyboard on tap outside. Test on your real phone.",
      q: "Which keyboard bug bit you today?"
    },

    {
      t: "Form validation",
      s: "Forms need rules (a valid email, a minimum password length) and clear error messages. react-hook-form manages the form, and zod describes the rules.",
      w: "It's the same react-hook-form and zod you may already use on the web, with Controller wrapping each TextInput.",
      k: [["Validation", "Checking that what the user typed is acceptable before using it."],
      ["Schema", "A description of what valid data looks like, written with zod."]],
      v: [["yCSYKd1q4iY", "React Native Expo #10: React Hook Form & Yup", "Yup instead of zod, same idea"],
      ["tY-RuiKE4Bc", "Form Validation with Zod and React Hook Form"]],
      d: [["React Hook Form", "https://react-hook-form.com/"],
      ["Zod", "https://zod.dev/"]],
      b: "Add validation to your signup form with react-hook-form and zod. Show an error under each invalid field and disable the button until the form is valid.",
      q: "Where should validation errors appear on a small screen, and why?"
    },

    {
      t: "Global state with Zustand",
      s: "When many screens need the same data (the signed-in user, a cart, a theme), you keep it in one shared store. Zustand is the simplest way to do that.",
      w: "Zustand is the same library on web and mobile. It's a lighter alternative to Redux or deep Context trees.",
      k: [["Store", "One shared place where app-wide data lives."],
      ["Hook", "A function like useStore that lets a component read or change the shared data."]],
      v: [["U2Hg-MAAz_M", "Zustand - Complete Tutorial for Beginners in React Native"],
      ["fvtxgwa5NJA", "Global State Management with Zustand in React Native | DEVember Day 17"]],
      d: [["Zustand on GitHub", "https://github.com/pmndrs/zustand"]],
      b: "Replace prop drilling or Context in your app with a Zustand store (cart, session or theme).",
      q: "Why is Zustand a better default for React Native than Redux?"
    },

    {
      t: "Saving data on the device",
      s: "Phones can store data that survives closing the app. Use AsyncStorage for ordinary data and SecureStore for secrets like login tokens.",
      w: "Like localStorage, but async. Secrets go in the phone's secure keychain instead of anything a user can inspect.",
      k: [["AsyncStorage", "Simple key-value storage that persists on the device."],
      ["SecureStore", "Encrypted storage for sensitive values like tokens."],
      ["Persist middleware", "A Zustand helper that automatically saves your store to storage."]],
      v: [["6siYLO4wokE", "Zustand Persist Middleware Tutorial: Save State to Device"],
      ["s_tBTjQzlSg", "Don't Use AsyncStorage! Secure Your React Native App with Expo SecureStore"],
      ["46nAccLWas0", "React Native Expo Tutorial: Offline Data Storage with AsyncStorage"]],
      d: [["Expo SecureStore", "https://docs.expo.dev/versions/latest/sdk/securestore/"],
      ["AsyncStorage docs", "https://react-native-async-storage.github.io/async-storage/docs/install/"]],
      b: "Make your Zustand store persist with AsyncStorage so your data is still there after fully closing and reopening the app. Keep the fake auth token in SecureStore.",
      q: "When do you pick SecureStore, AsyncStorage or Zustand persist?"
    },

    {
      t: "Gestures: swipe and long-press",
      s: "Touch gives you more than taps: swipes, long-presses, drags. The gesture handler library runs them smoothly, and Swipeable gives you swipe-to-delete rows almost for free.",
      w: "There's no mouse equivalent. These interactions are what make an app feel native.",
      k: [["Gesture Handler", "A library for fast, reliable touch gestures."],
      ["Swipeable", "A row that reveals actions, like Delete, when you swipe it."]],
      v: [["BRitzE50Dy0", "Swipe to Delete in React Native Expo in 3 Minutes (Using Swipeable)"],
      ["JxN9W9PRlUQ", "Swipe Gestures in React Native with react-native-gesture-handler"]],
      d: [["Gesture Handler docs", "https://docs.swmansion.com/react-native-gesture-handler/docs/"]],
      b: "Add swipe-to-delete to the rows of your list and a long-press action (like rename or favorite).",
      q: "Which gestures does your capstone need?"
    },

    {
      t: "Animation, just enough",
      s: "Small animations (a fade-in, a button that shrinks when pressed) make an app feel alive. Reanimated runs animations on the UI thread so they stay smooth.",
      w: "It's like CSS transitions, except you describe them in JavaScript.",
      k: [["Shared value", "A value Reanimated can animate smoothly."],
      ["UI thread", "The part of the phone that draws the screen. Animations that run here don't stutter."]],
      v: [["OfKVpG8KLhY", "Building Beautiful Animations with React Native Reanimated 3"],
      ["rnK_03dyY0o", "React Native Reanimated Basics"],
      ["eLjzIM_4zlg", "YouTube Transitions - \"Can it be done in React Native?\"", "William Candillon, advanced inspiration from 2019"]],
      d: [["Reanimated: Getting started", "https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/"]],
      b: "Add one real animation: a fade-in on a screen, a press-scale on a button, or an animated list item. Don't go down the rabbit hole.",
      q: "Why does running on the UI thread matter for smoothness?"
    },

    {
      t: "Mini project: an app that remembers",
      s: "Combine forms, state, storage and gestures into one small app that still has your data after you close it.",
      v: [["J50gwzwLvAk", "React Native Full Course 2025 | Become a React Native Pro in 4 Hours", "PedroTech. A habit tracker you can build along with"]],
      d: [],
      b: "Build a notes or habit app: add items with a validated form, store them in Zustand with persistence, swipe to delete, and animate one thing.",
      q: "What would break if you reinstalled the app? (That's why you'll add a backend next week.)"
    },

    /* ===================== WEEK 6: Data and backend ===================== */
    {
      t: "Talking to the internet",
      s: "Most apps load data from a server. You call an API with fetch, show a loading state, then show the data or an error.",
      w: "fetch works exactly as on the web, with no CORS issues, but you still need to handle slow or missing connections.",
      k: [["API", "A server address your app asks for data."],
      ["Loading state", "What the user sees while data is on its way."]],
      v: [["IuYo009yc8w", "React Native Fetch Data From API and Render FlatList"],
      ["VQGduNUpVG4", "Watch This Before Fetching in useEffect", "general React, worth knowing"]],
      d: [["React Native: Networking", "https://reactnative.dev/docs/network"]],
      b: "Fetch from a free public API into your FlashList with loading and error states, and pull to refresh.",
      q: "What's identical to web fetching, and what's different on a device?"
    },

    {
      t: "TanStack Query",
      s: "TanStack Query handles loading, caching, retries and refreshing for you, so you stop writing the same useEffect fetching code in every screen.",
      w: "It's the same TanStack Query you may know from Next.js apps.",
      k: [["Query", "A request for data that TanStack Query caches and keeps fresh."],
      ["Cache", "Saved results, so repeat visits don't need another request."]],
      v: [["bpHq_-bPkGo", "Data Fetching in React Native with TanStack Query (tutorial for beginners)"],
      ["HYIUcI48AA0", "React Native Data Fetching with TanStack Query v4"]],
      d: [["TanStack Query docs", "https://tanstack.com/query/latest"]],
      b: "Move yesterday's fetching into useQuery, then try a mutation (useMutation) that posts new data and refreshes the list.",
      q: "What does TanStack Query give you that a plain useEffect doesn't?"
    },

    {
      t: "A backend with Supabase",
      s: "Supabase gives you a database, user accounts and file storage without writing a server. You create tables in a dashboard and talk to them from your app.",
      w: "Think of it as a hosted Postgres database with an API, plus auth, so you can skip building a backend.",
      k: [["Backend", "The server-side part that stores data and enforces rules."],
      ["Database table", "A grid of rows and columns that stores one kind of data."],
      ["Row Level Security (RLS)", "Database rules that decide which user can see or change which rows."]],
      v: [["u7-2rUSL2T4", "Build Your First Full Stack App using Expo + Supabase + Tanstack Query"],
      ["7eq1FY_KfjQ", "Build a Full Stack CRUD App with React Native, Expo & Supabase"]],
      d: [["Expo: Using Supabase", "https://docs.expo.dev/guides/using-supabase/"],
      ["Supabase docs", "https://supabase.com/docs"]],
      b: "Create a free Supabase project and a table for your capstone's main data (for example notes). Install the Supabase client in your app and read one row.",
      q: "Why is a backend needed for an app that has to remember data between devices?"
    },

    {
      t: "CRUD: create, read, update, delete",
      s: "CRUD is the four things nearly every app does with data: create it, read it, update it and delete it. You'll wire all four to your database.",
      w: "It's the same CRUD you'd write for a Next.js app, with the Supabase client in place of API routes.",
      k: [["CRUD", "Create, Read, Update, Delete: the four basic data operations."],
      ["Optimistic update", "Showing a change instantly and fixing it later if the server says no."]],
      v: [["7eq1FY_KfjQ", "Build a Full Stack CRUD App with React Native, Expo & Supabase"],
      ["OrNy-jELkHY", "Supabase Todolist In React Native Expo 2026 (Supabase CRUD)"]],
      d: [["Supabase: Database", "https://supabase.com/docs/guides/database/overview"]],
      b: "Replace your local data with Supabase: list, add, edit and delete items. Use TanStack Query so the list refreshes after each change.",
      q: "Which of the four CRUD operations was the trickiest, and why?"
    },

    {
      t: "Authentication with Supabase",
      s: "Authentication means signing users up and in so each person sees only their own data. Supabase handles passwords and sessions for you.",
      w: "It plays the role of NextAuth or Clerk. A session is stored on the device instead of a browser cookie.",
      k: [["Authentication", "Proving who a user is, usually with email and password."],
      ["Session", "The saved sign-in that keeps a user logged in."]],
      v: [["ZEka9HtOOC8", "Expo Router And Supabase Authentication"],
      ["EZIrpRVGlfU", "Supabase React Native Auth Tutorial"],
      ["xf_srDyoGnQ", "Build Secure Auth in Expo with Supabase"]],
      d: [["Supabase: Auth", "https://supabase.com/docs/guides/auth"]],
      b: "Add real email and password sign-up and sign-in screens using Supabase Auth.",
      q: "How does session persistence differ from a browser cookie?"
    },

    {
      t: "Sessions and protected screens",
      s: "Now connect sign-in to navigation: signed-in users see the app, signed-out users see the sign-in screen, and the session survives closing the app.",
      w: "This is Day 27's protected routes, now driven by a real session instead of a fake flag.",
      k: [["Session persistence", "Keeping the user signed in after the app is closed."],
      ["Row Level Security policy", "A rule such as: users can only read rows they own."]],
      v: [["6IzrH-1M0uE", "React Native Expo Router Tabs with Supabase Authentication"],
      ["zHZjJDTTHJg", "Building auth and onboarding flows with protected routes"]],
      d: [["Supabase: Row Level Security", "https://supabase.com/docs/guides/database/postgres/row-level-security"]],
      b: "Guard your tabs behind the Supabase session, store the session securely, add a sign-out button, and add an RLS policy so users only see their own rows.",
      q: "What happens if you open the app with no internet connection while signed in?"
    },

    {
      t: "Mini project: connect the app to the backend",
      s: "Bring it together: your app now talks to a real backend with real users.",
      v: [["rIYzLhkG9TA", "React Native Full 8 Hours Course (Expo, Expo Router, Supabase)", "notJust.dev. A full build to use as reference; use YouTube's chapter list"]],
      d: [],
      b: "Make your Day 35 app use Supabase for sign-in and data. Sign in on two different accounts and confirm each only sees their own data.",
      q: "What would you improve about the loading and error experience?"
    },

    /* ===================== WEEK 7: Device features ===================== */
    {
      t: "Permissions and the photo library",
      s: "Phones protect private things like photos, camera and location. Your app must ask the user for permission, and handle a No gracefully.",
      w: "Like the browser's permission prompts for the camera or location, but stricter, and you control when to ask.",
      k: [["Permission", "The user's approval to access something private, like photos or the camera."],
      ["Image picker", "The built-in screen where users choose a photo from their library."]],
      v: [["wLF-2RagaDE", "React Native Expo Image Picker Tutorial 2026"],
      ["OVuRWEMeLGA", "React Native Tutorial: Image Picker & Sharing with Expo"]],
      d: [["Expo ImagePicker", "https://docs.expo.dev/versions/latest/sdk/imagepicker/"]],
      b: "Add a change-profile-photo button that opens the photo library, shows the chosen image, and explains clearly what to do if permission is denied.",
      q: "Write down your reusable pattern: check, request, handle denial."
    },

    {
      t: "The camera",
      s: "With expo-camera your app can show a live camera preview and take photos. It needs the camera permission, and it works best on a real phone.",
      w: "Like getUserMedia in the browser, but with a ready-made component.",
      k: [["Camera preview", "The live view from the camera shown inside your app."],
      ["Media library", "The phone's saved photos and videos."]],
      v: [["bR8PZNXoDQY", "How to Use Expo Camera and Media Library in React Native"],
      ["4WPjWK0MYMI", "Take a Picture using Camera for Expo React Native Apps and Save to Media Library or Share File"]],
      d: [["Expo Camera", "https://docs.expo.dev/versions/latest/sdk/camera/"]],
      b: "Add a camera screen that takes a photo, shows it back, and attaches it to one of your items. Upload it to Supabase Storage if you can.",
      q: "What does the user see the first time your app asks for camera access?"
    },

    {
      t: "Location and maps",
      s: "Phones know where they are. With expo-location you can read the user's position, and a map view can show places on a map.",
      w: "Like the browser's geolocation API, plus a native map component.",
      k: [["Geolocation", "Finding the phone's position using GPS and nearby networks."],
      ["Marker", "A pin on a map."]],
      v: [["d7G0E_9FwyE", "Get Current Location, Geocode and Reverse Geocode in Expo React Native Apps using expo-location"],
      ["xcn-0LyX6JY", "Add Maps to Your Expo React Native App - With Draggable Markers, Custom Callouts and Custom Styles"]],
      d: [["Expo Location", "https://docs.expo.dev/versions/latest/sdk/location/"],
      ["Expo MapView", "https://docs.expo.dev/versions/latest/sdk/map-view/"]],
      b: "Ask for location permission, show the user's position on a map, and drop a marker for one saved item.",
      q: "When should an app ask for location, and when is it too early?"
    },

    {
      t: "Local notifications",
      s: "A local notification is a reminder your app schedules on the phone itself, with no server. It's the easiest way to learn how notifications work.",
      w: "There's no direct web equivalent. These show up even when your app is closed.",
      k: [["Local notification", "A notification the app schedules on the device, without a server."],
      ["Trigger", "When the notification should fire, such as in 10 seconds or every morning."]],
      v: [["NI_nv5lTGaY", "React Native Local Push Notifications Tutorial (2026)"],
      ["F1qmC7VLk4Y", "Scheduled Notifications in React Native with Expo"]],
      d: [["Expo Notifications", "https://docs.expo.dev/versions/latest/sdk/notifications/"]],
      b: "Ask for notification permission and schedule a daily reminder for your capstone (for example, remind me to write a note).",
      q: "How would a user turn this reminder off inside your app?"
    },

    {
      t: "Development builds with EAS",
      s: "Expo Go only includes some native code. A development build is your own version of Expo Go with exactly the native features you need, like push notifications. EAS builds it in the cloud.",
      w: "It's like building your own custom browser with extra capabilities, which you then install on your phone.",
      k: [["Development build", "A custom app you install on your phone for development, including your native libraries."],
      ["eas.json", "The file that describes your build profiles."]],
      v: [["Th8uRHWOv-Q", "React Native Development Build tutorial with EAS"],
      ["nErlD5GiWvI", "Expo Development Client vs Expo Go"]],
      d: [["Expo: Development builds", "https://docs.expo.dev/develop/development-builds/introduction/"],
      ["EAS tutorial", "https://docs.expo.dev/tutorial/eas/introduction/"]],
      b: "Run eas build --profile development, install the build on your phone (an Android APK is easiest) and start your app with it instead of Expo Go.",
      q: "Explain Expo Go vs a development build vs a production build."
    },

    {
      t: "Push notifications",
      s: "Push notifications come from a server, so you can reach users even when the app is closed. Your app gets a push token and sends it to your backend.",
      w: "Like web push, but through Apple and Google's own notification services.",
      k: [["Push notification", "A message sent from a server to a user's phone."],
      ["Push token", "The unique address of one phone's app install, used to send it a notification."]],
      v: [["p4KP-hXuDyI", "React Native Expo Push Notifications Tutorial (2025) - iOS & Android Setup"],
      ["JO850zWNwoY", "Expo 50+ Push Notifications (React Native)"]],
      d: [["Expo: Push notifications setup", "https://docs.expo.dev/push-notifications/push-notifications-setup/"]],
      b: "Register for a push token on a real device with your development build, then send yourself a test notification using Expo's push tool.",
      q: "Why do remote push notifications need a development build, not Expo Go?"
    },

    {
      t: "Mini project: add two device features",
      s: "Pick two features from this week (photos, camera, location, notifications) and make them a real part of your capstone.",
      v: [],
      d: [],
      b: "Add two device features to your capstone, each with a polite permission request and a fallback when the user says no.",
      q: "Which feature made the app feel most like a real mobile app?"
    },

    /* ===================== WEEK 8: Quality and capstone ===================== */
    {
      t: "Performance",
      s: "A fast app feels good. The common problems are extra re-renders, huge images and heavy lists. You'll learn to spot and fix them.",
      w: "It's the same React performance thinking you know, with extra attention to lists and images on slower phones.",
      k: [["Re-render", "React drawing a component again, which costs time if it happens too often."],
      ["memo / useCallback", "Tools that stop React from redoing work when nothing changed."]],
      v: [["rSym-q9soFk", "7 Tips to Make Your React Native App Blazing Fast!"],
      ["M5k3i_CBonU", "Most Developers Get React Native Re-renders Wrong"]],
      d: [["React Native: Performance", "https://reactnative.dev/docs/performance"],
      ["FlashList docs", "https://shopify.github.io/flash-list/"]],
      b: "Audit your capstone: find and remove extra re-renders, resize big images, and check scrolling on the slowest phone you can find.",
      q: "List 3 performance habits you'll now apply by default."
    },

    {
      t: "Debugging and error handling",
      s: "Things will break. Learn to read the red error screen, use logs and DevTools, and make sure a crash shows a friendly message instead of a blank screen.",
      w: "Same debugging mindset as the web, with the terminal and DevTools replacing the browser console.",
      k: [["Error boundary", "A component that catches errors in the screens below it and shows a fallback."],
      ["Stack trace", "The list of function calls that led to an error, shown in the red screen."]],
      v: [["FXn1vUGCci8", "React Native Debugging: From JS to Native"],
      ["p_p80Pv5Rq4", "Debug React Native Apps with Logs"]],
      d: [["React Native: Debugging", "https://reactnative.dev/docs/debugging"],
      ["React: Error boundaries", "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"]],
      b: "Add an error boundary around your app and a friendly error state to every screen that loads data. Break something on purpose and fix it using the DevTools.",
      q: "What is your first move when you see a red error screen?"
    },

    {
      t: "Testing basics",
      s: "Tests check that your app still works after you change something. You'll write a few small tests with Jest and React Native Testing Library.",
      w: "It's the same Jest and Testing Library idea as on the web, rendering components without a phone.",
      k: [["Unit test", "A small automatic check of one function or component."],
      ["Testing Library", "Tools that render a component and find things on it the way a user would."]],
      v: [["CpTQb0XWlRc", "Intro to React Native Testing Library & Jest Native"],
      ["PlppJvJ67GA", "Automation Testing for Expo React Native Apps with Jest and React Native Testing Library"]],
      d: [["Expo: Unit testing", "https://docs.expo.dev/develop/unit-testing/"],
      ["React Native Testing Library", "https://callstack.github.io/react-native-testing-library/"]],
      b: "Set up Jest and write 3 tests: one for a helper function, one that renders a component and checks its text, and one that presses a button.",
      q: "Which part of your app would hurt most if it broke without you noticing?"
    },

    {
      t: "Accessibility and polish",
      s: "Accessibility means everyone can use your app, including people who use screen readers, big text or high contrast. It's also a mark of a polished app.",
      w: "Same ideas as ARIA labels and alt text on the web, with different prop names (accessibilityLabel, accessibilityRole).",
      k: [["Screen reader", "Software that reads the screen aloud: VoiceOver on iOS, TalkBack on Android."],
      ["accessibilityLabel", "The text a screen reader says for an element."]],
      v: [["xVYorswfez8", "Everything you need to know about Accessibility in React Native"],
      ["EI3xzxeBaxs", "React Native Accessibility Basics by Nivedita Singh - React & React Native Meetup"]],
      d: [["React Native: Accessibility", "https://reactnative.dev/docs/accessibility"]],
      b: "Add accessibility labels and roles to the buttons and images in your capstone. Turn on VoiceOver or TalkBack on your phone and try to use the main flow with your eyes closed.",
      q: "What was confusing or impossible with the screen reader on?"
    },

    {
      t: "Offline and flaky networks",
      s: "Phones go through tunnels, lifts and bad Wi-Fi. Good apps notice when they're offline, keep showing saved data, and sync when the connection returns.",
      w: "It's like a service worker's offline mode, but you build the pieces yourself.",
      k: [["Offline-first", "Designing the app to work with saved data even without internet."],
      ["NetInfo", "A library that tells you whether the phone is online."]],
      v: [["nyC5EDa6cVk", "How to Use react-native-netinfo in React Native"],
      ["qiTTonU1AJM", "Making react native app Offline Ready in 2 mins"]],
      d: [["NetInfo on GitHub", "https://github.com/react-native-netinfo/react-native-netinfo"]],
      b: "Show an offline banner when the phone has no connection, keep showing cached data from TanStack Query or storage, and block actions that need the internet with a friendly message.",
      q: "What should happen when a user adds a note while offline?"
    },

    {
      t: "Capstone build day",
      s: "A full day to build your capstone. Plan, build, and test on a real phone.",
      v: [],
      d: [],
      b: "Work through your capstone spec. Aim for one complete user flow from sign-in to the main feature, working end to end on your phone.",
      q: "What is the biggest remaining risk in your capstone?"
    },

    {
      t: "App icon, splash screen and polish",
      s: "Your icon and splash screen are the first things users see. Along with empty, loading and error states, they separate a demo from a real app.",
      w: "Think of a favicon and a loading screen, but required by the stores.",
      k: [["Splash screen", "The screen shown while your app starts."],
      ["Adaptive icon", "An Android icon made of layers that adjust to different phone shapes."]],
      v: [["77mVhKiBCsE", "[2025] Expo App Icon and Splash Screen Tutorial"],
      ["MqLteLe-Fow", "Expo Splash Screen & App Icons Setup"]],
      d: [["Expo: Splash screen and app icon", "https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/"]],
      b: "Create a real app icon and splash screen, set your app name, version and bundle identifier in app.json, and fix any empty, loading or error state still missing.",
      q: "If you had one more day, what is the first thing you'd fix?"
    },

    /* ===================== WEEK 9: Ship it ===================== */
    {
      t: "Your first production build",
      s: "A production build is the real, optimized app file you'll upload to a store. EAS builds it in the cloud and handles signing for you.",
      w: "It's your npm run build, producing an .aab for Android or an .ipa for iOS.",
      k: [["Production build", "The optimized, signed version of your app meant for real users."],
      ["Build profile", "A named set of build settings in eas.json, like development or production."]],
      v: [["3RCahcMlsBY", "EAS Build Android Walkthrough"],
      ["K3-QNKLPGKI", "React Native Expo EAS Builds - Cloud & Local Builds in Android & iOS."]],
      d: [["EAS Build introduction", "https://docs.expo.dev/build/introduction/"],
      ["Android production build", "https://docs.expo.dev/tutorial/eas/android-production-build/"]],
      b: "Run eas build --platform android --profile production and download the resulting .aab. (iOS needs a Mac or EAS plus an Apple Developer account.)",
      q: "Which app.json fields end up in the store listing?"
    },

    {
      t: "Store listing, privacy and submission",
      s: "Before an app goes public you need a store listing (name, description, screenshots), a privacy policy, and answers to the store's data questions. Then you submit and wait for review.",
      w: "It's like launching a website, plus a review queue you can't skip.",
      k: [["Store listing", "The page that describes your app in the store."],
      ["Internal testing", "A Google Play track for testing with a small group before going public."],
      ["TestFlight", "Apple's tool for testing iOS apps before release."]],
      v: [["-KZjr576tuE", "Async Office Hours: How to quickly publish to the App Store & Play Store with EAS Submit"],
      ["qxO_8GFAliE", "Publish APP To Google PLAY Store: Internal Testing Setup [2026]"],
      ["4rfF3y4xchU", "Google Play PolicyBytes - Data safety form walkthrough"],
      ["PdwYDatvJ2I", "Expo EAS CLI to Submit Apps to the Apple App Store With or Without a Mac and Test with TestFlight"]],
      d: [["Submit to app stores", "https://docs.expo.dev/deploy/submit-to-app-stores/"]],
      b: "Write a short privacy policy, prepare 4 screenshots and a description, and submit to Google Play's internal testing track ($25 one-time; Apple is $99 a year), or walk through every step without paying.",
      q: "What do you still need before a public launch?"
    },

    {
      t: "Over-the-air updates and releases",
      s: "Once your app is live, you can ship JavaScript fixes straight to users without waiting for store review, using EAS Update. Native changes still need a new build.",
      w: "It's like deploying a hotfix to a website, but only for the JavaScript part of your app.",
      k: [["OTA update", "An update delivered over the internet, without a new store release."],
      ["Version", "The number that tells stores and users which release of your app this is."]],
      v: [["DWpcD6bvTRA", "Sending Over-the-Air (OTA) Updates with EAS Update"],
      ["TsLFMxNNlBg", "What OTA Updates are, how they work, and how to use them"]],
      d: [["EAS Update introduction", "https://docs.expo.dev/eas-update/introduction/"]],
      b: "Set up EAS Update, push a small text change to your build, and watch it appear on your phone without reinstalling.",
      q: "What can ship over the air, and what needs a new build?"
    },

    {
      t: "Demo day and what's next",
      s: "You've gone from what is a mobile app? to a shipped app. Record it, share it, and decide where to go from here.",
      v: [],
      d: [],
      b: "Record a 60-second demo of the app on your phone, write a short README, and decide what you'll build or learn next.",
      q: "What are you proudest of from these 60 days, and what's your first goal for month three?"
    }
  ];
  DAYS.forEach(function (d, i) { d.id = i + 1; });
  var TOTAL = DAYS.length;

  /* =========================================================
     STATE (localStorage)
     ========================================================= */
  // New key for the 60-day plan. (The old 30-day tracker used "daybreak-rn30-v2"; its days don't match this plan.)
  var KEY = "daybreak-rn60-v1";
  var storageOK = true;

  function blank() { return { v: 1, days: {}, last: 1 }; }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { var s = JSON.parse(raw); if (s && s.days) return s; }
    } catch (e) { storageOK = false; }
    return blank();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageOK = true; }
    catch (e) { storageOK = false; }
  }

  var state = load();
  var cur = 1;
  var popId = null;
  var openWeeks = {}; // which weeks are expanded in the sidebar

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
    for (var i = 0; i < 63; i++) { // 9 columns x 7 rows; the last column has 4 days
      var id = i + 1;
      if (id > TOTAL) { cells += '<span class="pcell pad"></span>'; continue; }
      var n = blocksDone(id);
      cells += '<a class="pcell l' + lvl(n) + (id === cur ? " here" : "") + (id === next && id !== cur ? " next" : "") +
        '" href="#day-' + id + '" title="Day ' + id + ' · ' + esc(DAYS[i].t) + ' — ' + n + '/3 sessions" aria-label="Day ' + id + ', ' + n + ' of 3 sessions done">' + id + '</a>';
    }

    var cta = next
      ? '<a class="cta" href="#day-' + next + '"><span>' + (st.done === 0 && blocksDone(1) === 0 ? "Start Day 1" : "Continue with Day " + next) +
      '<small>' + esc(DAYS[next - 1].t) + '</small></span>' + ICON.right + '</a>'
      : '<span class="cta" aria-disabled="true"><span>All ' + TOTAL + ' days complete<small>Nice work.</small></span></span>';

    var list = WEEKS.map(function (w) {
      var wd = 0, rows = "", isOpen = !!openWeeks[w.n];
      for (var id = w.from; id <= w.to; id++) {
        var done = isDone(id); if (done) wd++;
        if (!isOpen) continue;
        var b = dayState(id).b;
        rows += '<a class="row' + (id === cur ? " active" : "") + (done ? " complete" : "") + '" href="#day-' + id + '"' + (id === cur ? ' aria-current="page"' : "") + '>' +
          '<span class="pips">' + BLOCKS.map(function (x) { return '<i class="' + (b[x.k] ? "on" : "") + '"></i>'; }).join("") + '</span>' +
          '<span class="row-n">' + id + '</span><span class="row-t">' + esc(DAYS[id - 1].t) + '</span></a>';
      }
      return '<button class="wk' + (isOpen ? " open" : "") + '" data-week="' + w.n + '" aria-expanded="' + isOpen + '">' +
        '<span class="chev">' + ICON.right + '</span><strong>Week ' + w.n + '</strong><em>' + esc(w.name) + '</em><span class="wk-n">' + wd + '/' + (w.to - w.from + 1) + '</span></button>' + rows;
    }).join("");

    $side.innerHTML =
      '<div class="brand">' + sunSvg(pct) +
      '<div><div class="brand-name">Daybreak</div><div class="brand-sub">React Native in 60 days</div></div>' +
      '<button class="drawer-close" id="drawerClose" aria-label="Close menu">' + ICON.close + '</button></div>' +
      '<div class="overview"><div class="plan-grid" role="navigation" aria-label="' + TOTAL + '-day map">' + cells + '</div>' +
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

    var label = (b.k === "build" && day.bl) ? day.bl : b.label; // concept days say "Write it down" instead of "Build"
    return '<section class="session ' + b.k + (done ? " done" : "") + '">' +
      '<div class="s-head"><span class="s-kind">' + esc(label) + '</span><span class="s-time">' + b.min + ' min</span><span class="spacer"></span>' +
      '<button class="toggle" data-toggle="' + b.k + '" aria-pressed="' + done + '"><span class="box">' + ICON.check + '</span>' +
      '<span>' + (done ? "Done" : "Mark done") + '</span><kbd>' + b.key + '</kbd></button></div>' + body + '</section>';
  }

  function renderDay() {
    var day = DAYS[cur - 1], ds = dayState(cur), n = blocksDone(cur), full = n === 3;
    var wk = weekOf(cur);
    var prev = cur > 1 ? DAYS[cur - 2] : null, nxt = cur < TOTAL ? DAYS[cur] : null;
    var upNext = nextUnfinished();

    var banner = '<div class="banner' + (full ? " show" : "") + '"><span>Day ' + cur + ' complete.</span><span class="sp"></span>' +
      (upNext ? '<a href="#day-' + upNext + '">Next up: Day ' + upNext + '</a>' : '<span>That\'s all ' + TOTAL + ' days.</span>') + '</div>';

    var plain = "";
    if (day.s) {
      plain = '<section class="plain" aria-label="Today in plain words">' +
        (day.intro ? '<p class="intro">' + esc(day.intro) + '</p>' : "") +
        '<div class="plain-tag">In plain words</div><p class="plain-s">' + esc(day.s) + '</p>' +
        (day.w ? '<p class="bridge"><b>Coming from web</b>' + esc(day.w) + '</p>' : "") +
        ((day.k && day.k.length)
          ? '<dl class="terms">' + day.k.map(function (t) { return '<div><dt>' + esc(t[0]) + '</dt><dd>' + esc(t[1]) + '</dd></div>'; }).join("") + '</dl>'
          : "") +
        '</section>';
    }

    $day.innerHTML =
      '<div class="crumbs"><span>Week ' + wk.n + ' · ' + esc(wk.name) + '</span><span class="sp"></span>' +
      '<a class="navbtn" href="#day-' + (cur - 1) + '" aria-label="Previous day"' + (prev ? "" : ' aria-disabled="true" tabindex="-1"') + '>' + ICON.left + '</a>' +
      '<a class="navbtn" href="#day-' + (cur + 1) + '" aria-label="Next day"' + (nxt ? "" : ' aria-disabled="true" tabindex="-1"') + '>' + ICON.right + '</a></div>' +
      '<div class="hero"><div class="numeral' + (full ? " full" : "") + (popId === cur ? " pop" : "") + '" style="--fill:' + Math.round(n / 3 * 100) + '%" aria-hidden="true">' + cur + '</div>' +
      '<div><h1><span class="sr">Day ' + cur + ': </span>' + esc(day.t) + '</h1><p>2 hours · 45 watch &nbsp;+&nbsp; 60 build &nbsp;+&nbsp; 15 review</p></div></div>' +
      '<div class="segbar" aria-hidden="true">' + BLOCKS.map(function (x) { return '<i class="' + (ds.b[x.k] ? "on" : "") + '"></i>'; }).join("") + '</div>' +
      plain +
      '<div class="timeline">' + BLOCKS.map(function (b) { return sessionHTML(b, day, ds); }).join("") + '</div>' +
      banner +
      '<div class="pager">' +
      (prev ? '<a class="pg" href="#day-' + prev.id + '"><small>← Day ' + prev.id + '</small><b>' + esc(prev.t) + '</b></a>' : '<span class="pg" aria-disabled="true"></span>') +
      (nxt ? '<a class="pg next-pg" href="#day-' + nxt.id + '"><small>Day ' + nxt.id + ' →</small><b>' + esc(nxt.t) + '</b></a>' : '<span class="pg" aria-disabled="true"></span>') +
      '</div>' +
      '<p class="hint"><kbd>←</kbd><kbd>→</kbd> switch day &nbsp; <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> toggle sessions &nbsp; <kbd>N</kbd> next unfinished</p>';
  }

  function renderActivity(st) {
    var WEEKS_N = 26;
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
    openWeeks[weekOf(id).n] = true; // always expand the week you're in
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

    var wkBtn = e.target.closest("[data-week]");
    if (wkBtn) {
      var wn = wkBtn.getAttribute("data-week");
      openWeeks[wn] = !openWeeks[wn];
      render();
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
