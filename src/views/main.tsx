import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledFloat, Toast } from "../utils";
import Action from "../service";
import bitcoinFooter from "../assets/images/bitcoin_footer.png";
import back from "../assets/images/back.png";
import axios from "axios";
import Content from "../components/content";
import Feature from "../components/feature";
import Footer from "../components/footer";
import { TextField, withStyles } from "@material-ui/core";

const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "orange",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "orange",
        },
        width: "100%",
        flex: "1 1 70%",
    },
})(TextField);

export default function Main() {
    const navigate = useNavigate();
    const [time, setTime] = useState(+new Date());
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [btcPrice, setBtcPrice] = useState(0);
    const [ismobile, setMobile] = useState(false);

    useEffect(() => {
        let timeHandler: any;
        timeHandler = setTimeout(() => {
            (async () => {
                try {
                    const result = await axios.get(
                        "https://blockchain.info/ticker"
                    );

                    setBtcPrice(result.data.USD.last);
                    setTime(+new Date());
                } catch (ex: any) {
                    console.log(ex);
                }
            })();
        }, 10000);

        return () => timeHandler && clearTimeout(timeHandler);
    }, [time]);

    useEffect(() => {
        const resize = () => {
            if (window.innerWidth < 768) {
                setMobile(true);
            } else {
                setMobile(false);
            }
        };

        resize();
        window.addEventListener("resize", () => resize());
    }, []);

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
        <div className="relative">
            <div className="container-xl z-10">
                <div className="title">
                    <img src={bitcoinFooter} alt="" />
                    <p>bitcoin payment</p>
                </div>
                <div className="row center m0">
                    <div className="col-sm-12 col-md-5 p1">
                        <div className="main_title">
                            <div>
                                {!ismobile ? (
                                    <>
                                        <p>The most</p>
                                        <div>
                                            <b>trustable</b>
                                        </div>
                                        <p style={{ paddingBottom: "20px" }}>
                                            payment app
                                        </p>
                                    </>
                                ) : (
                                    <p>
                                        The most <b>trustable</b> payment app
                                    </p>
                                )}
                            </div>
                            <p>
                                Turn Bitcoin into dollars with the BitPay crypto
                                debit card. Earn cash back automatically.
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-7 p1 flex center">
                        <div className="modal">
                            <div className="info_modal">
                                <h3>Exchange Request</h3>
                                <CssTextField
                                    type={"email"}
                                    label="Your email*"
                                    value={email}
                                    onChange={(e: any) =>
                                        setEmail(e.target.value)
                                    }
                                />
                                <div className="spacer-10"></div>
                                <CssTextField
                                    type={"text"}
                                    label="Your EVM address*"
                                    value={address}
                                    onChange={(e: any) =>
                                        setAddress(e.target.value)
                                    }
                                />
                                <div className="spacer-10"></div>
                                <div className="w100 flex center bottom pl-10">
                                    <CssTextField
                                        type={"number"}
                                        label="Bitcoin amount*"
                                        value={amount}
                                        onChange={(e: any) =>
                                            setAmount(e.target.value)
                                        }
                                    />
                                    <p
                                        style={{
                                            color: "#6c6c6c",
                                            flex: "1 1 30%",
                                            wordBreak: "keep-all",
                                        }}
                                    >
                                        {amount > 0
                                            ? "≈" +
                                              StyledFloat(
                                                  btcPrice * amount,
                                                  2
                                              ).toLocaleString() +
                                              "US$"
                                            : "≈ 0US$"}
                                    </p>
                                </div>
                                <div className="spacer-10"></div>
                                {loading ? (
                                    <button>Submitting...</button>
                                ) : (
                                    <button onClick={HandleSubmit}>
                                        Submit
                                    </button>
                                )}
                                <p className="powered">POWERED BY BITCOINEVM</p>
                                <p className="details">
                                    The payment is processed on behalf of the
                                    merchant that refered you to this invoice by
                                    BitcoinEVM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="spacer-20"></div>
                <Content />
                <Feature />

                <div className="spacer-30"></div>
            </div>

            <Footer />
            <img src={back} alt="" className="back" />
        </div>
    );
}
