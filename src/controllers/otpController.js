const Otp = require('../models/otp');

// Generate a random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// POST /api/otp/send
const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number' });
    }

    // Delete any existing OTP for this phone
    await Otp.deleteMany({ phone });

    // Generate new OTP
    const otp = generateOtp();

    // Save OTP to DB — expires in 5 minutes
    await Otp.create({
      phone,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    });

    // -------------------------------------------------
    // REAL SMS INTEGRATION (uncomment when ready):
    // Using Twilio:
    //   const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    //   await twilio.messages.create({
    //     body: `Your 1Fi OTP is ${otp}. Valid for 5 minutes.`,
    //     from: process.env.TWILIO_PHONE,
    //     to: `+91${phone}`,
    //   });
    //
    // Using Fast2SMS (popular in India):
    //   await axios.post('https://www.fast2sms.com/dev/bulkV2', {
    //     variables_values: otp,
    //     route: 'otp',
    //     numbers: phone,
    //   }, { headers: { authorization: process.env.FAST2SMS_KEY } });
    // -------------------------------------------------

    console.log(`OTP for ${phone}: ${otp}`); // remove in production

    res.json({
      success: true,
      message: 'OTP sent successfully',
      // Remove 'otp' from response in production — only for demo/testing
      otp: process.env.NODE_ENV === 'production' ? undefined : otp,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/otp/verify
const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
    }

    // Find OTP in DB
    const record = await Otp.findOne({ phone, otp });

    if (!record) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (new Date() > record.expiresAt) {
      await Otp.deleteOne({ _id: record._id });
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
    }

    // Mark as verified and delete
    await Otp.deleteOne({ _id: record._id });

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { sendOtp, verifyOtp };