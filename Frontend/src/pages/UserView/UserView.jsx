import React, { useEffect, useRef, useState } from "react";
import avatar from "../DashBoard/img/avatar.png";
import ludicaImg from "./img/bl.png";
import ludicaImg2 from "./img/ft.png";
import ludicaImg3 from "./img/gm.png";
import ludicaImg4 from "./img/ms.png";
import EventoImg from "./img/director.png";
import EventoImg2 from "./img/cacao.jpg";
import EventoImg3 from "./img/academia.jpg";
import EventoImg4 from "./img/emprende.png";
import logo from "./img/image.png";
import "./styles/UserView.css";
import axios from "axios";

export default function UserView({ setContenidoActual }) {
  const fetched = useRef(false);
  const [usuario, setUsuario] = useState(null);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalContenido, setModalContenido] = useState({ titulo: "", contenido: null });

  const abrirModal = (titulo, contenido) => {
    setModalContenido({ titulo, contenido });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setModalContenido({ titulo: "", contenido: null });
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchUsuario = async () => {
      try {
        const usuarioGuardado = sessionStorage.getItem("usuario");
        if (usuarioGuardado) {
          setUsuario(JSON.parse(usuarioGuardado));
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        const id = payload.IdUsuario;

        const res = await axios.get(`http://localhost:3001/api/usuario/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuario(res.data);
        sessionStorage.setItem("usuario", JSON.stringify(res.data));
      } catch (err) {
        console.error("Error cargando usuario:", err);
      }
    };

    fetchUsuario();
  }, []);

  return (
    <section className="UserContenedor">
      {!usuario ? (
        <p>Cargando datos del usuario...</p>
      ) : (
        <div className="UserCuadro UserInfo">
          <img src={avatar} alt="Avatar" className="UserAvatar" />
          <h2 className="UserNombre">
            <strong>Nombre: </strong>{usuario.Nombre} {usuario.Apellido}
          </h2>
          <p className="UserRol">
            <strong>Aprendizaje: </strong>{usuario?.perfilAprendiz?.ProgramaFormacion || "No aplica"}
          </p>
          <p className="UserRol">
            <strong>Rol: </strong>{usuario?.rol?.NombreRol || "Sin rol"}
          </p>
          <p className="UserRol">
            <strong>Ficha: </strong>{usuario?.perfilAprendiz?.Ficha || "No aplica"}
          </p>
          <p className="UserRol">
            <strong>Jornada: </strong>{usuario?.perfilAprendiz?.Jornada || "No aplica"}
          </p>
          <p className="UserRol">
            <strong>Teléfono: </strong>{usuario?.Telefono}
          </p>
          <p className="UserCorreo">
            <strong>Correo Electrónico: </strong>{usuario?.Correo}
          </p>
          <img src={logo} className="UserLogo" alt="Logo SENA" />
          <button className="UserBoton" onClick={() => setContenidoActual("config")}>
            Editar perfil
          </button>
        </div>
      )}

      <div className="UserCuadro UserLudicas">
        <h3 className="UserTitulo">Lúdicas</h3>
        <div className="UserTarjetas">
          <div className="UserTarjeta" onClick={() => abrirModal("Baile Caucano", (
            <>
              <p>📅 ¡INSCRIPCIONES ABIERTAS!</p>
              <p>🕒 Hora: 8:00 AM - 12:00 PM</p>
              <p>📍 Lugar: Donde se baila :P</p>
              <p>🎯 Tipo: Recreativa</p>
              <p>Baile Baile Baile Baile Baile Baile .</p>
            </>
          ))}>
            <img src={ludicaImg} alt="Baile" className="UserTarjetaImg" />
            <div className="UserTarjetaTexto">Baile Caucano</div>
          </div>

          <div className="UserTarjeta" onClick={() => abrirModal("Fútbol Recreativo", (
            <>
              <p>📅 ¡INSCRIPCIONES ABIERTAS!</p>
              <p>🕒 Hora: 8:00 AM - 12:00 PM</p>
              <p>📍 Lugar: Cancha múltiple</p>
              <p>🎯 Tipo: Recreativa</p>
              <p>Futbol Futbol Futbol Futbol Futbol Futbol.</p>
            </>
          ))}>
            <img src={ludicaImg2} alt="Fútbol" className="UserTarjetaImg" />
            <div className="UserTarjetaTexto">Fútbol Recreativo</div>
          </div>

          <div className="UserTarjeta" onClick={() => abrirModal("Gimnasio SENA", (
            <>
              <p>📅 ¡INSCRIPCIONES ABIERTAS!</p>
              <p>🕒 Hora: 8:00 AM - 12:00 PM</p>
              <p>📍 Lugar: Sabrá Dios 👌</p>
              <p>🎯 Tipo: Recreativa</p>
              <p>GimBro GimBro GimBro GimBro GimBro.</p>
            </>
          ))}>
            <img src={ludicaImg3} alt="Gimnasio" className="UserTarjetaImg" />
            <div className="UserTarjetaTexto">Gimnasio SENA</div>
          </div>

          <div className="UserTarjeta" onClick={() => abrirModal("Música y Artes", (
            <>
              <p>📅 ¡INSCRIPCIONES ABIERTAS!</p>
              <p>🕒 Hora: 2:00 PM - 5:00 PM</p>
              <p>📍 Lugar: No se</p>
              <p>🎯 Tipo: Cultural</p>
              <p>Music Music Music Music Music Music .</p>
            </>
          ))}>
            <img src={ludicaImg4} alt="Música" className="UserTarjetaImg" />
            <div className="UserTarjetaTexto">Música y Artes</div>
          </div>
        </div>
      </div>

      <div className="UserCuadro UserEventos">
        <h3 className="UserTitulo">Eventos Semanales!</h3>
        <div className="UserTarjetas">
          <div className="UserTarjeta" onClick={() => abrirModal("Charla Motivacional", (
            <>
              <p>📅 Fecha: 20 de junio 2025</p>
              <p>🕒 Hora: 10:00 AM - 11:30 AM</p>
              <p>📍 Lugar: Sala múltiple</p>
              <p>🎯 Tipo: Formativa</p>
              <p>Este hombre fue el que descubrió la vacuna contra el Covid-19 entre otros logros...</p>
            </>
          ))}>
            <img src={EventoImg} alt="Charla" className="UserTarjetaImg" />
            <div className="UserTarjetaTexto">Charla Motivacional</div>
          </div>

          <div className="UserTarjeta" onClick={() => abrirModal("Feria Del Cacao 🍫", (
            <>
              <p>📅 Fecha: 20 de junio 2025</p>
              <p>🕒 Hora: 10:00 AM - 3:00 PM</p>
              <p>📍 Lugar: Sala múltiple</p>
              <p>🎯 Tipo: Formativa</p>
              <p>Exposición de proyectos por aprendices de diferentes programas.</p>
            </>
          ))}>
            <img src={EventoImg2} alt="Cacao" className="UserTarjetaImg" />
            <div className="UserTarjetaTexto">Feria Del Cacao</div>
          </div>

          <div className="UserTarjeta" onClick={() => abrirModal("Academia", (
            <>
              <p>📅 Fecha: 20 de junio 2025</p>
              <p>🕒 Hora: 10:00 AM - 3:00 PM</p>
              <p>📍 Lugar: Sala múltiple</p>
              <p>🎯 Tipo: Formativa</p>
              <p>Exposición de proyectos por aprendices de diferentes programas.</p>
            </>
          ))}>
            <img src={EventoImg3} alt="Academia" className="UserTarjetaImg" />
            <div className="UserTarjetaTexto">Academia</div>
          </div>

          <div className="UserTarjeta" onClick={() => abrirModal("Feria del Emprendimiento", (
            <>
              <p>📅 Fecha: 25 de junio 2025</p>
              <p>🕒 Hora: 7:00 AM - 5:00 PM</p>
              <p>📍 Lugar: Ambiente de Software</p>
              <p>🎯 Tipo: Competencia</p>
              <p>Desarrollo de apps en tiempo récord por equipos SENA.</p>
            </>
          ))}>
            <img src={EventoImg4} alt="Emprendimiento" className="UserTarjetaImg" />
            <div className="UserTarjetaTexto">Feria del Emprendimiento</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div className="UserModalOverlay" onClick={cerrarModal}>
          <div className="UserModalContenido" onClick={(e) => e.stopPropagation()}>
            <button className="UserModalCerrar" onClick={cerrarModal}>✖</button>
            <h3>{modalContenido.titulo}</h3>
            <div>{modalContenido.contenido}</div>
          </div>
        </div>
      )}
    </section>
  );
}
