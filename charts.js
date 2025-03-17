// Global object to track chart instances
window.chartInstances = {};

// Function to destroy chart if it exists
function destroyChartIfExists(id) {
    if (window.chartInstances[id]) {
        console.log(`Destroying existing chart: ${id}`);
        try {
            window.chartInstances[id].destroy();
        } catch (error) {
            console.warn(`Error destroying chart ${id}:`, error);
        }
        window.chartInstances[id] = null;
    }
}

// Use DOMContentLoaded to set up initial page structure
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded, setting up page...");
    
    // Check if Chart.js is loaded with a retry mechanism
    checkChartJsAndInitialize();
});

// Function to check if Chart.js is loaded and initialize charts
function checkChartJsAndInitialize() {
    console.log("Checking if Chart.js is loaded...");
    
    // If Chart.js is already loaded, initialize charts immediately
    if (typeof Chart !== 'undefined') {
        console.log("Chart.js is loaded, initializing charts...");
        initCharts();
        return;
    }
    
    console.log("Chart.js not loaded yet, setting up retry...");
    
    // Set up a retry mechanism
    let retryCount = 0;
    const maxRetries = 5;
    const retryInterval = 500; // 500ms between retries
    
    const retryTimer = setInterval(function() {
        retryCount++;
        console.log(`Retry attempt ${retryCount} to load Chart.js...`);
        
        if (typeof Chart !== 'undefined') {
            console.log("Chart.js loaded successfully on retry!");
            clearInterval(retryTimer);
            initCharts();
        } else if (retryCount >= maxRetries) {
            console.error(`Failed to load Chart.js after ${maxRetries} attempts`);
            clearInterval(retryTimer);
            // Show error messages for all charts
            document.querySelectorAll('[id$="-error"]').forEach(el => {
                el.style.display = 'flex';
            });
        }
    }, retryInterval);
}

// Chart initialization
function initCharts() {
    // Set default Chart.js options
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#5f6368';
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(26, 115, 232, 0.9)';
    Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
    Chart.defaults.plugins.tooltip.bodyColor = '#ffffff';
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.padding = 15;
    
    // Set elegant animation defaults for all charts
    Chart.defaults.animation = {
        duration: 1200,
        easing: 'easeOutCubic',
        delay: function(context) {
            // Stagger animations for multiple datasets
            return context.datasetIndex * 100;
        },
        mode: 'fadeIn'
    };
    
    // Initialize all charts
    initBrandHealthCharts();
    initVisitorInsightsCharts();
    initNightlifeCharts();
    initCampaignCharts();
}

