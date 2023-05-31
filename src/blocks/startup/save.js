// import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { id, text, desc, heading, alignment, color,bgColor } = attributes;
	return (
		<div {...useBlockProps.save({
			className: `gts-heading gts-heading-${id}`,
		})}>
			<RichText.Content tagName={heading} value={text} style={{textAlign: alignment, color:color, backgroundColor: bgColor}} />
			<RichText.Content tagName={`span`} value={desc}/>
		</div>
	);
}
