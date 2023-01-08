/*
Ao carregar a página:
1. Define exibição de elementos apenas na frontpage com base na URL.
2. Identifica se houve clique no botão de pagamento na última compra e esvazia sacola.
*/
Ecwid.OnPageLoaded.add(function (page) {
    console.log("Página atual: " + page.type);
	if (window.location.href.indexOf("index.html") != -1) {
		console.log("URL tem 'index.html': exibe blocos da frontpage");
        document.getElementById("frontpage").style.display="block";
        document.getElementById("banner-front2").style.display="block";
    }
	if (window.location.href.indexOf("#") != -1) {
		console.log("URL tem '#': esconde blocos da frontpage");
        document.getElementById("frontpage").style.display="none";
		document.getElementById("banner-front2").style.display="none";
		document.getElementById("whatswidget-pre-wrapper").style.display="none";
    }
	if (window.location.href.indexOf("#!/c/") != -1) {
		console.log("URL tem '#!/c/': exibe blocos da frontpage");
        document.getElementById("frontpage").style.display="block";
		document.getElementById("banner-front2").style.display="block";
		document.getElementById("whatswidget-pre-wrapper").style.display="block";
    }
	if (localStorage.getItem("ClickedToPay") == 'y') {
		Ecwid.Cart.clear();
		console.log("Sacola da última compra esvaziada");
		localStorage.setItem("ClickedToPay", "n");
	}
	if (page.type == 'CHECKOUT_PAYMENT_DETAILS') {
        SaveOrderId();
		RegistryClickToPay();
    }
});

/* Salva o número do pedido após a compra e exibe no console */
function SaveOrderId() {
	Ecwid.Cart.get(function(cart){
		localStorage.setItem("LastSavedOrderId", cart.orderId);
		console.log("LastSavedOrderId é: " + localStorage.getItem("LastSavedOrderId"));
	});
};

/* Identifica o botão de pagamento, registra o clique do usuário e exibe no console */
function RegistryClickToPay() {
	var ButtonToPay = document.querySelector("button.form-control__button");
	var SpanWithText = document.querySelector("span.form-control__button-text");
	var spans = document.getElementsByTagName('span');
	
	for (var i = 0, len = spans.length; i < len; ++i) {
	
	if (spans[i].innerHTML.indexOf("Ir para Pagamento") !== -1) {
		console.log("SpanWithText encontrado");
		
		ButtonToPay.addEventListener("click", function(event) {
			console.log("ButtonToPay clicado");
			localStorage.setItem("ClickedToPay", "y");
			console.log("ClickedToPay definido para: " + localStorage.getItem("ClickedToPay"));
		});
	}
	}
};

