import axios from "axios";
const GPT_API_URL = 'https://api.openai.com/v1/completions';

export async function generateText(prompt) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
  const data = {
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 2048,
    temperature: 0.5,
    n: 1,
    stop: null,
  };

  try {
    const response = await axios.post(GPT_API_URL, data, { headers });
    const generatedText = response.data.choices[0].text;
    return generatedText;
  } catch (error) {
    console.error('Error al llamar a la API de GPT-3:', error);
    throw error;
  }
}

export default generateText;
