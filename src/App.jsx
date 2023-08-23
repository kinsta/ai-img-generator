import { Form, Footer, Header } from './components';
import preview from './assets/preview.png';
import Loader from './assets/loader.gif'
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
		<div className='container'>
			<Header />
			<main className="flex-container">
				<Form generateImage={generateImage} prompt={prompt} />
				<div className="image-container">
					{generatedImage.photo ? (
						<img
							src={generatedImage.photo}
							alt={generatedImage.altText}
							className="imgg ai-img"
						/>
					) : (
						<img
							src={preview}
							alt="preview"
							className="imgg preview-img"
						/>
					)}

					{isGenerating && (
						<div className="loader-comp">
							<img src={Loader} alt="" className='loader-img' />
						</div>
					)}
					<button
						className="btn"
						onClick={() => downloadImage(generatedImage.photo)}
					>
						Download
					</button>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default App;
