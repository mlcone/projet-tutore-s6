import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { path } from './config/config.json';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ReorderIcon from '@material-ui/icons/Reorder';

import "./GameList.css";


export default class GameList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            games: [],
            updateList: true,
            page: 1,
            displayGrid:false
        };
    }
    
    getGameList(){
        if(this.state.updateList === true){
            axios.get(`http://` + path + `/games/` + this.state.page)
            .then(res => {
                const games = res.data;
                this.setState({ games });
                this.setState({ updateList: false })
            })
            ;
        //console.log(this.state.games);
        }   
    }

    renderTable(){
        if(!this.state.displayGrid){
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Thumbnail</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Release Date</TableCell>
                            <TableCell>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderList()}
                    </TableBody>
                </Table>
            )
        }
    }

    renderList(){
        return this.state.games.map((game) => {
            const {appid, name, release_date, score, thumbnail} = game;
            return (
                <TableRow key={appid}>
                    <TableCell>
                        <Link to={'/fiche/?appid='+ appid}><img src={thumbnail} alt="thumbnail" className="thumbnail"></img></Link>
                    </TableCell>
                    <TableCell>
                        <Link to={'/fiche/?appid='+ appid}>{name}</Link>
                    </TableCell>
                    <TableCell>
                        {release_date}
                    </TableCell>
                    <TableCell>
                        {score}
                    </TableCell>
                </TableRow>
            )
        })
    }

    paginationControl(event, select = false){
        
        if(event === "prev"){
            if(this.state.page !== 1){
                this.setState({ page: this.state.page-1 });
                this.setState({ updateList: true })
                this.getGameList();
            }
        }else if(event === "next"){
            if(this.state.page !== 999){
                this.setState({ page: this.state.page+1 });
                this.setState({ updateList: true })
                this.getGameList();
            }
        }else if(event === "first"){
            this.setState({ page: 1 });
            this.setState({ updateList: true })
            this.getGameList();

        }else if(event === "last"){
            this.setState({ page: 999 });
            this.setState({ updateList: true })
            this.getGameList();
        }else if(select){
            let value = event.target.value;
            let pageNb = ((value === '') || (value === '0')) ? 1:value;
            this.setState({ page: pageNb });
            this.setState({ updateList: true })
            this.getGameList();
        }
    }
    renderGrid=()=>{
        return this.state.games.map((game)=>{
            const {appid,thumbnail} = game;
            if(this.state.displayGrid){
                return (
                    <Grid key={appid} item xs={3}>
                        <Paper><Link to={'/fiche/?appid='+ appid}><img src={thumbnail} alt="thumbnail" className="thumbnail"></img></Link></Paper>
                    </Grid>
                )
            }
        })
    }
    activateGrid=()=>{
        this.setState({displayGrid:true});
        this.renderList();
        this.renderGrid();
    }
    activateList=()=>{
        this.setState({displayGrid:false});
        this.renderGrid();
        this.renderList();
    }
    renderPagination(){
        return (
            <div>
                <Button  onClick={event => (this.paginationControl("first"))}><FirstPageIcon></FirstPageIcon></Button>
                <Button  onClick={event => (this.paginationControl("prev"))}><ArrowBackIosIcon></ArrowBackIosIcon></Button>
                <TextField
                    id="pageNumber"
                    label="Page"
                    type="number"
                    InputProps={{ 
                        inputProps: { min: 1, max: 999 } 
                    }}
                    variant="outlined"
                    defaultValue={this.state.page}
                    onChange={event => (this.paginationControl(event, true))}
                ></TextField>
                <Button  onClick={event => (this.paginationControl("next"))}><ArrowForwardIosIcon></ArrowForwardIosIcon></Button>
                <Button  onClick={event => (this.paginationControl("last"))}><LastPageIcon></LastPageIcon></Button>
            </div>
        );
    }
    renderOptionsAffichage(){
        return(
            <div>
                 <button onClick={this.activateList}><ReorderIcon></ReorderIcon></button>
                <button onClick={this.activateGrid}><ViewComfyIcon></ViewComfyIcon></button>
            </div>
        );
    }
    render(){
        return (
            <div>
                { this.getGameList() }
                {this.renderOptionsAffichage()}

                <Grid container>
                    {this.renderGrid()}
                </Grid>
                {this.renderTable()}
                {this.renderPagination()}
                
            </div>
        )
    }
}