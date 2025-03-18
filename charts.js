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
        
        // Competitive Positioning Chart - Direct implementation
        try {
            console.log("Creating competitive positioning chart directly...");
            
            // Hide loading indicator
            const loadingElement = document.getElementById('competitiveChart-loading');
            const errorElement = document.getElementById('competitiveChart-error');
            
            if (loadingElement) loadingElement.style.display = 'none';
            if (errorElement) errorElement.style.display = 'none';
            
            const canvas = document.getElementById('competitiveChart');
            if (!canvas) {
                console.error("Canvas element with id competitiveChart not found");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error("Could not get 2D context for canvas competitiveChart");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            // Create chart directly
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ras Al Khaimah', 'Fujairah'],
                    datasets: [
                        {
                            label: 'Ad Awareness',
                            data: [72, 85, 42, 38, 25],
                            backgroundColor: 'rgba(26, 115, 232, 0.8)',
                            borderColor: '#1a73e8',
                            borderWidth: 1
                        },
                        {
                            label: 'Visitation',
                            data: [58, 76, 35, 30, 22],
                            backgroundColor: 'rgba(52, 168, 83, 0.8)',
                            borderColor: '#34a853',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            display: true
                        },
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
            
            console.log("Competitive positioning chart created successfully");
        } catch (error) {
            console.error("[error] Error creating chart competitiveChart:", error);
            console.error("Error details:", error.message);
            console.error("Error stack:", error.stack);
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
        
        // Purpose of Visit Chart - Direct implementation
        try {
            console.log("Creating purpose of visit chart directly...");
            
            // Hide loading indicator
            const loadingElement = document.getElementById('visitPurposeChart-loading');
            const errorElement = document.getElementById('visitPurposeChart-error');
            
            if (loadingElement) loadingElement.style.display = 'none';
            if (errorElement) errorElement.style.display = 'none';
            
            const canvas = document.getElementById('visitPurposeChart');
            if (!canvas) {
                console.error("Canvas element with id visitPurposeChart not found");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error("Could not get 2D context for canvas visitPurposeChart");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            // Create chart directly with data from Destination Visitor Survey 2024
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Leisure', 'Business', 'VFR', 'B-Leisure', 'Other'],
                    datasets: [
                        {
                            label: 'Overall',
                            data: [35, 35, 22, 7, 1],
                            backgroundColor: 'rgba(26, 115, 232, 0.8)',
                            borderColor: '#1a73e8',
                            borderWidth: 1,
                            borderRadius: 4
                        },
                        {
                            label: 'Same-day Visitors',
                            data: [20, 53, 17, 8, 2],
                            backgroundColor: 'rgba(52, 168, 83, 0.8)',
                            borderColor: '#34a853',
                            borderWidth: 1,
                            borderRadius: 4
                        },
                        {
                            label: 'Overnight Visitors',
                            data: [56, 10, 29, 5, 0],
                            backgroundColor: 'rgba(251, 188, 4, 0.8)',
                            borderColor: '#fbbc04',
                            borderWidth: 1,
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            display: true
                        },
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
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            beginAtZero: true,
                            max: 60, // Slightly higher than max value for better visualization
                            grid: {
                                display: true,
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                },
                                color: '#c0c0c0'
                            },
                            title: {
                                display: true,
                                text: 'Percentage (%)',
                                color: '#c0c0c0',
                                font: {
                                    size: 12
                                }
                            }
                        }
                    }
                }
            });
            
            console.log("Purpose of visit chart created successfully");
        } catch (error) {
            console.error("[error] Error creating chart visitPurposeChart:", error);
            const errorElement = document.getElementById('visitPurposeChart-error');
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
        
        // Nightlife Spending Chart - Direct implementation
        try {
            console.log("Creating nightlife spending chart directly...");
            
            // Hide loading indicator
            const loadingElement = document.getElementById('nightlifeSpendingChart-loading');
            const errorElement = document.getElementById('nightlifeSpendingChart-error');
            
            if (loadingElement) loadingElement.style.display = 'none';
            if (errorElement) errorElement.style.display = 'none';
            
            const canvas = document.getElementById('nightlifeSpendingChart');
            if (!canvas) {
                console.error("Canvas element with id nightlifeSpendingChart not found");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error("Could not get 2D context for canvas nightlifeSpendingChart");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            // Create chart directly with verified data from Nightlife Survey Report
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Abu Dhabi', 'Dubai'],
                    datasets: [{
                        label: 'Average Spending per Person per Outing',
                        data: [436, 591],
                        backgroundColor: [
                            'rgba(26, 115, 232, 0.8)',  // Blue for Abu Dhabi
                            'rgba(234, 67, 53, 0.8)'    // Red for Dubai
                        ],
                        borderColor: [
                            '#1a73e8',
                            '#ea4335'
                        ],
                        borderWidth: 1,
                        borderRadius: 4,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false  // Hide legend for cleaner look
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': AED ' + context.parsed.y;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 700,  // Slightly higher than max value for better visualization
                            grid: {
                                display: true,
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return 'AED ' + value;
                                },
                                color: '#c0c0c0'
                            },
                            title: {
                                display: true,
                                text: 'Average Spending (AED)',
                                color: '#c0c0c0',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#c0c0c0'
                            }
                        }
                    }
                }
            });
            
            console.log("Nightlife spending chart created successfully");
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
        
        // Campaign Recognition Rates Chart - Direct implementation
        try {
            console.log("Creating campaign recognition rates chart directly...");
            
            // Hide loading indicator
            const loadingElement = document.getElementById('campaignRecognitionChart-loading');
            const errorElement = document.getElementById('campaignRecognitionChart-error');
            
            if (loadingElement) loadingElement.style.display = 'none';
            if (errorElement) errorElement.style.display = 'none';
            
            const canvas = document.getElementById('campaignRecognitionChart');
            if (!canvas) {
                console.error("Canvas element with id campaignRecognitionChart not found");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error("Could not get 2D context for canvas campaignRecognitionChart");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            // Create chart directly with verified data
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Global Brand Ambassador', 'Cultural Heritage Campaign', 'Industry Benchmark'],
                    datasets: [{
                        label: 'Recognition Rate',
                        data: [49, 31, 33],
                        backgroundColor: [
                            'rgba(26, 115, 232, 0.8)',  // Blue for Global Brand Ambassador
                            'rgba(52, 168, 83, 0.8)',   // Green for Cultural Heritage Campaign
                            'rgba(251, 188, 4, 0.8)'    // Yellow for Industry Benchmark
                        ],
                        borderColor: [
                            '#1a73e8',
                            '#34a853',
                            '#fbbc04'
                        ],
                        borderWidth: 1,
                        borderRadius: 4,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false  // Hide legend for cleaner look
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.y + '%';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 60,  // Slightly higher than max value for better visualization
                            grid: {
                                display: true,
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                },
                                color: '#c0c0c0'
                            },
                            title: {
                                display: true,
                                text: 'Recognition Rate (%)',
                                color: '#c0c0c0',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#c0c0c0'
                            }
                        }
                    }
                }
            });
            
            console.log("Campaign recognition rates chart created successfully");
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
        
        // Campaign Performance Comparison Chart - Direct implementation
        try {
            console.log("Creating campaign performance comparison chart directly...");
            
            // Hide loading indicator
            const loadingElement = document.getElementById('campaignAppealChart-loading');
            const errorElement = document.getElementById('campaignAppealChart-error');
            
            if (loadingElement) loadingElement.style.display = 'none';
            if (errorElement) errorElement.style.display = 'none';
            
            const canvas = document.getElementById('campaignAppealChart');
            if (!canvas) {
                console.error("Canvas element with id campaignAppealChart not found");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error("Could not get 2D context for canvas campaignAppealChart");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            // Create chart directly with verified data from official sources
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Ad Recall (T2B%)', 'Correct Association', 'Overall Ad Appeal (T2B%)'],
                    datasets: [
                        {
                            label: 'Global Brand Ambassador',
                            data: [81, 65, 91],
                            backgroundColor: 'rgba(26, 115, 232, 0.8)',
                            borderColor: '#1a73e8',
                            borderWidth: 1
                        },
                        {
                            label: 'Cultural Heritage Campaign',
                            data: [73, 74, 88],
                            backgroundColor: 'rgba(52, 168, 83, 0.8)',
                            borderColor: '#34a853',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            display: true
                        },
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
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            beginAtZero: true,
                            max: 100, // Set max to 100% as these are percentage values
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
            
            console.log("Campaign appeal ratings chart created successfully");
        } catch (error) {
            console.error("[error] Error creating chart campaignAppealChart:", error);
            console.error("Error details:", error.message);
            console.error("Error stack:", error.stack);
            const errorElement = document.getElementById('campaignAppealChart-error');
            if (errorElement) errorElement.style.display = 'flex';
        }
        
        // Media Channel Effectiveness Chart - Direct implementation
        try {
            console.log("Creating media channel effectiveness chart directly...");
            
            // Hide loading indicator
            const loadingElement = document.getElementById('mediaChannelChart-loading');
            const errorElement = document.getElementById('mediaChannelChart-error');
            
            if (loadingElement) loadingElement.style.display = 'none';
            if (errorElement) errorElement.style.display = 'none';
            
            const canvas = document.getElementById('mediaChannelChart');
            if (!canvas) {
                console.error("Canvas element with id mediaChannelChart not found");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error("Could not get 2D context for canvas mediaChannelChart");
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            // Create a simplified horizontal bar chart with the top channels from UAE Brand Tracker Q4'24
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Instagram', 'Facebook', 'Search Engines', 'Personal Recommendation', 'TikTok', 'YouTube', 'TripAdvisor', 'Radio'],
                    datasets: [
                        {
                            label: 'Usage Percentage',
                            data: [61, 60, 59, 55, 44, 39, 39, 28],
                            backgroundColor: [
                                'rgba(225, 48, 108, 0.8)',  // Instagram - pink
                                'rgba(59, 89, 152, 0.8)',   // Facebook - blue
                                'rgba(52, 168, 83, 0.8)',   // Search Engines - green
                                'rgba(251, 188, 4, 0.8)',   // Personal Recommendation - yellow
                                'rgba(238, 29, 82, 0.8)',   // TikTok - red
                                'rgba(255, 0, 0, 0.8)',     // YouTube - bright red
                                'rgba(0, 170, 79, 0.8)',    // TripAdvisor - green
                                'rgba(234, 67, 53, 0.8)'    // Radio - red
                            ],
                            borderColor: [
                                '#E1306C', '#3b5998', '#34a853', '#fbbc04', 
                                '#ee1d52', '#FF0000', '#00aa4f', '#ea4335'
                            ],
                            borderWidth: 1,
                            categoryPercentage: 0.8,
                            barPercentage: 0.9
                        }
                    ]
                },
                options: {
                    indexAxis: 'y',  // Horizontal bar chart
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false  // Hide legend for cleaner look
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.x + '%';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            max: 70,  // Slightly higher than max value for better visualization
                            grid: {
                                display: true,
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                },
                                color: '#c0c0c0'
                            },
                            title: {
                                display: true,
                                text: 'Usage Percentage (%)',
                                color: '#c0c0c0',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#c0c0c0'
                            }
                        }
                    }
                }
            });
            
            console.log("Media channel effectiveness chart created successfully");
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
