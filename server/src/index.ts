import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true
  })
);


app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (_, res) => { 
    res.sendFile(path.join(__dirname, '../dist/index.html')) 
}); 

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));