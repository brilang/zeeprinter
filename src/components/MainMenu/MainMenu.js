import React from 'react'
import { Navbar, NavbarBrand } from 'reactstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'

const MainMenu = (props) => {
	return (
		<div>
			<Navbar color="success" dark expand="md">
				<NavbarBrand href="/">
					<FontAwesomeIcon icon={faQrcode} size="2x" />{' '}
					<h1 style={{display: "inline-block", paddingLeft: "15px"}}> Zee Printer</h1>
				</NavbarBrand>
			</Navbar>
		</div>
	)
};

export default MainMenu