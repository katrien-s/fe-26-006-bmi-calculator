const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const calculatorScore = document.querySelector('.calculator__score');
const calculatorFeedback = document.querySelector('.calculator__feedback');

const calculateBMI = () => {
	const heightValue = parseFloat(heightInput.value);
	const weightValue = parseFloat(weightInput.value);
	let feedback = '';

	if (heightValue === 0 && weightValue === 0) {
		console.log('Please give a valid number');
	} else {
		const heightDecimal = heightValue / 100;
		const result = weightValue / (heightDecimal * heightDecimal);
		const minWeight = 18.5 * (heightDecimal * heightDecimal);
		const maxWeight = 24.9 * (heightDecimal * heightDecimal);

		if (result < 18.5) {
			feedback = 'underweight';
		} else if (result >= 18.5 && result <= 24.9) {
			feedback = 'healthy weight';
		} else if (result >= 25 && result <= 29.9) {
			feedback = 'overweight';
		} else {
			feedback = 'obese';
		}

		calculatorScore.textContent = result.toFixed(1);
		calculatorFeedback.innerHTML = `Your BMI suggests you're <span>${feedback}</span>. Your ideal weight is between <span class="fw-600">${minWeight.toFixed(1)}kgs - ${maxWeight.toFixed(1)}kgs</span>`;
	}
};

heightInput.addEventListener('input', calculateBMI);
weightInput.addEventListener('input', calculateBMI);
