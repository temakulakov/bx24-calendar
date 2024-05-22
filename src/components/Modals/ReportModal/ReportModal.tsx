import styles from './ReportModal.module.scss';
import { Modal, ButtonToolbar, Button, Placeholder } from 'rsuite';
import {useRecoilState} from "recoil";
import {reportModalAtom} from "../../../store/atoms";


const ReportModal = () => {
    const [ view, setView ] = useRecoilState(reportModalAtom);

    const handleClose = () => {
        setView(false);
    };

    return <Modal size={'full'} open={view} onClose={handleClose}>
        <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Placeholder.Paragraph rows={100} />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleClose} appearance="subtle">
                Cancel
            </Button>
            <Button onClick={handleClose} appearance="primary">
                Ok
            </Button>
        </Modal.Footer>
    </Modal>
};

export default ReportModal;