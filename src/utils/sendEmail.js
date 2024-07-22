const { google } = require("googleapis");
const nodemailer = require("nodemailer");

/* POPULATE BELOW FIELDS WITH YOUR CREDENTIALS */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const MY_EMAIL = process.env.MY_EMAIL;

// REQUEST TO GOOGLE FOR REFRESH TOKEN
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// ADD REFRESH TOKEN TO oAuth2Client
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// DECLARE THE SEND EMAIL FUNCTION WITH EMAIL RECIPIENT, MORE INFORMATION CAN BE PASSED SUCH AS TEMPLATES OR ATTACHMENTS, ETC.
const sendEmail = async (emailRecipient) => {
  try {
    // GET THE ACCESS TOKEN TO USE YOUR EMAIL
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
    if (ACCESS_TOKEN.token === null) {
      throw new Error("Failed to obtain access token");
    }

    // CREATE THE TRANSPORT JSON WITH ALL THE DATA ABOVE
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: MY_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN.token,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // EMAIL DATA TO SEND TO THE RECEIVING EMAIL
    const mailOptions = {
      from: MY_EMAIL,
      to: emailRecipient,
      subject: "New email from your API",
      html: `
        <p>Hey ${emailRecipient},</p>
        <p>Thanks for using my API</p>
        <p>ENJOY!</p>
      `,
    };

    // SEND EMAIL AND HANDLE ANY ERRORS
    return await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw new Error("Failed to send email: " + error.message);
  }
};

module.exports = { sendEmail };
