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
        });
    });
});

// Use window.onload to ensure all resources including Chart.js are fully loaded
window.onload = function() {
    // Initialize charts
    try {
        console.log("Initializing charts...");
        if (typeof Chart !== 'undefined') {
            initCharts();
        } else {
            console.error("Chart.js is not loaded");
            // Show error messages for all charts
            document.querySelectorAll('[id$="-error"]').forEach(el => {
                el.style.display = 'flex';
            });
        }
    } catch (error) {
        console.error("Error initializing charts:", error);
    }
};

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
    
    // Add global animation plugin
    Chart.register({
        id: 'elegantAnimation',
        beforeDraw: function(chart, args, options) {
            const ctx = chart.ctx;
            ctx.save();
            ctx.globalAlpha = chart.getInitialDatasets ? 1 : chart.animating ? chart.animation.currentStep / chart.animation.numSteps : 1;
            ctx.restore();
        }
    });
    
    // Initialize all charts
    initBrandHealthCharts();
    initVisitorInsightsCharts();
    initNightlifeCharts();
    initCampaignCharts();
}

// Brand Health Charts
function initBrandHealthCharts() {
    // Brand Health Metrics Trend Chart - Enhanced visualization
    createEnhancedLineChart('brandMetricsChart', 
        ['Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24'],
        [
            {
                label: 'Awareness',
                data: [42, 45, 47, 52, 55, 58, 61, 65, 68, 72],
                color: '#1a73e8'
            },
            {
                label: 'Consideration',
                data: [38, 40, 42, 45, 48, 51, 54, 58, 61, 65],
                color: '#34a853'
            },
            {
                label: 'Intent',
                data: [35, 37, 39, 42, 45, 48, 51, 55, 58, 62],
                color: '#fbbc04'
            },
            {
                label: 'Visitation',
                data: [32, 34, 36, 39, 42, 45, 48, 52, 55, 58],
                color: '#ea4335'
            }
        ]
    );
    
    // Marketing Funnel Performance Chart
    createBarChart('funnelChart', 
        ['Awareness', 'Consideration', 'Intent', 'Visitation'],
        [72, 65, 62, 58],
        ['#1a73e8', '#34a853', '#fbbc04', '#ea4335'],
        true
    );
    
    // Brand Perception Strengths Chart
    createRadarChart('brandPerceptionChart',
        ['Cultural Depth', 'Sports Events', 'Beautiful Beaches', 'Museums', 'Family Friendly', 'Luxury', 'Nightlife', 'Shopping'],
        [
            {
                label: 'Abu Dhabi',
                data: [72, 71, 70, 69, 65, 62, 48, 58],
                color: '#1a73e8'
            },
            {
                label: 'Dubai',
                data: [55, 65, 68, 60, 62, 78, 75, 82],
                color: '#ea4335'
            }
        ]
    );
    
    // Competitive Positioning Chart
    try {
        // Special case for competitive positioning chart
        const competitiveCanvas = document.getElementById('competitiveChart');
        const competitiveLoading = document.getElementById('competitiveChart-loading');
        const competitiveError = document.getElementById('competitiveChart-error');
        
        if (competitiveLoading) competitiveLoading.style.display = 'none';
        if (competitiveError) competitiveError.style.display = 'none';
        
        if (competitiveCanvas) {
            const ctx = competitiveCanvas.getContext('2d');
            if (ctx) {
                const labels = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];
                
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Ad Awareness',
                                data: [72, 85, 42, 28, 35, 22, 18],
                                backgroundColor: '#1a73e8CC',
                                borderColor: '#1a73e8',
                                borderWidth: 1
                            },
                            {
                                label: 'Visitation',
                                data: [58, 76, 38, 25, 32, 20, 15],
                                backgroundColor: '#34a853CC',
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
                                display: true,
                                position: 'top'
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
                console.log('Competitive positioning chart created successfully');
            } else {
                console.error('Could not get 2D context for competitive positioning chart');
                if (competitiveError) competitiveError.style.display = 'flex';
            }
        } else {
            console.error('Competitive positioning canvas not found');
            if (competitiveError) competitiveError.style.display = 'flex';
        }
    } catch (error) {
        console.error("Error initializing competitiveChart:", error);
        const errorElement = document.getElementById('competitiveChart-error');
        if (errorElement) errorElement.style.display = 'flex';
    }
}

