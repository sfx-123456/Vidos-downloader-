const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/*
  IMPORTANT

  This backend is designed for media URLs that you are
  authorized to retrieve.

  It does NOT scrape YouTube, Instagram, TikTok, etc.
  or bypass authentication/protection.
*/


app.get("/", (req, res) => {

  res.json({
    name: "MediaGrab API",
    status: "online"
  });

});


app.post("/api/media", async (req, res) => {

  try {

    const { url, platform } = req.body;

    if (!url) {

      return res.status(400).json({
        error: "URL is required"
      });

    }


    /*
      Basic URL validation
    */

    let parsedURL;

    try {

      parsedURL = new URL(url);

    } catch {

      return res.status(400).json({
        error: "Invalid URL"
      });

    }


    /*
      Only allow HTTPS URLs.
    */

    if (parsedURL.protocol !== "https:") {

      return res.status(400).json({
        error: "Only HTTPS URLs are supported"
      });

    }


    /*
      In a real deployment, this is where you would
      connect to YOUR authorized media provider/storage.

      Example response for a video that you own:

        {
          title: "My Video",
          formats: [
            {
              quality: "Original",
              url: "https://example.com/video.mp4"
            }
          ]
        }
    */


    return res.json({

      title: "Authorized media",

      platform: platform || "unknown",

      formats: [
        {
          quality: "Original",
          url: url
        }
      ]

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Server error"
    });

  }

});


app.listen(PORT, () => {

  console.log(
    `MediaGrab API running on port ${PORT}`
  );

});