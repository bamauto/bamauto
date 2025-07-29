---
name: jump-plan-recommender
description: A Material Design 3 modal component that calculates and recommends optimal jump intervals based on user inputs and selected operation strategies.
keywords: modal, popup, calculator, recommendation, material design, form, radio buttons
---

#### Jump Plan Recommender

***Purpose:***
A customizable modal popup that helps users calculate the optimal jump interval based on their available jump count and preferred operation strategy, following Material Design 3 principles.

***Features:***
- Clean Material Design 3 UI with proper spacing, typography, and color usage
- Input field for entering current jump count
- Three operation strategy options with radio button selection
- Real-time calculation of recommended jump interval and operation duration
- Responsive design that works on various screen sizes
- Customizable primary color to match your site's theme

***Properties:***
- initialJumpCount: number - Sets the default value for the jump count input (default: 500)
- initialOption: 'fast'|'steady'|'peak' - Sets the default selected operation strategy (default: 'steady')
- primaryColor: string - Sets the primary accent color for the component (default: '#6750A4')

***Events:***
- open: Triggered when the modal is opened. No payload
- close: Triggered when the modal is closed. No payload
- confirm: Triggered when the user confirms the recommendation. Payload: { jumpCount: number, option: string, interval: number, duration: { days: number, hours: number, minutes: number } }
- reset: Triggered when the user resets the form. No payload

***Exposed Actions:***
- `openModal`: Opens the recommendation modal. No arguments
- `closeModal`: Closes the recommendation modal. No arguments
- `resetForm`: Resets the form to initial values. No arguments

***Exposed Variables:***
- resultInterval: The calculated jump interval in minutes (path: variables['current_element_uid-resultInterval'])
- resultDuration: ***READ ONLY*** The calculated operation duration object with days, hours, and minutes (path: variables['current_element_uid-resultDuration'])

***Notes:***
- The component automatically calculates recommendations based on the selected strategy:
  - Fast Consumption: Optimized for 7-day operation
  - Steady Operation: Optimized for 30-day operation
  - Peak Time Focus: Optimized for 14-day operation with 4 hours per day
- All text is in Korean by default, matching the provided design
- The modal can be triggered programmatically using the openModal action