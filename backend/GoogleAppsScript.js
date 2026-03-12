/**
 * Amber Attire Boutique - Order Processing Webhook
 * 
 * Instructions:
 * 1. Open your Google Sheet for Orders.
 * 2. Go to Extensions -> Apps Script.
 * 3. Paste this entire code, replacing any existing code.
 * 4. Click Deploy -> New Deployment.
 * 5. Select type "Web app".
 * 6. Set "Execute as" to "Me".
 * 7. Set "Who has access" to "Anyone".
 * 8. Copy the Web app URL and paste it into Checkout.jsx in your React app.
 */

const WHATSAPP_API_URL = 'https://api.callmebot.com/whatsapp.php';
// You will need a free API key from CallMeBot or similar provider for WhatsApp.
// Example: https://api.callmebot.com/whatsapp.php?phone=[phone_number]&text=[message]&apikey=[your_apikey]
const WHATSAPP_PHONE = '917003948169';
const WHATSAPP_API_KEY = 'YOUR_CALLMEBOT_API_KEY'; // Replace with real key OR change text sending provider

const STORE_OWNER_EMAIL = 'saha007subham@gmail.com';

function doPost(e) {
    try {
        // 1. Parse incoming JSON data from React fetch
        const orderData = JSON.parse(e.postData.contents);

        // Generate an Order ID
        const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
        const orderDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        // 2. Append to Google Sheets
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        sheet.appendRow([
            orderId,
            orderData.customerName,
            orderData.phone,
            orderData.email,
            orderData.products,
            orderData.totalAmount, // Assuming quantity is merged or handled in total
            orderData.address,
            orderData.city,
            orderData.state,
            orderData.pincode,
            orderData.paymentMethod,
            orderDate,
            orderData.notes || ''
        ]);

        // 3. Send Email Notification
        const emailSubject = `New Order Received – Amber Attire Boutique (${orderId})`;
        const emailBody = `
      New Order Received 🛍️
      
      Order ID: ${orderId}
      Date: ${orderDate}
      
      Customer Name: ${orderData.customerName}
      Phone: ${orderData.phone}
      Email: ${orderData.email}
      
      Products:
      ${orderData.products}
      
      Shipping Address:
      ${orderData.address}, ${orderData.city}, ${orderData.state}, ${orderData.pincode}
      
      Payment Method: ${orderData.paymentMethod}
      Total Amount: ₹${orderData.totalAmount}
      
      Order Notes: ${orderData.notes || 'None'}
    `;

        MailApp.sendEmail(STORE_OWNER_EMAIL, emailSubject, emailBody);

        // 4. Send WhatsApp Notification (via CallMeBot example API)
        if (WHATSAPP_API_KEY !== 'YOUR_CALLMEBOT_API_KEY') {
            const shortMessage = `Hey ${orderData.customerName} Just placed an Order, please check the Google Sheet.`;
            const whatsappMessage = encodeURIComponent(shortMessage);
            const url = `${WHATSAPP_API_URL}?phone=${WHATSAPP_PHONE}&text=${whatsappMessage}&apikey=${WHATSAPP_API_KEY}`;

            UrlFetchApp.fetch(url, { muteHttpExceptions: true });
        }

        // Return Success Response back to React
        return ContentService.createTextOutput(JSON.stringify({ status: 'success', orderId: orderId }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Log error and return failure
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Needed to handle CORS preflight requests from React
function doOptions(e) {
    return ContentService.createTextOutput()
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