// Brand Health Charts
function initBrandHealthCharts() {
    try {
        console.log("Starting Brand Health charts initialization...");
        
        // Brand Metrics Trend Chart
        try {
            createLineChart('brandMetricsChart',
                ['Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24'],
                [
                    {
                        label: 'Awareness',
                        data: [58, 63, 65, 68, 70, 72, 71, 72],
                        color: '#1a73e8'
                    },
                    {
                        label: 'Consideration',
                        data: [52, 55, 58, 60, 62, 64, 65, 65],
                        color: '#34a853'
                    },
                    {
                        label: 'Intent',
                        data: [48, 52, 55, 57, 59, 60, 61, 62],
                        color: '#fbbc04'
                    },
                    {
                        label: 'Visitation',
                        data: [32, 39, 42, 45, 48, 52, 55, 58],
                        color: '#ea4335'
                    }
                ]
            );
        } catch (error) {
            console.error("[error] Error creating chart brandMetricsChart:", error);
            const errorElement = document.getElementById('brandMetricsChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Marketing Funnel Chart
        try {
            createHorizontalBarChart('funnelChart',
                ['Awareness', 'Consideration', 'Intent', 'Visitation'],
                [72, 65, 62, 58],
                ['#1a73e8', '#34a853', '#fbbc04', '#ea4335']
            );
        } catch (error) {
            console.error("[error] Error creating chart funnelChart:", error);
            const errorElement = document.getElementById('funnelChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Brand Perception Strengths Chart
        try {
            createRadarChart('brandPerceptionChart',
                ['Cultural Depth', 'Sports Events', 'Beautiful Beaches', 'Interesting Museums', 'Family Friendly', 'Luxury'],
                [
                    {
                        label: 'Abu Dhabi',
                        data: [72, 71, 70, 69, 68, 65],
                        color: '#1a73e8'
                    },
                    {
                        label: 'Dubai',
                        data: [58, 68, 72, 60, 65, 78],
                        color: '#ea4335'
                    }
                ]
            );
        } catch (error) {
            console.error("[error] Error creating chart brandPerceptionChart:", error);
            const errorElement = document.getElementById('brandPerceptionChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Competitive Positioning Chart
        try {
            createBarChart('competitiveChart',
                ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ras Al Khaimah', 'Fujairah'],
                [
                    {
                        label: 'Ad Awareness',
                        data: [72, 85, 42, 38, 25],
                        color: '#1a73e8'
                    },
                    {
                        label: 'Visitation',
                        data: [58, 76, 35, 30, 22],
                        color: '#34a853'
                    }
                ]
            );
        } catch (error) {
            console.error("[error] Error creating chart competitiveChart:", error);
            const errorElement = document.getElementById('competitiveChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        console.log("Brand Health charts initialization completed");
    } catch (error) {
        console.error("Error in initBrandHealthCharts:", error);
    }
}

// Visitor Insights Charts
function initVisitorInsightsCharts() {
    try {
        console.log("Starting Visitor Insights charts initialization...");
        
        // Visitor Origin Chart
        try {
            createPieChart('visitorOriginChart',
                ['Dubai', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Fujairah', 'Umm Al Quwain'],
                [70, 26, 2, 1, 0.5, 0.5],
                [
                    '#1a73e8', // Dubai - Primary blue
                    '#34a853', // Sharjah - Green
                    '#fbbc04', // RAK - Yellow
                    '#ea4335', // Ajman - Red
                    '#673ab7', // Fujairah - Purple
                    '#00bcd4'  // UAQ - Cyan
                ]
            );
        } catch (error) {
            console.error("[error] Error creating enhanced pie chart visitorOriginChart:", error);
            const errorElement = document.getElementById('visitorOriginChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Visitor Demographics Chart
        try {
            createStackedBarChart('visitorDemographicsChart',
                ['18-24', '25-34', '35-44', '45-54', '55+'],
                [
                    {
                        label: 'Male',
                        data: [8, 15, 18, 12, 9],
                        color: '#1a73e8'
                    },
                    {
                        label: 'Female',
                        data: [5, 10, 11, 7, 5],
                        color: '#ea4335'
                    }
                ]
            );
        } catch (error) {
            console.error("[error] Error creating enhanced stacked bar chart visitorDemographicsChart:", error);
            const errorElement = document.getElementById('visitorDemographicsChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Stay Duration Trend Chart
        try {
            createLineChart('stayDurationChart', 
                ['2021', '2022', '2023', '2024'],
                [
                    {
                        label: 'Same-day Visitors',
                        data: [50, 55, 62, 67],
                        color: '#1a73e8'
                    },
                    {
                        label: 'Overnight Visitors',
                        data: [50, 45, 38, 33],
                        color: '#ea4335'
                    }
                ]
            );
        } catch (error) {
            console.error("[error] Error creating enhanced chart stayDurationChart:", error);
            const errorElement = document.getElementById('stayDurationChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Information Sources Chart
        try {
            createHorizontalBarChart('infoSourcesChart',
                ['Instagram', 'Facebook', 'Search Engines', 'TikTok', 'Friends/Family', 'YouTube', 'Travel Websites', 'Twitter/X'],
                [61, 60, 59, 44, 42, 38, 35, 28],
                [
                    '#1a73e8', // Instagram - Blue
                    '#3b5998', // Facebook - Facebook blue
                    '#34a853', // Search Engines - Green
                    '#ee1d52', // TikTok - TikTok red
                    '#673ab7', // Friends/Family - Purple
                    '#ff0000', // YouTube - YouTube red
                    '#fbbc04', // Travel Websites - Yellow
                    '#1da1f2'  // Twitter/X - Twitter blue
                ]
            );
        } catch (error) {
            console.error("[error] Error creating enhanced horizontal bar chart infoSourcesChart:", error);
            const errorElement = document.getElementById('infoSourcesChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        console.log("Visitor Insights charts initialization completed");
    } catch (error) {
        console.error("Error in initVisitorInsightsCharts:", error);
    }
}

// Nightlife Charts
function initNightlifeCharts() {
    try {
        console.log("Starting Nightlife charts initialization...");
        
        // Nightlife Leakage Chart
        try {
            createMixedChart('nightlifeLeakageChart',
                ['Emiratis', 'Westerners', 'Arabs', 'Asians', 'Overall'],
                [
                    {
                        label: 'Nightlife Importance',
                        data: [78, 77, 65, 58, 68],
                        color: '#1a73e8',
                        type: 'bar'
                    },
                    {
                        label: 'Dubai Leakage Rate',
                        data: [75, 92, 68, 55, 72],
                        color: '#ea4335',
                        type: 'line'
                    }
                ]
            );
        } catch (error) {
            console.error("[error] Error creating chart nightlifeLeakageChart:", error);
            const errorElement = document.getElementById('nightlifeLeakageChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Nightlife Spending Chart
        try {
            createBarChart('nightlifeSpendingChart',
                ['Abu Dhabi', 'Dubai'],
                [436, 591],
                ['#1a73e8', '#ea4335'],
                false,
                'AED'
            );
        } catch (error) {
            console.error("[error] Error creating chart nightlifeSpendingChart:", error);
            const errorElement = document.getElementById('nightlifeSpendingChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Nightlife Motivators Chart
        try {
            createHorizontalBarChart('nightlifeMotivatorsChart',
                ['Wider variety of venues', 'More vibrant atmosphere', 'More affordable venues', 'Better transportation options', 'More international DJs/artists', 'Later opening hours'],
                [48, 46, 42, 38, 35, 32],
                [
                    '#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#673ab7', '#00bcd4'
                ]
            );
        } catch (error) {
            console.error("[error] Error creating chart nightlifeMotivatorsChart:", error);
            const errorElement = document.getElementById('nightlifeMotivatorsChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Overnight Stay Rate Chart
        try {
            createDoughnutChart('overnightStayChart',
                ['Stay Overnight', 'Return Same Day'],
                [66, 34],
                ['#1a73e8', '#ea4335']
            );
        } catch (error) {
            console.error("[error] Error creating chart overnightStayChart:", error);
            const errorElement = document.getElementById('overnightStayChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        console.log("Nightlife charts initialization completed");
    } catch (error) {
        console.error("Error in initNightlifeCharts:", error);
    }
}

// Campaign Charts
function initCampaignCharts() {
    try {
        console.log("Starting Campaign charts initialization...");
        
        // Campaign Recognition Rates Chart
        try {
            createBarChart('campaignRecognitionChart',
                ['Global Brand Ambassador', 'Cultural Heritage Campaign', 'Industry Benchmark'],
                [49, 31, 33],
                ['#1a73e8', '#34a853', '#fbbc04'],
                false,
                '%'
            );
        } catch (error) {
            console.error("[error] Error creating chart campaignRecognitionChart:", error);
            const errorElement = document.getElementById('campaignRecognitionChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Quarterly Awareness Growth Chart
        try {
            createLineChart('quarterlyAwarenessChart',
                ['Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24'],
                [
                    {
                        label: 'Spontaneous Awareness',
                        data: [27, 39, 42, 45, 48, 58, 63, 72],
                        color: '#1a73e8'
                    }
                ]
            );
        } catch (error) {
            console.error("[error] Error creating chart quarterlyAwarenessChart:", error);
            const errorElement = document.getElementById('quarterlyAwarenessChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Campaign Appeal Ratings Chart
        try {
            createStackedBarChart('campaignAppealChart',
                ['18-24', '25-34', '35-44', '45+'],
                [
                    {
                        label: 'Global Brand Ambassador',
                        data: [65, 72, 58, 52],
                        color: '#1a73e8'
                    },
                    {
                        label: 'Cultural Heritage Campaign',
                        data: [42, 48, 59, 68],
                        color: '#34a853'
                    }
                ]
            );
        } catch (error) {
            console.error("[error] Error creating chart campaignAppealChart:", error);
            const errorElement = document.getElementById('campaignAppealChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Media Channel Effectiveness Chart
        try {
            createRadarChart('mediaChannelChart',
                ['Reach', 'Engagement', 'Conversion', 'ROI', 'Brand Lift'],
                [
                    {
                        label: 'Social Media',
                        data: [85, 78, 72, 88, 76],
                        color: '#1a73e8'
                    },
                    {
                        label: 'Search',
                        data: [72, 65, 80, 82, 70],
                        color: '#34a853'
                    },
                    {
                        label: 'Traditional Media',
                        data: [68, 45, 52, 48, 58],
                        color: '#fbbc04'
                    }
                ]
            );
        } catch (error) {
            console.error("[error] Error creating chart mediaChannelChart:", error);
            const errorElement = document.getElementById('mediaChannelChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        console.log("Campaign charts initialization completed");
    } catch (error) {
        console.error("Error in initCampaignCharts:", error);
    }
}

// Helper functions for creating charts
function createPieChart(id, labels, data, colors) {
    try {
        // Hide loading indicator and show canvas
        const loadingElement = document.getElementById(`${id}-loading`);
        const errorElement = document.getElementById(`${id}-error`);
        
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';
        
        const canvas = document.getElementById(id);
        if (!canvas) {
            console.error(`Canvas element with id ${id} not found`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error(`Could not get 2D context for canvas ${id}`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
        
        console.log(`Chart ${id} created successfully`);
    } catch (error) {
        console.error(`[error] Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

function createDoughnutChart(id, labels, data, colors) {
    try {
        // Hide loading indicator and show canvas
        const loadingElement = document.getElementById(`${id}-loading`);
        const errorElement = document.getElementById(`${id}-error`);
        
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';
        
        const canvas = document.getElementById(id);
        if (!canvas) {
            console.error(`Canvas element with id ${id} not found`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error(`Could not get 2D context for canvas ${id}`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
        
        console.log(`Chart ${id} created successfully`);
    } catch (error) {
        console.error(`[error] Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

function createStackedBarChart(id, labels, datasets) {
    try {
        // Hide loading indicator and show canvas
        const loadingElement = document.getElementById(`${id}-loading`);
        const errorElement = document.getElementById(`${id}-error`);
        
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';
        
        const canvas = document.getElementById(id);
        if (!canvas) {
            console.error(`Canvas element with id ${id} not found`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error(`Could not get 2D context for canvas ${id}`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        const chartDatasets = datasets.map(dataset => ({
            label: dataset.label,
            data: dataset.data,
            backgroundColor: dataset.color + 'CC', // 80% opacity
            borderColor: dataset.color,
            borderWidth: 1,
            stack: 'Stack 0'
        }));
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: chartDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        max: 30,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
        
        console.log(`Chart ${id} created successfully`);
    } catch (error) {
        console.error(`[error] Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

function createLineChart(id, labels, datasets) {
    try {
        // Hide loading indicator and show canvas
        const loadingElement = document.getElementById(`${id}-loading`);
        const errorElement = document.getElementById(`${id}-error`);
        
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';
        
        const canvas = document.getElementById(id);
        if (!canvas) {
            console.error(`Canvas element with id ${id} not found`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error(`Could not get 2D context for canvas ${id}`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        const chartDatasets = datasets.map(dataset => ({
            label: dataset.label,
            data: dataset.data,
            borderColor: dataset.color,
            backgroundColor: `${dataset.color}1A`, // 10% opacity
            tension: 0.3,
            fill: true
        }));
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: chartDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        display: datasets.length > 1
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index) {
                                return labels[index];
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
        
        console.log(`Chart ${id} created successfully`);
    } catch (error) {
        console.error(`[error] Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

function createHorizontalBarChart(id, labels, data, colors) {
    try {
        // Hide loading indicator and show canvas
        const loadingElement = document.getElementById(`${id}-loading`);
        const errorElement = document.getElementById(`${id}-error`);
        
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';
        
        const canvas = document.getElementById(id);
        if (!canvas) {
            console.error(`Canvas element with id ${id} not found`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error(`Could not get 2D context for canvas ${id}`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        // Sort data if needed
        const pairs = labels.map((label, i) => [label, data[i], colors[i]]);
        pairs.sort((a, b) => b[1] - a[1]);
        
        const sortedLabels = pairs.map(pair => pair[0]);
        const sortedData = pairs.map(pair => pair[1]);
        const sortedColors = pairs.map(pair => pair[2]);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedLabels,
                datasets: [{
                    label: 'Value',
                    data: sortedData,
                    backgroundColor: sortedColors,
                    borderColor: sortedColors,
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.x + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
        
        console.log(`Chart ${id} created successfully`);
    } catch (error) {
        console.error(`[error] Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

function createBarChart(id, labels, data, colors, horizontal = false, unit = '%') {
    try {
        // Hide loading indicator and show canvas
        const loadingElement = document.getElementById(`${id}-loading`);
        const errorElement = document.getElementById(`${id}-error`);
        
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';
        
        const canvas = document.getElementById(id);
        if (!canvas) {
            console.error(`Canvas element with id ${id} not found`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error(`Could not get 2D context for canvas ${id}`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        // Prepare data
        let chartData;
        if (Array.isArray(data) && !Array.isArray(data[0])) {
            // Single dataset
            chartData = {
                labels: labels,
                datasets: [{
                    label: 'Value',
                    data: data,
                    backgroundColor: colors.map(color => color + 'CC'),
                    borderColor: colors,
                    borderWidth: 1
                }]
            };
        } else {
            // Multiple datasets
            chartData = {
                labels: labels,
                datasets: data.map((dataset, index) => ({
                    label: dataset.label,
                    data: dataset.data,
                    backgroundColor: dataset.color + 'CC',
                    borderColor: dataset.color,
                    borderWidth: 1
                }))
            };
        }
        
        // Determine max value for y-axis
        let maxValue = 100;
        if (unit === 'AED') {
            maxValue = Math.max(...data) * 1.2; // 20% headroom
        }
        
        new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                indexAxis: horizontal ? 'y' : 'x',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: Array.isArray(data[0])
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = horizontal ? context.parsed.x : context.parsed.y;
                                return (context.dataset.label || 'Value') + ': ' + (unit === 'AED' ? 'AED ' : '') + value + (unit === '%' ? '%' : '');
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ...(horizontal && {
                            max: maxValue,
                            ticks: {
                                callback: function(value) {
                                    return (unit === 'AED' ? 'AED ' : '') + value + (unit === '%' ? '%' : '');
                                }
                            }
                        })
                    },
                    y: {
                        beginAtZero: true,
                        ...(!horizontal && {
                            max: maxValue,
                            ticks: {
                                callback: function(value) {
                                    return (unit === 'AED' ? 'AED ' : '') + value + (unit === '%' ? '%' : '');
                                }
                            }
                        })
                    }
                }
            }
        });
        
        console.log(`Chart ${id} created successfully`);
    } catch (error) {
        console.error(`[error] Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

function createMixedChart(id, labels, datasets) {
    try {
        // Hide loading indicator and show canvas
        const loadingElement = document.getElementById(`${id}-loading`);
        const errorElement = document.getElementById(`${id}-error`);
        
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';
        
        const canvas = document.getElementById(id);
        if (!canvas) {
            console.error(`Canvas element with id ${id} not found`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error(`Could not get 2D context for canvas ${id}`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        // Prepare datasets with appropriate styling
        const chartDatasets = datasets.map(dataset => {
            if (dataset.type === 'line') {
                return {
                    label: dataset.label,
                    data: dataset.data,
                    borderColor: dataset.color,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    tension: 0.3,
                    type: 'line',
                    pointBackgroundColor: dataset.color,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    order: 0 // Ensure line appears on top of bars
                };
            } else {
                return {
                    label: dataset.label,
                    data: dataset.data,
                    backgroundColor: dataset.color + 'CC', // 80% opacity
                    borderColor: dataset.color,
                    borderWidth: 1,
                    type: 'bar',
                    order: 1
                };
            }
        });
        
        new Chart(ctx, {
            type: 'bar', // Base type, individual datasets can override
            data: {
                labels: labels,
                datasets: chartDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
        
        console.log(`Chart ${id} created successfully`);
    } catch (error) {
        console.error(`[error] Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

function createRadarChart(id, labels, datasets) {
    try {
        // Hide loading indicator and show canvas
        const loadingElement = document.getElementById(`${id}-loading`);
        const errorElement = document.getElementById(`${id}-error`);
        
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';
        
        const canvas = document.getElementById(id);
        if (!canvas) {
            console.error(`Canvas element with id ${id} not found`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error(`Could not get 2D context for canvas ${id}`);
            if (errorElement) errorElement.style.display = 'flex';
            return;
        }
        
        // Prepare datasets with appropriate styling
        const chartDatasets = datasets.map(dataset => ({
            label: dataset.label,
            data: dataset.data,
            borderColor: dataset.color,
            backgroundColor: dataset.color + '33', // 20% opacity
            borderWidth: 2,
            pointBackgroundColor: dataset.color,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }));
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: chartDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#c0c0c0'
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: '#777777',
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
        
        console.log(`Chart ${id} created successfully`);
    } catch (error) {
        console.error(`[error] Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section, hide others
            sections.forEach(section => {
                if (section.id === target) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
            
            // Log the tab change
            console.log(`Tab changed to: ${target}`);
        });
    });
});
