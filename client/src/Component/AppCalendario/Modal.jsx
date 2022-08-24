import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; //fijarse si es neceario
import {
  getProfessionalById,
  getAppointmentsById,
  getUsersById,
  putEditAppointment,
  selectedTime,
  deleteAppointment,
} from "../../Redux-actions";
import ModalPayment from "../Home/ModalPayment";
import ModalErrors from "../ModalsErrors/ErrorsRouta";

export default function ModalCalendar({
  isProfesional,
  info,
  professionalMedicalLicense,
  adId,
  name,
  ad,
}) {
  const [show, setShow] = useState(true);
  const [pay, setPay] = useState(false);
  const [validate, setValidate] = useState(false);
  const [CompleteRegister, setCompleteRegister] = useState(false);
  const userDetail = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const userEmail = localStorage.getItem("Email");
  const appointmentInfo = useSelector((state) => state.appointmentInfo);
  useEffect(() => {
    dispatch(getUsersById(userEmail));
    dispatch(getAppointmentsById(info.id));
  }, [dispatch]);

  let navigate = useNavigate();

  let idApp = info.id;

  let date = info.start.getDate();
  let month = info.start.getMonth();
  let hr = info.start.getHours();
  let min = info.start.getMinutes();

  let Months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "noviembre",
    "diciembre",
  ];

  //userEmail

  const handleClose = () => {
    setShow(false);
    dispatch(
      putEditAppointment({ status: "available", userEmail: userEmail }, idApp)
    );
    dispatch(selectedTime(false));
  };
  const handleonclick = () => {
    if (userEmail === null) {
      return setValidate(true);
    }
    // else if(!userDetail.rol || !userDetail.name || !userDetail.identification || !userDetail.idImage || !userDetail.country || !userDetail.city || !userDetail.address){
    //   return setCompleteRegister(true)
    // }
    setPay(true);

    dispatch(
      putEditAppointment({ status: "booked", userEmail: userEmail }, idApp)
    );
  };

  const handleCancel = () => {
    dispatch(deleteAppointment(idApp));
    dispatch(selectedTime(false));
    window.location.reload(true);
    //navigate(`/calendar/${ad.id}`)
  };

  const handleShow = () => setShow(true);
  const professionalProfile = useSelector((state) => state.professionalProfile);

  return (
    <>
      {!isProfesional ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title>
            Usted se atendera con:
            {professionalProfile.user?.name}
          </Modal.Title>
          <Modal.Body>
            <p>especialidad: {appointmentInfo?.ad?.specialty}</p>
            <p>
              el día: {date} de {Months[month].toUpperCase()}
            </p>
            <p>
              {" "}
              a la hora: {hr}:{min === 0 ? (min = "00") : min}{" "}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleonclick}>
              Confirmar
            </Button>
            {pay ? (
              <ModalPayment info={idApp} adId={adId} name={name} ad={ad} />
            ) : null}
            {validate ? (
              <ModalErrors
                error={
                  "Por favor complete sus datos para poder solicitar un turno"
                }
                route={"/home/validate"}
              />
            ) : null}
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {professionalProfile.user?.name}, queres cancelar este turno?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>especialidad: {appointmentInfo?.ad?.specialty}</p>
            <p>
              el día: {date} de {Months[month].toUpperCase()}
            </p>
            <p>
              {" "}
              a la hora: {hr}:{min === 0 ? (min = "00") : min}{" "}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleCancel}>
              Cancelar este turno
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
