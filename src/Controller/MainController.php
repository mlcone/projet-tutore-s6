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
     * @Route("/games", name="allGames", methods={"GET"})
     */
    public function allGames(): Response
    {
        /*
        $client = ClientBuilder::create()->build();

        $params = [
            'index' => 'steam',
            'body'  => [
                'from' => '1',
                'size' => '20'
            ]
        ];

        $response = $client->search($params);

        return new Response(
            json_encode($values)
        );
        */
    }

    /**
     * @Route("/game/{name}", name="searchGame", methods={"POST"})
     */
    public function searchGame(string $name): Response
    {
        $client = ClientBuilder::create()->build();

        $params = [
            'index' => 'steam',
            'body'  => [
                'query' => [
                    'match' => [
                        'message' => $name
                    ]
                ]
            ]
        ];

        $response = $client->search($params);

        $nbResponse = count($response['hits']['hits']);

        $tabResponse = [];

        for ($i = 0; $i < $nbResponse; $i++) {
            $tabResponse[$i] = explode(',', $response['hits']['hits'][$i]['_source']['message']);

            $values[] = array
            (
                'appid'=> $tabResponse[$i][0],
                'name'=> $tabResponse[$i][1],
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
            'index' => 'steam',
            'body'  => [
                'size' => '1',
                'query' => [
                    'match' => [
                        'message' => $id
                    ]
                ]
            ]
        ];

        $response = $client->search($params);

        $nbResponse = count($response['hits']['hits']);

        $tabResponse = [];

        for ($i = 0; $i < $nbResponse; $i++) {
            $tabResponse[$i] = explode(',', $response['hits']['hits'][$i]['_source']['message']);

            $values[] = array
            (
                'appid'=> $tabResponse[$i][0],
                'name'=> $tabResponse[$i][1],
                'release_date'=> $tabResponse[$i][2],
                'english'=> $tabResponse[$i][3],
                'developer'=> $tabResponse[$i][4],
                'publisher'=> $tabResponse[$i][5],
                'platforms'=> $tabResponse[$i][6],
                'required_age'=> $tabResponse[$i][7],
                'categories'=> $tabResponse[$i][8],
                'genres'=> $tabResponse[$i][9],
                'steamspy_tags'=> $tabResponse[$i][10],
                'achievements'=> $tabResponse[$i][11],
                'positive_rattings'=> $tabResponse[$i][12],
                'negative_rattings'=> $tabResponse[$i][13],
                'average_playtime'=> $tabResponse[$i][14],
                'median_playtime'=> $tabResponse[$i][15],
                'owners'=> $tabResponse[$i][16],
                'price'=> $tabResponse[$i][17],
            );
        }

        return new Response(
            json_encode($values)
        );
    }
}
