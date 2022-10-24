import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "../utils";
import Action from "../service";

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
                <h3 className="title">Bitcoin Payment</h3>
                <div className="main">
                    <div>
                        <h2>Make a request</h2>
                        <p style={{ color: "grey" }}>
                            Enter your infomations to receive the payment
                            receipt:
                        </p>
                        <input
                            type={"email"}
                            placeholder="enter the email"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                        <input
                            type={"text"}
                            placeholder="enter the address"
                            value={address}
                            onChange={(e: any) => setAddress(e.target.value)}
                        />
                        <input
                            type={"number"}
                            placeholder="enter amount"
                            value={amount}
                            onChange={(e: any) => setAmount(e.target.value)}
                        />
                        <div className="spacer-10"></div>
                        <hr />
                        {loading ? (
                            <button>Submitting...</button>
                        ) : (
                            <button onClick={HandleSubmit}>Submit</button>
                        )}
                        <div className="spacer-10"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
