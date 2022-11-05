import React from "react";
import loadImage from "../assets/images/loading.gif";

export default function Loading() {
    return (
        <div style={{ position: "relative", height: "100vh" }}>
            <img
                src={loadImage}
                alt=""
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80px",
                }}
            />
        </div>
    );
}
