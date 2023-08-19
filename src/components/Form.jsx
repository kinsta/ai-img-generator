import { FaRandom } from 'react-icons/fa';
import { getRandomPrompt } from '../utils';
import { useState } from 'react';

import PropTypes from 'prop-types';

const Form = ({ generateImage }) => {
    const [prompt, setPrompt] = useState('')

    const handleRandomPrompt = () => {
        const randomPrompt = getRandomPrompt();
        setPrompt(randomPrompt)
    }

    return (
        <div className="sm:w-1/2 w-full">
            <label htmlFor="prompt" className='font-medium mb-1'>Prompt</label>
            <div className="relative h-full">
                <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full p-4 mb-3 rounded" placeholder="A surreal cityscape at sunset with floating islands..." />
                <FaRandom onClick={handleRandomPrompt} className='absolute top-3 right-2 bg-[#2F1C6B] w-8 h-8 text-white rounded-full p-2 text-xl cursor-pointer' />
            </div>
            <button className="w-full p-4 bg-[#2F1C6B] text-white rounded" onClick={() => generateImage(prompt, setPrompt)}>Generate</button>
        </div>
    )
}

Form.propTypes = {
    generateImage: PropTypes.func,
};


export default Form