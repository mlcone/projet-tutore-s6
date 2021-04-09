import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { path } from './config/config.json';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

let body=new FormData();
export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameName: "",
            updateList: true,
            games: []
        };
    }
    donneesJeux(){
        if(this.state.updateList === true) {
            axios.get(`http://` + path + `/games/1`)
                .then(res => {
                    const games = res.data;
                    this.setState({games});
                    this.setState({updateList: false});
                })
            ;
        }
    }
    handleSubmitForm(event) {
        if(this.state.gameName !== ''){
            axios.post(`http://` + path + `/game/`+ this.state.gameName)
            .then(res => {
                const games = res.data;
                this.setState({ games });
            })
        }else{
            this.setState({ games: [] });
        }
        event.preventDefault();
    }

    handleChange(event) {
        let value = event.target.value;
        
        this.setState({
            gameName: value
        });
    }
    //==================ACCORDION========================
    renderAccordion=()=>{

        return(
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Advanced search</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form onSubmit={event => this.advancedSearchForm(event)}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Autocomplete
                                    id="name"
                                    options={this.state.games.map((option)=>option.name)}
                                    renderInput={(params)=>(
                                        <TextField {...params} name="name" label="name" margin="normal" variant="outlined"/>
                                    )}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    id="developer"
                                    options={this.state.games.map((option)=>option.developer)}
                                    renderInput={(params)=>(
                                        <TextField {...params} name="developer" label="developer" margin="normal" variant="outlined"/>
                                    )}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    id="publisher"
                                    options={this.state.games.map((option)=>option.publisher)}
                                    renderInput={(params)=>(
                                        <TextField {...params} name="publisher" label="publisher" margin="normal" variant="outlined"/>
                                    )}/>
                            </Grid>
                            {/*2eme grille*/}
                            <Grid item xs={4}>
                                <TextField id="date_debut" name="date_debut" label="release date" type="date" margin="normal" variant="outlined" InputLabelProps={{
                                    shrink: true,
                                }}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="date_fin" name="date_fin" label="limit date" type="date" margin="normal" variant="outlined" InputLabelProps={{
                                    shrink: true,
                                }}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField  id="required_age" name="required_age" label="required age" type="number" margin="normal" variant="outlined" InputLabelProps={{
                                    shrink: true,
                                }}/>
                            </Grid>
                        {/*    3eme grille*/}
                            <Grid item xs={5}>
                                <Autocomplete
                                    multiple
                                    filterSelectedOptions
                                    id="genres"
                                    options={this.state.games}
                                    getOptionLabel={(option)=>option.genres}
                                    renderInput={(params)=>(
                                        <TextField {...params} name="genres" label="genre" margin="normal" variant="outlined"/>
                                    )}/>
                            </Grid>
                            <Grid item xs={5}>
                                <Autocomplete
                                    multiple
                                    filterSelectedOptions
                                    id="categories"
                                    options={this.state.games}
                                    getOptionLabel={(option)=>option.categories}
                                    renderInput={(params)=>(
                                        <TextField {...params} name="categories" label="genre" margin="normal" variant="outlined"/>
                                    )}/>
                            </Grid>
                            <Grid item xs={2}>
                                <input type="submit" value="search"/>
                            </Grid>
                        </Grid>
                        </form>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }
    advancedSearchForm=(event)=>{
        body.append('name',document.getElementById("name").value);
        body.append('developer',document.getElementById("developer").value);
        body.append('publisher',document.getElementById("publisher").value);
        body.append('date_debut',document.getElementById("date_debut").value);
        body.append('date_fin',document.getElementById("date_fin").value);
        body.append('platforms',"");
        body.append('required_age',document.getElementById("required_age").value);
        body.append('genres',document.getElementById("genres").value);
        body.append('categories',document.getElementById("categories").value);
        // axios.post(`http://` + path + `/advancedsearch`,body,{headers:{
        //         "Content-Type":"application/json",
        //         "Access-Control-Allow-Origin":"*",
        //     }})
        axios({
            method:'post',
            url:`http://` + path + `/advancedsearch`,
            data:body,
            headers:{
                "Content-Type":"multipart/form-data",
              
            }
        })
            .then(res => {
                const games = res.data;
                this.setState({ games });
            })
            .catch(error=>{
                console.log(error);
        })
        event.preventDefault();
    }

    render() {
        return (
            <div>
            <form onSubmit={event => this.handleSubmitForm(event)}>
                <label>
                    
                    <input
                        type="text"
                        value={this.state.gameName}
                        onChange={event => this.handleChange(event)}
                        placeholder="Search games"
                    />
                </label>
                <input type="submit" value="Search"/>
                <ul>
                    { this.state.games.map(game => <Link key={game.appid} to={'/fiche/?appid='+ game.appid}><li>{game.name}</li></Link>)}
                </ul>
            </form>
                {this.renderAccordion()}
            </div>
        );
    }
}
