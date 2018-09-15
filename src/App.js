import React, { Component } from 'react'
import './App.css'
import { Container, Row, Col } from 'reactstrap'
import MainMenu from './components/MainMenu/MainMenu'
import { Button, Form, FormGroup, Input, Label, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'


class App extends Component {
	constructor(props) {
		super(props)
		this.toggle = this.toggle.bind(this)
		this.toggle = this.toggle.bind(this)
		this.toggle = this.toggle.bind(this)
		this.state = {
			popoverOpen: false
		}
	}
	
	handleCreatePDF() {
		console.log('Create PDF')
	}

	toggle(e) {
		e.preventDefault()
		this.setState({
			popoverOpen: !this.state.popoverOpen
		})
	}

	render() {
		return (
			<div className="App">
				<Container>
					<MainMenu />
					<Row className="mt-4">
						<Col lg="6">
							<h1>Zee Printer</h1>
							<p>Create your own Munzee stickers</p>
							<hr />
							<Form>
								<FormGroup>
									<Label for="codes">Paste in barcode values, one url per line <FontAwesomeIcon icon={faQuestionCircle} id="Popover1" onClick={this.toggle}/></Label>
									<Input type="textarea" name="codes" id="codes" rows="10" />
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input name="hidenumbers" type="checkbox" />{' '}
										Hide Munzee Numbers
									</Label>
								</FormGroup>
								<hr />
								<Button color="success" onClick={this.handleCreatePDF}>Create PDF</Button>{' '}
								<Button color="danger" type="reset">Clear Form</Button>{' '}
							</Form>
						</Col>
						<Col lg="6">
							<div style={{backgroundColor: '#eee', height: "80vh"}}></div>
						</Col>
					</Row>
				</Container>
				<Popover placement="right" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
					<PopoverHeader>Where to get your QR Codes</PopoverHeader>
					<PopoverBody>
						<ol style={{margin: "10px 0", padding: "0 10px 0 20px"}}>
							<li>Go to your user profile on <a href="https://munzee.com/" target="_blank" rel="noopener noreferrer">munzee.com</a> and click the Undeployed tab.</li>
							<li>If you haven't created any Munzees, Create some first.</li>
							<li>Click on an undeployed Munzee and then click Print.</li>
							<li>Copy the Barcode Value from your Munzee page and paste it into this form.</li>
							<li>Continue adding more Munzees - one per line.</li>
						</ol>
					</PopoverBody>
				</Popover>
			</div>
		)
	}
}

export default App
