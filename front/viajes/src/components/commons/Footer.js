import logoTwitter from '../../svg/twitter.svg';
import logoFacebook from '../../svg/facebook.svg';
import logoInstagram from '../../svg/instagram.svg';

export default function Footer() {
  return (
    <div>
      <div className="footer-content">
        <h1>
          <a target="_blank" rel="noopener noreferrer" href="/">
            Roling Road
          </a>
        </h1>
        <div>
          <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com">
            <img src={logoTwitter} className="icon" alt="website logo" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com"
          >
            <img src={logoFacebook} className="icon" alt="website logo" />
          </a>

          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com">
            <img src={logoInstagram} className="icon" alt="website logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
