const { getUserPages } = require("../../components/facebookGraphAPI");

const router = require("express").Router();

async function signInRouterFunction(req, res, next) {
  try {
    const { access_token } = req.body;
    const { APP_ID, APP_SECRET } = process.env;

    const { user_pages, error } = await getUserPages({
      access_token,
      app_id: APP_ID,
      app_secret: APP_SECRET,
    });

    if (error) throw error;

    const { data } = user_pages;

    res.send({
      status: "success",
      httpCode: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
}

router.post("/", signInRouterFunction);

module.exports = router;
