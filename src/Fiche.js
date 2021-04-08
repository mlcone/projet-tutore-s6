import React, { Component } from 'react';
import axios from "axios";
import { path } from './config/config.json';
import { Button, Grid, Typography } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';

import "./Fiche.css";

class Fiche extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            gameName: "",
            updateList: true,
            games: [],
            screenshots: []
        };
    }

    extractParamsUrl(chaineGET)
    {
        var param = chaineGET.split('=');
        return param[1];
    }

    sendRequest() {
        if(this.state.updateList === true){
        axios.post(`http://` + path + `/game/fiche/` + this.extractParamsUrl(this.props.location.search))
            .then(res => {
                const games = res.data;
                this.setState({ games });
                this.setState({ updateList: false });
                this.setState({ screenshots: []});

                let screenshots = this.state.games.map((data) => (data.screenshots));

                if (typeof screenshots[0] !== 'undefined'){
                    this.setState({ screenshots: JSON.parse(screenshots[0].replace(/'/g, '"'))});
                }

                console.log(this.state.screenshots);
            })
            
            
        
        }
    }

    render() {
        return (
            <div>
                <Button href="/">Retour</Button>

                { this.sendRequest()}
                <Grid container spacing={3}>
                    <Grid item container xs={12}>
                        <Grid item xs>
                            <img src={this.state.games.map(game => (game.header_image))} alt="thumbnail"></img>
                        </Grid>
                        <Grid item xs>
                            <h2>{this.state.games.map(game => (game.name))}</h2>
                            <Typography variant="body2" color="textSecondary">
                                Release date : {this.state.games.map(game => (game.release_date))} <br/>
                                Plateformes : { this.state.games.map(game =>  (game.platforms))} <br/>
                                Publisher : { this.state.games.map(game =>  (game.publisher))} <br/>
                                Developer : { this.state.games.map(game =>  (game.developer))} <br/>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs>
                            <Carousel>
                                {
                                    this.state.screenshots.map((data) => <img src={data.path_full} alt={data.id} className="carouselDisplay"/>)
                                }
                            </Carousel>
                        </Grid>
                        <Grid item xs>

                        </Grid>
                    </Grid>
                </Grid>

                { this.state.games.map(game => <p key={game.appid}>Categories: {game.categories}</p>)}
                { this.state.games.map(game => <p key={game.appid}>Genres: {game.genres}</p>)}
                { this.state.games.map(game => <p key={game.appid}>Tags utilisateurs: {game.steamspy_tags}</p>)}
            </div>
        );
    }
}

export default Fiche;