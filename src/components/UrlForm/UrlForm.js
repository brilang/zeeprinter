import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

class UrlForm extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.toggle2 = this.toggle2.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			popoverOpen: false,
			popover2Open: false,
			codes: ''
		};
	}

	handleChange(event) {
		this.setState({ codes: event.target.value });
	}

	onGeneratePDF(event) {
		event.preventDefault();
		this.props.generatePDF(this.state.codes);
	}

	onClearForm(event) {
		event.preventDefault();
		this.props.clearForm()
	}

	toggle(event) {
		event.preventDefault();
		this.setState({
			popoverOpen: !this.state.popoverOpen
		  });
	}

	toggle2(event) {
		this.setState({
			popover2Open: !this.state.popover2Open
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
					{/*
					<FormGroup check>
						<Label check>
							<Input name='shownumbers' type='checkbox' />{' '}
							Show Munzee Numbers
						</Label>
					</FormGroup>
					<hr />
					*/}
					<Button color='success' onClick={this.onGeneratePDF.bind(this)}>Create PDF</Button>{' '}
					<Button color='danger' onClick={this.onClearForm.bind(this)}>Clear Form</Button>{' '}
					<FontAwesomeIcon icon={faQuestionCircle} id='Popover2' onClick={this.toggle2} />
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

				<Popover placement='right' isOpen={this.state.popover2Open} target='Popover2' toggle={this.toggle2}>
					<PopoverHeader>What does Create PDF do?</PopoverHeader>
					<PopoverBody>
						<ol style={{margin: '10px 0', padding: '0 10px 0 20px'}}>
							<li>Create PDF will create a QR code from every line of text entered in the bar code values text area</li>
							<li>It will then place them in a PDF file for printing on Avery Labels type 5163/8163 - 4" x 2" mailing labels.</li>
							<li>As soon as the PDF file is generated, it will download:
								<ul>
									<li>You may be prompted to save the file, OR</li>
									<li>It may download automatically.</li>
								</ul>
							</li>
							<li>Open the PDF file in Adobe Reader and print it, making sure you set it to print at "Actual Size". Otherwise, it will shrink the labels and they may not line up properly with the actual labels.</li>
						</ol>
					</PopoverBody>
				</Popover>
			</div>
		);
	}
}

export default UrlForm;
