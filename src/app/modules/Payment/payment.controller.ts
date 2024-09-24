import catchAsync from '../../utils/catchAsync';

const confirmationController = catchAsync(async (req, res) => {
  res.send(
    ` 
  <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Successful</title>
  <style>
    /* Inline CSS for hover effect */
    a.button-link {
      background-color: #ffffff;
      color: #EA580C;
      padding: 10px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
      transition: background-color 0.3s, color 0.3s;
    }
    a.button-link:hover {
      background-color: #1E1B4B;
      color: #ffffff;
    }
  </style>
</head>
<body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f4f8; margin: 0; font-family: Arial, sans-serif;">
  <div style="background-color: #EA580C; color: white; padding: 30px; border-radius: 12px; text-align: center; max-width: 400px; width: 100%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 50px; height: 50px; margin-bottom: 20px;">
      <path fill-rule="evenodd" d="M2.25 12a9.75 9.75 0 1117.539 5.744L12 21.75l-7.789-3.995A9.72 9.72 0 012.25 12zm7.72 4.53a.75.75 0 101.06-1.06L9.56 13.25h8.69a.75.75 0 000-1.5H9.56l1.47-1.47a.75.75 0 10-1.06-1.06L7.72 12.47l-1.47-1.47a.75.75 0 10-1.06 1.06L7.72 12l-1.47 1.47a.75.75 0 001.06 1.06l1.47-1.47z" clip-rule="evenodd" />
    </svg>
    <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 20px;">Payment Successful!</h1>
    <p style="font-size: 16px; margin-bottom: 25px;">Your transaction has been processed successfully.</p>
    <a href="http://localhost:5173/" class="button-link">
      Go back to Home
    </a>
  </div>
</body>
</html>
`,
  );
});

const failuerController = catchAsync(async (req, res) => {
  res.send(`
     <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Failed</title>
      <style>
        a.button-link {
          background-color: #ffffff;
          color: #dc2626;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
          transition: background-color 0.3s, color 0.3s;
        }
        a.button-link:hover {
          background-color: #dc2626;
          color: #ffffff;
        }
      </style>
    </head>
    <body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f4f8; margin: 0; font-family: Arial, sans-serif;">
      <div style="background-color: #dc2626; color: white; padding: 30px; border-radius: 12px; text-align: center; max-width: 400px; width: 100%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style="width: 50px; height: 50px; margin-bottom: 20px;">
          <path fill-rule="evenodd" d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zm-1.5 6.75a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3zm1.5 7.5a.75.75 0 01-1.5 0v-.75a.75.75 0 011.5 0v.75z" clip-rule="evenodd"/>
        </svg>
        <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 20px;">Payment Failed!</h1>
        <p style="font-size: 16px; margin-bottom: 25px;">Unfortunately, your transaction could not be processed.</p>
        <a href="http://localhost:5173/" class="button-link">
          Try Again
        </a>
      </div>
    </body>
    </html>
    `);
});

const cancelController = catchAsync(async (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Canceled</title>
      <style>
        a.button-link {
          background-color: #ffffff;
          color: #9ca3af;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
          transition: background-color 0.3s, color 0.3s;
        }
        a.button-link:hover {
          background-color: #9ca3af;
          color: #ffffff;
        }
      </style>
    </head>
    <body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f4f8; margin: 0; font-family: Arial, sans-serif;">
      <div style="background-color: #6b7280; color: white; padding: 30px; border-radius: 12px; text-align: center; max-width: 400px; width: 100%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style="width: 50px; height: 50px; margin-bottom: 20px;">
          <path fill-rule="evenodd" d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zm-1.5 7.5a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3zm0 4.5a.75.75 0 111.5 0v.75a.75.75 0 11-1.5 0v-.75z" clip-rule="evenodd"/>
        </svg>
        <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 20px;">Payment Canceled</h1>
        <p style="font-size: 16px; margin-bottom: 25px;">Your payment process has been canceled.</p>
        <a href="http://localhost:5173/" class="button-link">
          Go back to Home
        </a>
      </div>
    </body>
    </html>
    `);
});

export const PaymentControllers = {
  confirmationController,
  failuerController,
  cancelController,
};
