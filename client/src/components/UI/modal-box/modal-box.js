import React from 'react';

import { Button, Modal } from 'react-bootstrap';

function ModalBox({ handleNo, handleYes, show, body, title }) {

    const onClose = handleNo ? handleNo : handleYes;

    return (
        <Modal animation={true} show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                {handleNo &&
                    <Button variant="secondary" onClick={handleNo}>
                        Скасувати
                    </Button>}

                <Button variant="primary" onClick={handleYes}>
                    ОК
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalBox;