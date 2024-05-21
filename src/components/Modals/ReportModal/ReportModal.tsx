import { useRecoilState } from "recoil";
import { reportModalAtom } from "../../../store/atoms";
import {Modal, Box, Button} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import styles from './ReportModal.module.scss';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const ReportModal = () => {
    const [view, setView] = useRecoilState(reportModalAtom);

    const handleClose = () => setView(false);

    return (
        <AnimatePresence>
            {view && (
                <Modal
                    open={view}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <motion.div
                        className={styles.root}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Box className={styles.content}>
                            <div className={styles.cellFixed}>
                                <Button sx={{ borderRadius: '50%', width: '44.8px', height: 'auto'}}
                                onClick={handleClose}>
                                    <ClearRoundedIcon style={{ width: '70%', height: 'auto'}}/>
                                </Button>
                            </div>
                            <div className={styles.cellFixed}></div>
                        </Box>
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default ReportModal;
