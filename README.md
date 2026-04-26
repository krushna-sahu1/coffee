# Coffee

Clean, modern mobile coffee ordering app built with Expo, React Native, Expo Router, NativeWind, and Zustand. The app covers the full ordering journey: onboarding, authentication, product discovery, drink customization, cart management, checkout, rewards, profile, and order tracking.

## Demo

https://github.com/user-attachments/assets/c1aa91c3-b379-4746-a686-5ad89fa72d7f

## Highlights

- Browse drinks and pastries by category
- Switch between menu grid and list views
- View featured products, popular items, and promotions
- Customize product size and add-ons
- Manage cart items, quantities, subtotal, tax, and total
- Checkout with mock payment methods
- Track order progress from confirmation to pickup
- View rewards, tiers, points, and redeemable benefits
- Persist cart, auth, onboarding, and order state locally
- Smooth animated UI with React Native Reanimated and Moti

## Tech Stack

| Area | Tools |
| --- | --- |
| App framework | Expo, React Native |
| Routing | Expo Router |
| Styling | NativeWind, Tailwind CSS |
| State management | Zustand, AsyncStorage |
| Forms and validation | React Hook Form, Zod |
| UI and motion | Expo Vector Icons, Reanimated, Moti, Linear Gradient |
| Language | JavaScript, TypeScript config |

## Getting Started

### Prerequisites

- Node.js installed
- Expo CLI available through `npx`
- Android Studio, Xcode, or Expo Go for running the app

### Installation

```bash
npm install
```

If you prefer Bun, this repository includes a `bun.lock` file:

```bash
bun install
```

### Run The App

```bash
npm run start
```

Then choose a target from the Expo terminal:

- Press `a` for Android
- Press `i` for iOS
- Press `w` for web
- Scan the QR code with Expo Go

You can also run a platform directly:

```bash
npm run android
npm run ios
npm run web
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run start` | Start the Expo development server |
| `npm run android` | Open the app on Android |
| `npm run ios` | Open the app on iOS |
| `npm run web` | Open the app in a browser |
| `npm run lint` | Run Expo lint checks |

## Project Structure

```text
coffee/
|-- app/                  # Expo Router screens and layouts
|   |-- (tabs)/           # Main tab navigation screens
|   |-- order-tracking/   # Dynamic order tracking route
|   `-- product/          # Dynamic product detail route
|-- assets/               # App icons and image assets
|-- components/ui/        # Reusable UI components
|-- constants/            # Colors, mock data, and shared constants
|-- lib/stores/           # Zustand stores
|-- public/               # Static public assets, including demo video
`-- global.css            # NativeWind global styles
```

## Core Screens

- `app/onboarding.jsx` - first-run onboarding flow
- `app/auth.jsx` - authentication screen
- `app/(tabs)/index.jsx` - home, promotions, quick order, featured drinks
- `app/(tabs)/menu.jsx` - categorized menu browsing
- `app/product/[id].jsx` - product detail and customization
- `app/cart.jsx` - cart review and quantity management
- `app/checkout.jsx` - checkout and payment selection
- `app/order-tracking/[id].jsx` - live-style order status
- `app/(tabs)/rewards.jsx` - reward points and tiers
- `app/(tabs)/profile.jsx` - user profile
- `app/settings.jsx` - app settings

## State Stores

| Store | Purpose |
| --- | --- |
| `authStore` | User session and profile state |
| `cartStore` | Cart items, quantities, subtotal, tax, and total |
| `ordersStore` | Order history and tracking state |
| `onboardingStore` | First-run onboarding completion |

## Public Assets

The project demo video lives at:

```text
public/CoffeeAppVideo.mp4
```

## License

This project is private and currently does not include a license.