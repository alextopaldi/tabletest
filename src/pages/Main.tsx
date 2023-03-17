import { useEffect, useState } from "react"
import { TableItem } from "../components/TableItem"
import { useFetchData } from "../hooks/FetchData"
import { useAppSelector } from "../hooks/Redux"
import { faPlus, faCircleNotch, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../components/Modal"
import { AddItem } from "../components/AddItem"
import {CSSTransition} from 'react-transition-group'
import { ChangeItem } from "../components/ChangeItem"


export function MainPage() {

    const {data} = useAppSelector(state => state.TableSlice)
    const {getInfo, loader, error} = useFetchData()
    const [modalVision, setModalVision] = useState(false)
    const [changeModalVision, setChangeModalVision] = useState(false)
    

    useEffect(() => {
        getInfo()
    },[])

    return(
        <>
        <div className="wrapper">
            <div className="container">
                {loader&&
                    <div className="loader">
                        <FontAwesomeIcon className="animate-spin loader__spin" icon={faCircleNotch}/>
                        <p>Загрузка данных...</p>
                    </div>
                }
                {error&&
                    <div className="loader">
                        <FontAwesomeIcon className="animate-bounce loader__spin" icon={faCircleExclamation}/>
                        <p>Ошибка загрузки данных</p>
                    </div>
                }
                <div className="table">
                    <div className="table__preview">
                        <p>Место для потенциальных дополнительных функций работы с таблицей...</p>
                        <FontAwesomeIcon onClick={() => setModalVision(true)} className="table__preview-icon" icon={faPlus}/>
                    </div>
                    {data?.map(item => <TableItem onOpen={() => setChangeModalVision(true)} item={item} key={item.id}/>)}
                </div>
            </div>
        </div>
        <CSSTransition in={modalVision} timeout={300} classNames = "alert" unmountOnExit>
            <Modal onClose={() => setModalVision(false)}>
                <AddItem onClose={() => setModalVision(false)}/>
            </Modal>
        </CSSTransition>
        <CSSTransition in={changeModalVision} timeout={300} classNames = "alert" unmountOnExit>
            <Modal onClose={() => setChangeModalVision(false)}>
                <ChangeItem onClose={() => setChangeModalVision(false)}/>
            </Modal>
        </CSSTransition>
        </>
    )
}