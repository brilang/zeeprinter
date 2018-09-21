import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

const Footer = (props) => {
	return (
		<footer className="pt-4 my-md-5 pt-md-5 border-top">
			<div className="row">
				<div className="col text-center">
					<small className="d-block mb-3 text-muted">&copy; Brian Lang 2018. All Rights Reserved</small>
				</div>
				<div className="col text-center">
					<span style={{fontSize: "1.3em"}}><a href="https://www.paypal.me/paybrilang" target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={faBeer} /> Like this Site? Buy me a beer</a></span>
				</div>
				<div className="col text-center">
					<a href="https://www.facebook.com/brilang" target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={faFacebookSquare} size="2x" /></a>{' '}
					<a href="https://twitter.com/brilang" target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={faTwitterSquare} size="2x" /></a>{' '}
					<a href="https://github.com/brilang/zeeprinter" target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={faGithub} size="2x" /></a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
