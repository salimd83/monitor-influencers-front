const fuseSettingsConfig = {
	layout          : {
		style : "layout2",
		config: {
			scroll : "content",
			navbar : {
				display: true,
				folded : false
			},
			toolbar: {
				display : true,
				style   : "fixed",
				position: "above"
			},
			footer : {
				display : false,
				style   : "fixed",
				position: "below"
			},
			mode   : "boxed"
		}
	},
	customScrollbars: true,
	theme           : {
		main   : "greeny",
		navbar : "mainThemeLight",
		toolbar: "defaultDark",
		footer : "mainThemeDark"
	}
}

export default fuseSettingsConfig