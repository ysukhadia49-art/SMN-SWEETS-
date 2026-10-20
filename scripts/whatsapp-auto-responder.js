/**
 * ============================================================================
 * Sukhadiya Manilal Nathalal — WhatsApp Auto-Responder Bot
 * ============================================================================
 * 
 * This script runs a local Node.js automation bot that connects to WhatsApp
 * (via whatsapp-web.js with QR code login) and automatically replies to any
 * customer sending "Hi", "Hello", "Kem cho", "Menu", etc. with complete shop
 * details, website catalog link, Google Maps directions, and ordering info.
 * 
 * Setup instructions:
 * 1. Install dependencies:
 *    npm install whatsapp-web.js qrcode-terminal
 * 2. Start the bot:
 *    node scripts/whatsapp-auto-responder.js
 * 3. Scan the terminal QR code using your WhatsApp (Linked Devices).
 * ============================================================================
 */

import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

// Shop Configuration & Links
const SHOP_CONFIG = {
  name: 'Sukhadiya Manilal Nathalal',
  established: '1849',
  address: 'Shop No. 9, 10, 11, Kandoi Ol, Manek Chowk, Ahmedabad - 380001',
  phone: '+91 823 877 3681',
  mapsUrl: 'https://maps.app.goo.gl/1h4LNKy4z7mjN2xEA?g_st=ac',
  websiteUrl: 'https://smn-sweets.vercel.app/',
  hours: '8:00 AM – 10:30 PM (Open 7 Days)'
};

// Auto-Reply Greeting Message
const GREETING_MESSAGE = `🙏 *નમસ્તે! Welcome to ${SHOP_CONFIG.name}*
_Pure Desi Ghee & Cashew Delicacies Since ${SHOP_CONFIG.established} | Manek Chowk, Ahmedabad_ 🍬✨

Thank you for reaching out! Here are our complete shop details and digital storefront:

🌐 *Browse 79+ Traditional Sweets & Live Rate Card:*
👉 ${SHOP_CONFIG.websiteUrl}

📍 *Visit Shop (Manek Chowk Counter) & Google Maps:*
👉 ${SHOP_CONFIG.mapsUrl}
_${SHOP_CONFIG.address}_

⏰ *Shop Timings:*
${SHOP_CONFIG.hours}

🎁 *Our Specialties:*
• 100% Pure Desi Ghee Mohanthal, Mesub & Magas
• Kaju Katli & Dry Fruit Rolls (Wholesale & Retail)
• Traditional Peda, Pista Barfi & Malai Sweets
• Custom Wedding & Festival Shagun Gift Hampers

💬 *Quick Replies:*
• Reply *1* or *CATALOG* — For our full sweet menu & prices
• Reply *2* or *BULK* — For marriage & corporate gift enquiries
• Reply *3* or *LOCATION* — For shop directions in Manek Chowk

_Please let us know which sweets or gift hampers you would like to order!_`;

// Menu Quick Reply
const MENU_MESSAGE = `🍬 *${SHOP_CONFIG.name} — Popular Categories:*

1. *Kaju & Dry Fruit:* Kaju Katli, Kaju Roll, Anjeer Dry Fruit Barfi
2. *Pure Desi Ghee:* Traditional Mohanthal, Kopra Paak, Mysore Pak, Magas
3. *Mawa & Milk:* Mathura Peda, Kesar Peda, Malai Barfi, Milk Cake
4. *Festival Gift Boxes:* 500g, 1kg & bespoke curated shagun boxes

👉 *Click here to see all 79 sweets with photos and prices:*
${SHOP_CONFIG.websiteUrl}#sweets`;

// Bulk Order Quick Reply
const BULK_MESSAGE = `📦 *Bulk Orders & Wedding Gifting:*

We provide special wholesale rates and customized gold-foil celebration boxes for:
• Wedding Invitations & Shagun
• Ring Ceremonies & Baby Showers
• Corporate Festivals & Diwali Hampers

👉 *Submit a Bulk Enquiry online or book a sample tasting box:*
${SHOP_CONFIG.websiteUrl}#bulk-orders

Or reply directly here with your event date and required quantity (e.g. 25kg, 50 boxes).`;

// Location Quick Reply
const LOCATION_MESSAGE = `📍 *Visit our Heritage Counter in Ahmedabad:*

*Sukhadiya Manilal Nathalal*
${SHOP_CONFIG.address}
⏰ Hours: ${SHOP_CONFIG.hours}
📞 Phone: ${SHOP_CONFIG.phone}

👉 *Google Maps Live Directions & Reviews (4.6 ★):*
${SHOP_CONFIG.mapsUrl}`;

// Initialize WhatsApp Web Client
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: './.wwebjs_auth'
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// Generate QR Code for WhatsApp linking
client.on('qr', (qr) => {
  console.log('\n======================================================');
  console.log('📱 SCAN THIS QR CODE WITH WHATSAPP TO CONNECT YOUR BOT');
  console.log('Open WhatsApp > Linked Devices > Link a device');
  console.log('======================================================\n');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('\n✅ WhatsApp Automation Bot is ONLINE and ready!');
  console.log(`📡 Listening for customer messages for ${SHOP_CONFIG.name}...`);
});

// Message Listener & Smart Auto-Responder
client.on('message', async (msg) => {
  // Ignore group chats and status updates
  if (msg.from.includes('@g.us') || msg.isStatus) return;

  const text = (msg.body || '').trim().toLowerCase();
  console.log(`📩 Incoming message from ${msg.from}: "${msg.body}"`);

  try {
    // 1. Trigger for Greeting (Hi, Hello, Namaste, Kem cho, Hey, etc.)
    const isGreeting = /^(hi|hello|hey|namaste|kem cho|kemcho|smn|pranam|ram ram|shree krishna|jay shree krishna|good morning|good evening|info|details)/i.test(text);

    if (isGreeting || text === '') {
      await msg.reply(GREETING_MESSAGE);
      console.log(`📤 Sent complete shop greeting & website link to ${msg.from}`);
      return;
    }

    // 2. Trigger for Catalog / Menu
    if (text === '1' || text.includes('catalog') || text.includes('menu') || text.includes('sweet') || text.includes('mithai') || text.includes('price')) {
      await msg.reply(MENU_MESSAGE);
      console.log(`📤 Sent menu response to ${msg.from}`);
      return;
    }

    // 3. Trigger for Bulk Orders
    if (text === '2' || text.includes('bulk') || text.includes('wedding') || text.includes('lagan') || text.includes('wholesale') || text.includes('shagun')) {
      await msg.reply(BULK_MESSAGE);
      console.log(`📤 Sent bulk order details to ${msg.from}`);
      return;
    }

    // 4. Trigger for Location
    if (text === '3' || text.includes('location') || text.includes('address') || text.includes('map') || text.includes('timing') || text.includes('kaha')) {
      await msg.reply(LOCATION_MESSAGE);
      console.log(`📤 Sent location details to ${msg.from}`);
      return;
    }

    // For any other general first query, reply with the standard greeting card
    await msg.reply(GREETING_MESSAGE);
    console.log(`📤 Sent default auto-reply to ${msg.from}`);

  } catch (error) {
    console.error('❌ Error replying to message:', error);
  }
});

client.initialize();
