var darktheme = false;
var textC = "text-dark";
var bgC = "bg-white";
var bg2C = "bg-light";
var btnC = "";
if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && false){
     console.log("platform seems to be firefox, allowing theming...")
     console.log("theming init.");
     const themeConfig = new ThemeConfig();
     // place customizations here
     themeConfig.initTheme();
     darktheme = true;
     textC = "text-light";
     bgC = "bg-black";
     bg2C = "bg-dark";
}
else{
	console.log("Platform seems to not be firefox, theming won't probably work.");
}

if(!darktheme){
}
