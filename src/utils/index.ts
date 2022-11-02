import { toast } from "react-toastify";

export const Toast = (message: string, status: string) => {
    switch (status) {
        case "success":
            return toast.success(message, {
                theme: "dark",
                position: toast.POSITION.TOP_RIGHT,
                icon: true,
            });
        case "error":
            return toast.error(message, {
                theme: "dark",
                position: toast.POSITION.TOP_RIGHT,
                icon: true,
            });
        case "warn":
            return toast.warning(message, {
                theme: "dark",
                position: toast.POSITION.TOP_RIGHT,
                icon: true,
            });
        default:
            return toast.warning(message, {
                theme: "dark",
                position: toast.POSITION.TOP_RIGHT,
                icon: true,
            });
    }
};

export const StyledAddress = (address: string) => {
    if (address && address.length > 20)
        return address.slice(0, 10) + "..." + address.slice(-5);
    else return address;
};

export const StyledFloat = (num: string | number, fix: number) => {
    return parseFloat(Number(num).toFixed(fix));
};

export const copyToClipboard = (textToCopy: string) => {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res: any, rej: any) => {
            // here the magic happens
            document.execCommand("copy") ? res() : rej();
            textArea.remove();
        });
    }
};
