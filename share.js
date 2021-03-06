if (!navigator.share){
	console.log("Sharing not available! Deleting the share button...");
	document.documentElement.style.setProperty('--copybtn-width', "98.5%");
	document.querySelector("#share").style.display = "none";
}
function share(kurl){
	if (navigator.share) {
		navigator.share({
		  title: 'Kirjat.ml',
		  text: 'Kirjalista',
		  url: kurl,
		})
		.then(() => console.log('Successful share'))
		.catch((error) => console.log('Error sharing', error));
	}
	else{
		console.log("Sharing not supported!");
	}
}
