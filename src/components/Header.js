import React from 'react';
import { Navbar, NavbarBrand, 
    Nav, NavLink, 
    Jumbotron
} from 'reactstrap';

const Header = (props) => {
    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/">
                        <img src="https://previews.123rf.com/images/saiful007/saiful0071708/saiful007170800072/83305369-letter-x-logo-slice-logo-design-concept-template.jpg" 
                        alt="logo" height="40" width="41" />
                        <Nav className="mr-auto" navbar>
                            <NavLink href="/">Stream</NavLink>
                        </Nav>
                    </NavbarBrand>
                    {/* <NavbarToggler onClick={toggle} /> */}
                    {/* <Collapse isOpen={isOpen} navbar> */}
                    
                    {/* </Collapse> */}
                </div>
            </Navbar>
            <Jumbotron className="bg-secondary">
                <div className="secondary">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Xmeme stream</h1>
                            <p>Show your own meme to the world!</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
        </div>
    )
}

export default Header;