import express from "express";
const app = express();

const getData = async () => {
  const data = await fetch("https://api.api-ninjas.com/v1/dadjokes", {
    headers: { "X-Api-Key": "3znBYdb17tpO/7pHX741cA==ftYx8aNZMd4Am0Jm" },
  });
  const res = await data.json();
  console.log(res);
  return res;
};

const getRandomImage = async () => {
  let data = await fetch(
    "https://api.unsplash.com/photos/random/?client_id=9rgcbEAWzIQ2U4lzGcnqo7JCPAj95ojrF8NtFWZPgGY&count=1"
  );
  let res = await data.json();
  return res[0].urls;
};

app.get("/api/joke/random", async (req, res) => {
  try {
    const data = await getData();
    if (data.error) {
      res.status(500).json(data);
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/image/random", async (req, res) => {
  try {
    const data = await getRandomImage();
    if (data.error) {
      res.status(500).json(data);
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/joke&&image/random", async (req, res) => {
  try {
    const data1 = await getData();
    const data2 = await getRandomImage();
    res.json({ data1, data2 });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(1000, () => {
  console.log("server is running on port 1000");
});