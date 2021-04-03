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

        $client = ClientBuilder::create()->build();

        $params = [
            'index' => 'steam',
            'body'  => [
                'query' => [
                    'match' => [
                        'message' => 'Half-Life'
                    ]
                ]
            ]
        ];

        $response = $client->search($params);
        //print_r($response);
        //dd($response['hits']['hits'][0]['_source']['message']);
        $tabResponse = explode(',', $response['hits']['hits'][0]['_source']['message']);
        dd($response);
        return $this->render('main/homepage.html.twig');
    }
}
