#!/bin/bash


cat << 'EOF' > README.md
# Journaling App


A React Native journaling app that allows users to record daily entries with moods, photos, and timestamps. The app features a dashboard with insights into journaling habits, including mood distribution, time of day analysis, and calendar-based streak tracking. Built with React Native, Redux for state management, and Expo for development.


## Features Overview


- **Journal Entries**:
  - Add entries with text, mood, and optional photos via a modal.
  - View entries grouped by date with timestamps and mood indicators.
  - Delete entries with a single tap.
- **Dashboard**:
  - **Insights Tab**: Displays stats like total entries, streak days, most common mood, and average entries per day. Includes bar charts for mood distribution and time of day analysis.
  - **Calendar Tab**: Visualizes journaling activity with a monthly calendar, consistency bar, and frequency stats.
- **State Management**:
  - Uses Redux Toolkit for managing journal entries.
  - Persists entries using AsyncStorage.
- **Theming**:
  - Consistent styling with a centralized theme (\`src/constants/theme.js\`).
  - Mood-specific colors for better visualization.
- **Error Handling**:
  - Robust checks to prevent errors like \`TypeError: Cannot convert undefined value to object\`.
  - Loading states and empty state UI for better user experience.


## Setup and Installation Instructions


### Prerequisites


- **Node.js**: Version 16.x or higher.
- **npm** or **yarn**: For package management.
- **Expo CLI**: Install globally with \`npm install -g expo-cli\`.
- **Expo Go**: App on your mobile device for testing (available on iOS and Android).
- **Android Studio** or **Xcode**: For running the app on a simulator/emulator (optional).


### Installation Steps


1. **Clone the Repository**:
   \`\`\`bash
   git clone https://github.com/your-username/journaling-app.git
   cd journaling-app
   \`\`\`


2. **Install Dependencies**:
   Using npm:
   \`\`\`bash
   npm install
   \`\`\`
   Or using yarn:
   \`\`\`bash
   yarn install
   \`\`\`


3. **Start the Expo Development Server**:
   \`\`\`bash
   npx expo start
   \`\`\`
   - Scan the QR code with the Expo Go app on your mobile device to run the app.
   - Alternatively, press \`a\` to run on an Android emulator or \`i\` to run on an iOS simulator (requires Android Studio or Xcode setup).


4. **Clear Cache (Optional)**:
   If you encounter issues, clear the Expo cache and restart:
   \`\`\`bash
   npx expo start --clear
   \`\`\`


## Design Decisions and Architecture Explanation


### Design Decisions


- **Feature-Based Structure**:
  - The codebase is organized by feature (\`journal/\` and \`dashboard/\`) rather than type (e.g., all components in one folder). This improves scalability and makes it easier to locate related files when working on a specific feature.
- **Centralized Theming**:
  - A \`theme.js\` file in \`src/constants/\` defines colors, sizes, fonts, and shadows. This ensures consistency across the app and makes it easy to update the design globally.
- **Custom Hook for Entries**:
  - The \`useEntries.js\` hook encapsulates entry-related logic (loading, adding, deleting, grouping). This reduces code duplication and makes the screens cleaner and more focused on rendering.
- **Modal for Entry Creation**:
  - Adding entries via a modal (\`AddEntryModal.js\`) provides a focused and distraction-free input experience. The modal uses \`KeyboardAvoidingView\` to handle keyboard behavior across platforms.
- **Mood-Specific Colors**:
  - Each mood (e.g., Happy, Sad) has a unique color defined in \`moods.js\`. This enhances the visual representation of moods in entries and charts, making the app more intuitive.


### Architecture Explanation


- **State Management**:
  - **Redux Toolkit** is used to manage journal entries in a centralized store (\`src/redux/\`). The \`journalSlice.js\` defines actions (\`addEntry\`, \`deleteEntry\`) and persists data to AsyncStorage after each action using \`extraReducers\`.
  - **AsyncStorage** (\`src/utils/storage.js\`) ensures entries persist across app restarts, providing a seamless user experience.
- **Navigation**:
  - **React Navigation** is used for a bottom tab navigator (\`src/navigation/AppNavigator.js\`) to switch between \`JournalListScreen\` and \`DashboardScreen\`. The tab bar is customized with icons and labels for better usability.
- **Component Structure**:
  - **Screens** (\`src/screens/\`): Each screen (\`JournalListScreen\`, \`DashboardScreen\`) is a high-level component that orchestrates the UI for a specific route.
  - **Components** (\`src/components/\`):
    - \`journal/\`: Components specific to the Journal feature (e.g., \`EntryCard\`, \`MoodSelector\`).
    - \`dashboard/\`: Components specific to the Dashboard feature (e.g., \`BarChart\`, \`CalendarStreak\`).
    - \`common/\`: Generic components reusable across features (planned but not implemented yet).
  - **Hooks** (\`src/hooks/\`): Custom hooks like \`useEntries.js\` encapsulate stateful logic, making screens more declarative.
- **Utilities** (\`src/utils/\`):
  - \`storage.js\`: Handles AsyncStorage operations.
  - \`dateUtils.js\`: Provides date formatting functions (e.g., \`formatDate\`, \`formatTime\`) to ensure consistent date display.
- **Constants** (\`src/constants/\`):
  - \`theme.js\`: Centralized styling constants.
  - \`moods.js\`: Defines mood options with names, emojis, and colors.




## Known Limitations and Future Improvements


### Known Limitations


- **Date Selection**:
  - The app currently assigns entries to the current date. Users cannot select a custom date for entries.
- **Calendar Streak**:
  - The \`CalendarStreak.js\` component shows the current month but doesn't allow navigation to previous or next months.
- **Testing**:
  - Unit and integration tests are not implemented yet, which could help catch bugs early.
- **Performance**:
  - For a large number of entries, the \`FlatList\` in \`JournalListScreen\` might experience performance issues. Virtualization is used, but further optimization (e.g., memoization) may be needed.
- **Accessibility**:
  - Accessibility features (e.g., screen reader support, high-contrast mode) are not fully implemented.


### Future Improvements


- Add a date picker to the \`AddEntryModal\` for selecting custom dates.
- Implement user authentication for multi-user support.
- Add notifications to remind users to journal daily.
- Include a search feature to filter journal entries by date or mood.
- Add unit and integration tests for critical components using Jest and \`@testing-library/react-native\`.
- Optimize performance for large datasets by memoizing components and using pagination in the \`FlatList\`.
- Improve accessibility by adding ARIA labels, supporting dynamic font scaling, and ensuring high-contrast visuals.


