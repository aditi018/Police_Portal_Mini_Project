import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React , {useState} from "react";
import Image from "./upload.png";
import styled from "styled-components";

const Btn = styled.button`
  color: black;
  width: 15rem;
  height: 3rem;
  font-weight: 700;
  background-color: #fc724d;
  padding: 5px;
  border-radius: 6px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
    background-color: #fc740d;
  }
`;

const StyledInput1 = styled.input`
  color: black;
  width: 23rem;
  height: 3rem;
  alignitems: center;
  padding: 5px;
  padding-left: 12px;
  border-radius: 6px;
  margin: 5px;
  border: 1px solid lightblue;
`;

const StyledInput2 = styled.input`
  color: black;
  width: 23rem;
  height: 4rem;
  alignitems: center;
  padding: 5px;
  padding-left: 12px;
  border-radius: 6px;
  margin: 5px;
  border: 1px solid lightblue;
`;

function UploadFIR(){
  let navigate = useNavigate();
  const [ complainantName, setComplainantName] = useState("");
  const [complainantAddress, setComplainantAddress] = useState("");
  const [dateTime , setOccurrenceDateTime] = useState("");
  const [accussedName, , setAccussedName] = useState("");
  const [accussedAddress , setAccussedAddress] = useState("");
  const [description , setDescription] = useState("");

  const handleButton = async() => {
    try{
      const response = await fetch("/api/saveData/submit",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({
          ComplainantName:complainantName,
          ComplainantAddress : complainantAddress,
          dateTime :dateTime,
          accussedName:accussedName,
          accussedAddress :accussedAddress,
          descriptionOfCrime : description,
        }),
      });

      if(response.ok){
        navigate("/status");
      }
      else{
        console.log("Submission failed...");
      }
    }
    catch(err){
      console.log("Error occurred :",err);
    }
  }
  

  const onHandleComplainantNameChange = (e) => {
    setComplainantName(e.target.value);
  }
  const onHandleComplainantAddressChange = (e) => {
    setComplainantAddress(e.target.value);
  }
  const onHandleoccurrenceDateTimeChange = (e) => {
    setOccurrenceDateTime(e.target.value);
  }
  const onHandleAccussedNameChange = (e) => {
    setAccussedName(e.target.value);
  }
  const onHandleAccussedAddressChange = (e) => {
    setAccussedAddress(e.target.value);
  }
  const onHandleDescriptionChnage = (e) => {
    setDescription(e.target.value);
  }
  return(
      <Box
        sx={{
        width: "100%",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        sx={{
          width: "100vw",
          height: `calc(100vh - 75px)`,
        }}
      >
        <Grid
          item
          xl={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledInput1 onChange={onHandleComplainantNameChange} placeholder="Enter complaintant's name" required />
          <StyledInput1 onChange={onHandleComplainantAddressChange} placeholder="Enter complaintant's address" required/>
          <StyledInput1 onChange={onHandleoccurrenceDateTimeChange} placeholder="Date and time of occurence of crime" required/>
          <StyledInput1 onChange={onHandleAccussedNameChange} placeholder="Enter accused name if known" />
          <StyledInput2 onChange={onHandleAccussedAddressChange} placeholder="Enter accused address" />
          <StyledInput2 onChange={onHandleDescriptionChnage} placeholder="Description of the crime" required/>
          <Btn onClick={handleButton}>Register an online complaint</Btn>
        </Grid>
        <Grid
          item
          xl={6}
          sx={{
            display: "block",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`${Image}`}
            alt="abhi aaegi image"
            style={{ width: "30rem", height: "30rem" }}
          />
        </Grid>
      </Grid>
    </Box>
    )
}

export default UploadFIR;