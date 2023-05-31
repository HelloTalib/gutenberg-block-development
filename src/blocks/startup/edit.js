import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	ColorPalette,
	ColorPicker,
	SelectControl,
	__experimentalInputControl as InputControl,
	__experimentalBoxControl as BoxControl,
	TextareaControl
} from '@wordpress/components';
const { Fragment } = wp.element;

// editor style
import './editor.scss';
const colors = [
	{ name: 'red', color: '#f00' },
	{ name: 'white', color: '#fff' },
	{ name: 'blue', color: '#00f' },
];
const optionsHeading = [
	{ label: 'h1', value: 'h1' },
	{ label: 'h2', value: 'h2' },
	{ label: 'h3', value: 'h3' },
	{ label: 'h4', value: 'h4' },
	{ label: 'h5', value: 'h5' },
	{ label: 'h6', value: 'h6' },
];

export default function Edit({ attributes, setAttributes, clientId }) {
	const { id, text, desc, alignment, heading, color, bgColor, padding } = attributes;

	setAttributes({ id: clientId.slice(0, 8) });
	console.log(attributes);


	const onChangeAlignment = (newAlignment) => {
		setAttributes({
			alignment: newAlignment === undefined ? 'none' : newAlignment,
		});
	};

	const onChangeChoose = (newChooseOption) => {
		setAttributes({
			alignment: newChoose === undefined ? 'none' : newChooseOption,
		});
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Heading Layout', 'gutenberg-tech')}>
					<InputControl
						label="Heading"
						labelPosition="top"
						value={text}
						onChange={(nextValue) =>
							setAttributes({ text: nextValue })
						}
					/>
					<TextareaControl
						label="ShortDescription"
						help={`This is an short Description`}
						value={desc}
						onChange={(desc) => setAttributes({ desc })}
					/>
					<BlockControls>
						<AlignmentToolbar
							value={alignment}
							onChange={onChangeAlignment}
						/>
					</BlockControls>
					<SelectControl
						label={__('Heading Tag', 'gutenberg-tech')}
						options={optionsHeading}
						value={heading}
						onChange={(newHeading) => {
							setAttributes({ heading: newHeading });
						}}
					/>
				</PanelBody>
				<PanelBody title={__('Heading Style', 'gutenberg-tech')}>
					<p> {__('Text color', 'gutenberg-tech')} </p>
					<ColorPicker
						color={colors}
						value={color}
						onChange={(textColor) =>
							setAttributes({ color: textColor })
						}
					/>
					<p> {__('Background color', 'gutenberg-tech')} </p>
					<ColorPalette
						colors={colors}
						value={bgColor}
						onChange={(color) => setAttributes({ bgColor: color })}
					/>

					<BoxControl
						values={{
							top: padding.top,
							left: padding.left,
							right: padding.right,
							bottom: padding.bottom,
						}}
						onChange={(nextValues) =>
							setAttributes({ padding: nextValues })
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div
				{...useBlockProps({
					className: 'gts-heading gts-heading-' + id,
				})}
			>
				<RichText
					tagName={heading}
					style={{
						textAlign: alignment,
						color: color,
						backgroundColor: bgColor,
						padding: `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`,
					}}
					placeholder={__('your text', 'gutenberg-tech')}
					value={text}
					onChange={(text) => setAttributes({ text: text })}
					allowedFormats={['core/bold', 'core/italic']}
				/>

				<RichText
					tagName="span"
					style={{textAlign: alignment}}
					className={`gts-heading-desc gts-heading-desc-${id}`}
					value={desc}
					onChange={(desc) => setAttributes({ desc })}
				/>
			</div>
		</Fragment>
	);
}
