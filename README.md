#  Wearable Health Dashboard

A responsive, React-based dashboard that simulates and visualizes wearable health device data. This project demonstrates data visualization, anomaly detection, and interactive UI design using modern web technologies.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📋 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

##  About
This application simulates a fitness tracker interface. It generates realistic "fake" data for Steps and Heart Rate over a 14-day period. It is designed to demonstrate how to handle time-series data, calculate summary statistics (Average, Min, Max), and visualize trends using interactive charts.

##  Features

* **Interactive Visualization:** Dynamic line charts using `Recharts` with custom tooltips.
* **Metric Toggling:** Switch seamlessly between **Steps** and **Heart Rate** views.
* **Time Range Filtering:** Toggle between "Last 7 Days" and "Last 14 Days".
* **Anomaly Detection:** Automatically flags and highlights abnormal heart rate spikes (simulated data > 100bpm) with visual alerts.
* **Summary Statistics:** Real-time calculation of averages, maximums, and minimums based on the selected time range.
* **Responsive Design:** Fully responsive layout built with Tailwind CSS that works on mobile and desktop.
* **Detailed Data Table:** A tabular view of the daily metrics with status indicators.

<img width="1918" height="881" alt="image" src="https://github.com/user-attachments/assets/ee8bea39-88c3-43e7-a99a-cdf09ac80d8c" />

<img width="1919" height="871" alt="image" src="https://github.com/user-attachments/assets/e8dcef18-18bc-49a6-9e18-a0c63c3387b6" />

<img width="1919" height="786" alt="image" src="https://github.com/user-attachments/assets/cddc733e-e21d-43a5-8347-9b8388d72b35" />

<img width="1123" height="861" alt="image" src="https://github.com/user-attachments/assets/0f23614d-6298-4b8c-8616-841add17d009" />

<img width="1066" height="708" alt="image" src="https://github.com/user-attachments/assets/73484044-a7b3-455e-8c94-15108fe31dc1" />


##  Tech Stack

* **Framework:** [React](https://reactjs.org/) (bootstrapped with [Vite](https://vitejs.dev/))
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Charts:** [Recharts](https://recharts.org/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Linting:** ESLint

##  Getting Started

Follow these steps to run the project locally.

### Prerequisites
Make sure you have **Node.js** installed on your machine.

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/haifaafridi/Wearable-Health-Dashboard-React-Fake-Data-.git](https://github.com/haifaafridi/Wearable-Health-Dashboard-React-Fake-Data-.git)
    ```

2.  **Navigate to the project directory**
    ```bash
    cd Wearable-Health-Dashboard-React-Fake-Data-
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to the local URL shown in the terminal (usually `http://localhost:5173`).

## 📂 Project Structure

```text

├── public/              # Static assets
├── src/
│   ├── assets/          # Images and icons
│   ├── App.jsx          # Main Dashboard Component (Logic & UI)
│   ├── App.css          # App-specific styles
│   ├── index.css        # Tailwind directives and global styles
│   └── main.jsx         # Entry point
├── .gitignore           # Git ignore rules
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration


🔮 Future Improvements
Connect to a real API (e.g., Google Fit or Fitbit API) instead of generateData().

Add user authentication to save data.

Add dark mode support.

Implement more chart types (Bar charts for weekly comparisons).

 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Made with ❤️ by Haifa Afridi
