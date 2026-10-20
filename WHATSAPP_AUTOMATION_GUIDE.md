# 📱 WhatsApp Automation Guide — Sukhadiya Manilal Nathalal

This guide explains two ways to automatically reply with your full shop details, 79+ sweet catalog, and website link whenever a customer sends you **"Hi"** on WhatsApp.

---

## ⚡ Option 1: WhatsApp Business App (Recommended — 100% Free, 1-Minute Setup)
*No coding or hosting required. Works directly inside the official WhatsApp Business app on your phone 24/7.*

### Step-by-Step Setup:
1. Open **WhatsApp Business** on your phone.
2. Tap the **Three Dots (⋮)** in the top right corner (or **Settings** on iPhone).
3. Go to **Business Tools** → **Greeting message**.
4. Turn **ON** `Send greeting message`.
5. Under **Recipients**, select `Everyone` (or `Everyone not in address book`).
6. Tap the pencil icon next to **Greeting message**, copy and paste the message below, and tap **Save**:

### 📋 Copy & Paste This Exact Auto-Reply Message:
```text
🙏 *નમસ્તે! Welcome to Sukhadiya Manilal Nathalal*
_Pure Desi Ghee & Cashew Delicacies Since 1849 | Manek Chowk, Ahmedabad_ 🍬✨

Thank you for reaching out! Here are our complete shop details and digital storefront:

🌐 *Browse 79+ Traditional Sweets & Live Rate Card:*
👉 https://ysukhadia49-art.github.io/SMN-SWEETS-/

📍 *Shop Location & Google Maps Counter:*
👉 https://maps.app.goo.gl/1h4LNKy4z7mjN2xEA?g_st=ac
_Shop No. 9, 10, 11, Kandoi Ol, Manek Chowk, Ahmedabad - 380001_

⏰ *Shop Timings:*
Monday – Sunday: 8:00 AM – 10:30 PM (Open 7 Days)

🎁 *Our Specialties:*
• 100% Pure Desi Ghee Mohanthal, Mesub & Magas
• Fresh Kaju Katli & Dry Fruit Rolls (Wholesale & Retail)
• Traditional Peda, Pista Barfi & Bengali Sweets
• Custom Wedding & Festival Shagun Gift Hampers

💬 *Quick Replies:*
Reply with:
• *1* or *MENU* — To view our 79 sweet varieties and rates
• *2* or *BULK* — For marriage & corporate gift enquiries
• *3* or *LOCATION* — For shop directions in Manek Chowk

_Please let us know how we can assist you today!_
```

### Setup Quick Replies (Shortcuts for Fast Responses):
1. In **Business Tools**, tap **Quick replies**.
2. Tap **(+)** to add shortcuts:
   - Shortcut `/menu` → Sends the sweet catalog link: `https://ysukhadia49-art.github.io/SMN-SWEETS-/#sweets`
   - Shortcut `/bulk` → Sends the bulk orders page: `https://ysukhadia49-art.github.io/SMN-SWEETS-/#bulk-orders`
   - Shortcut `/map` → Sends the Google Maps link: `https://maps.app.goo.gl/1h4LNKy4z7mjN2xEA?g_st=ac`

---

## 💻 Option 2: Programmatic Node.js WhatsApp Bot
*If you prefer running a server-side bot on your computer or VPS.*

We have created an automated bot script at [`scripts/whatsapp-auto-responder.js`](./scripts/whatsapp-auto-responder.js).

### How to Run It:
1. Open PowerShell or Terminal in the project directory:
   ```bash
   cd "C:\Users\yug sukhadia\.gemini\antigravity-ide\scratch\sukhadiya-mithai"
   ```
2. Install the lightweight WhatsApp automation libraries:
   ```bash
   npm install whatsapp-web.js qrcode-terminal
   ```
3. Launch the bot:
   ```bash
   node scripts/whatsapp-auto-responder.js
   ```
4. A QR code will appear in your terminal. Open WhatsApp on your phone:
   - Tap **Linked devices** → **Link a device**
   - Scan the QR code.
5. Done! Now whenever anyone sends `"Hi"`, `"Hello"`, `"Kem cho"`, `"Menu"`, or asks for details, your bot automatically replies with the complete shop details and web link!
