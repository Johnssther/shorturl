import {QRCodeSVG} from 'qrcode.react';
import {QRCodeCanvas} from 'qrcode.react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faClipboardList, faLink, faDownload } from '@fortawesome/free-solid-svg-icons';

const QRCodeGenerator = ({ value }) => {

    const downloadQRCode = () => {
        const canvas = document.getElementById('qrcode');
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div>
            <div className="mt-6">
                <h2 className="text-lg text-center font-extrabold">QR Code</h2>
                <QRCodeCanvas
                    id="qrcode"
                    value={value}
                    size={200}
                    level={"H"}
                    includeMargin={true}
                />
            </div>
            <div className="mt-4">
                <PrimaryButton onClick={downloadQRCode} className='bg-white border-slate-800 text-black hover:bg-white'>
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Download QR as PNG
                </PrimaryButton>
            </div>
        </div>
    );
};

export default QRCodeGenerator;
