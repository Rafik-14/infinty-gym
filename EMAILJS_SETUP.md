# EmailJS Setup Instructions

To enable email functionality for the subscription form, you need to set up an EmailJS account and configure the service. Here's how:

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Set Up Your Email Service

1. After logging in, go to the "Email Services" tab
2. Connect your email service (Gmail, Outlook, etc.)
3. Follow the authentication process for your email provider
4. Note down the Service ID that EmailJS generates

## Step 3: Create an Email Template

1. Go to the "Email Templates" tab
2. Click "Create new template"
3. Design your subscription confirmation email using the visual editor
4. Use these placeholders in your template:
   - `{{to_name}}` - Subscriber's name
   - `{{plan_name}}` - Selected membership plan
   - `{{duration}}` - Subscription duration
   - `{{phone}}` - Subscriber's phone number
5. Note down the Template ID that EmailJS generates

## Step 4: Update the Configuration in index.html

In the [html/index.html](file:///C:/Users/ksant/OneDrive/Bureau/final%20gymwebsite/infinity-gym-github-ready/html/index.html) file, you need to replace two placeholder values:

1. Replace `"YOUR_EMAILJS_PUBLIC_KEY"` with your actual EmailJS public key
   - Found in Account -> API Keys -> Public Key
   
2. Replace `'YOUR_SERVICE_ID'` with your actual Service ID
   - Found in Email Services -> Your service -> Service ID

3. Replace `'YOUR_TEMPLATE_ID'` with your actual Template ID
   - Found in Email Templates -> Your template -> Template ID

## Example Email Template

Here's a sample email template you can use:

```
Hello {{to_name}},

Thank you for subscribing to Infinity Gym!

Subscription Details:
- Plan: {{plan_name}}
- Duration: {{duration}}

Our team will contact you shortly to finalize your membership setup.

If you have any questions, feel free to reach out to us at contact@gymcenter.com.

Best regards,
Infinity Gym Team
```

## Testing

After completing the setup:
1. Open [index.html](file:///C:/Users/ksant/OneDrive/Bureau/final%20gymwebsite/infinity-gym-github-ready/html/index.html) in your browser
2. Navigate to the subscription section
3. Fill out the subscription form
4. Submit the form
5. Check the subscriber's email inbox for the confirmation email

## Troubleshooting

If emails aren't being sent:
1. Check the browser console for error messages
2. Verify all ID values are correctly entered
3. Ensure your email service is properly authenticated in EmailJS
4. Check that your EmailJS account is not rate-limited (free accounts have limits)