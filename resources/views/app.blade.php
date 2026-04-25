<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Divine Management Group — High-performance management and luxury consulting in Dubai and the MENA region.">
        <meta name="keywords" content="luxury management, dubai consulting, divine management group, business strategy, mena region">
        <meta name="author" content="Divine Management Group">
        <meta name="robots" content="index, follow">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="{{ config('app.name', 'Divine Management Group') }}">
        <meta property="og:description" content="Where Luxury Finds Its Voice. High-performance management and luxury consulting.">
        <meta property="og:image" content="{{ asset('logo.png') }}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ url()->current() }}">
        <meta property="twitter:title" content="{{ config('app.name', 'Divine Management Group') }}">
        <meta property="twitter:description" content="Where Luxury Finds Its Voice. High-performance management and luxury consulting.">
        <meta property="twitter:image" content="{{ asset('logo.png') }}">

        <link rel="canonical" href="{{ url()->current() }}">

        <title inertia>{{ config('app.name', 'Divine Management Group') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
