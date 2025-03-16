import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import axios from 'axios';
import PdfComp from './PdfComp';
import { pdfjs } from 'react-pdf'; //For pdf meta-link

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

function SendPdf() {

    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");

    //for view all pdf
    const [allPdf, setAllPdf] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    useEffect(() =>{
        getpdf();
    },[]);

    //View All pdf
    const getpdf = async () => {
        try {
            const result = await axios.get("http://localhost:5000/getFile");
            console.log(result.data.data);
            setAllPdf(result.data.data);
        } catch (error) {
            console.error("Error fetching PDF:", error);
            alert("Error fetching PDF: " + error.message);
        }
    };
    
    //Upload the pdf
    const submitPdf = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        console.log(title, file);

    try {
        const result = await axios.post(
            "http://localhost:5000/uplodefile",
            formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            console.log(result);

            if(result.data.status === 200) {
                alert("Uplode Success")
                getpdf();
            } else {
                alert("Upload Unsuccess")
            }
    } catch(error) {
        console.error("Error Uploading : " +error.message);
        alert("Error Uploading : " + error.message);
    }

    };

    //View
    const showPdf = (pdf) => {
        setPdfFile(`http://localhost:5000/files/${pdf}`);
    };

  return (
    <div>
        <Nav/>
        <h1>Send Pdf</h1>
        <form onSubmit={submitPdf}>
            <label>Pdf Title</label><br></br>
            <input type='text' required 
            onChange={(e) => setTitle(e.target.value)}></input><br></br><br></br>
            <label>Select Pdf File</label><br></br>
            <input type='file' accept='application/pdf' required
            onChange={(e) => setFile(e.target.files[0])}></input>
            <br></br><br></br>
            <button>Submit</button>
        </form>

        {/* Display All pdf */}
        <div>
            <h4>Pdf Details</h4>
            {allPdf == null ? "" : allPdf.map((data) => (
                <div key={data._id}>
                    <h1>Title:{data.title}</h1>
                    <button onClick={() =>
                        showPdf(data.pdf)
                    }>Show Pdf</button>
                </div>
            ))}
        </div>
        <PdfComp pdfFile={pdfFile}/>
    </div>
  )
}

export default SendPdf
