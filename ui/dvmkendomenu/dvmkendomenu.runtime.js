TW.Runtime.Widgets.dvmkendomenu = function () {
	// Definitions
	var thisWidget = this;
	var kendomenu;
	var kendomenunav;
	// var styleName = thisWidget.getProperty('Style')
	// var formatResult = TW.getStyleFromStyleDefinition(styleName);

	var valueElem;
	this.renderHtml = function () {
		kendomenu = thisWidget.jqElementId + "DvM"

		var styleName = thisWidget.getProperty('Style');
		var formatResult = TW.getStyleFromStyleDefinition(styleName);


		var subStyleName = thisWidget.getProperty('SubMenuStyle');
		var subformatResult = TW.getStyleFromStyleDefinition(subStyleName);
		var editWindowBGColor = subformatResult.backgroundColor;
		var editWindowTextColor = subformatResult.foregroundColor;

		console.log("editwnwtxtcolor" + editWindowTextColor);
		console.log("editwnwbgcolor" + editWindowBGColor);

		var editBackGroundColor = formatResult.backgroundColor;
		// var editLineColor = formatResult.lineColor;
		var editForegroundColor = formatResult.foregroundColor;
		// var changeFontItalicStyle = formatResult.fontEmphasisItalic;
		var editTextSize = formatResult.textSize;
		// var checkBold = formatResult.fontEmphasisBold;
		// var editClickSubItemTextColor = formatResult.

		var html = '<div class="widget-content widget-dvmkendomenu">' +
			'<ul id=' + kendomenu + '></ul>' +
			'<style>' +
			'#' + kendomenu + '{' +
			'width:100%;' +
			'height:100;' +
			'font-size:' + editTextSize +
			// 'font-style:' + 'if(fontEmphasisItalic == checked){' +
			// 'font-style:' + changeFontItalicStyle +
			// '}' +
			// 'else {' +
			// 'font-style: normal;' +
			// '}' +
			'}' +
			'</style>' +
			'<style>' +
			// Change Background Color
			'#' + kendomenu + '.k-menu:not(.k-context-menu) {' +
			'background-color:' + editBackGroundColor +
			'}' +
			// Change Items Text Color
			'#' + kendomenu + '.k-menu:not(.k-context-menu)>.k-item {' +
			'color:' + editForegroundColor +
			'}' +
			//Change Sub Item Color - Background Color
			'#' + kendomenu + '.k-menu-group,.k-popup{' +
			'background-color:' + editWindowBGColor +
			'}' +
			'#' + kendomenu + '.k-menu-group, .k-popup{' +
			'color:' + editWindowTextColor +
			'}' +
			'</style>' +
			'</div>';


		return html;

	};

	this.afterRender = function () {
		valueElem = this.jqElement.find('.dvmkendomenu-property');
		// update that DOM element based on the property value that the user set
		// in the mashup builder
		valueElem.text(this.getProperty('dvmkendomenu Property'));

		var changeOrientation = "horizontal";
		if (this.getProperty("ChangeCurrentMenuOrientation")) {
			changeOrientation = "vertical"
		}


		$("#" + kendomenu).kendoMenu({
			dataSource: {},
			orientation: changeOrientation,
			hoverDelay: this.getProperty('ChangeHoverDelay'),
			openOnClick: {
				subMenuItems: this.getProperty('OpenOnClickSubMenuItems'),
				rootMenuItems: this.getProperty('OpenOnClickRootMenuItems')
			},
			closeOnClick: this.getProperty('CloseOnClickMenuItems'),
			// animation: this.getProperty('AllAnimationEffects')
		});
		kendomenunav = $("#" + kendomenu).data("kendoMenu")

	};
	// this is called on your widget anytime bound data changes
	this.updateProperty = function (updatePropertyInfo) {

		Tree.prototype.traverseDF = function (callback) {

			// this is a recurse and immediately-invoking function
			(function recurse(currentNode) {
				// step 2
				for (var i = 0, length = currentNode.items.length; i < length; i++) {
					// step 3
					recurse(currentNode.items[i]);
				}

				// step 4
				callback(currentNode);

				// step 1
			})(this._root);

		};
		Tree.prototype.contains = function (callback, traversal) {
			traversal.call(this, callback);
		};

		Tree.prototype.add = function (data, toData, traversal, imgUrl, title) {
			var child = new Node(data, imgUrl, title),
				parent = null,
				callback = function (node) {
					if (node.data === toData) {
						parent = node;
					}
				};


			this.contains(callback, traversal);

			if (parent) {
				parent.items.push(child);
				child.parent = parent;
			} else {
				throw new Error('Cannot add node to a non-existent parent.');
			}
		};
		// TargetProperty tells you which of your bound properties changed
		if (updatePropertyInfo.TargetProperty === 'dvmkendomenu Property') {
			valueElem.text(updatePropertyInfo.SinglePropertyValue);
			this.setProperty('dvmkendomenu Property', updatePropertyInfo.SinglePropertyValue);
		}
		if (updatePropertyInfo.TargetProperty === 'Data') {
			// Adds Infotable to rows
			var rows = updatePropertyInfo.ActualDataRows;
			// We pull the menuId value of the first element of the array to the root data.
			var rootData = rows[0]['menuId'];
			// We define this root data that we previously pulled to the tree hierarchy.
			var tree = new Tree(rootData);

			for (var i = 1; i < rows.length; i++) {
				// In this section, we set the parent class that appears before the child item to delete before the dot.
				var arr_slice = rows[i]['menuId'];
				var to1 = arr_slice.split(".");
				var to = to1[to1.length - 1];

				// In this section, we set the parent class that appears before the child item to delete before the dot.
				var arr_slice2 = rows[i]['parentMenuId'];
				var from1 = arr_slice2.split(".");
				var from = from1[from1.length - 1];
				// Title is our display name
				var title = rows[i]['title'];
				// Change Language
				title = TW.Runtime.convertLocalizableString('[[' + title + ']]') != "???" ? TW.Runtime.convertLocalizableString('[[' + title + ']]') : title;

				// We define the image to the left of the display name.
				var imgUrl = '/Thingworx/MediaEntities/' + rows[i]['imageURL'];

				//Here we decide what will appear in the tree hierarchy with the add method.
				// tree.traverseDF : This definition looks for all the branches of the tree one by one.
				tree.add(to, from, tree.traverseDF, imgUrl, title);

			}

			removeKeys(tree, ['parent']);
			// We create a new object in Tree Data.
			var treeData = new Object();

			// We throw the text and item in the root to the tree hierarchy we have defined.
			treeData.text = tree._root.text;
			treeData.items = tree._root.items;

			// Just a test object. Please don't mind that.
			var testobj = new Object();
			testobj = {
				text: "Item 3",
				items: [{ text: "Sub Item 1", items: [{ text: "asd" }] }, { text: "Sub Item 2" }] //Sub items
			};

			//We add our items from Kendomenunav.
			kendomenunav.append(treeData.items);
		}
	};

	function Node(data, imgUrl, title) {
		// We define the items we want to appear in the node.
		this.text = title;
		this.data = data; // We use it to create Tree Data.
		this.parent = null;
		this.items = [];
		this.imageUrl = imgUrl;
	}
	// We send the Node function we defined to the tree hierarchy.
	function Tree(data) {
		var node = new Node(data);
		this._root = node;
	}

	// In this function, we're removing the words in the Dictionary Hierarchy.
	function removeKeys(obj, keys) {
		var index;
		for (var prop in obj) {
			// important check that this is objects own property
			// not from prototype prop inherited
			if (obj.hasOwnProperty(prop)) {
				switch (typeof (obj[prop])) {
					case 'string':
						index = keys.indexOf(prop);
						if (index > -1) {
							delete obj[prop];
							if (obj.items.length === 0) {

								delete obj['items'];
							}
						}

						break;
					case 'object':
						index = keys.indexOf(prop);
						if (index > -1) {
							delete obj[prop];
							if (obj.items.length === 0) {
								delete obj['items'];
							}
						} else {
							removeKeys(obj[prop], keys);
						}
						break;
				}
			}
		}
	}
};
