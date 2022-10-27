import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "../utils";
import Action from "../service";
import bitcoinFooter from "../assets/images/bitcoin_footer.png";

export default function Main() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    const HandleSubmit = async () => {
        if (address.trim() === "") {
            Toast("Please enter address", "warn");
            return;
        }
        if (amount.toString().trim() === "" || amount === 0) {
            Toast("Please enter amount", "warn");
            return;
        }

        try {
            setLoading(true);
            const request = await Action.Request_Payment({
                email: email.trim(),
                address: address.trim(),
                amount: amount.toString().trim(),
            });

            navigate(`/${request.data.order}`);
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            if (err.response !== undefined)
                switch (err.response.status) {
                    case 404:
                    case 400:
                    case 500:
                        Toast(err.response.data, "error");
                        break;
                    default:
                        Toast("Server Error", "error");
                        break;
                }
            else {
                Toast("Network Error", "error");
            }
        }
    };

    return (
        <>
            <div className="container">
                <div className="title">
                    <img src={bitcoinFooter} alt="" />
                    <h3>Bitcoin Payment</h3>
                </div>
                <div className="main">
                    <div>
                        <h2>Exchange Request</h2>
                        <p style={{ color: "grey" }}>
                            The exchange amount must be at least{" "}
                            <b style={{ color: "var(--secondary)" }}>
                                +0.00000001
                            </b>{" "}
                            <b>BTC</b>. Fill out the form to request a exchange
                            for the excess amount.
                        </p>
                        <div className="info_field">
                            <div>
                                <label>
                                    <b>
                                        Your Email Address
                                        <i style={{ color: "red" }}>*</i>
                                    </b>
                                </label>
                                <input
                                    type={"email"}
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e: any) =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label>
                                    <b>
                                        Your EVM Address
                                        <i style={{ color: "red" }}>*</i>
                                    </b>
                                </label>
                                <input
                                    type={"text"}
                                    placeholder="Your Bitcoin address"
                                    value={address}
                                    onChange={(e: any) =>
                                        setAddress(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label>
                                    <b>
                                        Swap Amount
                                        <i style={{ color: "red" }}>*</i>
                                    </b>
                                </label>
                                <input
                                    type={"number"}
                                    placeholder="Refound amount"
                                    value={amount}
                                    onChange={(e: any) =>
                                        setAmount(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {loading ? (
                            <button>Submitting...</button>
                        ) : (
                            <button onClick={HandleSubmit}>Submit</button>
                        )}
                        <div className="footer">
                            <p style={{ color: "grey" }}>Powered by</p>
                            <img src={bitcoinFooter} alt="" />
                            <h6>BitcoinEVM</h6>
                        </div>
                        <p className="text-center" style={{ color: "#999999" }}>
                            The payment is processed on behalf of the merchant
                            that refered you to this invoice by BitcoinEVM
                        </p>
                        <div className="spacer-10"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
