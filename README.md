# Amber Attiire 👗

A modern luxury saree e-commerce website built with React.js and Tailwind CSS, featuring dynamic product management using Google Sheets integration.

---

## ✨ Features

* Elegant luxury-inspired UI/UX
* Fully responsive design
* Dynamic product listing
* Google Sheets powered CMS
* Real-time product updates
* Product categories & collections
* Shopping cart functionality
* Optimized image loading
* Easy product management for clients

---

## 🛠️ Tech Stack

* React.js
* JavaScript
* Tailwind CSS
* React Router
* Google Sheets API
* Google Apps Script

---

## 📦 Product Management

This project uses **Google Sheets as a lightweight CMS**, allowing the client to:

* Add new products
* Edit product prices
* Update stock
* Change product images
* Manage collections

All changes made in Google Sheets are automatically reflected on the website in real time.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to Project Folder

```bash
cd amber-attiire
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

---

## 🔗 Google Sheets Integration Setup

### Create Google Sheet

Create a sheet named:

```bash
Products
```

Add columns like:

```bash
id | name | price | image | category | description | stock | tag
```

---

### Setup Google Apps Script

Go to:

```bash
Extensions → Apps Script
```

Paste:

```javascript
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Products");
  const data = sheet.getDataRange().getValues();

  const headers = data[0];
  const rows = data.slice(1);

  const products = rows.map(row => {
    let obj = {};

    headers.forEach((header, i) => {
      obj[header] = row[i];
    });

    return obj;
  });

  return ContentService
    .createTextOutput(JSON.stringify(products))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

### Deploy Script

* Deploy → New Deployment
* Select **Web App**
* Execute as: **Me**
* Access: **Anyone**

Copy the Web App URL.

---

### Add API URL

Inside:

```bash
src/hooks/useProducts.js
```

Replace:

```javascript
const API_URL = "YOUR_GOOGLE_SCRIPT_URL";
```

---

## 📸 Screenshots

Add your project screenshots here.

---

## 🔮 Future Improvements

* Payment gateway integration
* Admin dashboard
* Authentication
* Inventory management
* Backend database integration
* Wishlist & order tracking

---

## 👨‍💻 Developed By

Subham Saha
Frontend Engineer | React.js Developer
