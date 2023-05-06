import nodemailer from 'nodemailer';

interface OrderEmailParams {
  userEmail: string;
  orderDetails: string;
}

export async function sendOrderEmail({
  userEmail,
  orderDetails,
}: OrderEmailParams): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Set up email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Order Confirmation',
      text: `Thank you for your order. Your order details are: ${orderDetails}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error('Error sending email.');
  }
}
