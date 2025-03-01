<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear URL</title>
    <style>
        /* Estilos inline de Tailwind para mayor compatibilidad */
        body { font-family:'Arial' }
        .bg-gray-100 { background-color: #f7fafc; }
        .bg-white { background-color: #ffffff; }
        .bg-blue-600 { background-color: #3182ce; }
        .bg-blue-700 { background-color: #2b6cb0; }
        .text-gray-800 { color: #2d3748; }
        .text-gray-600 { color: #718096; }
        .text-white { color: #ffffff; }
        .text-blue-600 { color: #3182ce; }
        .font-bold { font-weight: bold; }
        .font-semibold { font-weight: 600; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
        .text-base { font-size: 1rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-full { border-radius: 9999px; }
        .shadow-lg { box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }
        .p-6 { padding: 1.5rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .text-center { text-align: center; }
        .leading-normal { line-height: 1.5; }
        .w-full { width: 100%; }
        .block { display: block; }
        .no-underline { text-decoration: none; }
        .hover\:bg-blue-700:hover { background-color: #2b6cb0; }
        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .max-w-xl { max-width: 36rem; margin: 0 auto; }
        .border-t { border-top: 1px solid #e2e8f0; }
        .border-gray-200 { border-color: #edf2f7; }
        .w-auto { width: auto; max-width: 100%; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .p-button { padding: 0.75rem 2rem; }
        .text-lg { font-size: 1.125rem; }
    </style>
</head>
<body class="bg-gray-100">
    <table role="presentation" class="w-full max-w-xl bg-white rounded-lg shadow-lg mt-6 mx-auto">
        <!-- Encabezado del correo -->
        <tr>
            <td class="bg-blue-600 text-white p-6 rounded-t-lg text-center">
                <h1 class="text-xl font-bold leading-normal">¡Hola {{$user->name}}, tenemos una nueva URL para ti!</h1>
            </td>
        </tr>

        <!-- Contenido del correo -->
        <tr>
            <td class="p-6 text-gray-800">
                <p class="text-lg mb-4">
                    Hemos generado una nueva URL exclusiva para ti. Haz clic en el botón de abajo para acceder a tu enlace.
                </p>
                
                <!-- Botón con enlace -->
                <a href="{{$url}}"
                   class="block bg-blue-600 text-white font-semibold rounded-full shadow-lg p-button no-underline hover:bg-blue-700 text-lg w-auto mx-auto text-center"
                   style="max-width: 300px;">
                   Acceder a la URL
                </a>

                <!-- Texto alternativo -->
                <p class="text-gray-600 mt-6 text-base text-center">
                    Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:
                </p>
                <p class="text-blue-600 text-center">
                    <a href="{{$url}}" class="no-underline text-blue-600">{{$url}}</a>
                </p>
            </td>
        </tr>

        <!-- Separador -->
        <tr>
            <td class="border-t border-gray-200 p-6">
                <p class="text-gray-600 text-sm text-center">
                    Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.
                </p>
            </td>
        </tr>

        <!-- Pie de página -->
        <tr>
            <td class="bg-gray-100 text-gray-600 text-center p-6 rounded-b-lg">
                <p class="text-sm">
                    &copy; {{ date('Y') }} {{ env('APP_NAME') }}. Todos los derechos reservados.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
