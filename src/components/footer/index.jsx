import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="section contaierFooter">
      <div className="footer">
        <div className="footer__linkContainer">
          <a
            className="footer__linkContainer-link"
            href="https://www.linkedin.com/in/dylan-losada-dw/"
            target="_blanck"
          >
            <i class="fab fa-linkedin-in"></i>
          </a>

          <a
            href="https://github.com/DylanLosada"
            target="_blanck"
            className="footer__linkContainer-link"
          >
            <i class="fab fa-github"></i>
          </a>
        </div>

        <h4 className="footer__copy">&copy; Dylan Losada 2021</h4>
      </div>
    </section>
  );
};

export default Footer;
