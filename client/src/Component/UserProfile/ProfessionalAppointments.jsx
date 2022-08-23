import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, } from "react";
import { clearUserAppointments, getProfessionalApps, traemeTodo, clearTodo, modalProfessionalApps } from "../../Redux-actions/index.js";
import './Apointments.css'
import ModalOptions from './ModalOptions'
import { DataGrid } from '@mui/x-data-grid';




export default function ProfessionalAppointments({ medicalLicense }) {
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
          Opciones
        </button>
      </strong>
    )
  }

  function handleOnCellClick(params) {
    setCheckboxSelection(params)
    dispatch(modalProfessionalApps(true))
  }
  console.log('soy box ', box)
  console.log('turnos', professionalApps);

  let columns = [{ field: 'fecha' }, { field: 'hora' }, { field: 'paciente' },
  { field: 'modalidad' }, { field: 'estado' },
  {
    field: 'Opciones', renderCell: renderDetailsButton, width: 200,
    disableClickEventBubbling: true
  }]


  let pendingAppointments = professionalApps.appointments?.filter((e) => e.status === 'pending')


  let rows = pendingAppointments ? pendingAppointments.map((app) => {


    return {
      id: app?.id,
      fecha: app?.date,
      hora: app?.startTime[0] + ':' + app?.startTime[1] + 'Hs',
      paciente: app?.user?.name,
      modalidad: app?.ad?.serviceType,
      estado: app?.status,

    }
  }) : [{ id: '1', fecha: '-', hora: '-', paciente: '-', modalidad: '-', estado: '-' }]

  console.log(checkboxSelection)

  return (

    <div style={{ display: 'flex', height: '15%', width: '70%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          columns={columns}
          rows={rows}
          renderCell={(e) => renderDetailsButton(e)}
        />
      </div>

      {modalProfApps ? <ModalOptions appointment={checkboxSelection} /> : null}
    </div>


  )
}