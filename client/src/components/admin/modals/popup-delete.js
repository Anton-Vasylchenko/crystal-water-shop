import React from 'react';

import { Button, Modal } from 'react-bootstrap';

function PopupDelete({ handleNo, handleYes, show, name }) {
    return (
        <>
            <Modal animation={true} show={show} onHide={handleNo}>
                <Modal.Header closeButton>
                    <Modal.Title>Видалення {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Ви дійсно бажаєте видалити {name} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleNo}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleYes}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupDelete;