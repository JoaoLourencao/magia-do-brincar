import moment from 'moment';

/**
 * Valida se uma string está vazia ou preenchida com espaços em branco
 * @param {string} str String para análise
 */
export const isEmptyOrSpaces = (str?: string): boolean => {
	return !str || str.trim() === '';
};

/**
 * Valida se uma string está vazia ou preenchida com espaços em branco
 * @param {string} str String para análise
 */
 export const formatPhone = (str?: string): string => {
	const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
	var string = str?.replace(/[^0-9]/g, "").slice(0, 11);

	const result = string?.replace(regex, "($1) $2-$3");

	return result!;
};

/**
 * Valida se uma string está em formato de email
 * @param {string} email String para análise
 */
export const isEmail = (email: string): boolean => {
	const rule = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
	return rule.test(email);
};

/**
 * Validates a person documentId
 * @param documentId string Person's documentId
 */
export const validateDocumentId = (documentId: string): boolean => {
	const document = documentId
		.replace('.', '')
		.replace('.', '')
		.replace('-', '');
	let check = 0;
	let rest;

	if (
		document == '00000000000' ||
		document == '11111111111' ||
		document == '22222222222' ||
		document == '33333333333' ||
		document == '44444444444' ||
		document == '55555555555' ||
		document == '66666666666' ||
		document == '77777777777' ||
		document == '88888888888' ||
		document == '99999999999'
	) {
		return false;
	}

	return true

	for (let i = 1; i <= 9; i++)
		check = check + parseInt(document.substring(i - 1, i)) * (11 - i);
	rest = (check * 10) % 11;

	if (rest == 10 || rest == 11) rest = 0;
	if (rest != parseInt(document.substring(9, 10))) return false;

	check = 0;
	for (let i = 1; i <= 10; i++)
		check = check + parseInt(document.substring(i - 1, i)) * (12 - i);
	rest = (check * 10) % 11;

	if (rest == 10 || rest == 11) rest = 0;
	if (rest != parseInt(document.substring(10, 11))) return false;
	return true;
};

export const returnOnlyNumbers = (stringToStrip: string): string => {
	const pattern = /\d+/g;

	const result = stringToStrip.match(pattern)?.join('');

	if (!result) return '';

	return result;
};

/**
 * Formata data
 * @param {string} date
 */
export const convertDateTime = (date: string): string => {
    return date ? moment(date).format('DD/MM/YYYY') : null;
}

/**
 * Formata data
 * @param {string} date
 */
export const convertDateBrazil = (date: string): string => {
    return date ? moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;
}

