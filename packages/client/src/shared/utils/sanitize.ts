import DOMPurify from 'dompurify';


export const sanitize = ( content: string ) => {
	return 'undefined' !== typeof window ? DOMPurify.sanitize( content ) : content;
};
