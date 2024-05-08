"use client"

import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface InputProps {
    placeholder : string
    value? : string  
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Input({placeholder, value, onChange} : InputProps) {
  
  if (value != undefined) {
      return <textarea
      className="m-5 p-10 border-4 border-white rounded-lg cursor-not-allowed placeholder-stone-500 text-2xl text-black"
      placeholder={placeholder}
      value={value}
      disabled={true}
      ></textarea>
  } else {
    return <textarea
      className="m-5 p-10 border-4 border-white rounded-lg placeholder-stone-500 text-2xl text-black"
      placeholder={placeholder}
      onChange={onChange} 
      ></textarea>

  }


}

export default function Home() {
  const [renderedTranslation, setRenderedTranslation] = useState("");
  const [query, setQuery] = useState("");

  async function fetchData() {

    try {
      console.log("http://0.0.0.0:8000/" + model + "/" + query)
      const response = await fetch("http://0.0.0.0:8000/" + model + "/" + query);
      const responseData = await response.json();
      setRenderedTranslation(responseData.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  } 

  const [model, setModel] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setModel(event.target.value as string);
  };


  return (
     <>
        <div className="text-4xl text-center font-bold m-10 drop-shadow-lg text-white bg-sky-500 p-4 rounded-lg">
          Machine Translation
        </div>

        <div className="m-5 flex flex-col lg:grid lg:grid-cols-2">
          <Input 
            placeholder="Type English..."
            onChange={(e) => {setQuery(e.target.value)}}
          />
          <Input 
            placeholder="French Translation..."
            value={renderedTranslation}
          />
          
        </div>
        <div className="m-32 mt-0 mb-4">
          <div className="flex items-center justify-center">

              <FormControl fullWidth className="mr-4">
                <InputLabel id="demo-simple-select-label">Select Model</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={model}
                label="Models"
                onChange={handleChange}
              >
                <MenuItem value={"marian-kde4"}>Marian (KDe4)</MenuItem>
                <MenuItem value={"marian-iswlt2017"}>Marian (iswlt2017) </MenuItem>
                <MenuItem value={"T5-kde4"}>T5 (KDe4) </MenuItem>
                <MenuItem value={"T5-iswlt2017"}>T5 (iswlt2017) </MenuItem>
                <MenuItem value={"delight"}>Delight</MenuItem>
  
              </Select>
            </FormControl>
      </div>
</div>


        
        <div className="flex items-center font-bold justify-center">
          <button 
            onClick={fetchData}
            className="bg-sky-500 transition hover:scale-105 px-10 py-3 text-white rounded-lg">
            Translate
          </button>
        </div>
     
     </>
  );
}
