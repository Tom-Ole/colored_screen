const { createServer } = require("node:http");
const url = require("url");

function setHTML(color) {
return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Colored Screen</title>

    <script>
async function init() {
    
    const queryString = window.location.search
    console.log(queryString)
    
    const popupContainer = document.getElementById("popupContainer")
    popupContainer.onclick = () => {
			let popup = document.getElementById("popup");
			popup.classList.toggle("show");
			}
			popupContainer.click()

}

window.onload = init
    </script>

</head>
<body id="body">
    <div class="popup" id="popupContainer">
        <div class="popuptext" id="popup">
            colored.screen/[color] <br>
            (e.g. colored.screen/red or colored.screen/rgb(255,0,0))
        </div>
      </div>
      <style>

* {
margin: 0;
padding: 0;
}

body {
    width: 100vw;
    height: 100vh;
    background-Color: ${color};
	overflow: hidden;
}

.popup {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  
  /* The actual popup (appears on top) */
  .popup .popuptext {
    visibility: hidden;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 50%;
    left: 25%;
    right: 25%;
  }

  /* Toggle this class when clicking on the popup container (hide and show the popup) */
.popup .show {
    -webkit-animation: fade 4s ease-out;
    animation: fade 4s ease-out;
}


/* Add animation (fade in the popup) */
@-webkit-keyframes fade {
    0% {
        visibility: visible;
        opacity: 0;
    }
    50% {opacity: 1;}
    100% {
        opacity: 0;
        visibility: hidden;
    }
  }
  
  @keyframes fade {
    0% {
        visibility: visible;
        opacity: 0;
    }
    50% {opacity: 1;}
    100% {
        opacity: 0;
        visibility: hidden;
    }
  }

      </style>
</body>
</html>
`;
}



const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
	
	const reqUrl = url.parse(req.url).pathname
	const color = reqUrl.slice(1)
	const html = setHTML(color) 

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(html);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
