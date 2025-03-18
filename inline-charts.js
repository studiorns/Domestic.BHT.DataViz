// This file contains the chart initialization code directly embedded in the HTML
// to ensure charts are loaded properly without any race conditions

document.addEventListener('DOMContentLoaded', function() {
    // First ensure Chart.js is fully loaded
    function waitForChartJs() {
        if (typeof Chart !== 'undefined') {
            console.log("Chart.js is loaded, initializing charts...");
            initializeAllCharts();
        } else {
            console.log("Waiting for Chart.js to load...");
            setTimeout(waitForChartJs, 100); // Check again in 100ms
        }
    }

    // Start checking for Chart.js
    waitForChartJs();

    // Initialize all charts
    function initializeAllCharts() {
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
        console.log("Starting Brand Health charts initialization...");
        
        // Brand Metrics Trend Chart
        createLineChart('brandMetricsChart',
            ['Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24'],
            [
                {
                    label: 'Awareness',
                    data: [58, 63, 65, 68, 70, 72, 71, 72],
                    borderColor: '#1a73e8',
                    backgroundColor: 'rgba(26, 115, 232, 0.1)'
                },
                {
                    label: 'Consideration',
                    data: [52, 55, 58, 60, 62, 64, 65, 65],
                    borderColor: '#34a853',
                    backgroundColor: 'rgba(52, 168, 83, 0.1)'
                },
                {
                    label: 'Intent',
                    data: [48, 52, 55, 57, 59, 60, 61, 62],
                    borderColor: '#fbbc04',
                    backgroundColor: 'rgba(251, 188, 4, 0.1)'
                },
                {
                    label: 'Visitation',
                    data: [32, 39, 42, 45, 48, 52, 55, 58],
                    borderColor: '#ea4335',
                    backgroundColor: 'rgba(234, 67, 53, 0.1)'
                }
            ]
        );
        
        // Marketing Funnel Chart
        createHorizontalBarChart('funnelChart',
            ['Awareness', 'Consideration', 'Intent', 'Visitation'],
            [72, 65, 62, 58],
            [
                '#1a73e8', '#34a853', '#fbbc04', '#ea4335'
            ]
        );
        
        // Brand Perception Strengths Chart
        createRadarChart('brandPerceptionChart',
            ['Cultural Depth', 'Sports Events', 'Beautiful Beaches', 'Interesting Museums', 'Family Friendly', 'Luxury'],
            [
                {
                    label: 'Abu Dhabi',
                    data: [72, 71, 70, 69, 68, 65],
                    borderColor: '#1a73e8',
                    backgroundColor: 'rgba(26, 115, 232, 0.2)'
                },
                {
                    label: 'Dubai',
                    data: [58, 68, 72, 60, 65, 78],
                    borderColor: '#ea4335',
                    backgroundColor: 'rgba(234, 67, 53, 0.2)'
                }
            ]
        );
        
        // Competitive Positioning Chart
        createBarChart('competitiveChart',
            ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ras Al Khaimah', 'Fujairah'],
            [
                {
                    label: 'Ad Awareness',
                    data: [72, 85, 42, 38, 25],
                    borderColor: '#1a73e8',
                    backgroundColor: 'rgba(26, 115, 232, 0.8)'
                },
                {
                    label: 'Visitation',
                    data: [58, 76, 35, 30, 22],
                    borderColor: '#34a853',
                    backgroundColor: 'rgba(52, 168, 83, 0.8)'
                }
            ]
        );
        
        console.log("Brand Health charts initialization completed");
    }

    // Visitor Insights Charts
    function initVisitorInsightsCharts() {
        console.log("Starting Visitor Insights charts initialization...");
        
        // Visitor Origin Chart
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
        
        // Visitor Demographics Chart
        createStackedBarChart('visitorDemographicsChart',
            ['18-24', '25-34', '35-44', '45-54', '55+'],
            [
                {
                    label: 'Male',
                    data: [8, 15, 18, 12, 9],
                    backgroundColor: 'rgba(26, 115, 232, 0.8)'
                },
                {
                    label: 'Female',
                    data: [5, 10, 11, 7, 5],
                    backgroundColor: 'rgba(234, 67, 53, 0.8)'
                }
            ]
        );
        
        // Stay Duration Trend Chart
        createLineChart('stayDurationChart', 
            ['2021', '2022', '2023', '2024'],
            [
                {
                    label: 'Same-day Visitors',
                    data: [50, 55, 62, 67],
                    borderColor: '#1a73e8',
                    backgroundColor: 'rgba(26, 115, 232, 0.1)'
                },
                {
                    label: 'Overnight Visitors',
                    data: [50, 45, 38, 33],
                    borderColor: '#ea4335',
                    backgroundColor: 'rgba(234, 67, 53, 0.1)'
                }
            ]
        );
        
        // Information Sources Chart
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
        
        console.log("Visitor Insights charts initialization completed");
    }

    // Nightlife Charts
    function initNightlifeCharts() {
        console.log("Starting Nightlife charts initialization...");
        
        // Overnight Stay Rate Chart
        createDoughnutChart('overnightStayChart',
            ['Stay Overnight', 'Return Same Day'],
            [66, 34],
            ['#1a73e8', '#ea4335']
        );
        
        console.log("Nightlife charts initialization completed");
    }

    // Campaign Charts
    function initCampaignCharts() {
        console.log("Campaign charts initialization completed");
    }

    // Chart creation helper functions
    function createLineChart(id, labels, datasets) {
        try {
            const canvas = document.getElementById(id);
            if (!canvas) {
                console.error(`Canvas element with id ${id} not found`);
                return;
            }
            
            // Hide loading indicator
            const loadingElement = document.getElementById(`${id}-loading`);
            if (loadingElement) loadingElement.style.display = 'none';
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error(`Could not get 2D context for canvas ${id}`);
                const errorElement = document.getElementById(`${id}-error`);
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            const chartDatasets = datasets.map(dataset => ({
                label: dataset.label,
                data: dataset.data,
                borderColor: dataset.borderColor,
                backgroundColor: dataset.backgroundColor,
                tension: 0.3,
                fill: true,
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5
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
            console.error(`[error] Error creating enhanced chart ${id}:`, error);
        }
    }
    
    function createBarChart(id, labels, datasets) {
        try {
            console.log(`Starting to create bar chart ${id}...`);
            
            // Get canvas element
            const canvas = document.getElementById(id);
            if (!canvas) {
                console.error(`Canvas element with id ${id} not found`);
                return;
            }
            
            // Hide loading indicator
            const loadingElement = document.getElementById(`${id}-loading`);
            if (loadingElement) loadingElement.style.display = 'none';
            
            // Get 2D context
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error(`Could not get 2D context for canvas ${id}`);
                const errorElement = document.getElementById(`${id}-error`);
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            console.log(`Preparing data for chart ${id}...`);
            console.log(`Labels:`, labels);
            console.log(`Datasets:`, datasets);
            
            // Create chart configuration
            const chartConfig = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: []
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
                                    return (context.dataset.label || 'Value') + ': ' + context.parsed.y + '%';
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
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            };
            
            // Process datasets
            if (Array.isArray(datasets)) {
                if (datasets.length > 0 && datasets[0] && typeof datasets[0] === 'object' && 'label' in datasets[0]) {
                    // Multiple datasets with label/data structure
                    chartConfig.data.datasets = datasets.map(dataset => ({
                        label: dataset.label || 'Unnamed Dataset',
                        data: dataset.data || [],
                        backgroundColor: dataset.backgroundColor || 'rgba(26, 115, 232, 0.8)',
                        borderColor: dataset.borderColor || '#1a73e8',
                        borderWidth: 1
                    }));
                } else {
                    // Single dataset (array of values)
                    chartConfig.data.datasets = [{
                        label: 'Value',
                        data: datasets,
                        backgroundColor: 'rgba(26, 115, 232, 0.8)',
                        borderColor: '#1a73e8',
                        borderWidth: 1
                    }];
                }
            } else {
                console.error(`Invalid datasets format for chart ${id}`);
                const errorElement = document.getElementById(`${id}-error`);
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            console.log(`Creating chart ${id} with config:`, chartConfig);
            
            // Create the chart
            new Chart(ctx, chartConfig);
            
            console.log(`Bar chart ${id} created successfully`);
        } catch (error) {
            console.error(`[error] Error creating bar chart ${id}:`, error);
            console.error(`Error details:`, error.message);
            console.error(`Error stack:`, error.stack);
            const errorElement = document.getElementById(`${id}-error`);
            if (errorElement) errorElement.style.display = 'flex';
        }
    }
    
    function createRadarChart(id, labels, datasets) {
        try {
            const canvas = document.getElementById(id);
            if (!canvas) {
                console.error(`Canvas element with id ${id} not found`);
                return;
            }
            
            // Hide loading indicator
            const loadingElement = document.getElementById(`${id}-loading`);
            if (loadingElement) loadingElement.style.display = 'none';
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error(`Could not get 2D context for canvas ${id}`);
                const errorElement = document.getElementById(`${id}-error`);
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: datasets.map(dataset => ({
                        label: dataset.label,
                        data: dataset.data,
                        borderColor: dataset.borderColor,
                        backgroundColor: dataset.backgroundColor,
                        borderWidth: 2,
                        pointBackgroundColor: dataset.borderColor,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }))
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
            
            console.log(`Radar chart ${id} created successfully`);
        } catch (error) {
            console.error(`[error] Error creating radar chart ${id}:`, error);
        }
    }

    function createPieChart(id, labels, data, colors) {
        try {
            const canvas = document.getElementById(id);
            if (!canvas) {
                console.error(`Canvas element with id ${id} not found`);
                return;
            }
            
            // Hide loading indicator
            const loadingElement = document.getElementById(`${id}-loading`);
            if (loadingElement) loadingElement.style.display = 'none';
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error(`Could not get 2D context for canvas ${id}`);
                const errorElement = document.getElementById(`${id}-error`);
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
            
            console.log(`Enhanced pie chart ${id} created successfully`);
        } catch (error) {
            console.error(`[error] Error creating enhanced pie chart ${id}:`, error);
        }
    }

    function createStackedBarChart(id, labels, datasets) {
        try {
            const canvas = document.getElementById(id);
            if (!canvas) {
                console.error(`Canvas element with id ${id} not found`);
                return;
            }
            
            // Hide loading indicator
            const loadingElement = document.getElementById(`${id}-loading`);
            if (loadingElement) loadingElement.style.display = 'none';
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error(`Could not get 2D context for canvas ${id}`);
                const errorElement = document.getElementById(`${id}-error`);
                if (errorElement) errorElement.style.display = 'flex';
                return;
            }
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets.map(dataset => ({
                        ...dataset,
                        stack: 'Stack 0'
                    }))
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
                            grid: {
                                display: false
                            }
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
            
            console.log(`Enhanced stacked bar chart ${id} created successfully`);
        } catch (error) {
            console.error(`[error] Error creating enhanced stacked bar chart ${id}:`, error);
        }
    }

    function createHorizontalBarChart(id, labels, data, colors, valueUnit = '%') {
        try {
            const canvas = document.getElementById(id);
            if (!canvas) {
                console.error(`Canvas element with id ${id} not found`);
                return;
            }
            
            // Hide loading indicator
            const loadingElement = document.getElementById(`${id}-loading`);
            if (loadingElement) loadingElement.style.display = 'none';
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error(`Could not get 2D context for canvas ${id}`);
                const errorElement = document.getElementById(`${id}-error`);
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
                                    return context.parsed.x + (valueUnit === 'x' ? 'x' : valueUnit);
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value + (valueUnit === 'x' ? 'x' : valueUnit);
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
            
            console.log(`Enhanced horizontal bar chart ${id} created successfully`);
        } catch (error) {
            console.error(`[error] Error creating enhanced horizontal bar chart ${id}:`, error);
        }
    }

    function createDoughnutChart(id, labels, data, colors) {
        try {
            const canvas = document.getElementById(id);
            if (!canvas) {
                console.error(`Canvas element with id ${id} not found`);
                return;
            }
            
            // Hide loading indicator
            const loadingElement = document.getElementById(`${id}-loading`);
            if (loadingElement) loadingElement.style.display = 'none';
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error(`Could not get 2D context for canvas ${id}`);
                const errorElement = document.getElementById(`${id}-error`);
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
        }
    }
});