// Visitor Insights Charts
function initVisitorInsightsCharts() {
    // Visitor Origin Chart - Enhanced with better visuals and interactivity
    createEnhancedPieChart('visitorOriginChart',
        ['Dubai', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Fujairah', 'Umm Al Quwain'],
        [70, 26, 2, 1, 0.5, 0.5],
        {
            title: 'Visitor Origin Distribution',
            subtitle: 'Percentage of domestic visitors by emirate',
            colors: [
                '#1a73e8', // Dubai - Primary blue
                '#34a853', // Sharjah - Green
                '#fbbc04', // RAK - Yellow
                '#ea4335', // Ajman - Red
                '#673ab7', // Fujairah - Purple
                '#00bcd4'  // UAQ - Cyan
            ]
        }
    );
    
    // Visitor Demographics Chart - Enhanced with better visuals and interactivity
    createEnhancedStackedBarChart('visitorDemographicsChart',
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
        ],
        {
            title: 'Visitor Demographics',
            subtitle: 'Age and gender distribution of domestic visitors',
            showTotal: true,
            showPercentages: true
        }
    );
    
    // Stay Duration Trend Chart - Enhanced with gradient fills and growth indicators
    createEnhancedLineChart('stayDurationChart', 
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
    
    // Information Sources Chart - Enhanced with better visuals and interactivity
    createEnhancedHorizontalBarChart('infoSourcesChart',
        ['Instagram', 'Facebook', 'Search Engines', 'TikTok', 'Friends/Family', 'YouTube', 'Travel Websites', 'Twitter/X'],
        [61, 60, 59, 44, 42, 38, 35, 28],
        {
            title: 'Information Sources',
            subtitle: 'Primary channels used by visitors when planning their trip',
            sortData: true,
            showPercentages: true,
            colors: [
                '#1a73e8', // Instagram - Blue
                '#3b5998', // Facebook - Facebook blue
                '#34a853', // Search Engines - Green
                '#ee1d52', // TikTok - TikTok red
                '#673ab7', // Friends/Family - Purple
                '#ff0000', // YouTube - YouTube red
                '#fbbc04', // Travel Websites - Yellow
                '#1da1f2'  // Twitter/X - Twitter blue
            ]
        }
    );
}

// Enhanced pie chart with better visuals and interactivity
function createEnhancedPieChart(id, labels, data, options = {}) {
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
        
        // Default colors with better contrast
        const defaultColors = [
            'rgba(26, 115, 232, 0.8)',
            'rgba(52, 168, 83, 0.8)',
            'rgba(251, 188, 4, 0.8)',
            'rgba(234, 67, 53, 0.8)',
            'rgba(103, 58, 183, 0.8)',
            'rgba(0, 188, 212, 0.8)'
        ];
        
        // Use custom colors if provided, otherwise use defaults
        const colors = options.colors || defaultColors;
        
        // Create the chart
        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, data.length),
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#ffffff',
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        cornerRadius: 6,
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${context.label}: ${value}% (${percentage}% of total)`;
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart) => {
                    const ctx = chart.canvas.getContext('2d');
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            }]
        });
        
        // Add title and subtitle if provided
        if (options.title || options.subtitle) {
            addChartTitles(chart, options.title, options.subtitle);
        }
        
        // Add data insights below the chart
        addDataInsights(chart, id, data, labels);
        
        console.log(`Enhanced pie chart ${id} created successfully`);
        return chart;
    } catch (error) {
        console.error(`Error creating enhanced pie chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

// Enhanced stacked bar chart with better visuals and interactivity
function createEnhancedStackedBarChart(id, labels, datasets, options = {}) {
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
        
        // Calculate totals for each age group if needed
        const totals = [];
        if (options.showTotal) {
            for (let i = 0; i < labels.length; i++) {
                let total = 0;
                datasets.forEach(dataset => {
                    total += dataset.data[i];
                });
                totals.push(total);
            }
        }
        
        // Create enhanced datasets with better visual properties
        const chartDatasets = datasets.map(dataset => ({
            label: dataset.label,
            data: dataset.data,
            backgroundColor: dataset.color + 'CC', // 80% opacity
            borderColor: dataset.color,
            borderWidth: 1,
            hoverBackgroundColor: dataset.color,
            hoverBorderColor: '#ffffff',
            hoverBorderWidth: 2,
            stack: 'Stack 0'
        }));
        
        // Create the chart
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: chartDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        cornerRadius: 6,
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                let label = context.dataset.label + ': ' + value + '%';
                                
                                // Add percentage of total if requested
                                if (options.showPercentages) {
                                    const total = totals[context.dataIndex];
                                    const percentage = Math.round((value / total) * 100);
                                    label += ` (${percentage}% of age group)`;
                                }
                                
                                return label;
                            },
                            afterBody: function(context) {
                                if (options.showTotal && context.length > 0) {
                                    const dataIndex = context[0].dataIndex;
                                    return `Total: ${totals[dataIndex]}%`;
                                }
                                return '';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        max: 30,
                        grid: {
                            color: 'rgba(200, 200, 200, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart) => {
                    const ctx = chart.canvas.getContext('2d');
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            }]
        });
        
        // Add title and subtitle if provided
        if (options.title || options.subtitle) {
            addChartTitles(chart, options.title, options.subtitle);
        }
        
        console.log(`Enhanced stacked bar chart ${id} created successfully`);
        return chart;
    } catch (error) {
        console.error(`Error creating enhanced stacked bar chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

// Enhanced horizontal bar chart with better visuals and interactivity
function createEnhancedHorizontalBarChart(id, labels, data, options = {}) {
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
        
        // Default colors with better contrast
        const defaultColors = [
            'rgba(26, 115, 232, 0.8)',
            'rgba(52, 168, 83, 0.8)',
            'rgba(251, 188, 4, 0.8)',
            'rgba(234, 67, 53, 0.8)',
            'rgba(103, 58, 183, 0.8)',
            'rgba(0, 188, 212, 0.8)',
            'rgba(255, 152, 0, 0.8)',
            'rgba(96, 125, 139, 0.8)'
        ];
        
        // Use custom colors if provided, otherwise use defaults
        const colors = options.colors || defaultColors;
        
        // Sort data if requested
        let sortedData = [...data];
        let sortedLabels = [...labels];
        
        if (options.sortData) {
            // Create array of [label, data] pairs
            const pairs = labels.map((label, i) => [label, data[i]]);
            
            // Sort pairs by data value (descending)
            pairs.sort((a, b) => b[1] - a[1]);
            
            // Extract sorted labels and data
            sortedLabels = pairs.map(pair => pair[0]);
            sortedData = pairs.map(pair => pair[1]);
        }
        
        // Create the chart
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedLabels,
                datasets: [{
                    label: options.title || 'Value',
                    data: sortedData,
                    backgroundColor: colors.slice(0, sortedLabels.length),
                    borderColor: colors.slice(0, sortedLabels.length).map(color => color.replace('0.8', '1')),
                    borderWidth: 1,
                    hoverBackgroundColor: colors.slice(0, sortedLabels.length).map(color => color.replace('0.8', '1')),
                    hoverBorderColor: '#ffffff',
                    hoverBorderWidth: 2
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        cornerRadius: 6,
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
                        grid: {
                            color: 'rgba(200, 200, 200, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11,
                                weight: '500'
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart) => {
                    const ctx = chart.canvas.getContext('2d');
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            }]
        });
        
        // Add title and subtitle if provided
        if (options.title || options.subtitle) {
            addChartTitles(chart, options.title, options.subtitle);
        }
        
        // Add data labels to the bars
        if (options.showPercentages) {
            addDataLabelsToHorizontalBars(chart);
        }
        
        console.log(`Enhanced horizontal bar chart ${id} created successfully`);
        return chart;
    } catch (error) {
        console.error(`Error creating enhanced horizontal bar chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

// Helper function to add titles to charts
function addChartTitles(chart, title, subtitle) {
    // Check if we should add titles (only for charts that don't already have titles in HTML)
    // For Visitor Insights charts, we'll skip adding titles since they already exist in HTML
    if (chart.canvas.id === 'visitorOriginChart' || 
        chart.canvas.id === 'visitorDemographicsChart' || 
        chart.canvas.id === 'stayDurationChart' || 
        chart.canvas.id === 'infoSourcesChart') {
        return; // Skip adding titles for Visitor Insights charts
    }
    
    const chartContainer = chart.canvas.parentNode;
    
    // Create title container
    const titleContainer = document.createElement('div');
    titleContainer.style.textAlign = 'center';
    titleContainer.style.marginBottom = '15px';
    
    // Add title if provided
    if (title) {
        const titleElement = document.createElement('div');
        titleElement.textContent = title;
        titleElement.style.fontSize = '16px';
        titleElement.style.fontWeight = '600';
        titleElement.style.color = 'var(--primary-dark)';
        titleContainer.appendChild(titleElement);
    }
    
    // Add subtitle if provided
    if (subtitle) {
        const subtitleElement = document.createElement('div');
        subtitleElement.textContent = subtitle;
        subtitleElement.style.fontSize = '12px';
        subtitleElement.style.color = 'var(--gray-600)';
        subtitleElement.style.marginTop = '4px';
        titleContainer.appendChild(subtitleElement);
    }
    
    // Insert before the chart
    chartContainer.insertBefore(titleContainer, chart.canvas);
}

// Helper function to add data insights below charts
function addDataInsights(chart, id, data, labels) {
    // Only add insights for specific charts that don't already have insights
    if (id === 'visitorOriginChart') {
        // Check if an insight container already exists
        const chartContainer = chart.canvas.parentNode;
        const nextElement = chartContainer.nextElementSibling;
        
        // If the next element already contains an insight, don't add another one
        if (nextElement && nextElement.textContent.includes('Key Insight')) {
            return;
        }
        
        // Calculate insights
        const total = data.reduce((a, b) => a + b, 0);
        const topTwoValue = data[0] + data[1];
        const topTwoPercentage = Math.round((topTwoValue / total) * 100);
        const topTwoLabels = `${labels[0]} (${data[0]}%) or ${labels[1]} (${data[1]}%)`;
        
        // Create insights container
        const insightsContainer = document.createElement('div');
        insightsContainer.style.marginTop = '15px';
        insightsContainer.style.backgroundColor = 'rgba(26, 115, 232, 0.1)';
        insightsContainer.style.borderLeft = '4px solid var(--primary)';
        insightsContainer.style.padding = '12px 16px';
        insightsContainer.style.borderRadius = '0 var(--radius) var(--radius) 0';
        
        // Add insight text
        const insightText = document.createElement('div');
        insightText.innerHTML = `<strong>Key Insight:</strong> ${topTwoPercentage}% of domestic visitors come from either ${topTwoLabels}, highlighting the importance of these two emirates as source markets.`;
        insightText.style.fontSize = '0.9rem';
        insightText.style.color = 'var(--gray-800)';
        
        insightsContainer.appendChild(insightText);
        
        // Add the insights container after the chart
        chart.canvas.parentNode.after(insightsContainer);
    }
}

// Helper function to add data labels to horizontal bars
function addDataLabelsToHorizontalBars(chart) {
    chart.options.plugins.datalabels = {
        color: '#fff',
        font: {
            weight: 'bold',
            size: 11
        },
        formatter: function(value) {
            return value + '%';
        },
        align: 'center',
        anchor: 'center'
    };
    
    chart.update();
}

// Nightlife Charts
function initNightlifeCharts() {
    // Nightlife Leakage Chart
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
    
    // Nightlife Spending Chart
    try {
        // Special case for nightlife spending chart with values > 100
        const nightlifeSpendingCanvas = document.getElementById('nightlifeSpendingChart');
        const nightlifeSpendingLoading = document.getElementById('nightlifeSpendingChart-loading');
        const nightlifeSpendingError = document.getElementById('nightlifeSpendingChart-error');
        
        if (nightlifeSpendingLoading) nightlifeSpendingLoading.style.display = 'none';
        if (nightlifeSpendingError) nightlifeSpendingError.style.display = 'none';
        
        if (nightlifeSpendingCanvas) {
            const ctx = nightlifeSpendingCanvas.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Abu Dhabi', 'Dubai'],
                        datasets: [{
                            label: 'Spending (AED)',
                            data: [436, 591],
                            backgroundColor: ['#1a73e8CC', '#ea4335CC'],
                            borderColor: ['#1a73e8', '#ea4335'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return 'Spending: AED ' + context.parsed.y;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 700,
                                ticks: {
                                    callback: function(value) {
                                        return 'AED ' + value;
                                    }
                                }
                            }
                        }
                    }
                });
                console.log('Nightlife spending chart created successfully');
            } else {
                console.error('Could not get 2D context for nightlife spending chart');
                if (nightlifeSpendingError) nightlifeSpendingError.style.display = 'flex';
            }
        } else {
            console.error('Nightlife spending canvas not found');
            if (nightlifeSpendingError) nightlifeSpendingError.style.display = 'flex';
        }
    } catch (error) {
        console.error("Error initializing nightlifeSpendingChart:", error);
        const errorElement = document.getElementById('nightlifeSpendingChart-error');
        if (errorElement) errorElement.style.display = 'flex';
    }
    
    // Nightlife Motivators Chart
    createHorizontalBarChart('nightlifeMotivatorsChart',
        ['Wider variety of venues', 'More vibrant atmosphere', 'More affordable venues', 'Better transportation options', 'More international DJs/artists', 'Later opening hours'],
        [48, 46, 42, 38, 35, 32]
    );
    
    // Overnight Stay Rate Chart
    createDoughnutChart('overnightStayChart',
        ['Stay Overnight', 'Return Same Day'],
        [66, 34]
    );
}

