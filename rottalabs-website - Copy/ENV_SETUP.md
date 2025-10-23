# Environment Configuration for Rottalabs Email System

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

## Gmail Setup Instructions

### 1. Enable 2-Step Verification

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** > **2-Step Verification**
3. Enable 2-Step Verification if not already enabled

### 2. Generate App Password

1. In Google Account Settings, go to **Security** > **App passwords**
2. Select **Mail** as the app
3. Select **Other (Custom name)** and enter "Rottalabs Website"
4. Copy the generated 16-character password

### 3. Configure Environment Variables

```env
# Example configuration
EMAIL_USER=rottalabs@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

## Testing with Different Email

To test with a different email address, simply change the `EMAIL_USER` value:

```env
# Test configuration
EMAIL_USER=test-email@gmail.com
EMAIL_PASS=your-test-app-password
```

## Important Notes

- **Never use your regular Gmail password** - always use App Password
- **Keep `.env.local` secure** - never commit it to version control
- **App passwords are 16 characters** with spaces (include spaces in the password)
- **Each Gmail account needs its own App Password**

## Email Features

### Admin Notification Email

- Sent to `EMAIL_USER` when a quote request is submitted
- Contains all form data with professional styling
- Includes project title, customer details, and message

### Customer Confirmation Email

- Sent to the customer's email address
- Professional confirmation with all submitted details
- Includes contact information for immediate assistance
- Responsive design that works on all email clients

## Troubleshooting

### Common Issues

1. **Authentication failed**: Check if App Password is correct
2. **Email not sending**: Verify 2-Step Verification is enabled
3. **Spam folder**: Check spam folder for test emails

### Testing

1. Fill out the quote request form on your website
2. Check your email address (EMAIL_USER) for admin notification
3. Check customer email address for confirmation
4. Verify emails are received and properly formatted
