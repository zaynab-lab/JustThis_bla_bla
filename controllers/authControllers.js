const UserModel = require("../models/user");
const axios = require("axios").default;
const qs = require("qs");
const jwt = require("jsonwebtoken");

const generateOTP = () => {
  var digits = "0123456789";
  var OTP = new Array(5)
    .fill()
    .map(() => digits[Math.floor(Math.random() * 10)])
    .reduce((a, b) => {
      return a + b;
    });
  return OTP;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET);
};

///////////////
module.exports.CreateUser = async (req, res) => {
  const { body } = req;
  if (
    body.phoneNumber.length === 7 ||
    body.phoneNumber.length === 8 ||
    body.phoneNumber.length === 10
  ) {
    const param1 = generateOTP();
    const d = Date.now();
    const user = await UserModel.findOne({
      number: body.phoneNumber
    }).exec();

    if (user) {
      const min = 3 - (d - user.date) / 60000;
      if (min < 3 && min > 0) {
        var mins = Math.ceil(min);
        return res.end(`wait ${mins} min`);
      } else {
        UserModel.findByIdAndUpdate(
          user._id,
          {
            otp: param1,
            date: new Date(),
            otptimes: user.otptimes + 1
          },
          (err) => console.log(err)
        );
      }
    } else {
      const createdUser = new UserModel({
        number: body.phoneNumber,
        otp: param1,
        otptimes: 1
      });
      createdUser.save().catch((err) => console.log(err));
    }

    var options = {
      method: "POST",
      url: "https://api.ghasedak.io/v2/verification/send/simple",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        apikey: process.env.GHASEDAK_API
      },
      data: qs.stringify({
        type: "1",
        param1: param1,
        receptor:
          body.phoneNumber.length === 10
            ? "0" + body.phoneNumber
            : "+961" + body.phoneNumber,
        template: "test",
        lineNumber: process.env.LINENUMBER
      })
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data.result.code);
      })
      .catch((error) => {
        console.error(error);
      });
    return res.end("done");
  } else {
    res.end("يرجى ادخال الرقم بالشكل الصحيح");
  }
};

//////////////////////////

module.exports.Login = async (req, res) => {
  const { body } = req;
  const user = await UserModel.findOne({ number: body.phoneNumber }).exec();
  const d = Date.now();
  if (Math.ceil((d - user.date) / 60000) > 5) {
    return res.end("انتهت مهلت استخدام الرمز");
  }
  const token = createToken(user._id);

  UserModel.findByIdAndUpdate(user._id, { jwt: token }, (err) =>
    console.log(err)
  );

  return user.otp === body.oTP
    ? user.name
      ? res.cookie("jwt", token, { httpOnly: true }) && res.end("exist")
      : res.cookie("jwt", token, { httpOnly: true }) && res.end("done")
    : res.end("الرمز المؤقت غير صحيح");
};

///////////////////////////

module.exports.SetName = async (req, res) => {
  const { body } = req;
  const user = await UserModel.findOne({ number: body.phoneNumber }).exec();

  UserModel.findByIdAndUpdate(
    user._id,
    {
      name: body.name
    },
    (err) => console.log(err)
  );
  res.end("done");
};

/////////////////////////
module.exports.Logout = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.end("noToken");
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.end("invalid");
    return res.cookie("jwt", "", { httpOnly: true }) && res.end("done");
  });
};
