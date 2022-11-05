import React from "react";
import loadImage from "../assets/images/loading.gif";

export default function Loading() {
    return (
        <div className="loading">
            <img src={loadImage} alt="" />
        </div>
    );
}
