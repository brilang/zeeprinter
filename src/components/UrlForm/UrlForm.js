import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

class UrlForm extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			popoverOpen: false,
			codes: ''
		};

	}

	handleChange(event) {
		this.setState({ codes: event.target.value });
	}

	onGeneratePDF(event) {
		event.preventDefault();
		this.props.generatePDF(this.state.codes);

		// const inputcodes = this.state.codes
		// 	.replace(/\r\n/g,"\n").replace(/(?:(?:\r\n|\r|\n)\s*){2}/gm, "")
		// 	.split('\n')
		// 	.filter( code => { return code.length > 1 } );

		// const qrcodes = [];
		// inputcodes.map( function(code) {
		// 	QRCode.toDataURL(code, {width: 200}, function(err, url) {
		// 		qrcodes.push( {code: code, url: url} )
		// 	})
		// 	return null
		// });
		// this.setState( { qrcodes: qrcodes });
	}

	toggle(event) {
		event.preventDefault();
		this.setState({
			popoverOpen: !this.state.popoverOpen
		  });
	}

	render() {
		return (
			<div>
				<Form>
					<FormGroup>
						<Label for='codes'>Paste in barcode values, one url per line <FontAwesomeIcon icon={faQuestionCircle} id='Popover1' onClick={this.toggle} /></Label>
						<Input type='textarea' name='codes' id='codes' rows='10' onChange={this.handleChange} value={this.state.codes} />
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input name='shownumbers' type='checkbox' />{' '}
							Show Munzee Numbers
						</Label>
					</FormGroup>
					<hr />
					<Button color='success' onClick={this.onGeneratePDF.bind(this)}>Create PDF</Button>{' '}
					<Button color='danger' type='reset'>Clear Form</Button>{' '}
				</Form>

				<Popover placement='right' isOpen={this.state.popoverOpen} target='Popover1' toggle={this.toggle}>
					<PopoverHeader>Where to get your QR Codes</PopoverHeader>
					<PopoverBody>
						<ol style={{margin: '10px 0', padding: '0 10px 0 20px'}}>
							<li>Go to your user profile on <a href='https://munzee.com/' target='_blank' rel='noopener noreferrer'>munzee.com</a> and click the Undeployed tab.</li>
							<li>If you haven't created any Munzees, Create some first.</li>
							<li>Click on an undeployed Munzee and then click Print.</li>
							<li>Copy the Barcode Value from your Munzee page and paste it into this form.</li>
							<li>Continue adding more Munzees - one per line.</li>
						</ol>
					</PopoverBody>
				</Popover>
			</div>
		);
	}
}

export default UrlForm;