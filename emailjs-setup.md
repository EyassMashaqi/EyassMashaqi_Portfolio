# EmailJS Setup Guide for Your Portfolio Contact Form

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Yahoo Mail**
   - Or any other SMTP service
4. Follow the connection steps for your chosen service
5. **Copy the Service ID** (you'll need this)

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Portfolio Contact: {{subject}}

Hello Eyass,

You have received a new message from your portfolio website:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. **Copy the Template ID** (you'll need this)

### Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (starts with something like "user_...")
3. Copy this key

### Step 5: Update Your Configuration
1. Copy `config.template.js` to `config.js`
2. Open your new `config.js` file
3. Replace the placeholder values with your actual credentials:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "user_abc123xyz789",        // Your Public Key from Step 4
    SERVICE_ID: "service_gmail123",         // Your Service ID from Step 2  
    TEMPLATE_ID: "template_contact456"      // Your Template ID from Step 3
};
```

### Security Note:
- `config.js` is automatically ignored by git (won't be uploaded to GitHub)
- Your credentials stay private and secure
- Use `config.template.js` as a reference for the structure

## 🎯 Final Steps

1. Save your `script.js` file
2. Test your contact form
3. Check your email inbox for test messages

## 🔧 Troubleshooting

- **Form not sending?** Check browser console for errors
- **Not receiving emails?** Check spam folder
- **Service connection issues?** Re-verify your email service in EmailJS dashboard

## 💡 Pro Tips

- EmailJS free tier includes 200 emails/month (perfect for portfolio)
- You can customize the email template design in EmailJS dashboard
- Add auto-reply functionality by creating a second template
- Monitor email delivery in your EmailJS dashboard

## 🛡️ Security Note

Your EmailJS keys are safe to use in frontend code - they're designed for client-side use and have built-in rate limiting and domain restrictions.

---

**Need help?** EmailJS has excellent documentation at [docs.emailjs.com](https://www.emailjs.com/docs/) 