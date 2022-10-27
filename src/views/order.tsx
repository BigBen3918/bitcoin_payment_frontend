import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { BiCopy, BiCheckDouble } from "react-icons/bi";
import { Toast, StyledAddress, StyledFloat, copyToClipboard } from "../utils";
import moment from "moment";

import Action from "../service";
import btcLogo from "../assets/images/bitcoin.png";
import confirmImg from "../assets/images/confirm.png";
import bitcoinFooter from "../assets/images/bitcoin_footer.png";

export default function OrderStatus() {
    const { orderid } = useParams();
    const navigate = useNavigate();
    const [data, setData]: any = React.useState(null);
    const [amountCopyFlag, setAmountCopyFlag] = React.useState(false);
    const [addressCopyFlag, setAddressCopyFlag] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            try {
                const result: any = await Action.Check_OrderId({
                    orderID: orderid,
                });

                setData(result.data);
            } catch (err: any) {
                if (err.response !== undefined)
                    switch (err.response.status) {
                        case 404:
                        case 500:
                            Toast(err.response.data, "error");
                            navigate("/");
                            break;
                        default:
                            Toast("Server Error", "error");
                            navigate("/");
                            break;
                    }
                else {
                    Toast("Network Error", "error");
                    navigate("/");
                }
            }
        })();
    }, [orderid]);

    const copyAddress = () => {
        copyToClipboard(data?.result2?.address)
            .then(() => {
                setAddressCopyFlag(true);
                setTimeout(() => {
                    setAddressCopyFlag(false);
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const copyAmount = () => {
        copyToClipboard(data?.result1?.amount.toString())
            .then(() => {
                setAmountCopyFlag(true);
                setTimeout(() => {
                    setAmountCopyFlag(false);
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container">
            <div className="title">
                <img src={bitcoinFooter} alt="" />
                <h3>Bitcoin Payment</h3>
            </div>
            <div className="next_main">
                <div>
                    {data ? (
                        data.result1.status === "success" ? (
                            <div className="success">
                                <div>
                                    <div>
                                        <p>
                                            <b>Order:</b>{" "}
                                            {data.result1.orderID.slice(0, 15) +
                                                "..."}
                                        </p>
                                        <p>
                                            <b>Date:</b>{" "}
                                            {moment(
                                                Number(
                                                    data.result1
                                                        .completedTimeStamp
                                                )
                                            ).format("MM/DD/YYYY hh:mm a")}
                                        </p>
                                    </div>
                                    <div>
                                        <span>{data.result1.amount} BTC</span>
                                        <img src={btcLogo} alt="" />
                                    </div>
                                </div>
                                <img src={confirmImg} alt="" />
                                <h2>Paid and Confirmed</h2>
                                <div className="spacer-10"></div>
                                <p style={{ color: "grey" }}>
                                    The payment is processed on behalf of
                                    merchant that referred you to this invoice
                                    by Bitcoin EVM
                                </p>
                                <div className="spacer-10"></div>
                            </div>
                        ) : (
                            <>
                                <h2>Pay For Your Order</h2>
                                <p style={{ color: "grey" }}>
                                    Scan the QR code, or copy and paste the
                                    payment details into your wallet.
                                </p>
                                <QRCode
                                    size={200}
                                    className="qrcode"
                                    value={data?.result2?.address}
                                    viewBox={`0 0 200 200`}
                                />
                                <span style={{ paddingTop: "2rem" }}>
                                    <label>
                                        <b>Amount</b>
                                    </label>
                                    <div>
                                        <p>
                                            {StyledFloat(
                                                data?.result1?.amount,
                                                8
                                            ) + " BTC"}
                                        </p>
                                        <button onClick={copyAmount}>
                                            {amountCopyFlag ? (
                                                <BiCheckDouble />
                                            ) : (
                                                <BiCopy />
                                            )}
                                        </button>
                                    </div>
                                </span>
                                <span>
                                    <label>
                                        <b>Address</b>
                                    </label>
                                    <div>
                                        <p>
                                            {StyledAddress(
                                                data?.result2?.address
                                            )}
                                        </p>
                                        <button onClick={copyAddress}>
                                            {addressCopyFlag ? (
                                                <BiCheckDouble />
                                            ) : (
                                                <BiCopy />
                                            )}
                                        </button>
                                    </div>
                                </span>
                                <div className="footer">
                                    <p style={{ color: "grey" }}>Powered by</p>
                                    <img src={bitcoinFooter} alt="" />
                                    <h6>BitcoinEVM</h6>
                                </div>
                                <p
                                    className="text-center"
                                    style={{ color: "#999999" }}
                                >
                                    The payment is processed on behalf of the
                                    merchant that refered you to this invoice by
                                    BitcoinEVM
                                </p>
                                <div className="spacer-10"></div>
                            </>
                        )
                    ) : (
                        <>
                            <h3 className="spinner">Waiting response...</h3>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
