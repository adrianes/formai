import React, { useEffect, useState } from 'react';
import { generateText } from './gpt3-api';
import QuoteForm from './QuoteForm';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import dayjs from 'dayjs';
import Mic from '@mui/icons-material/Mic';
import Stop from '@mui/icons-material/Stop';
import Replay from '@mui/icons-material/Replay';


function isJSON(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function App() {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [jsonData, setJsonData] = useState(
    {
      pickupFrom: {
        address: "",
        city: "",
        state: "",
        country: ""
      },
      pickupDateTime: dayjs(new Date("2023-04-05T15:00:00.0000000Z")),
      deliveryTo: {
        address: "",
        city: "",
        state: "",
        country: ""
      },
      productValue: 0,
      containsHazardousMaterials: false,
      teamService: false
    }
  );
  const preText = `[Format your response on JSON object, remove notes, note, (Note:, Note:, pre-text and post-text, skip code formats, just return the pure JSON object]
  From the following sentence
  "`;
  const postText = `"
  Fill this JSON object layout, and try to guess the values if they are missing from the current ones.
  pickupDateTime should be in UTC format
  if you obtain a city don't use it on the address field
  You should have the pickup city, state and country
  also the delivery city, state and country
  {
        "pickupFrom": {
          "address": "",
          "city": "",
          "state": "",
          "country": ""
        },
        "pickupDateTime": "",
        "deliveryTo": {
          "address": "",
          "city": "",
          "state": "",
          "country": ""
        },
        "productValue": 0,
        "containsHazardousMaterials": false,
        "teamService": false
      }`;
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    console.log("transcript", transcript);
    setInputText(transcript);
  }, [transcript]);

  useEffect(() => {
    console.log("generateText", generateText);
    if (isJSON(generatedText)) {
      let JSONData = JSON.parse(generatedText);
      JSONData.pickupDateTime && dayjs(JSONData.pickupDateTime).isValid() ? JSONData.pickupDateTime = dayjs(new Date(JSONData.pickupDateTime)): JSONData.pickupDateTime = dayjs(new Date()) ;
      generatedText !== '' && setJsonData(JSONData);
    }
  }, [generatedText]);

  useEffect(() => {
    console.log("jsonData", jsonData);
  }, [jsonData]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    setLoadingAI(true);
    try {
      console.log(`${preText}${inputText}${postText}`);
      const result = await generateText(`${preText}${inputText}${postText}`);
      setGeneratedText(result);
      setLoadingAI(false);
/*      let jsonParsed = JSON.parse('{ "pickupFrom": { "address": "Chicago, IL, USA", "city": "Chicago", "state": "IL", "country": "USA" }, "pickupDateTime": "2020-04-07T18:00:00Z", "deliveryTo": { "address": "San Francisco, CA, USA", "city": "San Francisco", "state": "CA", "country": "USA" }, "productValue": 0, "containsHazardousMaterials": false, "teamService": false }');
      jsonParsed.pickupDateTime && dayjs(jsonParsed.pickupDateTime).isValid() ? jsonParsed.pickupDateTime = dayjs(new Date(jsonParsed.pickupDateTime)): jsonParsed.pickupDateTime = dayjs(new Date()) ;
      console.log('jsonParsed', jsonParsed);
      setJsonData(jsonParsed);*/
    } catch (error) {
      console.error('Error to connect to GPT-4:', error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '60px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3">
            Get a Quote AI
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={inputText}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            label="Ask for a quote..."
            variant="outlined"
          />
          <Grid container spacing={3}>
            <Grid item>
              <p>Microphone: {listening ? 'on' : 'off'}</p>
              <Button color="primary" startIcon={<Mic />} onClick={SpeechRecognition.startListening} />
              <Button color="primary" startIcon={<Stop />} onClick={SpeechRecognition.stopListening} />
              <Button color="primary" startIcon={<Replay />} onClick={resetTranscript} />
            </Grid>
            <Grid item style={{ marginTop: '30px' }}>
              {!loadingAI && (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Generate a Quote
              </Button>
              )}
              {loadingAI && (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <QuoteForm data={jsonData} />
    </Container>
  );
}

export default App;
