
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Quote Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 30px auto;
            padding: 20px;
            text-align: center;
        }

        #quoteDisplay {
            margin: 20px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            min-height: 100px;
        }

        button {
            padding: 10px 20px;
            margin: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }

        input {
            padding: 10px;
            margin: 10px;
            width: 200px;
        }

        .quote-form {
            margin-top: 30px;
            padding: 20px;
            border-top: 1px solid #ccc;
        }

        .quote-category {
            color: #666;
            font-style: italic;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <h1>Dynamic Quote Generator</h1>
    <div id="quoteDisplay"></div>
    <button id="newQuote">Show New Quote</button>
    
    <div class="quote-form">
        <h2>Add New Quote</h2>
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
