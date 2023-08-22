import { FaRandom } from 'react-icons/fa';
import { getRandomPrompt } from '../utils';
import { useState } from 'react';

const Form = ({ generateImage }) => {
    const [prompt, setPrompt] = useState('')

    const handleRandomPrompt = () => {
        const randomPrompt = getRandomPrompt();
        setPrompt(randomPrompt)
    }

    return (
        <div className="form-section">
            <div className="container-title">
                <h1 className="title">AI-Image Generator</h1>
                <p className="description">
                    Ignite your imagination using the power of Artificial Intelligence (AI). Craft mesmerizing images through vivid text descriptions.
                </p>
            </div>
            <div className="form-container">
                <div className="input-div">
                    <label>Prompt</label>
                    <span>Type a very descriptive text of the image you wish to generate.</span>
                    <div className="input-cont">
                        <textarea name="prompt" id="" cols="30" rows="4" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="form-control" placeholder="A surreal cityscape at sunset with floating islands..."></textarea>
                        <FaRandom onClick={handleRandomPrompt} className='random-icon' />
                    </div>
                </div>
                <button className='btn' onClick={() => generateImage(prompt, setPrompt)}>Generate Image</button>
            </div>
        </div >
    )
}


export default Form