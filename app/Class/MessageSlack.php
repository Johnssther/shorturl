<?php

namespace App\Class;

use Illuminate\Support\Facades\Http;

class MessageSlack
{
    public function sendMessageSlack($message)
    {
        // URL del webhook de Slack
        $webhookUrl = 'https://hooks.slack.com/services/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';

        // Datos que se enviarán en el cuerpo de la solicitud (JSON)
        $data = [
            'text' => $message
        ];

        // Enviar la solicitud POST a Slack
        $response = Http::post($webhookUrl, $data);

        // Comprobar si la solicitud fue exitosa
        if ($response->successful()) {
            return 'Mensaje enviado correctamente';
        } else {
            return 'Error al enviar el mensaje: ' . $response->body();
        }
    }
}