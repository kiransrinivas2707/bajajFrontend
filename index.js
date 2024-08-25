const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(express.json());
app.use(cors()); 
app
  .route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    try {
      const data = req.body.data || [];
      const numbers = [];
      const alphabets = [];
      let highest_alphabet = "";

      if (!Array.isArray(data)) {
        return res.status(400).json({
          is_success: false,
          error: "Invalid input format. 'data' should be an array.",
        });
      }

      for (const item of data) {
        if (!isNaN(item)) {
          numbers.push(item);
        } else if (item.length === 1 && isNaN(item)) {
          alphabets.push(item);
          if (
            !highest_alphabet ||
            item.toLowerCase() > highest_alphabet.toLowerCase()
          ) {
            highest_alphabet = item;
          }
        }
      }

      res.json({
        is_success: true,
        user_id: "Kiran123",
        email: "srinivas.21bce9808@vitapstudent.ac.in",
        roll_number: "21bce9808",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highest_alphabet
          ? [highest_alphabet]
          : [],
      });
    } catch (error) {
      res.status(500).json({
        is_success: false,
        error: "An internal server error occurred.",
      });
    }
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
