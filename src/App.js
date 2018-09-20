import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import QRCode from 'qrcode';
import uuidv4 from 'uuid/v4';
import jsPDF from 'jspdf';

import MainMenu from './components/MainMenu/MainMenu';
import UrlForm from './components/UrlForm/UrlForm';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			codes: '',
			qrcodes: []
		};
	}

	onGeneratePDF(newcodes) {
		const inputcodes = newcodes
			.replace(/\r\n/g,"\n").replace(/(?:(?:\r\n|\r|\n)\s*){2}/gm, "")
			.split('\n')
			.filter( code => { return code.length > 1 } );

		const qrcodes = [];
		inputcodes.map( function(code) {
			QRCode.toDataURL(code, {width: 200}, function(err, url) {
				qrcodes.push( {code: code, url: url} )
			})
			return null;
		});

		const pdf = new jsPDF({ orientation: 'p', unit: 'in', format: 'letter' });
		doc.addImage(qrcodes[0], 'JPEG', 15, 40, 180, 160)

		this.setState({codes: newcodes, qrcodes: qrcodes});
	}

	onClearForm() {
		this.setState({codes: '', qrcodes: []})
	}

	render() {
		return (
			<div className='App'>
				<Container>
					<MainMenu />
					<Row className='mt-4'>
						<Col lg='6'>
							<h1>Zee Printer</h1>
							<p>Create your own Munzee stickers</p>
							<hr />
							<UrlForm generatePDF={this.onGeneratePDF.bind(this)} clearForm={this.onClearForm.bind(this)} />
						</Col>
						<Col lg='6'>
							<div id='qrcodes'>
							{ this.state.qrcodes.length
								? this.state.qrcodes.map( function(src) {
									return <img key={uuidv4()} src={src.url} alt={src.code} title={src.code} style={{width: "75px", height: "auto"}} />
								})
								: null
							}
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default App;
