	var results_max = 12;
	var pwa_enabled = true;

	var platform = 0;
	function toggleResults(whi){
		var in_use = document.getElementById("results_original");
		var not_in_use = document.getElementById("results_original_not_in_use");
		var jam = document.getElementById("btnJam");
		var san = document.getElementById("btnSan");
		jam.classList.remove("btn-info");
		jam.classList.remove("btn-dark");
		san.classList.remove("btn-info");
		san.classList.remove("btn-dark");
		//in_use.id = "results_original_not_in_use";
		//not_in_use.id = "results_original";
		if(!in_use.original){
			in_use.original = 2;
			not_in_use.original = 3;
		}
		var o = not_in_use;
		var on = in_use;
		if(in_use.original == 2){
			o = in_use;
			on = not_in_use;
		}
		if(whi == 0){
			jam.classList.add("btn-info");
			san.classList.add("btn-dark");
			o.style.display = "block";
			on.style.display = "none";
			o.id = "results_original";
			on.id = "results_original_not_in_use";
			var res = on.querySelectorAll("#results");
			for(i in res){
				res[i].id = "results_old";
			}
			var reso = o.querySelectorAll("#results_old");
			for(i in reso){
				reso[i].id = "results";
			}
			for(var x =0;x < 35;x++){
				var cres = on.querySelectorAll("#collapse" + x);
				for(i in cres){
					cres[i].id = "collapse_old" + x;
				}
				var creso = o.querySelectorAll("#collapse_old" + x);
				for(i in creso){
					creso[i].id = "collapse" + x;
				}
			}
		}
		else if(whi == 1){
			san.classList.add("btn-info");
			jam.classList.add("btn-dark");
			o.style.display = "none";
			on.style.display = "block";
			o.id = "results_original_not_in_use";
			on.id = "results_original";
			var res = o.querySelectorAll("#results");
			for(i in res){
				res[i].id = "results_old";
			}
			var reso = on.querySelectorAll("#results_old");
			for(i in reso){
				reso[i].id = "results";
			}
			for(var x =0;x < 35;x++){
				var cres = o.querySelectorAll("#collapse" + x);
				for(i in cres){
					cres[i].id = "collapse_old" + x;
				}
				var creso = on.querySelectorAll("#collapse_old" + x);
				for(i in creso){
					creso[i].id = "collapse" + x;
				}
			}
		}
		fillLink();
		platform = whi;
	}
	function typing() {
		var val = document.getElementById("input").value;
		val = val.replaceAll("\n\n", "\n");
		var lineC = countC(val, "\n");
		if(lineC < 1){
			lineC = 7;
		}
		document.getElementById("input").rows = Math.min(7, lineC) + 2;
		fillLink();
	}
	function unclean(err){
		return err.replaceAll("%E4", "ä").replaceAll("%F6", "ö").replaceAll("%E5", "å");
	}
	function fillLink(){
		var org = document.getElementById("results_original").innerHTML;
		var empty = false;
		var val = genLink();
		if(val.includes("?WyIiLDQsWyIzNjMwNyIsIjM2MzAyIl0seyIzNjMwMiI6MSwiMzYzMDciOjJ9XQ%3D%3D") || val.includes("?WyIiLDEsW10se30sMF0%3D")){
			val = window.location.href.split("?")[0];
			empty = true;
		}
		document.getElementById('kop').style.display='none';
		document.getElementById("linkki").value = val;
		try{
			if(empty){
				window.history.replaceState('Object', 'Title', "/");
			}
			else{
				window.history.replaceState('Object', 'Title', "?" + val.split("?")[1]);
			}
		}
		catch{}
	}
	function query(callback){
		queryFull(()=>{});
	}
	function rmResults(){
		document.getElementById("results_original").innerHTML = "";
		fillLink();
		updatePrice();
	}
	var queryDone = true;
	var firstQuery = true;
	function queryFull(callback) {
		try{
			sa_event("query");
		}
		catch(err){
			console.log("Analytics push failed");
		}
		queryDone = false;
		fillLink();
		document.getElementById("results_original").innerHTML = "";
		var val = document.getElementById("input").value;
		val = val.replaceAll("\n\n", "\n");
		var lineC = countC(val, "\n");
		console.log(lineC);
		if(lineC > 0){
			if(val[val.length-1] === "\n"){
				val = val.substring(0, val.length-1);
			}
		}
		console.log(val)
		document.getElementById("input").rows = Math.min(7, lineC) + 2;
		let formData = new FormData();
		var q  = '';
		if(platform == 0){
			q = 'querym';
		}
		else if(platform == 1){
			q = 'querymsan'
		}
		formData.append(q, val);
		document.getElementById("results_original").appendChild(htmlToElement('<div class="mx-auto text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>Odotetaan vastausta palvelimelta... Tässä saattaa kestää hetki jos olet ensimmäinen käyttäjä vähään aikaan.</div>'));
		(async () => {
		  const rawResponse = await fetch('https://kirjat-ml.herokuapp.com/api/v1', {
			method: 'POST',
			headers: {
			},
			body: formData
		  });
		  const content = await rawResponse.json();

		  var stuff = content;
		  console.log(stuff);
		  var first_outer = true;
		  for(thing in stuff){
			var cont = stuff[thing]["data"];
			var collapsed = "collapsed";
			var collapse = "collapse";
			var down = "▾";
			if(first_outer === true && firstQuery === true){
				collapsed = "";
				collapse = "collapse show";
				down = "▴";
			}
			document.getElementById("results_original").appendChild(htmlToElement('<button class="btn ' + collapsed + ' mx-auto border-info m-1 ' + textC + '" style="width: 99%;font-size:110%;" data-toggle="collapse" data-target="#collapse' + thing + '" onclick="this.innerHTML = this.innerHTML.replaceAll(\'▾\', \'|\').replaceAll(\'▴\', \'▾\').replaceAll(\'|\', \'▴\');">' + down + ' ' + val.split("\n")[thing] + ' ' + down + "</button>"));
			document.getElementById("results_original").appendChild(htmlToElement('<div class="' + collapse + '  " id="collapse' + thing + '">'));
			document.getElementById('collapse' + thing + '').appendChild(htmlToElement('<div class="d-flex row flex-row flex-nowrap container-fluid mx-auto" id="results" style="overflow-x: auto;">'));
			var first = true;
			for(booko in cont.slice(0, results_max+1)){
				var book = cont[booko];
				var name = book["name"];
				var id = book["id"];
				var image = book["image"];
				var link = book["link"];
				var prices = book["prices"];
				var conditions = book["conditions"];
				var price = book["price"];
				if (price != -1){
					addCardFull(name, conditions, prices, image, book, first, id, link, callback);
					first = false;
				}
			}
			if(stuff[thing]["err"] != ""){
				var results = document.querySelectorAll("#results");
				var tbody = results[results.length-1];
				tbody.appendChild(htmlToElement('<h4 class="text-center">' + unclean(stuff[thing]["err"]) + '</h4>'));
			}
			document.getElementById("results_original").appendChild(htmlToElement('<br \>'));
			first_outer = false;
		  }
		  var resultcont = document.getElementById("results_original");
		  resultcont.removeChild(resultcont.childNodes[0]); //Remove the spinner
		  updatePrice();
		})();
		fillLink();
		queryDone = true;
		firstQuery = false;
		callback();
	}
	function formatE(price){
		if (price.length < 3){
			return price+"";
		}
		var index = price.length - 2;
		return price.substring(0, index) + "," + price.substring(index);
	}
	function countz(arr, t){
		c = 0;
		for(var i=0;i<arr.length;i++){
			if (arr[i].toLowerCase()===t){
				c = c + 1;
			}
		}
		return c;
	}
	function countC(string, c){
		return (string.match(new RegExp(c, "g")) || []).length
	}
	function toggleB(btn){
		var btns = btn.parentElement;
		var btn1 = btns.querySelector("#btnNew");
		var btn2 = btns.querySelector("#btnBlue");
		var btn3 = btns.querySelector("#btnGreen");
		var all = [btn1, btn2, btn3];
		var card = btns.parentElement.parentElement;
		if(card.data.select){
			card.data.selected = all.indexOf(btn);
			for (b in all){
				var bt = all[b];
				if(!("disabled" in bt.attributes)){
					bt.classList.remove("btn-dark");
					bt.classList.remove("btn-primary");
					bt.classList.remove("btn-secondary");
					bt.classList.add("btn-dark");
				}
				//"cols" in document.getElementById("input").attributes
			}
			btn.classList.remove("btn-dark");
			btn.classList.add("btn-primary");
		}
		updatePrice();
	}
	function updatePrice(){
		var stores = ["jam", "san"];
		var storeTotals = {0: 0, 1: 0};
		var cards = document.getElementsByClassName("card");
		var total = 0;
		var min = 0;
		var max = 0;
		for(i in cards){
			var card = cards[i];
			if(card.data){
				var data = card.data;
				var price = data.prices[data.prices.length-1-Math.min(data.selected, data.prices.length-1)];
				if(!card.data.select){
					price = 0;
				}
				card.querySelector("#card-text3").innerHTML = formatE(price+"")+"€";
				//Style the card nicely
				card.classList.remove(bgC);
				card.classList.remove(bg2C);
				var stor = data.store;
				var stori= stores.indexOf(stor);
				storeTotals[stori] += price;
				console.log(storeTotals);
				total += price;
				if(card.data.select){
					var mi = 9999999;
					var ma = 0;
					for(z in data.prices){
						mi = Math.min(mi, data.prices[z]);
						ma = Math.max(ma, data.prices[z]);
					}
					min += mi;
					max += ma;
					card.classList.add(bg2C);
					card.querySelector("#card-img-top").classList.remove("jf-img-disabled");
				}
				else{
					card.classList.add(bgC);
					card.querySelector("#card-img-top").classList.add("jf-img-disabled");
				}
			}
		}
		var hintInfo = document.getElementById("finalHinta");
		var hintInfoSub = document.getElementById("finalHintaSub");
		hintInfo.innerHTML = "Yhteensä " + formatE(total+"")+"€";
		hintInfoSub.innerHTML = "(" + formatE(min+"") + "€ - " + formatE(max+"") + "€)";
		
		document.getElementById("total-" + platform).innerHTML = formatE(storeTotals[platform]+"")+"€";
		
		fillLink();
	}
	function updateBtnTotals(){
	
	}
	var b2_originals = {}
	function toggleB2(btn){
		var btns = btn.parentElement;
		var btn1 = btns.querySelector("#btnNew");
		var btn2 = btns.querySelector("#btnBlue");
		var btn3 = btns.querySelector("#btnGreen");
		var all = [btn1, btn2, btn3];
		var card = btns.parentElement.parentElement;
		card.data.select = btn.classList.contains("btn-danger");
		if(btn.classList.contains("btn-danger")){
			btn.classList.remove("btn-danger");
			btn.classList.add("btn-success");
			for (b in all){
				var bt = all[b];
				if(!("disabled" in bt.attributes)){
					//bt.classList.remove("btn-secondary");
					bt.classList.remove("btn-dark");
					bt.classList.remove("btn-primary");
					bt.classList.remove("btn-secondary");
					bt.classList = b2_originals[b + btn];
				}
				//"cols" in document.getElementById("input").attributes
			}
		}
		else{
			btn.classList.remove("btn-success");
			btn.classList.add("btn-danger");
			for (b in all){
				var bt = all[b];
				b2_originals[b + btn] = bt.classList + []; //ffs this is just stupid
				if(!("disabled" in bt.attributes)){
					bt.classList.remove("btn-dark");
					bt.classList.remove("btn-primary");
					bt.classList.remove("btn-secondary");
					bt.classList.add("btn-secondary");
				}
				//"cols" in document.getElementById("input").attributes
			}
		}
		updatePrice();
	}
	function base64encode(str) {
	  let encode = encodeURIComponent(str).replace(/%([a-f0-9]{2})/gi, (m, $1) => String.fromCharCode(parseInt($1, 16)))
	  return btoa(encode)
	}
	function setColor(card){
		console.log(card.data.image);
		var url = 'https://kirjat-ml.herokuapp.com/api/' + encodeURIComponent("v1_img|" + base64encode(card.data.image));
		console.log(url);
		fetch(url)
		.then(function(response) {
			response.text().then(function(text) {
				doneSetColor(text, card);
			});
		});
	}
	function doneSetColor(b64, card) {
		var img2 = card.querySelector("#card-img-top");
		var img = new Image();
		img.onload = setColorStage2(card, img);
		img.crossOrigin = "anonymous";  // This enables CORS
		img.src = b64 + "";
	}
	function setColorStage2(card, img){
		document.body.appendChild(img);
		var color = getAverageRGB(img);
		console.log(color);
		card.style.background = "rgb(" + color.r, + ", " + color.b + ", " + color.g + ")";
	}
	function addCard(name, conditions, prices, image, data, first, id){
		addCardFull(name, conditions, prices, image, data, first, id, ()=>{});
	}

	function openTab(url){
		try{
			var newTab = window.open();
			newTab.location.href = url;
		}
		catch{
			try{
				window.open(url);
			}
			catch{
				window.location.href = url;
			}
		}
		return false;
	}
	
	function addCardFull(name, conditions, prices, image, data, first, id, link, callback) {
		if ('content' in document.createElement('template')) {

			// Instantiate the table with the existing HTML tbody
			// and the row with the template
			var results = document.querySelectorAll("#results");
			var tbody = results[results.length-1];
			var template = document.getElementById('cardTemplate');

			// Clone the new row and insert it into the table
			var clone = template.content.cloneNode(true);
			var td = clone.querySelector("#card-body");
			
			data.selected = 0;
			data.select = true;
			data.id = id;
			td.parentElement.data = data;
			
			td.querySelector("#card-title").textContent = name;
			td.querySelector("#card-title").href = link;
			td.querySelector("#card-title").onclick = function() {return openTab(link);};
			if(name.length > 39){
				td.querySelector("#card-title").classList.add("jf-card-title-smaller");
			}
			var conds = "";
			var lastcond = conditions.length
			for(var i in conditions){
				var append = ", ";
				if (i == lastcond-1){
					append = "";
				}
				conds = conds + conditions[i] + append;
			}
			td.querySelector("#card-text").textContent = conds;
			td.querySelector("#card-text2").textContent = "Max " + formatE(prices[prices.length-1]+"") + "€";
			clone.querySelector("#card-text3").textContent = "" + formatE(prices[0]+"") + "€";
			var img = clone.querySelector("#card-img-top");
			img.src = image;
			img.onclick = function() {openTab(link);};
			//setColor(td.parentElement);
			//var color = getAverageRGB(img);
			//td.parentElement.style.background = "rgb(" + color.r, + ", " + color.b + ", " + color.g + ")";
			
			var btns = clone.querySelector("#buttons");
			var btn1 = btns.querySelector("#btnNew");
			var btn2 = btns.querySelector("#btnBlue");
			var btn3 = btns.querySelector("#btnGreen");
			var btn4 = btns.querySelector("#btnSelect");
			var amount_of_used = countz(conditions, "käytetty");
			if (!conditions.includes("Uusi")){
				btn1.classList.remove("btn-primary");
				btn1.classList.add("btn-secondary");
			}
			if ( amount_of_used < 2){
				btn2.classList.remove("btn-dark");
				btn2.classList.add("btn-secondary");
				btn2.setAttribute("disabled", "");
			}
			if ( amount_of_used < 1){
				btn3.classList.remove("btn-dark");
				btn3.classList.add("btn-secondary");
				btn3.setAttribute("disabled", "");
			}

			tbody.appendChild(clone);
			if(first === false){
				toggleB2(btn4);
				//console.log(btn4);
			}
			td.classList.add(bg2C);

		} else {
		  // Find another way to add the rows to the table because 
		  // the HTML template element is not supported.
		}
		callback();
	}
	function htmlToElement(html) {
		var template = document.createElement('template');
		html = html.trim(); // Never return a text node of whitespace as the result
		template.innerHTML = html;
		return template.content.firstChild;
	}
	function linkClean(link){
		return link.replaceAll("ä", "_a_").replaceAll("ö", "_o_").replaceAll("å", "_e_").replaceAll("’", "_c_").replaceAll("\'", "_c_").replaceAll("…", "...");
	}
	function linkUnClean(link){
		return link.replaceAll("_a_", "ä").replaceAll("_o_", "ö").replaceAll("_e_", "å").replaceAll("_c_", "\'");
	}
	function bClean(b){
		return linkClean(b).replaceAll(";", ",").replaceAll("\n", ";");
	}
	function bUnClean(b){
		return linkUnClean(b.replaceAll(";", "\n"));
	}
	var selec2 = []
	function genLink(){
		var val = document.getElementById("input").value;
		var dict = {};
		var cards = document.getElementsByClassName("card");
		var s = cards.length;
		var enabled = [];
		var selectd = {};
		var ind = 0;
		for(i in cards){
			var card = cards[i];
			if(card.data){
				var data = card.data;
				if(data.select){
					enabled.push(data.id);
					selectd[data.id] = data.selected;
				}
			}
			ind += 1;
		}
		selec2 = selectd;
		var loc = (window.location + "").split("?")[0].replaceAll("?","");
		var json = JSON.stringify([val, s, enabled, selectd, platform]);
		return loc.substring(0,loc.length-1) + "?" + encodeURIComponent(btoa(bClean(json)));
	}
	function fromLink(link){
		var origin = link.split("?")[1];
		if (origin && origin.length > 1){
			var val = bUnClean(atob(decodeURIComponent(origin)));
			return val;
		}
		return "";
	}
	//"borrowed" from http://jsfiddle.net/xLF38/818/ :)
	function getAverageRGB(imgEl) {
		var blockSize = 5, // only visit every 5 pixels
			defaultRGB = {r:1,g:0,b:0}, // for non-supporting envs
			canvas = document.createElement('canvas'),
			context = canvas.getContext && canvas.getContext('2d'),
			data, width, height,
			i = -4,
			length,
			rgb = {r:0,g:0,b:0},
			count = 0;
			
		if (!context) {
			return defaultRGB;
		}
		
		height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
		width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
		
		//width = Math.max(1, Math.floor(width));
		//height = Math.max(1, Math.floor(height));
		
		context.drawImage(imgEl, 0, 0);
		
		try {
			data = context.getImageData(0, 0, width, height);
		} catch(e) {
			/* security error, img on diff domain *///alert('x');
			console.log(e);
			return defaultRGB;
		}
		
		length = data.data.length;
		
		while ( (i += blockSize * 4) < length ) {
			++count;
			rgb.r += data.data[i];
			rgb.g += data.data[i+1];
			rgb.b += data.data[i+2];
		}
		
		// ~~ used to floor values
		rgb.r = ~~(rgb.r/count);
		rgb.g = ~~(rgb.g/count);
		rgb.b = ~~(rgb.b/count);
		
		return rgb;
		
	}

	//clipboardjs
	$( document ).ready(function() {
	
	new ClipboardJS('.btn');
	
	});
	var loads = 0;
	function afterLoad(){
		var cards = document.getElementsByClassName("card");
		var ind = 0;
		var used = [];
		for(i in cards){
			var card = cards[i];
			if(card.data){
				var data = card.data;
				//data.select = enabled.includes(data.id);
				data.select = false;
				data.selected = selec[data.id];
				var btns = card.querySelector("#buttons");
				var btn = btns.querySelector("#btnSelect");
				var btn1 = btns.querySelector("#btnNew");
				var btn2 = btns.querySelector("#btnBlue");
				var btn3 = btns.querySelector("#btnGreen");
				var all = [btn1, btn2, btn3];
				/*
				for (b in all){
					var bt = all[b];
					b2_originals[b + btn] = ["btn btn-dark"];
				}*/
				
				btn.classList.remove("btn-danger");
				btn.classList.remove("btn-success");
				btn.classList.add("btn-danger");
				if(enabled.includes(data.id) && !used.includes(card.id)){
					toggleB2(btn);
					ind += 1;
				}
				else{
					btn.classList.remove("btn-danger");
					btn.classList.add("btn-success");
					toggleB2(btn);
					
				}
				data.select = enabled.includes(data.id);
				if(data.select){
					data.selected = selec[data.id];
					try{
						toggleB(all[data.selected]);
					}
					catch{
						console.log("Couldn't toggle the button " + all[data.selected] + ", index " + data.selected + " indnd " + ind + " all: " + all + " selec " + selec + " id " + data.id);
						loadingErrors = true;
					}
				}
				//toggleB2(btn); 
			}
		}
		if(loads == 0 && queryDone){
			loads += 1;
			//toggleResults(1);
			//queryFull(afterLoad);
		}
		else{
			loads += 1;
		}
	}
	var enabled = [];
	var selec = [];
	var loadingErrors = false;
	function onEnter(){
		try{
			var stuff_from_link = fromLink(window.location + "");
			if(stuff_from_link != ""){
				try{
					var p = JSON.parse(stuff_from_link);
					if (p[0] != ""){
						document.getElementById("input").value = p[0];
						console.log("Received length = " + p[1]);
						console.log("Enabled: " + p[2])
						enabled = p[2];
						selec = p[3];
						platform = p[4]
						toggleResults(platform);
						if(p[1] > 1){
							queryFull(afterLoad);
						}
					}
				}
				catch{
					var val = stuff_from_link;
					document.getElementById("input").value = val;
					query();
				}
			}
			updatePrice();
			fillLink();
		}
		catch{
			window.history.replaceState('Object', 'Title', "/");
			document.getElementById('kop').style.display='none';
			document.getElementById("linkki").value = window.location + "";
			loadingErrors = true;
		}
	}
	onEnter();
