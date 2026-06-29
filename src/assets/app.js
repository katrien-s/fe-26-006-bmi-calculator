const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');

const calculateBMI = (heightInput, weightInput) => {
	if (!heightInput || !weightInput) {
		console.log('Please give a valid number');
	} else {
		const result = weightInput / ((heightInput * heightInput) / 100);
		console.log(result);
	}
};

heightInput.addEventListener('input', calculateBMI);
weightInput.addEventListener('input', calculateBMI);
