import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { path } from './config/config.json';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ReorderIcon from '@material-ui/icons/Reorder';


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

    renderTableData(){
        return this.state.games.map((game) => {
            const {appid, name, release_date, score} = game;
            return (
                <TableRow key={appid}>
                    <TableCell>
                        <Link to={'/fiche/id/'+ appid}><li>{name}</li></Link>
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

    paginationControl(event){
        if(event === "prev"){
            if(this.state.page !== 1){
                this.setState({ page: this.state.page-1 });
                this.setState({ updateList: true })
                this.getGameList();
            }
        }else{
            if(this.state.page !== 270){
                this.setState({ page: this.state.page+1 });
                
                this.getGameList();
            }
        }
    }
    renderGrid=()=>{
        return this.state.games.map((game)=>{
            const {appid,thumbnail} = game;
            if(this.state.displayGrid){
                return (
                        
                            <Grid key={appid} item xs={3}>
                                <Paper><img src={thumbnail} alt=""/></Paper>
                            </Grid>
                )
            }
        })
    }
    activateGrid=()=>{
        this.setState({displayGrid:true});
        this.renderGrid();
    }
    renderPagination(){
        return (
            <div>
                <Button onClick={event => this.paginationControl("prev")}>&#8592;</Button>
                <Button onClick={event => this.paginationControl("next")}>&#8594;</Button>
            </div>
        );
    }
    renderOptionsAffichage(){
        return(
            <div>
                <ReorderIcon></ReorderIcon>
                <button onClick={this.activateGrid}><ViewComfyIcon></ViewComfyIcon></button>
            </div>
        );
    }
    render(){
        return (
            <div>
                { this.getGameList() }
                {this.renderOptionsAffichage()}
                {this.renderGrid()}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Release Date</TableCell>
                            <TableCell>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderTableData()}
                    </TableBody>
                </Table>
                {this.renderPagination()}
                
            </div>
        )
    }
}