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
