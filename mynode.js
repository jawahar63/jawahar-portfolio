const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { spawn } = require('child_process');

const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: path.join(__dirname, 'src', '.env')});

// 1. Generate environment file
const envFile = `export const environment = {
    production: false,
    emailservice: '${process.env.emailservice || ""}',
    emailtemp: '${process.env.emailtemp || ""}',
    pubkey: '${process.env.pubkey || ""}',
};
`;
const targetPath = path.join(__dirname, 'src', 'environments', 'environment.development.ts');

fs.writeFileSync(targetPath, envFile);
console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);

// 2. Start local API Server
const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/send-email' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        const { user_name, user_email, user_mobile, message } = parsed;

        if (!user_name || !user_email || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing required fields' }));
          return;
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
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Email sent successfully!' }));
            } else {
              res.writeHead(emailjsRes.statusCode || 500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: data || 'Failed to send email via EmailJS' }));
            }
          });
        });

        emailjsReq.on('error', (err) => {
          console.error('EmailJS request error:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        });

        emailjsReq.write(payload);
        emailjsReq.end();
      } catch (err) {
        console.error('Payload parse error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid payload' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(successColor, `${checkSign} Secure Local API Server running on http://localhost:${PORT}`);
  
  // 3. Spawn Angular Development Server (only if not running in api-only mode)
  if (process.argv.includes('--api-only')) {
    console.log('[API] Running in API-only mode. Skipping frontend development server launch.');
  } else {
    console.log('Starting Angular development server...');
    const ngServe = spawn('npx', ['ng', 'serve'], { stdio: 'inherit', shell: true });

    ngServe.on('close', (code) => {
      console.log(`Angular dev server exited with code ${code}`);
      process.exit(code);
    });
  }
});