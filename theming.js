var darktheme = false;
var textC = "text-dark";
var bgC = "bg-white";
var bg2C = "bg-light";
var btnC = "";
function applyTheme(){
	
}
function toggleDark(theme){
	if(theme === "light"){
		darktheme = false;
		textC = "text-dark";
		bgC = "bg-white";
		bg2C = "bg-light";
		btnC = "";
	}
	else if(theme === "dark"){
		darktheme = true;
		textC = "text-light";
		bgC = "bg-black";
		bg2C = "bg-dark";
	}
}
if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || true){
     console.log("platform seems to be firefox, allowing theming...")
     console.log("theming init.");
     const themeConfig = new ThemeConfig();
     // place customizations here
     themeConfig.initTheme();
     darktheme = true;
     textC = "text-light";
     bgC = "bg-black";
     bg2C = "bg-dark";
     const darkSwitch = writeDarkSwitch(themeConfig);
     themeConfig.themeChangeHandlers.push(theme => toggleDark(theme));
}
else{
	console.log("Platform seems to not be firefox, theming won't probably work.");
}

if(!darktheme){
}
