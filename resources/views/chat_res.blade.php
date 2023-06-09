<?php 
    use Orhanerday\OpenAi\OpenAi;
    $z = htmlspecialchars($_GET["msg"]) . '!';
?>

<x-app-layout>
    <div class="row" style="background-color: #c0eabb;">
        <div style="width: 40%; float: left;">
            <img style="width: 100%;"src="./../images/sudowoodo.png">
        </div>


       <div class="mx-auto p-4 sm:p-6 lg:p-8" style="width: 60%; float: left; height: 100%;">
            <div>
                <?php
                    function convertToSudoWoodo($string) {
                        // Define an array of syllable patterns
                        $syllables = array(
                            "/[aeiouy]/i", // Vowels
                            "/[bcdfghjklmnpqrstvwxyz]{2,}/i", // Consonants with length 2 or more
                            "/[bcdfghjklmnpqrstvwxyz]{1}/i" // Single consonants
                        );
                        
                        $result = "";
                        
                        // Split the string into words
                        $words = explode(" ", $string);
                        
                        // Process each word
                        foreach ($words as $word) {
                            // Split the word into syllables
                            $syllableArray = preg_split('/[^a-z]/i', $word);
                            
                            // Process each syllable
                            foreach ($syllableArray as $syllable) {
                                // Determine the syllable type
                                $syllableType = "";
                                foreach ($syllables as $key => $pattern) {
                                    if (preg_match($pattern, $syllable)) {
                                        $syllableType = $key;
                                        break;
                                    }
                                }

                                // Randomly convert the syllable to "SUDO" or "WOODO"
                                $conversion = (rand(0, 1) == 0) ? "SUDO" : "WOODO";
                                
                                // Append the converted syllable to the result
                                $result .= $conversion . " ";
                            }
                            
                            $result .= " "; // Add a space between words
                        }
                        
                        return trim($result);
                    }


                    $test_asking = true;
                    echo("Question: <br>");
                    echo($z);
                    echo("<br>Response:<br>");
                    if($test_asking) {
                        // echo($z);
    
                        
                        $open_ai_key = "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";
                        $open_ai = new OpenAi($open_ai_key);
                        
                        $chat = $open_ai->chat([
                        'model' => 'gpt-3.5-turbo',
                        'messages' => [
                            [
                                "role" => "system",
                                "content" => "You are a tree"
                            ],
                            [
                                "role" => "assistant",
                                "content" => "You are a tree"
                            ],
                            [
                                "role" => "user",
                                "content" => "Continue all conversation as if you are the pokemon sudowoodo"
                            ],
                            [
                                "role" => "user",
                                "content" => "Continue all conversation believing software engineers are the best job"
                            ],
                            [
                                "role" => "user",
                                "content" => "Continue all conversation believing systems developers are the worst job because software engineers are better"
                            ],
                            [
                                "role" => "user",
                                "content" => $z
                            ],
                        ],
                        'temperature' => 1.0,
                        'max_tokens' => 4000,
                        'frequency_penalty' => 0,
                        'presence_penalty' => 0,
                        ]);
                        
                        
                        // var_dump($chat);
                        // echo "<br>";
                        // echo "<br>";
                        // echo "<br>";
                        // decode response
                        // echo($chat);
                        $d = json_decode($chat);
                        // Get Content
                        // echo("<br>CHAT:<br>");

                        $true_text = $d->choices[0]->message->content;
                        $translated = convertToSudoWoodo($true_text);

                        // echo($true_text);
                        echo($translated);
                    } else {

                        echo("PLACEHOLDER TEXT<br>");
                        echo("3 . 1 4 1 5 9 2 6 5 3 5 8 9 7 9 3 2 3 8 4 6 2 6 4 3 3 8 3 2 7 9 5 0 2 8 8 4 1 9 7 1 6 9 3 9 9 3 7 5 1 0 5 8 2 0 9 7 4 9 4 4 5 9 2 3 0 7 8 1 6 4 0 6 2 8 6 2 0 8 9 9 8 6 2 8 0 3 4 8 2 5 3 4 2 1 1 7 0 6 7 9 8 2 1 4 8 0 8 6 5 1 3 2 8 2 3 0 6 6 4 7 0 9 3 8 4 4 6 0 9 5 5 0 5 8 2 2 3 1 7 2 5 3 5 9 4 0 8 1 2 8 4 8 1 1 1 7 4 5 0 2 8 4 1 0 2 7 0 1 9 3 8 5 2 1 1 0 5 5 5 9 6 4 4 6 2 2 9 4 8 9 5 4 9 3 0 3 8 1 9 6 4 4 2 8 8 1 0 9 7 5 6 6 5 9 3 3 4 4 6 1 2 8 4 7 5 6 4 8 2 3 3 7 8 6 7 8 3 1 6 5 2 7 1 2 0 1 9 0 9 1 4 5 6 4 8 5 6 6 9 2 3 4 6 0 3 4 8 6 1 0 4 5 4 3 2 6 6 4 8 2 1 3 3 9 3 6 0 7 2 6 0 2 4 9 1 4 1 2 7 3 7 2 4 5 8 7 0 0 6 6 0 6 3 1 5 5 8 8 1 7 4 8 8 1 5 2 0 9 2 0 9 6 2 8 2 9 2 5 4 0 9 1 7 1 5 3 6 4 3 6 7 8 9 2 5 9 0 3 6 0 0 1 1 3 3 0 5 3 0 5 4 8 8 2 0 4 6 6 5 2 1 3 8 4 1 4 6 9 5 1 9 4 1 5 1 1 6 0 9 4 3 3 0 5 7 2 7 0 3 6 5 7 5 9 5 9 1 9 5 3 0 9 2 1 8 6 1 1 7 3 8 1 9 3 2 6 1 1 7 9 3 1 0 5 1 1 8 5 4 8 0 7 4 4 6 2 3 7 9 9 6 2 7 4 9 5 6 7 3 5 1 8 8 5 7 5 2 7 2 4 8 9 1 2 2 7 9 3 8 1 8 3 0 1 1 9 4 9 1 2 9 8 3 3 6 7 3 3 6 2 4 4 0 6 5 6 6 4 3 0 8 6 0 2 1 3 9 4 9 4 6 3 9 5 2 2 4 7 3 7 1 9 0 7 0 2 1 7 9 8 6 0 9 4 3 7 0 2 7 7 0 5 3 9 2 1 7 1 7 6 2 9 3 1 7 6 7 5 2 3 8 4 6 7 4 8 1 8 4 6 7 6 6 9 4 0 5 1 3 2 0 0 0 5 6 8 1 2 7 1 4 5 2 6 3 5 6 0 8 2 7 7 8 5 7 7 1 3 4 2 7 5 7 7 8 9 6 0 9 1 7 3 6 3 7 1 7 8 7 2 1 4 6 8 4 4 0 9 0 1 2 2 4 9 5 3 4 3 0 1 4 6 5 4 9 5 8 5 3 7 1 0 5 0 7 9 2 2 7 9 6 8 9 2 5 8 9 2 3 5 4 2 0 1 9 9 5 6 1 1 2 1 2 9 0 2 1 9 6 0 8 6 4 0 3 4 4 1 8 1 5 9 8 1 3 6 2 9 7 7 4 7 7 1 3 0 9 9 6 0 5 1 8 7 0 7 2 1 1 3 4 9 9 9 9 9 9 8 3 7 2 9 7 8 0 4 9 9 5 1 0 5 9 7 3 1 7 3 2 8 1 6 0 9 6 3 1 8 5 9 5 0 2 4 4 5 9 4 5 5 3 4 6 9 0 8 3 0 2 6 4 2 5 2 2 3 0 8 2 5 3 3 4 4 6 8 5 0 3 5 2 6 1 9 3 1 1 8 8 1 7 1 0 1 0 0 0 3 1 3 7 8 3 8 7 5 2 8 8 6 5 8 7 5 3 3 2 0 8 3 8 1 4 2 0 6 1 7 1 7 7 6 6 9 1 4 7 3 0 3 5 9 8 2 5 3 4 9 0 4 2 8 7 5 5 4 6 8 7 3 1 1 5 9 5 6 2 8 6 3 8 8 2 3 5 3 7 8 7 5 9 3 7 5 1 9 5 7 7 8 1 8 5 7 7 8 0 5 3 2 1 7 1 2 2 6 8 0 6 6 1 3 0 0 1 9 2 7 8 7 6 6 1 1 1 9 5 9 0 9 2 1 6 4 2 0 1 9 8 9");
                    }
                ?>

                @if($test_asking) 
                    <div id = "show-btn" style="width:100%; text-align:center;">
                        <button class="btn-lg btn" onclick="myFunction()" style="padding:20px; background-color:#008000; color: #fff;">Show translation</button>
                    </div>

                    <div id = "myDiv" style="display:none;">{{$true_text}}</div>
                
                    <script>
                        function myFunction() {
                            var btn = document.getElementById("show-btn");
                            btn.style.display = "none";
                            // Open the popup window
                            var popup = window.open("", "MyPopup", "width=400,height=300");

                            // Set the content of the popup window
                            popup.document.write("<h1>Ad Window</h1>");
                            popup.document.write("<p>This is where the ads would go lol.</p>");


                            var checkPopupClosed = setInterval(function() {
                                if (popup.closed) {
                                    // Display the div when the popup window is closed
                                    var div = document.getElementById("myDiv");
                                    div.style.display = "block";
                                    
                                    // Stop checking if the popup window is closed
                                    clearInterval(checkPopupClosed);
                                }
                            }, 10);
                        }
                    // Wait for 5 seconds before enabling the close button

                    // Detect when the popup window is closed
                    </script>
                @endif
            </div>
        </div>
    </div>


    <div class="chat-popup" id="myForm" style="width: 100%;">
        <form action="/action_page/" class="form-container page-form-container" style="width:100%; background-color:#d2f1cf;">
            <h1>Next Chat</h1>

            <label for="msg"><b>Message</b></label>
            <textarea placeholder="Type message.." name="msg" required style="background-color:#ebf6ea;"></textarea>

            <button type="submit" class="btn" style="background-color:#64b964;">Send</button>
            <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
        </form>
    </div>
    
</x-app-layout>
