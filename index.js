const express = require("express");
const cors = require("cors");
const yahooFinance = require("yahoo-finance2").default;

const app = express();
app.use(cors());

app.get("/api/quote/:symbol", async (req, res) => {
  try {
    const quote = await yahooFinance.quote(req.params.symbol);
    res.json({
      symbol: quote.symbol,
      price: quote.regularMarketPrice,
      marketCap: quote.marketCap,
      peRatio: quote.trailingPE,
      changePercent: quote.regularMarketChangePercent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
