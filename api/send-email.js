const https = require('https');

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { user_name, user_email, user_mobile, message } = req.body;

    if (!user_name || !user_email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const payloadObj = {
      service_id: process.env.emailservice,
      template_id: process.env.emailtemp,
      user_id: process.env.pubkey,
      template_params: {
        user_name,
        user_email,
        user_mobile: user_mobile || '',
        message
      }
    };

    if (process.env.email_access_token) {
      payloadObj.accessToken = process.env.email_access_token;
    }

    const payload = JSON.stringify(payloadObj);

    const options = {
      hostname: 'api.emailjs.com',
      port: 443,
      path: '/api/v1.0/email/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const emailjsReq = https.request(options, (emailjsRes) => {
      let data = '';
      emailjsRes.on('data', (chunk) => {
        data += chunk;
      });

      emailjsRes.on('end', () => {
        if (emailjsRes.statusCode >= 200 && emailjsRes.statusCode < 300) {
          res.status(200).json({ message: 'Email sent successfully!' });
        } else {
          res.status(emailjsRes.statusCode || 500).json({ error: data || 'Failed to send email via EmailJS' });
        }
      });
    });

    emailjsReq.on('error', (err) => {
      console.error('EmailJS request error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    emailjsReq.write(payload);
    emailjsReq.end();

  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
