import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, } from "react";
import { clearUserAppointments, getProfessionalApps, traemeTodo, clearTodo, modalProfessionalApps } from "../../Redux-actions/index.js";
import './Apointments.css'
import ModalCancelPro from './ModalCancelPro'
import { DataGrid } from '@mui/x-data-grid';




export default function ProfessionalAvailable({ medicalLicense, userEmail,name }) {
  const dispatch = useDispatch();
  const professionalApps = useSelector((state) => state.todo)
  const modalProfApps = useSelector((state)=>state.modalProfessionalApps)
  const [show, setShow] = useState(false)
  const [checkboxSelection, setCheckboxSelection] = useState(null)
  const [box, setBox] = useState(false)
 

  useEffect(() => {
    dispatch(traemeTodo(medicalLicense));
    return () => {
      dispatch(clearTodo())
    }

  }, [dispatch]);

  const renderDetailsButton = (params) => {
    return (


      <strong>
        <button
          variant="contained"
          color="primary"
          size="small"
          width='40px'
          style={{ marginLeft: 16 }}
          onClick={(e) => handleOnCellClick(params)}
        >
          Cancel
        </button>
      </strong>
    )
  }

  function handleOnCellClick(params) {
    setCheckboxSelection(params)
    dispatch(modalProfessionalApps(true))
  }


  let columns = [{ field: 'fecha' }, { field: 'hora' }, { field: 'paciente' },
  { field: 'modalidad' }, { field: 'estado' },
  {
    field: 'Cancel', renderCell: renderDetailsButton, width: 200,
    disableClickEventBubbling: true
  }]


  let pendingAppointments = professionalApps.appointments?.filter((e) => e.status === 'available')


  let rows = pendingAppointments ? pendingAppointments.map((app) => {


    return {
      id: app?.id,
      fecha: app.date[2]+'/'+app.date[1]+'/'+app.date[0],
      hora: app?.startTime[0] + ':' + app?.startTime[1] + 'Hs',
      paciente: app?.user?.name,
      modalidad: app?.ad?.serviceType,
      estado: app?.status,

    }
  }) : [{ id: '1', fecha: '-', hora: '-', paciente: '-', modalidad: '-', estado: '-' }]

 

  return (

    <>
        <DataGrid
          columns={columns}
          rows={rows}
          renderCell={(e) => renderDetailsButton(e)}
        />
     

      {modalProfApps ? <ModalCancelPro idApp={checkboxSelection.id} /> : null}
      </>
     


  )
}