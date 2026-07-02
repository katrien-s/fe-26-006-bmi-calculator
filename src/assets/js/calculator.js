const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const heightFtInput = document.getElementById('height-ft');
const heightInInput = document.getElementById('height-in');
const weightStInput = document.getElementById('weight-st');
const weightLbsInput = document.getElementById('weight-lbs');
const radioButtons = document.querySelectorAll('input[name="system"]');
const calculatorScore = document.querySelector('.calculator__score');
const calculatorFeedback = document.querySelector('.calculator__feedback');
const calculatorMetric = document.querySelector('.calculator__inputs--metric');
const calculatorImperial = document.querySelector(
	'.calculator__inputs--imperial'
);

const isNotValidInput = (
	totalHeight,
	totalWeight,
	heightLimit,
	weightLimit
) => {
	if (
		totalHeight === 0 ||
		totalHeight > heightLimit ||
		totalWeight === 0 ||
		totalWeight > weightLimit ||
		isNaN(totalHeight) ||
		isNaN(totalWeight)
	)
		return true;
};

const getFeedback = (result) => {
	if (result < 18.5) {
		return 'underweight';
	} else if (result >= 18.5 && result <= 24.9) {
		return 'a healthy weight';
	} else if (result >= 25 && result <= 29.9) {
		return 'overweight';
	} else {
		return 'obese';
	}
};

const publishFeedback = (result, minWeight, maxWeight, unit, label) => {
	calculatorScore.textContent = result.toFixed(1);
	calculatorFeedback.innerHTML = `Your BMI suggests you're <span>${label}</span>. Your ideal weight is between <span class="fw-600">${minWeight.toFixed(1)}${unit} - ${maxWeight.toFixed(1)}${unit}</span>`;
};

const calculateMetricBMI = () => {
	const totalHeight = parseFloat(heightInput.value);
	const totalWeight = parseFloat(weightInput.value);

	if (isNotValidInput(totalHeight, totalWeight, 275, 600)) {
		calculatorScore.textContent = '--';
		return;
	}

	const heightSquared = (totalHeight / 100) * (totalHeight / 100);
	const result = totalWeight / heightSquared;
	const minWeight = 18.5 * heightSquared;
	const maxWeight = 24.9 * heightSquared;

	const label = getFeedback(result);
	publishFeedback(result, minWeight, maxWeight, 'kgs', label);
};

const calculateImperialBMI = () => {
	const totalHeight =
		parseFloat(heightFtInput.value) * 12 + parseFloat(heightInInput.value);
	const totalWeight =
		parseFloat(weightStInput.value) * 14 + parseFloat(weightLbsInput.value);

	if (isNotValidInput(totalHeight, totalWeight, 108, 1320)) {
		calculatorScore.textContent = '--';
		return;
	}

	const heightSquared = totalHeight * totalHeight;
	const minWeight = (18.5 * heightSquared) / 703;
	const maxWeight = (24.9 * heightSquared) / 703;

	let result = (totalWeight / heightSquared) * 703;
	const label = getFeedback(result);
	publishFeedback(result, minWeight, maxWeight, 'lbs', label);
};

radioButtons.forEach((button) =>
	button.addEventListener('change', function () {
		if (this.id === 'metric') {
			calculatorImperial.setAttribute('hidden', '');
			calculatorMetric.removeAttribute('hidden');
			heightInput.value = '';
			weightInput.value = '';
		}

		if (this.id === 'imperial') {
			calculatorMetric.setAttribute('hidden', '');
			calculatorImperial.removeAttribute('hidden');
			heightFtInput.value = '';
			heightInInput.value = '';
			weightStInput.value = '';
			weightLbsInput.value = '';
		}
	})
);

[heightInput, weightInput].forEach((element) =>
	element.addEventListener('input', calculateMetricBMI)
);

[heightFtInput, heightInInput, weightStInput, weightLbsInput].forEach(
	(element) => element.addEventListener('input', calculateImperialBMI)
);
