
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure to set this in your .env.local file
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003", // or any other suitable model
        prompt: req.body.query, // Assuming the query is sent in the request body
        max_tokens: 150,
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Error querying OpenAI API" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
