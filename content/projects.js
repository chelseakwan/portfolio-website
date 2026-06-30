// Featured projects — shown in the Projects grid on the Work page.
// Each entry: { title, tools, date, bullets[] }
// `image` is optional and reserved for future use (not rendered in v1).

const projects = [
  {
    title: "Markowitz & SIM Stock Analysis",
    tools: "Excel, Data Analysis ToolPak",
    date: "Dec 2025",
    bullets: [
      "Computed Sharpe Ratios, CAPM regressions, and betas on daily and monthly frequencies.",
      "Built portfolios using Markowitz Mean-Variance Optimization and the Single Index Model.",
      "Constructed the efficient frontier and solved for the max-Sharpe tangency portfolio over a 5-asset universe.",
    ],
  },
  {
    title: "Abalone Predictive Modeling",
    tools: "Python, Sklearn, Pandas",
    date: "Nov 2025",
    bullets: [
      "Developed a linear regression model and KNN classifier to predict age on a 4,177-sample dataset.",
      "Standardized features and encoded the categorical sex variable for distance-based KNN modeling.",
      "Visualized performance via annotated heatmaps, regression scatter plots, and confusion matrices.",
    ],
  },
];

export default projects;
