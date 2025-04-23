import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateReport } from '../api/ReportApiService';

const EditReportModal = ({ show, onHide, report, onUpdated }) => {
    const [title, setTitle] = useState(report.title);
    const [description, setDescription] = useState(report.description);
    const [location, setLocation] = useState(report.location);
    const [status, setStatus] = useState(report.status);

    const handleSubmit = async () => {
        const updatedReport = { title, description, location, status };
        await updateReport(report.id, updatedReport);
        onUpdated();
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control value={location} onChange={(e) => setLocation(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="LOST">LOST</option>
                            <option value="FOUND">FOUND</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditReportModal;