// Campaign Charts
function initCampaignCharts() {
    // Campaign Recognition Chart
    createBarChart('campaignRecognitionChart',
        ['Global Brand Ambassador', 'Cultural Heritage Campaign', 'Industry Benchmark'],
        [49, 31, 33],
        ['#1a73e8', '#34a853', '#607d8b'],
        false
    );
    
    // Quarterly Awareness Growth Chart
    createLineChart('quarterlyAwarenessChart',
        ['Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24'],
        [
            {
                label: 'Spontaneous Awareness',
                data: [27, 39, 42, 47, 51, 58, 63, 68],
                color: '#1a73e8'
            }
        ]
    );
    
    // Campaign Appeal Chart
    try {
        // Special case for campaign appeal chart
        const campaignAppealCanvas = document.getElementById('campaignAppealChart');
        const campaignAppealLoading = document.getElementById('campaignAppealChart-loading');
        const campaignAppealError = document.getElementById('campaignAppealChart-error');
        
        if (campaignAppealLoading) campaignAppealLoading.style.display = 'none';
        if (campaignAppealError) campaignAppealError.style.display = 'none';
        
        if (campaignAppealCanvas) {
            const ctx = campaignAppealCanvas.getContext('2d');
            if (ctx) {
                const labels = ['18-24', '25-34', '35-44', '45+'];
                
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Global Brand Ambassador',
                                data: [65, 72, 68, 59],
                                backgroundColor: '#1a73e8CC',
                                borderColor: '#1a73e8',
                                borderWidth: 1
                            },
                            {
                                label: 'Cultural Heritage Campaign',
                                data: [52, 58, 63, 68],
                                backgroundColor: '#34a853CC',
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
                                display: true,
                                position: 'top'
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
                console.log('Campaign appeal chart created successfully');
            } else {
                console.error('Could not get 2D context for campaign appeal chart');
                if (campaignAppealError) campaignAppealError.style.display = 'flex';
            }
        } else {
            console.error('Campaign appeal canvas not found');
            if (campaignAppealError) campaignAppealError.style.display = 'flex';
        }
    } catch (error) {
        console.error("Error initializing campaignAppealChart:", error);
        const errorElement = document.getElementById('campaignAppealChart-error');
        if (errorElement) errorElement.style.display = 'flex';
    }
    
    // Media Channel Effectiveness Chart
    try {
        // Special case for media channel effectiveness chart with ROI values
        const mediaChannelCanvas = document.getElementById('mediaChannelChart');
        const mediaChannelLoading = document.getElementById('mediaChannelChart-loading');
        const mediaChannelError = document.getElementById('mediaChannelChart-error');
        
        if (mediaChannelLoading) mediaChannelLoading.style.display = 'none';
        if (mediaChannelError) mediaChannelError.style.display = 'none';
        
        if (mediaChannelCanvas) {
            const ctx = mediaChannelCanvas.getContext('2d');
            if (ctx) {
                const labels = ['Social Media', 'Digital Display', 'Search', 'Email', 'OOH', 'TV'];
                const data = [3.2, 2.8, 2.5, 2.2, 1.9, 1.7];
                const colors = [
                    'rgba(26, 115, 232, 0.8)',
                    'rgba(52, 168, 83, 0.8)',
                    'rgba(251, 188, 4, 0.8)',
                    'rgba(234, 67, 53, 0.8)',
                    'rgba(103, 58, 183, 0.8)',
                    'rgba(0, 188, 212, 0.8)'
                ];
                
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'ROI Multiplier',
                            data: data,
                            backgroundColor: colors.slice(0, labels.length),
                            borderColor: colors.slice(0, labels.length).map(color => color.replace('0.8', '1')),
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
                                        return 'ROI: ' + context.parsed.x + 'x';
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                beginAtZero: true,
                                max: 4,
                                ticks: {
                                    callback: function(value) {
                                        return value + 'x';
                                    }
                                }
                            }
                        }
                    }
                });
                console.log('Media channel effectiveness chart created successfully');
            } else {
                console.error('Could not get 2D context for media channel chart');
                if (mediaChannelError) mediaChannelError.style.display = 'flex';
            }
        } else {
            console.error('Media channel canvas not found');
            if (mediaChannelError) mediaChannelError.style.display = 'flex';
        }
    } catch (error) {
        console.error("Error initializing mediaChannelChart:", error);
        const errorElement = document.getElementById('mediaChannelChart-error');
        if (errorElement) errorElement.style.display = 'flex';
    }
}

