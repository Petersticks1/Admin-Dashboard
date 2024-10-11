const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
    const li = item.parentElement;
    item.addEventListener("click", function () {
        allSideMenu.forEach((i) => {
            i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
    });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
    sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector("#content nav form .form-input button");
const searchButtonIcon = document.querySelector("#content nav form .form-input button .bx");
const searchForm = document.querySelector(" #content nav form");

searchButton.addEventListener("click", function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle("show");
        if (searchForm.classList.contains("show")) {
            searchButtonIcon.classList.replace("bx-search", "bx-x");
        } else {
            searchButtonIcon.classList.replace("bx-x", "bx-search");
        }
    }
});

if (window.innerWidth < 768) {
    sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-search", "bx-x");
    searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
    }
});

// To get the current URL path
const currentPath = window.location.pathname;

// Loop through the menu items to find which one matches the current path
allSideMenu.forEach((item) => {
    const li = item.parentElement;
    const href = item.getAttribute("href");

    // If the current URL matches the href of the menu item, mark it as active
    if (currentPath.includes(href)) {
        li.classList.add("active");
    } else {
        li.classList.remove("active");
    }
});

//My store//
// Fetch and display products from Fake Store API
async function fetchProducts() {
    try {
        const response = await fetch("./products.json");
        const data = await response.json();

        const productList = document.getElementById("product-list");

        data.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";

            // Product Image
            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.title;
            productCard.appendChild(productImage);

            // Product Title
            const productTitle = document.createElement("h2");
            productTitle.textContent = product.title;
            productCard.appendChild(productTitle);

            // Product Price
            const productPrice = document.createElement("p");
            productPrice.className = "product-price";
            productPrice.textContent = `$${product.price}`;
            productCard.appendChild(productPrice);

            //product Description
            const productDescription = document.createElement("p");
            productDescription.className = "product-description";
            productDescription.textContent = product.description;
            productCard.appendChild(productDescription);

            //product Ratings
            const productRatings = document.createElement("p");
            productRatings.className = "product-ratings";
            productRatings.textContent = `Rating: ${product.rating.rate} / 5`;
            productCard.appendChild(productRatings);

            // Append the product card to the product list
            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
fetchProducts();

//Analytics//
//1. barChart
const canvas = document.getElementById("barChart");
const ctxBar = canvas.getContext("2d");

// Sample data for the chart
const data = {
    labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    values: [12, 19, 3, 5, 2, 3, 8, 13, 9, 7, 4, 6],
};

// Chart Configuration
const chartConfig = {
    type: "bar",
    data: {
        labels: data.labels,
        datasets: [
            {
                label: "Monthly Sales",
                data: data.values,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
};

// Initialize the chart using Chart.js
const myBarChart = new Chart(ctxBar, chartConfig);

//2. InquiryTracking Chart
const ctxt = document.getElementById("inquiryTrackingChart").getContext("2d");

// Chart data
const dataSet = {
    labels: [
        "JAN/24",
        "FEB/24",
        "MAR/24",
        "APR/24",
        "MAY/24",
        "JUN/24",
        "JUL/24",
        "AUG/24",
        "SEP/24",
        "OCT/24",
        "NOV/24",
        "DEC/24",
    ],
    datasets: [
        {
            label: "Inquiries",
            data: [
                10000, 20000, 30000, 50000, 45000, 40000, 35000, 30000, 25000, 20000, 15000, 10000,
            ],
            backgroundColor: "rgba(33, 114, 229, 0.8)", // Blue color for bars
            borderColor: "rgba(33, 114, 229, 1)", // Blue border
            borderWidth: 1,
            borderRadius: 10,
            barPercentage: 0.5, // Make the bar take full width
        },
        {
            label: "Previous Year",
            data: [
                8000, 15000, 25000, 45000, 40000, 38000, 34000, 29000, 23000, 18000, 13000, 9000,
            ],
            backgroundColor: "rgba(220, 220, 220, 0.8)", // Light gray bars
            borderColor: "rgba(200, 200, 200, 1)", // Gray border
            borderRadius: 10,
            barPercentage: 0.5, // Make the bar take full width
        },
    ],
};

// Chart configuration
const config = {
    type: "bar",
    data: dataSet,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // Formatting the Y-axis labels as 'K' (thousands)
                    callback: function (value) {
                        return value / 1000 + "K";
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
};

// Create and render the chart
new Chart(ctxt, config);

// 3. Income Chart
const incomeData = {
    labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    datasets: [
        {
            label: "Income ($)",
            data: [
                12000, 15000, 18000, 20000, 22000, 25000, 30000, 35000, 33000, 28000, 24000, 26000,
            ],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FFCD56",
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
            ],
            hoverOffset: 4, // Slight offset when hovering on a segment
        },
    ],
};

// Chart configuration for Pie chart
const configure = {
    type: "line",
    data: incomeData,
    options: {
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#333",
                    font: {
                        size: 14,
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
};

// Render the chart
const ctxLine = document.getElementById("incomeChart").getContext("2d");
const incomeChart = new Chart(ctxLine, configure);

// 4. Expenditure Chart
// Data for the expenditure report
const expenditureData = {
    labels: ["Rent", "Utilities", "Groceries", "Transportation", "Entertainment", "Miscellaneous"],
    datasets: [
        {
            label: "Expenditure ($)",
            data: [1000, 500, 800, 200, 300, 400],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
            hoverOffset: 4, // Slight offset when hovering
        },
    ],
};

// Total sum of the dataset to calculate percentages and degrees
const total = expenditureData.datasets[0].data.reduce((sum, value) => sum + value, 0);

// Configuration for the Pie chart
const configures = {
    type: "pie",
    data: expenditureData,
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    // Customize tooltip to show percentage and degree
                    label: function (tooltipItem) {
                        const dataset = tooltipItem.dataset;
                        const index = tooltipItem.dataIndex;
                        const value = dataset.data[index];
                        const percentage = ((value / total) * 100).toFixed(2);
                        const degree = ((value / total) * 360).toFixed(2);
                        return `${dataset.label}: $${value} (${percentage}% | ${degree}°)`;
                    },
                },
            },
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#333",
                    font: {
                        size: 14,
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
};

// Render the chart
const ctxPie = document.getElementById("expenditureChart").getContext("2d");
const expenditureChart = new Chart(ctxPie, configures);


//Team//
function showRole(member) {
    member.querySelector(".role").style.color = "#000";
    role.style.transition = "opacity 0.3s ease";
    role.style.opacity = "1";
}

function hideRole(member) {
    member.querySelector(".role").style.color = "#777";
    role.style.transition = "opacity 0.3s ease";
    role.style.opacity = "1";
}




//setting//
// Function to save account settings
function saveAccountSettings() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // For demo purposes, log the values
    console.log(`Account Settings Saved:
    Username: ${username}
    Email: ${email}
    Password: ${password}`);
    alert("Account settings saved!");
}

// Function to save notification settings
function saveNotificationSettings() {
    const emailNotifications = document.getElementById('emailNotifications').checked;
    const smsNotifications = document.getElementById('smsNotifications').checked;
    const pushNotifications = document.getElementById('pushNotifications').checked;

    console.log(`Notification Settings Saved:
    Email Notifications: ${emailNotifications}
    SMS Notifications: ${smsNotifications}
    Push Notifications: ${pushNotifications}`);
    alert("Notification settings saved!");
}

// Function to save privacy settings
function savePrivacySettings() {
    const publicProfile = document.getElementById('publicProfile').checked;
    const searchable = document.getElementById('searchable').checked;

    console.log(`Privacy Settings Saved:
    Public Profile: ${publicProfile}
    Searchable: ${searchable}`);
    alert("Privacy settings saved!");
}
