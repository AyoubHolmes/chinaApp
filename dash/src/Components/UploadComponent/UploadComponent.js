import React, { useEffect } from 'react';
import './UploadComponent.css';

const UploadComponent = (props) => {
    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        for (let param of query.entries()) {
            if(param[0] === 'id') {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                console.log('id: ' + param[0])
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
        
    return (
        <div className="frame">
            <div className="center">
                <div className="title">
                    <h1>Drop file to upload</h1>
                </div>
                <form action="/upload" enctype="multipart/form-data" method="post">
                    <div className="dropzone">
                        <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon" alt="upload" />
                        <input type="file" name="upload" className="upload-input" multiple />
                    </div>
                    <input type="submit" value="Upload file" className="btn" name="uploadbutton" />
                </form>
            </div>
        </div>
    );
};

/*
<form action="/" enctype="multipart/form-data" method="post">
    <input type="file" name="upload" multiple>
    <input type="submit" value="Upload">
</form>
*/

export default UploadComponent;