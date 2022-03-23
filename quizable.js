var menuOpen = false;
var cardFlipStatus = false;
var currentCard = 0;
var cardListLength = 1;
var itemCount = 0;
var cardListFront = [];
var cardListBack = [];
var existingFrontList = JSON.parse(localStorage.getItem('frontList')) || [];
var existingBackList = JSON.parse(localStorage.getItem('backList')) || [];

// Pull both lists from localStorage:
existingFrontList.forEach(item => {
	cardListFront.push(item);
	itemCount++;
});

existingBackList.forEach(item => {
	cardListBack.push(item);
	itemCount++;
});

// Find the cardListLength:
cardListLength = itemCount / 2;

function controlVis()
{
	if(currentCard + 1 == cardListLength) { document.getElementById("right-control").style.visibility = "hidden"; }
	else { document.getElementById("right-control").style.visibility = ""; }
	
	if(currentCard - 1 == -1) { document.getElementById("left-control").style.visibility = "hidden"; }
	else { document.getElementById("left-control").style.visibility = ""; }
}

function relist()
{
	// Refresh the controls:
	controlVis();

	// Reset our card list in the menu and the itemCount:
	document.getElementById("cards").innerHTML = "";
	itemCount = 0;

	// For each card, add its data to the list:
	for(inc = 0; inc < cardListFront.length; inc++)
	{
		document.getElementById("cards").innerHTML += '<li id="' + itemCount.toString() + '" onclick="removeItem(' + itemCount.toString() + ')">' + cardListFront[inc] + ", " + cardListBack[inc] + "</li>";
		itemCount++;
	}

	// Reset both input fields:
	document.getElementById("front").value = "";
	document.getElementById("back").value = "";

	// Turn both lists into JSON data then push to the localStorage:
	localStorage.setItem("frontList", JSON.stringify(cardListFront));
	localStorage.setItem("backList", JSON.stringify(cardListBack));

	// Refresh the controls:
	controlVis();
}

// Relist our cards in the menu:
relist();

function addCard()
{
	// If both inputs are filled, then:
	if(document.getElementById("front").value != "" && document.getElementById("back").value != "")
	{
		// Create the card:
		cardListFront.push(document.getElementById("front").value);
		cardListBack.push(document.getElementById("back").value);
		cardListLength++;

		// Relist our cards in the menu:
		relist();
	}
}

function removeItem(coord)
{
	// If there's more than a single card, then:
	if(cardListLength != 1)
	{
		// Remove the card at the specified coordinate from the list:
		cardListBack.splice(coord, 1);
		cardListFront.splice(coord, 1);

		// Then relist() our cards in the menu:
		relist();

		// Update the numbers and put the card position at 0:
		cardListLength--;
		currentCard = 0;

		// Refresh the current card:
		flipCard();
		flipCard();
	}
}

function flipCard()
{
	cardFlipStatus = !cardFlipStatus;

	if(cardFlipStatus == true) { document.getElementById("card-info").innerHTML = cardListBack[currentCard]; document.getElementById("cardDiv").style = "border-bottom: 4px solid #1F3579;"; }
	else { document.getElementById("card-info").innerHTML = cardListFront[currentCard]; document.getElementById("cardDiv").style = "border-bottom: 4px solid #868686;"; }

	// Refresh the controls:
	controlVis();
}

function changeCard(direction)
{
	if(direction == 'right' && currentCard + 1 != cardListLength)
	{
		currentCard++;
		document.getElementById("card-info").innerHTML = cardListFront[currentCard];
	}
	else if(direction == 'left' && currentCard - 1 != -1)
	{
		currentCard--;
		document.getElementById("card-info").innerHTML = cardListFront[currentCard];
	}

	// Refresh the controls:
	controlVis();
}

// Moving the menu in and out:
function moveMenu()
{
	menuOpen = !menuOpen;

	if(menuOpen == true)
	{
		document.getElementById("sidebar").style.width = "100%";
		document.getElementById("content").style.marginLeft = "100%";
		document.getElementById("menu-access").innerHTML = "<";
		document.getElementById("content").style.visibility = "hidden";
	}
	else
	{
		document.getElementById("sidebar").style.width = "0";
		document.getElementById("content").style.marginLeft = "0";
		document.getElementById("menu-access").innerHTML = ">";
		document.getElementById("content").style.visibility = "";
	}

	// Refresh the controls:
	controlVis();
}

// Listen for any keypresses:
document.addEventListener("keydown", function(event)
{
	// Flipping the current card:
	if(event.keyCode == 32) {
		flipCard();
	}

	// Moving right:
	if(event.keyCode == 39) {
		changeCard("right");
	}

	// Moving left:
	if(event.keyCode == 37) {
		changeCard("left");
	}

	// Opening the menu:
	if(event.keyCode == 27) {
		moveMenu();
	}
});

// Refresh the current card:
flipCard();
flipCard();
