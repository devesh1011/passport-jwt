const router = require("express").Router();
const passport = require("passport");
const { User } = require("../models/User");
const { genPassword, issueToken, validPassword } = require("../utils/utils");

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      if (!req.user) {
        // If user is not authenticated, return 401 Unauthorized
        return res.status(401).json({ success: false, msg: "Unauthorized" });
      }

      // If user is authenticated, return 200 OK
      res.status(200).json({ success: true, msg: "You are authorized" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, msg: "User not found" });
    }

    const isValid = await validPassword(password, user.hash);

    if (!isValid) {
      return res.status(401).json({ success: false, msg: "Invalid password" });
    }

    const token = issueToken(user);

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { password, username } = req.body;

    const hashedPassword = await genPassword(password);

    const newUser = await User.create({
      username,
      hash: hashedPassword,
    });

    const token = issueToken(newUser);

    res.json({ success: true, user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