// Helper functions for creating charts
// Enhanced line chart with gradient fills and growth indicators
function createEnhancedLineChart(id, labels, datasets) {
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
        
        // Create gradient fills for each dataset
        const chartDatasets = datasets.map(dataset => {
            // Calculate growth metrics
            const firstValue = dataset.data[0];
            const lastValue = dataset.data[dataset.data.length - 1];
            const percentagePointChange = lastValue - firstValue;
            const growthPercentage = Math.round((percentagePointChange / firstValue) * 100);
            
            return {
                label: dataset.label,
                data: dataset.data,
                borderColor: dataset.color,
                backgroundColor: 'transparent',
                borderWidth: 3,
                tension: 0.3,
                fill: false,
                pointRadius: 0, // Hide points for cleaner look
                pointHoverRadius: 6, // Show on hover
                pointHoverBackgroundColor: dataset.color,
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
                // Store growth metrics for use in tooltip
                percentagePointChange: percentagePointChange,
                growthPercentage: growthPercentage
            };
        });
        
        // Add interactive controls
        addBrandMetricsControls(id, datasets);
        
        // Create the chart
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: chartDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        cornerRadius: 6,
                        callbacks: {
                            label: function(context) {
                                const dataset = context.dataset;
                                const value = context.parsed.y;
                                const label = dataset.label;
                                
                                // Show growth metrics in tooltip for the last data point
                                if (context.dataIndex === labels.length - 1) {
                                    return `${label}: ${value}% (Change: +${dataset.percentagePointChange}pp, Growth: +${dataset.growthPercentage}%)`;
                                }
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: 'rgba(200, 200, 200, 0.1)'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
        
        // Add growth indicators to the chart
        addGrowthIndicators(chart, datasets);
        
        console.log(`Enhanced chart ${id} created successfully`);
        return chart;
    } catch (error) {
        console.error(`Error creating enhanced chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

// Add growth indicators to the chart
function addGrowthIndicators(chart, datasets) {
    // Create a container for growth indicators
    const chartContainer = chart.canvas.parentNode;
    const mainContainer = document.createElement('div');
    mainContainer.className = 'growth-indicators';
    mainContainer.style.display = 'flex';
    mainContainer.style.justifyContent = 'space-between';
    mainContainer.style.marginTop = '15px';
    mainContainer.style.padding = '10px';
    mainContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    mainContainer.style.borderRadius = '6px';
    
    // Add growth indicator for each dataset
    datasets.forEach(dataset => {
        const firstValue = dataset.data[0];
        const lastValue = dataset.data[dataset.data.length - 1];
        const percentagePointChange = lastValue - firstValue;
        const growthPercentage = Math.round((percentagePointChange / firstValue) * 100);
        
        // Create indicator container
        const indicator = document.createElement('div');
        indicator.className = 'growth-indicator';
        indicator.style.display = 'flex';
        indicator.style.flexDirection = 'column';
        indicator.style.alignItems = 'center';
        
        // Add metric label
        const label = document.createElement('div');
        label.textContent = dataset.label;
        label.style.fontSize = '12px';
        label.style.color = 'var(--gray-700)';
        label.style.marginBottom = '5px';
        indicator.appendChild(label);
        
        // Add current value
        const value = document.createElement('div');
        value.innerHTML = `<span style="font-size: 16px; font-weight: 600; color: ${dataset.color}">${lastValue}%</span>`;
        value.style.marginBottom = '3px';
        indicator.appendChild(value);
        
        // Create growth metrics container
        const growthMetrics = document.createElement('div');
        growthMetrics.style.display = 'flex';
        growthMetrics.style.gap = '6px';
        
        // Add percentage point change
        const ppChange = document.createElement('div');
        ppChange.textContent = `+${percentagePointChange}pp`;
        ppChange.style.fontSize = '12px';
        ppChange.style.fontWeight = '600';
        ppChange.style.color = dataset.color;
        ppChange.style.backgroundColor = `${dataset.color}20`;
        ppChange.style.padding = '2px 6px';
        ppChange.style.borderRadius = '4px';
        growthMetrics.appendChild(ppChange);
        
        // Add growth percentage
        const growth = document.createElement('div');
        growth.textContent = `+${growthPercentage}%`;
        growth.style.fontSize = '12px';
        growth.style.fontWeight = '600';
        growth.style.color = dataset.color;
        growth.style.backgroundColor = `${dataset.color}20`;
        growth.style.padding = '2px 6px';
        growth.style.borderRadius = '4px';
        growthMetrics.appendChild(growth);
        
        // Add growth metrics to indicator
        indicator.appendChild(growthMetrics);
        
        // Add indicator to main container
        mainContainer.appendChild(indicator);
    });
    
    // Add the growth indicators container after the chart
    chartContainer.after(mainContainer);
}

// Add interactive controls for the brand metrics chart
function addBrandMetricsControls(chartId, datasets) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'chart-controls';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.justifyContent = 'flex-end';
    controlsContainer.style.marginBottom = '15px';
    
    // Create view selector (line vs. small multiples)
    const viewSelector = document.createElement('div');
    viewSelector.className = 'view-selector';
    viewSelector.style.display = 'flex';
    viewSelector.style.gap = '5px';
    
    const views = [
        { label: 'Line', icon: 'fa-chart-line' },
        { label: 'Grid', icon: 'fa-th' }
    ];
    
    views.forEach((view, index) => {
        const button = document.createElement('button');
        button.className = `view-button ${index === 0 ? 'active' : ''}`;
        button.setAttribute('data-view', view.label.toLowerCase());
        button.style.padding = '4px 8px';
        button.style.borderRadius = '4px';
        button.style.border = '1px solid var(--gray-300)';
        button.style.backgroundColor = index === 0 ? 'var(--primary)' : 'var(--card-bg)';
        button.style.color = index === 0 ? 'white' : 'var(--gray-700)';
        button.style.cursor = 'pointer';
        
        const icon = document.createElement('i');
        icon.className = `fas ${view.icon}`;
        icon.style.marginRight = '4px';
        
        const text = document.createElement('span');
        text.textContent = view.label;
        text.style.fontSize = '12px';
        
        button.appendChild(icon);
        button.appendChild(text);
        
        viewSelector.appendChild(button);
        
        // Add view switching functionality
        button.addEventListener('click', function() {
            document.querySelectorAll('.view-button').forEach(btn => {
                btn.classList.remove('active');
                btn.style.backgroundColor = 'var(--card-bg)';
                btn.style.color = 'var(--gray-700)';
            });
            this.classList.add('active');
            this.style.backgroundColor = 'var(--primary)';
            this.style.color = 'white';
            
            // Switch view type
            const viewType = this.getAttribute('data-view');
            if (viewType === 'line') {
                // Show line chart, hide small multiples
                document.getElementById(chartId).style.display = 'block';
                const smallMultiplesContainer = document.getElementById(`${chartId}-small-multiples`);
                if (smallMultiplesContainer) {
                    smallMultiplesContainer.style.display = 'none';
                }
            } else if (viewType === 'grid') {
                // Show small multiples, hide line chart
                document.getElementById(chartId).style.display = 'none';
                
                // Create small multiples container if it doesn't exist
                let smallMultiplesContainer = document.getElementById(`${chartId}-small-multiples`);
                if (!smallMultiplesContainer) {
                    smallMultiplesContainer = document.createElement('div');
                    smallMultiplesContainer.id = `${chartId}-small-multiples`;
                    smallMultiplesContainer.style.display = 'grid';
                    smallMultiplesContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
                    smallMultiplesContainer.style.gap = '15px';
                    smallMultiplesContainer.style.height = '350px';
                    smallMultiplesContainer.style.marginBottom = '50px';
                    
                    // Insert after the chart
                    canvas.after(smallMultiplesContainer);
                    
                    // Create small multiples
                    createSmallMultiples(smallMultiplesContainer, datasets);
                }
                
                smallMultiplesContainer.style.display = 'grid';
            }
        });
    });
    
    controlsContainer.appendChild(viewSelector);
    
    // Insert controls before the chart
    canvas.parentNode.insertBefore(controlsContainer, canvas);
}

// Create small multiples visualization
function createSmallMultiples(container, datasets) {
    // Clear existing content
    container.innerHTML = '';
    
    // Get labels from the main chart
    const labels = ['Q3\'22', 'Q4\'22', 'Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24'];
    
    // Create a mini chart for each dataset
    datasets.forEach((dataset, index) => {
        const chartDiv = document.createElement('div');
        chartDiv.style.position = 'relative';
        chartDiv.style.height = '140px';
        chartDiv.style.backgroundColor = 'var(--card-bg)';
        chartDiv.style.borderRadius = '6px';
        chartDiv.style.padding = '10px';
        chartDiv.style.border = '1px solid var(--gray-300)';
        
        const canvas = document.createElement('canvas');
        canvas.id = `small-multiple-${index}`;
        chartDiv.appendChild(canvas);
        
        // Add title
        const title = document.createElement('div');
        title.textContent = dataset.label;
        title.style.position = 'absolute';
        title.style.top = '10px';
        title.style.left = '10px';
        title.style.fontSize = '12px';
        title.style.fontWeight = 'bold';
        title.style.color = dataset.color;
        chartDiv.appendChild(title);
        
        // Add growth metrics
        const firstValue = dataset.data[0];
        const lastValue = dataset.data[dataset.data.length - 1];
        const percentagePointChange = lastValue - firstValue;
        const growth = Math.round((percentagePointChange / firstValue) * 100);
        
        // Container for growth metrics
        const growthContainer = document.createElement('div');
        growthContainer.style.position = 'absolute';
        growthContainer.style.top = '10px';
        growthContainer.style.right = '10px';
        growthContainer.style.display = 'flex';
        growthContainer.style.gap = '4px';
        
        // Percentage point change
        const ppChangeLabel = document.createElement('div');
        ppChangeLabel.textContent = `+${percentagePointChange}pp`;
        ppChangeLabel.style.fontSize = '12px';
        ppChangeLabel.style.fontWeight = 'bold';
        ppChangeLabel.style.color = dataset.color;
        ppChangeLabel.style.backgroundColor = `${dataset.color}20`;
        ppChangeLabel.style.padding = '2px 6px';
        ppChangeLabel.style.borderRadius = '4px';
        
        // Growth percentage
        const growthLabel = document.createElement('div');
        growthLabel.textContent = `+${growth}%`;
        growthLabel.style.fontSize = '12px';
        growthLabel.style.fontWeight = 'bold';
        growthLabel.style.color = dataset.color;
        growthLabel.style.backgroundColor = `${dataset.color}20`;
        growthLabel.style.padding = '2px 6px';
        growthLabel.style.borderRadius = '4px';
        
        growthContainer.appendChild(ppChangeLabel);
        growthContainer.appendChild(growthLabel);
        chartDiv.appendChild(growthContainer);
        
        // Add current value
        const currentValue = document.createElement('div');
        currentValue.textContent = `${lastValue}%`;
        currentValue.style.position = 'absolute';
        currentValue.style.bottom = '10px';
        currentValue.style.right = '10px';
        currentValue.style.fontSize = '16px';
        currentValue.style.fontWeight = 'bold';
        currentValue.style.color = dataset.color;
        chartDiv.appendChild(currentValue);
        
        container.appendChild(chartDiv);
        
        // Create the mini chart
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: dataset.data,
                    borderColor: dataset.color,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: false,
                    pointRadius: 0,
                    pointHoverRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false,
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    });
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
        console.error(`Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

function createBarChart(id, labels, data, colors, horizontal = false) {
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
        
        let datasets;
        
        if (Array.isArray(data) && !Array.isArray(data[0])) {
            // Single dataset
            datasets = [{
                label: 'Value',
                data: data,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }];
        } else {
            // Multiple datasets
            datasets = data.map((dataset, index) => ({
                label: dataset.label,
                data: dataset.data,
                backgroundColor: dataset.color + 'CC', // 80% opacity
                borderColor: dataset.color,
                borderWidth: 1
            }));
        }
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                indexAxis: horizontal ? 'y' : 'x',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: datasets.length > 1
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                // For horizontal bar charts, use x value; for vertical bar charts, use y value
                                const value = horizontal ? context.parsed.x : context.parsed.y;
                                return context.dataset.label + ': ' + value + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: horizontal ? {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    } : {
                        beginAtZero: true
                    },
                    y: horizontal ? {
                        ticks: {
                            // For horizontal charts, use the actual labels instead of indices
                            callback: function(value, index) {
                                return labels[index];
                            }
                        }
                    } : {
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
        console.error(`Error creating chart ${id}:`, error);
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
        
        // Enhanced color palette with better contrast
        const enhancedColors = {
            abuDhabi: {
                main: '#1a73e8',
                background: 'rgba(26, 115, 232, 0.2)',
                highlight: 'rgba(26, 115, 232, 0.8)'
            },
            dubai: {
                main: '#ea4335',
                background: 'rgba(234, 67, 53, 0.2)',
                highlight: 'rgba(234, 67, 53, 0.8)'
            }
        };
        
        // Enhanced datasets with better visual properties
        const chartDatasets = datasets.map((dataset, index) => {
            const colorSet = index === 0 ? enhancedColors.abuDhabi : enhancedColors.dubai;
            
            return {
                label: dataset.label,
                data: dataset.data,
                backgroundColor: colorSet.background,
                borderColor: colorSet.main,
                borderWidth: 2,
                pointBackgroundColor: colorSet.main,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colorSet.highlight,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBorderWidth: 2,
                pointHoverBorderWidth: 2,
                tension: 0.1
            };
        });
        
        // Create the chart
        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: chartDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        borderWidth: 2
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(255, 255, 255, 0.15)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                weight: '600'
                            },
                            color: 'rgba(255, 255, 255, 0.9)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            backdropColor: 'transparent',
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 10
                            },
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'center',
                        labels: {
                            boxWidth: 15,
                            boxHeight: 15,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20,
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        cornerRadius: 6,
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.r;
                                return `${label}: ${value}%`;
                            },
                            afterLabel: function(context) {
                                // Add comparison data
                                const datasetIndex = context.datasetIndex;
                                const otherDatasetIndex = datasetIndex === 0 ? 1 : 0;
                                const otherDataset = context.chart.data.datasets[otherDatasetIndex];
                                
                                if (otherDataset) {
                                    const otherValue = otherDataset.data[context.dataIndex];
                                    const diff = context.parsed.r - otherValue;
                                    const sign = diff > 0 ? '+' : '';
                                    return `Difference: ${sign}${diff}%`;
                                }
                                return '';
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                interaction: {
                    mode: 'nearest',
                    intersect: false,
                    axis: 'r'
                }
            },
            plugins: [{
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart) => {
                    const ctx = chart.canvas.getContext('2d');
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            }]
        });
        
        // Add annotations to highlight key strengths
        addStrengthsAnnotations(chart, datasets);
        
        console.log(`Enhanced radar chart ${id} created successfully`);
        return chart;
    } catch (error) {
        console.error(`Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

// Helper function to add annotations highlighting key strengths
function addStrengthsAnnotations(chart, datasets) {
    if (!chart || !datasets || datasets.length < 1) return;
    
    // Get the chart container
    const container = chart.canvas.parentNode;
    
    // Create a container for the annotations
    const annotationsContainer = document.createElement('div');
    annotationsContainer.className = 'strengths-annotations';
    annotationsContainer.style.display = 'flex';
    annotationsContainer.style.flexWrap = 'wrap';
    annotationsContainer.style.justifyContent = 'space-between';
    annotationsContainer.style.marginTop = '15px';
    
    // Get Abu Dhabi data (first dataset)
    const abuDhabiData = datasets[0].data;
    const labels = chart.data.labels;
    
    // Find top 3 strengths
    const strengths = abuDhabiData
        .map((value, index) => ({ value, label: labels[index] }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3);
    
    // Add a title for the annotations
    const title = document.createElement('div');
    title.textContent = 'Abu Dhabi Key Strengths';
    title.style.width = '100%';
    title.style.fontSize = '14px';
    title.style.fontWeight = '600';
    title.style.marginBottom = '10px';
    title.style.color = 'var(--primary-dark)';
    annotationsContainer.appendChild(title);
    
    // Create annotation for each strength
    strengths.forEach((strength, index) => {
        const annotation = document.createElement('div');
        annotation.className = 'strength-annotation';
        annotation.style.display = 'flex';
        annotation.style.alignItems = 'center';
        annotation.style.padding = '8px 12px';
        annotation.style.marginBottom = '8px';
        annotation.style.backgroundColor = 'rgba(26, 115, 232, 0.1)';
        annotation.style.borderLeft = '3px solid #1a73e8';
        annotation.style.borderRadius = '0 4px 4px 0';
        annotation.style.width = 'calc(33% - 8px)';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-star';
        icon.style.color = '#1a73e8';
        icon.style.marginRight = '8px';
        icon.style.fontSize = '12px';
        
        const content = document.createElement('div');
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        
        const label = document.createElement('div');
        label.textContent = strength.label;
        label.style.fontSize = '12px';
        label.style.fontWeight = '600';
        label.style.color = 'var(--gray-800)';
        
        const value = document.createElement('div');
        value.textContent = `${strength.value}%`;
        value.style.fontSize = '14px';
        value.style.fontWeight = '700';
        value.style.color = '#1a73e8';
        
        content.appendChild(label);
        content.appendChild(value);
        
        annotation.appendChild(icon);
        annotation.appendChild(content);
        
        annotationsContainer.appendChild(annotation);
    });
    
    // Add the annotations container after the chart
    container.after(annotationsContainer);
    
    // Note: 'Show Differences' button removed as requested
}

function createPieChart(id, labels, data) {
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
        
        const colors = [
            'rgba(26, 115, 232, 0.8)',
            'rgba(52, 168, 83, 0.8)',
            'rgba(251, 188, 4, 0.8)',
            'rgba(234, 67, 53, 0.8)',
            'rgba(103, 58, 183, 0.8)',
            'rgba(0, 188, 212, 0.8)'
        ];
        
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
        console.error(`Error creating chart ${id}:`, error);
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
        console.error(`Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

function createHorizontalBarChart(id, labels, data) {
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
        
        const colors = [
            'rgba(26, 115, 232, 0.8)',
            'rgba(52, 168, 83, 0.8)',
            'rgba(251, 188, 4, 0.8)',
            'rgba(234, 67, 53, 0.8)',
            'rgba(103, 58, 183, 0.8)',
            'rgba(0, 188, 212, 0.8)',
            'rgba(255, 152, 0, 0.8)',
            'rgba(96, 125, 139, 0.8)'
        ];
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Value',
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderColor: colors.slice(0, labels.length).map(color => color.replace('0.8', '1')),
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
        console.error(`Error creating chart ${id}:`, error);
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
        
        const chartDatasets = datasets.map(dataset => {
            // Enhanced styling for line type datasets (Dubai Leakage Rate)
            if (dataset.type === 'line') {
                return {
                    label: dataset.label,
                    data: dataset.data,
                    backgroundColor: 'transparent',
                    borderColor: dataset.color,
                    borderWidth: 3,
                    pointBackgroundColor: dataset.color,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    type: dataset.type,
                    yAxisID: 'y',
                    tension: 0.3,
                    order: 0 // Ensure line appears on top of bars
                };
            } 
            // Bar type datasets (Nightlife Importance)
            else {
                return {
                    label: dataset.label,
                    data: dataset.data,
                    backgroundColor: dataset.color + 'CC', // 80% opacity
                    borderColor: dataset.color,
                    borderWidth: 1,
                    type: dataset.type,
                    yAxisID: 'y',
                    order: 1
                };
            }
        });
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: chartDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: 'easeOutCubic'
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        cornerRadius: 6,
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
                        max: 100,
                        grid: {
                            color: 'rgba(200, 200, 200, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            font: {
                                size: 11
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
        
        console.log(`Chart ${id} created successfully`);
    } catch (error) {
        console.error(`Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}

function createDoughnutChart(id, labels, data) {
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
        
        const colors = [
            'rgba(26, 115, 232, 0.8)',
            'rgba(234, 67, 53, 0.8)'
        ];
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors.map(color => color.replace('0.8', '1')),
                    borderWidth: 1
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
        console.error(`Error creating chart ${id}:`, error);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) errorElement.style.display = 'flex';
    }
}
