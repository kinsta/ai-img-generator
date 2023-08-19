const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api', async (req, res) => {
	try {
		const { prompt } = req.body;
		const response = await openai.images.generate({
			prompt,
			n: 1,
			size: '1024x1024',
			response_format: 'b64_json',
		});

		const image = response.data[0].b64_json;
		res.status(200).json({ photo: image });
	} catch (error) {
		console.error(error);
	}
});

app.get('/', async (req, res) => {
	res.status(200).json({
		message: 'Hello from DALL.E!',
	});
});

const startServer = async () => {
	app.listen(8080, () => console.log('Server started on port 8080'));
};

startServer();
