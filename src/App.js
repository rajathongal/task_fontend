import React, {useState, useEffect, Fragment} from 'react';
import './App.css';
import PplCard from './PplCard';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TopBar from './Header';
import BottomBar from './footer';

function App() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState([])
  const [inputFields, setInputFields] = useState([{
    name: '',
    email: '',
    phonenumber: ''
  }]);

  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};
  

  const handleInputChange = (index, event) => {
    const values = [...inputFields];

    if(event.target.name === 'name'){
        values[index].name = event.target.value
    }
    else if(event.target.name === 'email'){
      values[index].email = event.target.value
    } else if(event.target.name === 'phonenumber'){
      values[index].phonenumber = event.target.value
    }
    setInputFields(values);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = async (e) => {
    
    let img = await e.target.files[0];
    setFile(img);
  }

  const SubmitTestimonials = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", file)
    formData.append("name", inputFields[0].name)
    formData.append("email", inputFields[0].email)

    const Imageoptions = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    await axios.post('https://vinayakpd-task.zeet.app/testimonials/newTestimonial', formData, Imageoptions);

    await setOpen(false);
    window.location.reload();
  }
  

  const SubmitStore = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5002/stores/newStore',{
      name: inputFields[0].name,
      email: inputFields[0].email,
      phonenumber: inputFields[0].phonenumber
    });
    await setOpen(false);
    window.location.reload();
  }


  useEffect(()=>{
    async function fetchData() {
      const response = await axios.get('https://vinayakpd-task.zeet.app/testimonials/testimonialFetch')
      await setUsers(response.data.data)
    };
    fetchData() },[])

    
    return (
      <>
      <TopBar/>

      <div> 
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Card
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Card
          </DialogContentText>
          <form onSubmit={SubmitTestimonials}>
            {inputFields.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
          <TextField
            autoFocus
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={inputFields[0].name}
            onChange={(event) => {handleInputChange(index, event)}}
          />
         <br/>
         <br/>
          <TextField
            autoFocus
            name="email"
            label="email"
            variant="outlined"
            fullWidth
            value={inputFields[0].email}
            type="email"
            onChange={(event) => {handleInputChange(index, event)}}
          />
          <br/>
          <br/>
           <input
            onChange={handleFileUpload}
            type="file"
          />
              </Fragment>
            ))}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={SubmitTestimonials} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  {/*  <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create New Store
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Create New Store
          </DialogContentText>
          <form onSubmit={SubmitTestimonials}>
            {inputFields.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
          <TextField
            autoFocus
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={inputFields[0].name}
            onChange={(event) => {handleInputChange(index, event)}}
          />
          <TextField
            autoFocus
            name="email"
            label="email"
            variant="outlined"
            fullWidth
            value={inputFields[0].email}
            type="email"
            onChange={(event) => {handleInputChange(index, event)}}
          />
          <TextField
            autoFocus
            name="phonenumber"
            label="phonenumber"
            variant="outlined"
            fullWidth
            value={inputFields[0].phonenumber}
            onChange={(event) => {handleInputChange(index, event)}}
          />
              </Fragment>
            ))}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={SubmitStore} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
            </div>*/}
      <div className="App">
          <Grid container spacing={10}
          style={{padding: '24px'}}
          >
            {users.map( users =>{ 
              var base64Flag = `data:${users.img.contentType};base64,`;
              var imgData = arrayBufferToBase64(users.img.data.data);
              return(
                           <Grid key={users._id} item
                           xs={12} sm={6} md={4} lg={4} xl={3}
                           > 
                             <PplCard
                             key={users._id} email={users.email} 
                             name={users.name} base64Flag={base64Flag} imgData={imgData}
                             />
                           </Grid> 
            )}
              )}
            
          </Grid>
      </div>  
    <BottomBar/>
</>
  );
}
export default App;