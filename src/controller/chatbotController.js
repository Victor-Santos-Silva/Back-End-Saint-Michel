const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

exports.chatTexto = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "openrouter/auto",
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content: "Você é um assistente. Responda as perguntas de forma clara, responsável e ética."
        },
        { role: "user", content: message }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao gerar resposta" });
  }
};

exports.chatImagem = async (req, res) => {
  const message = req.body.message;
  const imagePath = req.file.path;
  const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3.2-11b-vision-instruct:free",
      messages: [
        {
          role: "system",
          content: "Você é um assistente. Responda as perguntas com base na imagem e no texto fornecido, de forma clara, responsável e ética. Sempre responda em português."
        },
        {
          role: "user",
          content: [
            { type: "text", text: message },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
          ]
        }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao analisar imagem" });
  } finally {
    fs.unlinkSync(imagePath);
  }
};
