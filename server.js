const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
const port = 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/get-openai-reply', async (req, res) => {
    const completion = await openai.chat.completions.create({
        messages: req.body.messages,
        model: "gpt-3.5-turbo",
    });
    res.json(completion.choices[0]);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});