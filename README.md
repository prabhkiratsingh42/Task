# GrievanceDesk 📋

> A production-ready Grievance & Feedback mobile app built with **React Native CLI + TypeScript**.

---

## 📱 Screenshots & Features

| Home Screen | Add Grievance | List Screen | Detail Screen |
|---|---|---|---|
| Stats dashboard, nav CTAs | Animated form with category chips | Search + filter + pull-to-refresh | Full detail with share |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React Native CLI 0.77 |
| **Language** | TypeScript 5 (strict) |
| **Navigation** | React Navigation 7 — Native Stack |
| **Persistence** | @react-native-async-storage/async-storage |
| **State** | Custom hooks (no Redux/Zustand — by design) |
| **UI** | Vanilla StyleSheet — dark themed, animated |
| **Node** | ≥ 18 |

---

## 📁 Folder Structure

```
src/
├── navigation/
│   └── AppNavigator.tsx        # Stack navigator, screen registration
├── screens/
│   ├── HomeScreen.tsx          # Dashboard with live stats
│   ├── AddGrievanceScreen.tsx  # Form screen
│   ├── GrievanceListScreen.tsx # Searchable, filterable list
│   └── GrievanceDetailScreen.tsx # Full detail + share
├── components/
│   ├── CustomInput.tsx         # Reusable animated input
│   ├── CustomButton.tsx        # 3-variant spring-animated button
│   ├── ListItem.tsx            # Animated grievance card
│   ├── StatusBadge.tsx         # Colour-coded status pill
│   ├── EmptyState.tsx          # Floating-icon empty view
│   └── LoadingOverlay.tsx      # Spinner with optional message
├── services/
│   └── grievanceService.ts     # All AsyncStorage I/O
├── hooks/
│   ├── useGrievances.ts        # List state + fetch + error
│   └── useAddGrievance.ts      # Form state + validation + submit
├── types/
│   ├── grievance.ts            # Domain types (Grievance, Category, Status)
│   └── navigation.ts           # Typed route params + screen props
├── utils/
│   ├── helpers.ts              # ID gen, date formatting, truncation
│   └── validation.ts           # Form validation rules
└── constants/
    ├── colors.ts               # Full design-system colour palette
    ├── layout.ts               # Spacing, radius, font, shadow tokens
    └── strings.ts              # All UI strings centralised
```

---

## ⚡ Setup Instructions

### 1. Prerequisites

- **Node** ≥ 18
- **Ruby** ≥ 3.0 (for iOS CocoaPods)
- **Xcode** 15+ (iOS) or **Android Studio** (Android)
- **CocoaPods** (`gem install cocoapods`)

### 2. Clone & Install JS dependencies

```bash
git clone <your-repo-url>
cd Task
npm install
```

### 3. Install iOS pods

```bash
cd ios && pod install && cd ..
```

### 4. Run on iOS

```bash
npm run ios
# or for a specific simulator:
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### 5. Run on Android

```bash
# Start an emulator first, then:
npm run android
```

### 6. Start Metro bundler (standalone)

```bash
npm start
```

---

## 🧩 Key Design Decisions

### Why custom hooks instead of Redux/Zustand?
The data model is simple (one entity type, no shared cross-screen state beyond navigation params). Custom hooks (`useGrievances`, `useAddGrievance`) give full control with zero boilerplate overhead.

### Why AsyncStorage instead of a real API?
The spec called for mock persistence. The service layer (`grievanceService.ts`) is structured so any function can be swapped for a real REST/GraphQL call — the hook and screen layers don't change.

### Why no Expo?
Per requirements — this is a full React Native CLI project for complete native control.

### Dark theme
A single `colors.ts` token file drives every colour. Switching to light theme or supporting system themes only requires updating that file + a `useColorScheme` hook.

---

## 🔌 Dependencies Added

```bash
npm install \
  @react-navigation/native \
  @react-navigation/native-stack \
  react-native-screens \
  react-native-safe-area-context \
  @react-native-async-storage/async-storage
```

---

## 🗺 Navigation Flow

```
HomeScreen
  ├── → AddGrievanceScreen   (submit form)
  └── → GrievanceListScreen  (view all)
            └── → GrievanceDetailScreen (view one)
```

---

## 🧪 Extending the App

| Feature | Where to add |
|---|---|
| Edit grievance | New `editGrievance()` in `grievanceService.ts`, new screen |
| Real API | Swap AsyncStorage calls in `grievanceService.ts` |
| Auth | Add `AuthStack` in `AppNavigator.tsx` |
| Push notifications | Add in `index.js` before `AppRegistry` |
| Dark/Light toggle | Extend `colors.ts` with theme variants, wrap with Context |
| Delete grievance | Add `deleteGrievance()` in service + swipe-to-delete in `ListItem` |

---

## 📌 Assumptions

1. No backend — AsyncStorage is the persistence layer (production swap is trivial).
2. All grievances default to `pending` status on creation (no admin panel to change status in this scope).
3. No authentication/user accounts in scope.
4. Device storage only — no cloud sync.
5. React Native 0.77 (New Architecture compatible — `enableScreens()` called in `index.js`).

---

## 📄 License

MIT
