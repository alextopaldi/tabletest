import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalProps {
    children: React.ReactNode,
    onClose : () => void
}

export function Modal( {children, onClose} : ModalProps ) {
    return(
        <>
        <div className="modal-background">
            <div className="modal">
                <FontAwesomeIcon onClick={onClose} className="modal__icon" icon={faX}></FontAwesomeIcon>
                {children}
            </div>
        </div>
        </>
    )
}