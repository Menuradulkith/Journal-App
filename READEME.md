# 📱 Journaling App


## ✨ Features Overview

### 📝 Journal Entries
- Add entries with text, mood, and optional photos via a modal
- View entries grouped by date with timestamps and mood indicators
- Delete entries with a single tap

### 📊 Dashboard
- **Insights Tab**: Displays stats like total entries, streak days, most common mood, and average entries per day
- **Charts & Analysis**: Visualize mood distribution and time of day patterns through beautiful bar charts
- **Calendar Tab**: Track journaling activity with a monthly calendar, consistency bar, and frequency stats

### 🔄 State Management
- Uses Redux Toolkit for managing journal entries
- Persists entries using AsyncStorage

### 🎨 Theming
- Consistent styling with a centralized theme (`src/constants/theme.js`)
- Mood-specific colors for better visualization

### 🛡️ Error Handling
- Robust checks to prevent errors like `TypeError: Cannot convert undefined value to object`
- Loading states and empty state UI for better user experience

## 🚀 Setup and Installation

### Prerequisites

- **Node.js**: Version 16.x or higher
- **npm** or **yarn**: For package management
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- **Expo Go**: App on your mobile device for testing (available on iOS and Android)
- **Android Studio** or **Xcode**: For running the app on a simulator/emulator (optional)

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/journaling-app.git
   cd journaling-app
   ```

2. **Install Dependencies**:
   ```bash
   # Using npm
   npm install

   # Or using yarn
   yarn install
   ```

3. **Start the Expo Development Server**:
   ```bash
   npx expo start
   ```
   - Scan the QR code with the Expo Go app on your mobile device
   - Or press `a` for Android emulator / `i` for iOS simulator

4. **Clear Cache (Optional)**:
   ```bash
   npx expo start --clear
   ```

## 🏗️ Design Decisions and Architecture

### Design Decisions

| Decision | Description |
|----------|-------------|
| **Feature-Based Structure** | Organized by feature (`journal/` and `dashboard/`) rather than type for better scalability |
| **Centralized Theming** | A `theme.js` file defines colors, sizes, fonts, and shadows for consistency |
| **Custom Hook for Entries** | `useEntries.js` hook encapsulates entry-related logic to reduce code duplication |
| **Modal for Entry Creation** | Modal provides focused input experience with keyboard handling |
| **Mood-Specific Colors** | Each mood has a unique color defined in `moods.js` for intuitive visual representation |

### Architecture Explanation

#### State Management
- **Redux Toolkit** for centralized state management (`src/redux/`)
- **AsyncStorage** for data persistence across app restarts

#### Navigation
- **React Navigation** with bottom tab navigator for switching between screens
- Customized tab bar with icons and labels

#### Component Structure
- **Screens** (`src/screens/`): High-level components for specific routes
- **Components** (`src/components/`):
  - `journal/`: Journal-specific components
  - `dashboard/`: Dashboard-specific components
  - `common/`: Reusable components (planned)
- **Hooks** (`src/hooks/`): Custom hooks like `useEntries.js`

#### Utilities & Constants
- **Utilities** (`src/utils/`): Storage and date formatting functions
- **Constants** (`src/constants/`): Theme and mood definitions

## 🔍 Known Limitations and Future Improvements

### Known Limitations
- No custom date selection for entries
- Calendar only shows current month
- Missing unit and integration tests
- Potential performance issues with large datasets
- Limited accessibility features

### Future Improvements

✅ **Planned Enhancements**:
- Add date picker for custom entry dates
- Implement user authentication
- Add daily journal reminders
- Include search functionality
- Add comprehensive testing
- Optimize performance for large datasets
- Improve accessibility features