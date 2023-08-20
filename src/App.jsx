import { Form, Loader } from './components';
import { preview } from './assets';
import { downloadImage } from './utils';

import { useState } from 'react';

const App = () => {
	// const [isLoading, setIsLoading] = useState(false)
	const [isGenerating, setIsGenerating] = useState(false);
	const [generatedImage, setGeneratedImage] = useState({
		photo: null,
		altText: null,
	});

	const generateImage = async (prompt, setPrompt) => {
		if (prompt) {
			try {
				setIsGenerating(true);
				const response = await fetch(
					'/api',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							prompt,
						}),
					}
				);

				const data = await response.json();
				setGeneratedImage({
					photo: `data:image/jpeg;base64,${data.photo}`,
					altText: prompt,
				});
			} catch (err) {
				alert(err);
			} finally {
				setPrompt('');
				setIsGenerating(false);
			}
		} else {
			alert('Please provide proper prompt');
		}
	};

	return (
		<>
			<header className="w-full bg-[#D5E0FE] sm:px-40 sm:pt-8 px-4 py-4 border-b-2 border-b-[#fff]">
				<h1 className="text-3xl font-bold">AI-Img</h1>
				<p className="mt-2">
					Unleash Your Imagination: Creating Stunning Images with AI
				</p>
			</header>
			<main className="sm:px-40 px-4 py-8 w-full bg-[#D5E0FE] min-h-[calc(100vh-73px)]">
				<Form generateImage={generateImage} prompt={prompt} />
				<div className="bg-gray-50 border border-gray-300 rounded-lg w-80 p-1 h-80 my-4">
					{generatedImage.photo ? (
						<img
							src={generatedImage.photo}
							alt={generatedImage.altText}
							className="w-full h-full object-contain"
						/>
					) : (
						<img
							src={preview}
							alt="preview"
							className="w-full h-full object-contain opacity-40"
						/>
					)}

					{isGenerating && (
						<div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
							<Loader />
						</div>
					)}
				</div>
				<button
					className="p-4 bg-[#2F1C6B] text-white rounded"
					onClick={() => downloadImage(generatedImage.photo)}
				>
					Download
				</button>
			</main>
		</>
	);
};

export default App;
