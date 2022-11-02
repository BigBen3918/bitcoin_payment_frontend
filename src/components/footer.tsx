import "./index.scss";
import logo from "../assets/images/bitcoin_footer.png";

export default function Footer() {
    return (
        <div className="footer">
            <div className="container-xl">
                <div className="wrap justify-between middle">
                    <div className="flex middle center g-10 pr3">
                        <img src={logo} alt="" />
                        <p>bitcoin payment</p>
                    </div>
                    <p>
                        Copyright &copy;{new Date().getFullYear()} bitcoin
                        payment S.L. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
