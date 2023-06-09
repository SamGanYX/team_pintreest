<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
    <link rel="stylesheet" href="{{asset('css/app.css')}}"></link>

    <script type="module" src="./js/app.js"></script>
    </head>
    <body class="font-sans antialiased">
        <div class="min-h-screen bg-gray-100">
            @include('layouts.navigation')

            <!-- Page Heading -->
            @if (isset($header))
                <header class="bg-white shadow">
                    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {{ $header }}
                    </div>
                </header>
            @endif

            <!-- Page Content -->
            <main>
                {{ $slot }}
            </main>
        </div>
    </body>

    <div class="chat-popup" id="myForm" style="display: none; position: fixed; right: 0px; bottom: 100px;">
        <form action="/action_page/" class="form-container" style="background-color:#d2f1cf;">
            <h1>Chat</h1>

            <label for="msg"><b>Message</b></label>
            <textarea placeholder="Type message.." name="msg" required style="background-color:#ebf6ea"></textarea>

            <button type="submit" class="btn" style="background-color:#64b964;">Send</button>
            <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
        </form>
    </div>

    <?php
    $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    ?>
    @if(strpos($url,'action_page') == false)
    <button type="button" class="btn" id="open-btn" onclick="openForm()" style="color:#fff;position: fixed; right: 30px; bottom: 100px; width: 100px; height: 50px; border-radius:25px; background-color: #729865">
        Open
    </button>


    <script>
        function openForm() {
            document.getElementById("myForm").style.display = "block";
            document.getElementById("open-btn").style.display = "none";
        }

        function closeForm() {
            document.getElementById("myForm").style.display = "none";
            document.getElementById("open-btn").style.display = "block";
        }
        // call_open_ai();
    </script>
    @endif
</html>
