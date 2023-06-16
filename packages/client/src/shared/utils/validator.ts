import validator from 'validator';

const isEmpty = (value: unknown): boolean =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0);


const validateAndSanitizeCommentsForm = (comment: string) => {
	let errors = '';
	let sanitizedData = '';

	comment = (!isEmpty(comment)) ? comment : '';

	if (!validator.isLength(comment, { max: 100, min: 10})){
		errors = `Comment must be ${10} to ${100} characters`;
	}
	
	if (validator.isEmpty(comment)) {
		errors = 'Comment is required';
	}
	
	if (errors.length === 0) {
		sanitizedData = validator.trim(comment);
		sanitizedData = validator.escape(sanitizedData);
	}

	return {
		sanitizedData,
		errors,
		isValid: isEmpty(errors),
	}
};

export default validateAndSanitizeCommentsForm;
