import Tesseract from "tesseract.js";
import { useState } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Request = () => {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState();
  const [language, setLanguage] = useState("en");
  const [tl, setTl] = useState();
  const [lang, setLang] = useState();
  const [cogn, setCogn] = useState("");
  const [responseTime, setResponseTime] = useState();

  const [requests,setRequests] = useState([]);

  useEffect(() => {
    try{
        fetch("http://localhost:3001/api/saveData/getRequests",
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin" : "http://127.0.0.1:3003",
                },
                
                // body: JSON.stringify(payload),
              }
        ).then((response) => response.json()).then((data) => {
            console.log("Success:",data);
        setRequests(data.request);
        })
    }catch(err){
        console.log(err);
    }
  },[]);

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    const type = e.target.files[0].type;
    console.log(type);
    if (type === "application/pdf") {
      alert(
        "Please Use Screenshots of PDF (Not PDF)....This Feature is Yet to be Implemented"
      );
    }
  };

  const processImage = () => {
    setResult("");
    setProgress(0);
    setLang("");
    setTl("");

    Tesseract.recognize(file, language, {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(m.progress);
        }
        console.log(m);
      },
    }).then(({ data: { text } }) => {
      setResult(text);

      const payload = {
        Lang: language,
        Text: text,
      };

      fetch(
        "http://127.0.0.1:5000/lang",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "http://127.0.0.1:3003",
          },
          
          body: JSON.stringify(payload),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          let help = data;
          //Cases

          // 1.cognizable
          const Cognizable = [
            "dead",
            "accident",
            "dead body",
            "killed",
            "truck",
            "accused",
            "car",
            "hit",
            "ran",
            "rash",
            "recklessly",
          ];
          const info = {
            cogniz: (
              <h1>
                <b>
                  Chances are high that the crime is a
                  <span style={{ fontWeight: 900 }}> Cognizable Offence</span>
                </b>
                <br />
                1.Accuse Can be arrested without any warrant.
                <br />
                2.Investigation should be started without any prior order from
                the court.
                <br />
                3.The report must be given to the magistrate within 90 days (If
                the punishment is more than 7 years)
              </h1>
            ),
            noncogn: (
              <h1>
                <b>Non-Cognizable Offence:</b>
                <br />
                1.Accuse Can't be arrested without any warrant.
                <br />
                2.FIR can't be filed without the permission of magistrate.
                <br />
                3. Investigation can't be started without the permission of
                magistrate.
              </h1>
            ),
          };
          Cognizable.forEach((val) => {
            let position = help.search(val);
            console.log("val : ", val + "position:", position);
            if (position !== -1) {
              console.log("Cognizable FIR");
              setCogn(info.cogniz);
            }
          });

          // 2.non-cognizable
          const Non_Cognizable = [
            "cheated",
            "forgery",
            "Simple Hurt",
            "Assault",
            "cheating",
          ];

          Non_Cognizable.forEach((val) => {
            let position = help.search(val);
            console.log("val : ", val + "position:", position);
            if (position !== -1) {
              console.log("Non Cognizable FIR");
              setCogn(info.noncogn);
            }
          });

          setLang(data);
          console.log(result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  return (
    <div className="parentDiv">
      <div className="parent3">
        <section className="left3">
          <p>REQUESTED FIR'S</p>
          

          <button onClick={processImage}>GET FIR'S</button>

          <div className="progress-bar">
            <progress value={progress} max={1} style={{ borderRadius: 15 }} />
          </div>
          <button onClick={() => toast(cogn)}>Categorize</button>
        </section>

        <section
          className="middle3 card card-5"
          style={{
            backgroundColor: "#d6c9af",
            borderRadius: 8,
            border: "1px solid white",
          }}
        >
          <h1>REQUESTS</h1>
          {result !== "" && (
            <>
              <ul>
                {requests.map((request,id) =>{
                    <li key={request._id}>{request.description}</li>
                })}
              </ul>
            </>
          )}
        </section>
        <section
          className="right3 card card-5"
          style={{
            backgroundColor: "#d6c9af",
            borderRadius: 8,
            border: "1px solid white",
          }}
        >
          <h1>Detailed View of FIR</h1>
          {lang !== "" && (
            <>
              <p> {lang}</p>
            </>
          )}
        </section>
      </div>
      <div
        style={{
          boxShadow: 20,
          border: 2,
        }}
      >
        <h1
          style={{
            fontWeight: 650,
            textAlign: "center",
            marginTop: 100,
            fontSize: 21,
            textDecoration: "underline",
          }}
        ></h1>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={10000}
        // hideProgressBar="true"
        // pauseOnFocusLoss
        draggable
        // pauseOnHover
      />
    </div>
  );
};

export default Request;
