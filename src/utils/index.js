import FileSaver from 'file-saver';
import { randomPrompts } from '../data';
import { v4 as uuidv4 } from 'uuid';

export const getRandomPrompt = () => {
	const randomIndex = Math.floor(Math.random() * randomPrompts.length);
	const randomPrompt = randomPrompts[randomIndex];

	return randomPrompt;
};

export async function downloadImage(photo) {
	const _id = uuidv4();
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
