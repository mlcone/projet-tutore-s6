<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Elasticsearch\ClientBuilder;
use function Symfony\Component\String\u;

/**
 * @Route("", name="main_")
 */
final class MainController extends AbstractController
{
    /**
     * @Route("/", name="homepage", methods={"GET"})
     */
    public function index(): Response
    {
        return $this->render('main/homepage.html.twig');
    }

    /**
     * @Route("/games/{page}", defaults={"page"=1},name="allGames", methods={"GET"})
     */
    public function allGames(int $page): Response
    {
        $from = 1;
        $multip = 9;

        if($page != 1)
            $from =  $page+($multip*($page-1));

        $client = ClientBuilder::create()->build();

        $params = [
            'index' => 'steam_games',
            'body'  => [
                'from' => $from,
                'size' => 10,
            ]
        ];

        $response = $client->search($params);

        $nbResponse = count($response['hits']['hits']);

        $tabResponse = [];

        for ($i = 0; $i < $nbResponse; $i++) {
            $tabResponse[$i] = $response['hits']['hits'][$i]['_source'];
            
            $localParams = [
                'index' => 'steam_media_data',
                'body' => [
                    'size' => '1',
                    'query' => [
                        'match' => [
                            'steam_appid' => $tabResponse[$i]['appid']
                        ] 
                    ]
                ]
            ];

            $localResponse = $client->search($localParams);
            
            $values[] = array
            (
                'appid' => $tabResponse[$i]['appid'],
                'name' => $tabResponse[$i]['name'],
                'release_date' => $tabResponse[$i]['release_date'],
                'score' => $tabResponse[$i]['positive_ratings'] - $tabResponse[$i]['negative_ratings'],
                'thumbnail' => $localResponse['hits']['hits'][0]['_source']['header_image']
            );
        }

        return new Response(
            json_encode($values)
        );
    }

    /**
     * @Route("/game/{name}", name="searchGame", methods={"POST"})
     */
    public function searchGame(string $name): Response
    {
        $client = ClientBuilder::create()->build();

        $params = [
            'index' => 'steam_games',
            'body'  => [
                'query' => [
                    'match' => [
                        'name' => $name
                    ]
                ]
            ]
        ];

        $response = $client->search($params);

        $nbResponse = count($response['hits']['hits']);

        $tabResponse = [];

        for ($i = 0; $i < $nbResponse; $i++) {
            $tabResponse[$i] = $response['hits']['hits'][$i]['_source'];

            $values[] = array
            (
                'appid'=> $tabResponse[$i]['appid'],
                'name'=> $tabResponse[$i]['name'],
            );
        }

        return new Response(
            json_encode($values)
        );
    }

    /**
     * @Route("/game/fiche/{id}", name="gameFiche", methods={"POST"})
     */
    public function gameFiche(int $id): Response
    {
        $client = ClientBuilder::create()->build();

        $params = [
            'index' => 'steam_games',
            'body'  => [
                'size' => '1',
                'query' => [
                    'match' => [
                        'appid' => $id
                    ]
                ]
            ]
        ];

        $response = $client->search($params);

        $tabResponse = $response['hits']['hits'][0]['_source'];

        $values[] = array
        (
            'appid'=> $tabResponse['appid'],
            'name'=> $tabResponse['name'],
            'release_date'=> $tabResponse['release_date'],
            'publisher'=> $tabResponse['publisher'],
            'platforms'=> $tabResponse['platforms'],
            'required_age'=> $tabResponse['required_age'],
            'categories'=> $tabResponse['categories'],
            'genres'=> $tabResponse['genres'],
            'steamspy_tags'=> $tabResponse['steamspy_tags'],
        );
        
        $params = [
            'index' => 'steam_media_data',
            'body'  => [
                'size' => '1',
                'query' => [
                    'match' => [
                        'steam_appid' => $id
                    ]
                ]
            ]
        ];

        $response = $client->search($params);
        $tabResponse = $response['hits']['hits'][0]['_source'];

        $values[0]['header_image'] = $tabResponse['header_image'];

        return new Response(
            json_encode($values)
        );
    }
}
