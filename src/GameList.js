import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { path } from './config/config.json';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export default class GameList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            games: [],
            updateList: true
        };
    }
    
    getGameList(){
        if(this.state.updateList == true){
            axios.get(`http://` + path + `/games`)
            .then(res => {
                const games = res.data;
                this.setState({ games });
                this.setState({ updateList: false })
            })
            ;
        console.log(this.state.games);
        } 
        
        
        
    }

    renderTableData(){
        return this.state.games.map((game) => {
            const {appid, name, release_date, score} = game;
            return (
                <TableRow>
                    <TableCell>
                        <Link key={appid} to={'/fiche/?appid='+ appid}><li>{name}</li></Link>
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

    render(){
        
        return (
            <div>
                { this.getGameList() }
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
            </div>
        )
    }
}