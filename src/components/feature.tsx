import icon from "../assets/images/feature.png";
import "./index.scss";

export default function Feature() {
    return (
        <div className="feature">
            <p>Feature</p>
            <div className="row center m0">
                <div className="col-sm-12 col-md-6 p2">
                    <div className="flex middle g-20">
                        <img src={icon} alt="" />
                        <p>
                            Don’t trust a website to hold your crypto. Secure
                            your funds in a non-custodial crypto app.
                        </p>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 p2">
                    <div className="flex middle g-20">
                        <img src={icon} alt="" />
                        <p>
                            Manage multiple wallets on the go. Instant access to
                            all of your assets.
                        </p>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 p2">
                    <div className="flex middle g-20">
                        <img src={icon} alt="" />
                        <p>Easy backups and industry leading security.</p>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 p2">
                    <div className="flex middle g-20">
                        <img src={icon} alt="" />
                        <p>
                            Pay with crypto and buy gift cards straight from
                            your wallet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
