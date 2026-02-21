import Header from "../components/header";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container py-3 py-md-5">
        {/* Título y subtítulo */}
        <div className="text-center mb-5">
          <h1 className="fw-bold title-responsive">CRUD de Usuarios</h1>
          <p className="lead text-white subtitle-responsive">
            React • Spring Boot • JWT • API REST Segura • Bootstrap 5
          </p>
        </div>

        {/* GIF de ejemplo */}
        <div className="text-center mb-5">
          <img
            src="animation.gif"
            alt="Demo de la aplicación"
            className="responsive-img shadow"
            style={{ maxWidth: "800px" }}
          />
          <p className="text-white small mt-2">
            Ejemplo de funcionamiento del CRUD con autenticación
          </p>
        </div>

        {/* Descripción del proyecto */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <div className="card shadow-sm p-4 border-0 bg">
              <h4>📌 Descripción</h4>
              <p>
                Este proyecto es una aplicación web para la gestión de usuarios
                con autenticación segura mediante JWT. Permite crear, listar,
                editar y eliminar usuarios, todo protegido por inicio de sesión.
              </p>
              <p>
                El frontend está desarrollado con <strong>React</strong> y
                <strong> Bootstrap</strong>, mientras que el backend usa
                <strong> Spring Boot</strong>, <strong>Spring Security</strong>{" "}
                y<strong> MySQL</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Lista de tecnologías */}
        <div className="mb-4 mb-md-5">
          <h4 className="mb-4 text-center">🛠 Tecnologías Utilizadas</h4>
          <div className="row text-center">
            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="p-3 border rounded bg shadow-sm text-center h-100">
                <strong>Frontend</strong>
                <p className="text-white small">React, Bootstrap, CSS</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="p-3 border rounded bg shadow-sm text-center h-100">
                <strong>Backend</strong>
                <p className="text-white small">
                  Spring Boot, Spring Security, JWT
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="p-3 border rounded bg shadow-sm text-center h-100">
                <strong>Base de Datos</strong>
                <p className="text-white small">MySQL</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="p-3 border rounded bg shadow-sm text-center h-100">
                <strong>Arquitectura</strong>
                <p className="text-white small">API REST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="text-center">
          <div className="btn-group-responsive">
            <Link to="/login" className="btn btn-primary btn-lg">
              Iniciar Sesión
            </Link>
            <Link to="/users" className="btn btn-accent btn-lg">
              Ver Usuarios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
