# Scout Technical Exercise: Ecommerce Funnel

## Demo
https://github.com/user-attachments/assets/89f880ed-ec8f-4b76-981a-4ffc2417eed6

## Overview

This project implements a funnel visualization component that retrieves data from a newly set up API endpoint, processes it, and renders a tapered funnel with relevant user event metrics. The component follows the design specification for displaying the funnel steps and their relative conversion rates. The following deliverables were achieved as part of the implementation:

## Deliverables

### 1. Set Up New API Endpoint

**Objective**: A new API endpoint was created to return the required funnel data.

**Implementation**:
- A new GET endpoint was exposed, which fetches the necessary funnel data by consuming methods in the `EntityCommerceUserEventService` class.
- The endpoint provides the number of events for each funnel step, which is required for further data visualization.
- Referenced `RecentOrdersSection.tsx` for understanding the full-stack data flow, with specific focus on how the API is consumed.

### 2. Consume New API Endpoint

**Objective**: Fetch data from the newly created API endpoint on the client side.

**Implementation**:
- The client component `FunnelDetailsSection.tsx` was updated to call the new API endpoint and retrieve the funnel data.
- Appropriate error handling was implemented to ensure data is fetched correctly from the backend.

### 3. Render Funnel Steps

**Objective**: Render the funnel steps visually, showing the necessary information and conversion factors.

**Implementation**:
- **Funnel Steps**: Four user funnel steps were rendered in the following order:
  1. **Session**
  2. **Product View**
  3. **Checkout**
  4. **Purchase**
  
- For each funnel step, the following were displayed:
  - **Label**: e.g., “Product Views”
  - **Total Number of Events**: e.g., “1,131”
  - **Relative Conversion Factor**: e.g., “(65.3%)”
  - **Tapered Rectangle**: A rectangle is rendered to scale according to the conversion factor of the current step relative to the previous one.
    - The tapered rectangle dynamically adjusts its height based on the calculated conversion factor and is vertically centered for a uniform display.
    
  The equation used for calculating the conversion factor is: Conversion Factor = (Current Step Events) / (Previous Step Events)

- **Design Colors**: The color scheme for the funnel was designed using varying shades of blue, with the darkest blue representing the initial step and lighter shades used for subsequent steps.

### 4. Render e2e Conversion Rate

**Objective**: Display the end-to-end conversion rate at the final funnel step.

**Implementation**:
- The conversion rate is calculated using the following formula: End-to-End Conversion Rate = (Events at Final Step) / (Events at First Step)

- This conversion rate is displayed at the bottom-right corner of the final funnel step for easy visibility.

## Constraints

- The number of events at each funnel step can range from 0 to 10,000 events.
- The task was to implement the feature without adding any new dependencies or libraries.

## Notes

- This solution was implemented with a focus on engineering rigor and clarity. The approach was flexible and intended to adapt based on the specific requirements of the task.
- The implementation is modular and can be extended or modified for future requirements if needed.
